import { memo } from 'react';
import { motion } from 'framer-motion';
import { Handle, Position, type NodeProps } from '@xyflow/react';
import type { TaskNodeData } from '../../types/workflow';

function TaskNode({ data, selected }: NodeProps) {
  const d = data as unknown as TaskNodeData;
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.22, ease: 'easeOut' }}
      whileHover={{ y: -2.5 }}
      style={{
        minWidth: 210,
        borderRadius: 16,
        border: `1px solid ${selected ? 'rgba(59,130,246,0.7)' : 'rgba(255,255,255,0.4)'}`,
        background: selected
          ? 'linear-gradient(140deg, rgba(239,246,255,0.92), rgba(219,234,254,0.85))'
          : 'linear-gradient(140deg, rgba(255,255,255,0.75), rgba(248,250,255,0.68))',
        backdropFilter: 'blur(22px)',
        boxShadow: selected
          ? '0 0 0 2px rgba(59,130,246,0.3), 0 20px 40px rgba(59,130,246,0.18)'
          : '0 8px 28px rgba(15,23,42,0.1), 0 2px 6px rgba(15,23,42,0.06)',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Accent bar */}
      <div style={{
        position: 'absolute', left: 0, top: 0, bottom: 0, width: 4,
        background: 'linear-gradient(180deg, #3b82f6 0%, #2563eb 100%)',
        boxShadow: '2px 0 8px rgba(59,130,246,0.35)',
      }} />
      <Handle
        type="target"
        position={Position.Top}
        style={{ background: '#3b82f6', border: '2.5px solid #fff', width: 11, height: 11, top: -5.5, boxShadow: '0 0 8px rgba(59,130,246,0.5)' }}
      />
      <div style={{ padding: '10px 12px 10px 18px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 }}>
          <span style={{ fontSize: 9.5, color: '#1d4ed8', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Task</span>
          {d.assignee && (
            <span style={{
              fontSize: 9, color: '#1d4ed8', background: 'linear-gradient(135deg,#dbeafe,#bfdbfe)',
              border: '1px solid rgba(147,197,253,0.8)', borderRadius: 999,
              padding: '2px 8px', fontWeight: 600,
              boxShadow: '0 1px 4px rgba(59,130,246,0.15)',
            }}>{d.assignee}</span>
          )}
        </div>
        <div style={{ fontSize: 13, color: '#0f172a', fontWeight: 600, letterSpacing: '-0.01em' }}>{d.title || 'New Task'}</div>
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        style={{ background: '#3b82f6', border: '2.5px solid #fff', width: 11, height: 11, bottom: -5.5, boxShadow: '0 0 8px rgba(59,130,246,0.5)' }}
      />
    </motion.div>
  );
}

export default memo(TaskNode);
