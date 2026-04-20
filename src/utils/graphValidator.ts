import type { Node, Edge } from '@xyflow/react';
import type { ValidationResult } from '../types/workflow';

export function validateWorkflow(nodes: Node[], edges: Edge[]): ValidationResult {
  const errors: string[] = [];
  if (nodes.length === 0) return { valid: false, errors: ['Canvas is empty. Add at least a Start and End node.'] };

  const startNodes = nodes.filter((n) => n.type === 'start');
  const endNodes = nodes.filter((n) => n.type === 'end');
  if (startNodes.length === 0) errors.push('Workflow must have a Start node.');
  if (startNodes.length > 1) errors.push('Workflow must have exactly one Start node.');
  if (endNodes.length === 0) errors.push('Workflow must have at least one End node.');

  const connectedIds = new Set(edges.flatMap((e) => [e.source, e.target]));
  const isolated = nodes.filter((n) => !connectedIds.has(n.id) && nodes.length > 1);
  if (isolated.length > 0) errors.push(`Isolated nodes (not connected): ${isolated.map((n) => n.id).join(', ')}`);

  if (hasCycle(nodes, edges)) errors.push('Workflow contains a cycle. Workflows must be directed acyclic graphs.');
  return { valid: errors.length === 0, errors };
}

function hasCycle(nodes: Node[], edges: Edge[]): boolean {
  const adj: Record<string, string[]> = {};
  nodes.forEach((n) => { adj[n.id] = []; });
  edges.forEach((e) => { adj[e.source]?.push(e.target); });
  const visited = new Set<string>();
  const inStack = new Set<string>();

  function dfs(id: string): boolean {
    visited.add(id); inStack.add(id);
    for (const neighbor of adj[id] ?? []) {
      if (!visited.has(neighbor) && dfs(neighbor)) return true;
      if (inStack.has(neighbor)) return true;
    }
    inStack.delete(id); return false;
  }

  for (const node of nodes) if (!visited.has(node.id) && dfs(node.id)) return true;
  return false;
}
