import { useCallback } from 'react';
import { ReactFlowProvider, ReactFlow, Background, BackgroundVariant, Controls, MiniMap, type NodeMouseHandler } from '@xyflow/react';
import { motion } from 'framer-motion';
import { useWorkflowStore } from '../../store/workflowStore';
import { nodeTypes } from '../nodes';
import type { NodeType } from '../../types/workflow';

export default function WorkflowCanvas() {
  const { nodes, edges, onNodesChange, onEdgesChange, onConnect, setSelectedNode, addNode } = useWorkflowStore();

  const onNodeClick: NodeMouseHandler = useCallback((_evt, node) => setSelectedNode(node.id), [setSelectedNode]);
  const onPaneClick = useCallback(() => setSelectedNode(null), [setSelectedNode]);

  const onDrop = useCallback((evt: React.DragEvent<HTMLDivElement>) => {
    evt.preventDefault();
    const type = evt.dataTransfer.getData('application/reactflow') as NodeType;
    if (!type) return;
    const bounds = evt.currentTarget.getBoundingClientRect();
    addNode(type, { x: evt.clientX - bounds.left - 90, y: evt.clientY - bounds.top - 30 });
  }, [addNode]);

  const onDragOver = useCallback((evt: React.DragEvent) => {
    evt.preventDefault();
    evt.dataTransfer.dropEffect = 'move';
  }, []);

  return (
    <div className="w-full h-full" onDrop={onDrop} onDragOver={onDragOver}>
      {nodes.length === 0 && (
        <div style={{
          position: 'absolute', inset: 0, zIndex: 5,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          pointerEvents: 'none',
        }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.32, ease: 'easeOut' }}
            style={{
              background: 'rgba(255,255,255,0.72)',
              backdropFilter: 'blur(18px)',
              border: '2px dashed rgba(148,163,184,0.6)',
              borderRadius: 22,
              padding: '44px 68px',
              textAlign: 'center',
              boxShadow: '0 16px 48px rgba(15,23,42,0.12)',
            }}
          >
            <div style={{ fontSize: 44, marginBottom: 14, filter: 'drop-shadow(0 4px 8px rgba(99,102,241,0.2))' }}>⬡</div>
            <p style={{ fontSize: 16, fontWeight: 700, color: '#1e293b', marginBottom: 8, letterSpacing: '-0.02em' }}>
              Start building your workflow
            </p>
            <p style={{ fontSize: 13, color: '#94a3b8', lineHeight: 1.75, margin: 0 }}>
              Drag node types from the left panel<br />
              onto the canvas and connect them
            </p>
          </motion.div>
        </div>
      )}
      <ReactFlowProvider>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={onNodeClick}
          onPaneClick={onPaneClick}
          fitView
          deleteKeyCode="Delete"
        >
          <Background variant={BackgroundVariant.Dots} gap={18} size={1.2} color="#c4cfe8" />
          <Controls />
          <MiniMap
            nodeColor={(n) => {
              const colors: Record<string, string> = {
                start: '#22c55e', task: '#3b82f6',
                approval: '#f59e0b', automated: '#a855f7', end: '#ef4444',
              };
              return colors[n.type ?? ''] ?? '#94a3b8';
            }}
            maskColor="rgba(241,245,249,0.7)"
            style={{ borderRadius: 14 }}
          />
        </ReactFlow>
      </ReactFlowProvider>
    </div>
  );
}
