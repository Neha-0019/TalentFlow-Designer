import type { ComponentType } from 'react';
import { motion } from 'framer-motion';
import { useWorkflowStore } from '../../store/workflowStore';
import StartNodeForm from './StartNodeForm';
import TaskNodeForm from './TaskNodeForm';
import ApprovalNodeForm from './ApprovalNodeForm';
import AutomatedStepForm from './AutomatedStepForm';
import EndNodeForm from './EndNodeForm';
import type { NodeType, WorkflowNodeData } from '../../types/workflow';

const FORM_REGISTRY: Record<NodeType, ComponentType<{ data: WorkflowNodeData; onChange: (data: Partial<WorkflowNodeData>) => void }>> = {
  start: StartNodeForm,
  task: TaskNodeForm,
  approval: ApprovalNodeForm,
  automated: AutomatedStepForm,
  end: EndNodeForm,
};

const NODE_COLORS: Record<string, string> = {
  start: '#22c55e', task: '#3b82f6',
  approval: '#f59e0b', automated: '#a855f7', end: '#ef4444',
};

const NODE_ICONS: Record<string, string> = {
  start: '▶', task: '☰', approval: '✓', automated: '⚡', end: '■',
};

export default function NodeFormPanel() {
  const { nodes, selectedNodeId, updateNodeData, setSelectedNode, deleteNode } = useWorkflowStore();
  const selected = nodes.find((n) => n.id === selectedNodeId);

  if (!selected) {
    return (
      <div style={{
        width: 280, minWidth: 280,
        background: 'linear-gradient(180deg, #fafbff 0%, #f8faff 100%)',
        borderLeft: '1px solid rgba(226,232,240,0.9)',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: 24,
      }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.24, ease: 'easeOut' }}
          style={{
            width: 58, height: 58, borderRadius: 18,
            background: 'linear-gradient(135deg, #dbeafe, #ede9fe)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 26, marginBottom: 16,
            boxShadow: '0 6px 20px rgba(99,102,241,0.15)',
          }}
        >⚙</motion.div>
        <p style={{ fontSize: 13, fontWeight: 600, color: '#334155', marginBottom: 8, textAlign: 'center', letterSpacing: '-0.01em' }}>
          Node Configuration
        </p>
        <p style={{ fontSize: 12, color: '#94a3b8', textAlign: 'center', lineHeight: 1.7, margin: 0 }}>
          Click any node on the canvas to configure its properties
        </p>
      </div>
    );
  }

  const accent = NODE_COLORS[selected.type ?? ''] ?? '#3b82f6';
  const icon = NODE_ICONS[selected.type ?? ''] ?? '◈';
  const FormComponent = FORM_REGISTRY[selected.type as NodeType];

  return (
    <motion.div
      key={selected.id}
      initial={{ opacity: 0, x: 12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.22, ease: 'easeOut' }}
      style={{
        width: 280, minWidth: 280,
        background: 'linear-gradient(180deg, #fafbff 0%, #f8faff 100%)',
        borderLeft: '1px solid rgba(226,232,240,0.9)',
        display: 'flex', flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <div style={{
        padding: '14px 16px 12px',
        borderBottom: '1px solid rgba(241,245,249,0.95)',
        background: `linear-gradient(135deg, ${accent}0a, ${accent}05)`,
        borderTop: `3px solid ${accent}`,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
            <div style={{
              width: 30, height: 30, borderRadius: 9,
              background: `${accent}18`, border: `1px solid ${accent}44`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: accent, fontSize: 13, fontWeight: 700,
              boxShadow: `0 2px 8px ${accent}22`,
            }}>{icon}</div>
            <div>
              <span style={{ fontSize: 10, fontWeight: 700, color: accent, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                {selected.type} node
              </span>
              <p style={{ fontSize: 10.5, color: '#94a3b8', margin: '2px 0 0', fontFamily: 'monospace' }}>
                {selected.id}
              </p>
            </div>
          </div>
          <motion.button
            whileHover={{ background: 'rgba(241,245,249,0.9)' }}
            whileTap={{ scale: 0.94 }}
            onClick={() => setSelectedNode(null)}
            style={{
              background: 'rgba(248,250,252,0.7)',
              border: '1px solid rgba(226,232,240,0.8)',
              color: '#94a3b8', cursor: 'pointer', fontSize: 16,
              lineHeight: 1, padding: '4px 9px', borderRadius: 8,
            }}
          >×</motion.button>
        </div>
      </div>

      {/* Form */}
      <div style={{ flex: 1, overflowY: 'auto', padding: 16 }}>
        {FormComponent ? (
          <FormComponent
            data={selected.data as unknown as WorkflowNodeData}
            onChange={(partial) => updateNodeData(selected.id, partial)}
          />
        ) : (
          <p style={{ fontSize: 13, color: '#9ca3af' }}>No form for this node type.</p>
        )}
      </div>

      {/* Delete footer */}
      <div style={{ padding: '12px 16px', borderTop: '1px solid rgba(241,245,249,0.95)' }}>
        <motion.button
          whileHover={{ background: 'rgba(254,242,242,0.9)', borderColor: 'rgba(252,165,165,0.9)', color: '#dc2626', boxShadow: '0 4px 16px rgba(239,68,68,0.12)' }}
          whileTap={{ scale: 0.97 }}
          onClick={() => deleteNode(selected.id)}
          style={{
            width: '100%', padding: '8px', borderRadius: 10,
            border: '1px solid rgba(252,165,165,0.7)',
            background: 'rgba(255,248,248,0.7)', color: '#ef4444',
            fontSize: 13, fontWeight: 500, cursor: 'pointer',
            fontFamily: 'Inter, sans-serif',
          }}
        >
          Delete node
        </motion.button>
      </div>
    </motion.div>
  );
}
