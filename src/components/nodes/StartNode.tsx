import { memo } from 'react';
import { motion } from 'framer-motion';
import { Handle, Position, type NodeProps } from '@xyflow/react';
import type { StartNodeData } from '../../types/workflow';

function StartNode({ data, selected }: NodeProps) {
  const d = data as unknown as StartNodeData;
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.22, ease: 'easeOut' }}
      whileHover={{ y: -2.5 }}
      style={{
        minWidth: 210,
        borderRadius: 16,
        border: `1px solid ${selected ? 'rgba(34,197,94,0.7)' : 'rgba(255,255,255,0.4)'}`,
        background: selected
          ? 'linear-gradient(140deg, rgba(240,253,244,0.92), rgba(220,252,231,0.85))'
          : 'linear-gradient(140deg, rgba(255,255,255,0.75), rgba(248,255,250,0.68))',
        backdropFilter: 'blur(22px)',
        boxShadow: selected
          ? '0 0 0 2px rgba(34,197,94,0.3), 0 20px 40px rgba(34,197,94,0.18)'
          : '0 8px 28px rgba(15,23,42,0.1), 0 2px 6px rgba(15,23,42,0.06)',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Accent bar */}
      <div style={{
        position: 'absolute', left: 0, top: 0, bottom: 0, width: 4,
        background: 'linear-gradient(180deg, #22c55e 0%, #16a34a 100%)',
        boxShadow: '2px 0 8px rgba(34,197,94,0.35)',
      }} />
      <div style={{ padding: '10px 12px 10px 18px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 }}>
          <span style={{ fontSize: 9.5, color: '#15803d', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Start</span>
          <span style={{
            fontSize: 9, color: '#166534', background: 'linear-gradient(135deg,#dcfce7,#bbf7d0)',
            border: '1px solid rgba(134,239,172,0.8)', borderRadius: 999,
            padding: '2px 8px', fontWeight: 600,
            boxShadow: '0 1px 4px rgba(34,197,94,0.15)',
          }}>Entry</span>
        </div>
        <div style={{ fontSize: 13, color: '#0f172a', fontWeight: 600, letterSpacing: '-0.01em' }}>{d.title || 'Start'}</div>
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        style={{ background: '#22c55e', border: '2.5px solid #fff', width: 11, height: 11, bottom: -5.5, boxShadow: '0 0 8px rgba(34,197,94,0.5)' }}
      />
    </motion.div>
  );
}

export default memo(StartNode);
