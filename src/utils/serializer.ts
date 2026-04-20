import type { Node, Edge } from '@xyflow/react';
import type { SimulationRequest, NodeType, WorkflowNodeData } from '../types/workflow';

export function serializeWorkflow(nodes: Node[], edges: Edge[]): SimulationRequest {
  return {
    nodes: nodes.map((n) => ({
      id: n.id,
      type: n.type as NodeType,
      data: n.data as unknown as WorkflowNodeData,
    })),
    edges: edges.map((e) => ({ id: e.id, source: e.source, target: e.target })),
  };
}

export function exportWorkflowJSON(nodes: Node[], edges: Edge[]): void {
  const json = JSON.stringify(serializeWorkflow(nodes, edges), null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'workflow.json';
  a.click();
  URL.revokeObjectURL(url);
}
