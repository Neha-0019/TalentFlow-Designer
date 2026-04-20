import { memo } from 'react';
import { motion } from 'framer-motion';
import { Handle, Position, type NodeProps } from '@xyflow/react';
import type { EndNodeData } from '../../types/workflow';

function EndNode({ data, selected }: NodeProps) {
  const d = data as unknown as EndNodeData;
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.22, ease: 'easeOut' }}
      whileHover={{ y: -2.5 }}
      style={{
        minWidth: 210,
        borderRadius: 16,
        border: `1px solid ${selected ? 'rgba(239,68,68,0.7)' : 'rgba(255,255,255,0.4)'}`,
        background: selected
          ? 'linear-gradient(140deg, rgba(255,241,241,0.92), rgba(254,226,226,0.85))'
          : 'linear-gradient(140deg, rgba(255,255,255,0.75), rgba(255,248,248,0.68))',
        backdropFilter: 'blur(22px)',
        boxShadow: selected
          ? '0 0 0 2px rgba(239,68,68,0.3), 0 20px 40px rgba(239,68,68,0.18)'
          : '0 8px 28px rgba(15,23,42,0.1), 0 2px 6px rgba(15,23,42,0.06)',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Accent bar */}
      <div style={{
        position: 'absolute', left: 0, top: 0, bottom: 0, width: 4,
        background: 'linear-gradient(180deg, #ef4444 0%, #dc2626 100%)',
        boxShadow: '2px 0 8px rgba(239,68,68,0.35)',
      }} />
      <Handle
        type="target"
        position={Position.Top}
        style={{ background: '#ef4444', border: '2.5px solid #fff', width: 11, height: 11, top: -5.5, boxShadow: '0 0 8px rgba(239,68,68,0.5)' }}
      />
      <div style={{ padding: '10px 12px 10px 18px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 }}>
          <span style={{ fontSize: 9.5, color: '#b91c1c', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>End</span>
          {d.showSummary && (
            <span style={{
              fontSize: 9, color: '#991b1b', background: 'linear-gradient(135deg,#fee2e2,#fecaca)',
              border: '1px solid rgba(252,165,165,0.8)', borderRadius: 999,
              padding: '2px 8px', fontWeight: 600,
              boxShadow: '0 1px 4px rgba(239,68,68,0.15)',
            }}>Summary</span>
          )}
        </div>
        <div style={{ fontSize: 13, color: '#0f172a', fontWeight: 600, letterSpacing: '-0.01em' }}>{d.endMessage || 'Workflow Complete'}</div>
      </div>
    </motion.div>
  );
}

export default memo(EndNode);
