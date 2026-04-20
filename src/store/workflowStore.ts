import { create } from 'zustand';
import { addEdge, applyNodeChanges, applyEdgeChanges, type Node, type Edge, type OnNodesChange, type OnEdgesChange, type OnConnect } from '@xyflow/react';
import type { WorkflowNodeData, NodeType } from '../types/workflow';
import { defaultNodeData } from '../types/workflow';

export type WorkflowNode = Node;

interface WorkflowState {
  nodes: WorkflowNode[];
  edges: Edge[];
  selectedNodeId: string | null;
  sandboxOpen: boolean;
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  addNode: (type: NodeType, position: { x: number; y: number }) => void;
  updateNodeData: (id: string, data: Partial<WorkflowNodeData>) => void;
  setSelectedNode: (id: string | null) => void;
  deleteNode: (id: string) => void;
  clearCanvas: () => void;
  setSandboxOpen: (open: boolean) => void;
  importWorkflow: (nodes: WorkflowNode[], edges: Edge[]) => void;
}

let nodeCounter = 0;

export const useWorkflowStore = create<WorkflowState>((set, get) => ({
  nodes: [],
  edges: [],
  selectedNodeId: null,
  sandboxOpen: false,
  onNodesChange: (changes) => set({ nodes: applyNodeChanges(changes, get().nodes) }),
  onEdgesChange: (changes) => set({ edges: applyEdgeChanges(changes, get().edges) }),
  onConnect: (connection) => set({ edges: addEdge({ ...connection, animated: true }, get().edges) }),
  addNode: (type, position) => {
    nodeCounter += 1;
    const id = `${type}-${nodeCounter}`;
    const newNode: WorkflowNode = {
      id,
      type,
      position,
      data: { ...defaultNodeData[type] } as unknown as Record<string, unknown>,
    };
    set({ nodes: [...get().nodes, newNode] });
  },
  updateNodeData: (id, data) => {
    set({
      nodes: get().nodes.map((n) => (n.id === id ? { ...n, data: { ...(n.data as object), ...data } as Record<string, unknown> } : n)),
    });
  },
  setSelectedNode: (id) => set({ selectedNodeId: id }),
  deleteNode: (id) => {
    set({
      nodes: get().nodes.filter((n) => n.id !== id),
      edges: get().edges.filter((e) => e.source !== id && e.target !== id),
      selectedNodeId: get().selectedNodeId === id ? null : get().selectedNodeId,
    });
  },
  clearCanvas: () => set({ nodes: [], edges: [], selectedNodeId: null }),
  setSandboxOpen: (open) => set({ sandboxOpen: open }),
  importWorkflow: (nodes, edges) => set({ nodes, edges, selectedNodeId: null }),
}));
