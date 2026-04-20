import { useMemo } from 'react';
import { useWorkflowStore } from '../store/workflowStore';

export function useNodeForm() {
  const { nodes, selectedNodeId, updateNodeData } = useWorkflowStore();
  const selectedNode = useMemo(() => nodes.find((n) => n.id === selectedNodeId) ?? null, [nodes, selectedNodeId]);
  return { selectedNode, updateNodeData };
}
