import { memo } from 'react';
import { motion } from 'framer-motion';
import { Handle, Position, type NodeProps } from '@xyflow/react';
import type { AutomatedStepNodeData } from '../../types/workflow';

function AutomatedStepNode({ data, selected }: NodeProps) {
  const d = data as unknown as AutomatedStepNodeData;
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.22, ease: 'easeOut' }}
      whileHover={{ y: -2.5 }}
      style={{
        minWidth: 210,
        borderRadius: 16,
        border: `1px solid ${selected ? 'rgba(168,85,247,0.7)' : 'rgba(255,255,255,0.4)'}`,
        background: selected
          ? 'linear-gradient(140deg, rgba(250,245,255,0.92), rgba(243,232,255,0.85))'
          : 'linear-gradient(140deg, rgba(255,255,255,0.75), rgba(252,248,255,0.68))',
        backdropFilter: 'blur(22px)',
        boxShadow: selected
          ? '0 0 0 2px rgba(168,85,247,0.3), 0 20px 40px rgba(168,85,247,0.18)'
          : '0 8px 28px rgba(15,23,42,0.1), 0 2px 6px rgba(15,23,42,0.06)',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Accent bar */}
      <div style={{
        position: 'absolute', left: 0, top: 0, bottom: 0, width: 4,
        background: 'linear-gradient(180deg, #a855f7 0%, #7e22ce 100%)',
        boxShadow: '2px 0 8px rgba(168,85,247,0.4)',
      }} />
      <Handle
        type="target"
        position={Position.Top}
        style={{ background: '#a855f7', border: '2.5px solid #fff', width: 11, height: 11, top: -5.5, boxShadow: '0 0 8px rgba(168,85,247,0.5)' }}
      />
      <div style={{ padding: '10px 12px 10px 18px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 }}>
          <span style={{ fontSize: 9.5, color: '#7e22ce', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Automated</span>
          {d.actionId && (
            <span style={{
              fontSize: 9, color: '#6b21a8', background: 'linear-gradient(135deg,#f3e8ff,#e9d5ff)',
              border: '1px solid rgba(216,180,254,0.8)', borderRadius: 999,
              padding: '2px 8px', fontWeight: 600,
              maxWidth: 95, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
              boxShadow: '0 1px 4px rgba(168,85,247,0.15)',
            }}>{d.actionId}</span>
          )}
        </div>
        <div style={{ fontSize: 13, color: '#0f172a', fontWeight: 600, letterSpacing: '-0.01em' }}>{d.title || 'Automated Step'}</div>
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        style={{ background: '#a855f7', border: '2.5px solid #fff', width: 11, height: 11, bottom: -5.5, boxShadow: '0 0 8px rgba(168,85,247,0.5)' }}
      />
    </motion.div>
  );
}

export default memo(AutomatedStepNode);
