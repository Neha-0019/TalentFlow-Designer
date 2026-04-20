import { motion } from 'framer-motion';
import type { NodeType } from '../../types/workflow';

const PALETTE_NODES: {
  type: NodeType;
  label: string;
  description: string;
  icon: string;
  accent: string;
  glow: string;
}[] = [
  { type: 'start',     label: 'Start',     description: 'Entry point',    icon: '▶', accent: '#22c55e', glow: 'rgba(34,197,94,0.25)' },
  { type: 'task',      label: 'Task',      description: 'Human action',   icon: '☰', accent: '#3b82f6', glow: 'rgba(59,130,246,0.25)' },
  { type: 'approval',  label: 'Approval',  description: 'Manager review', icon: '✓', accent: '#f59e0b', glow: 'rgba(245,158,11,0.25)' },
  { type: 'automated', label: 'Automated', description: 'System action',  icon: '⚡', accent: '#a855f7', glow: 'rgba(168,85,247,0.25)' },
  { type: 'end',       label: 'End',       description: 'Completion',     icon: '■', accent: '#ef4444', glow: 'rgba(239,68,68,0.25)' },
];

export default function NodePalette() {
  return (
    <aside style={{
      width: 220,
      minWidth: 220,
      height: '100%',
      background: 'linear-gradient(180deg, rgba(10,14,28,0.92) 0%, rgba(15,20,38,0.88) 100%)',
      backdropFilter: 'blur(28px)',
      borderRight: '1px solid rgba(255,255,255,0.09)',
      boxShadow: 'inset -1px 0 0 rgba(255,255,255,0.05), 4px 0 24px rgba(0,0,0,0.35)',
      display: 'flex',
      flexDirection: 'column',
    }}>
      {/* Header */}
      <div style={{ padding: '20px 16px 14px', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 32, height: 32, borderRadius: 11,
            background: 'linear-gradient(135deg, #6366f1, #a855f7)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff', fontWeight: 700, fontSize: 14,
            boxShadow: '0 4px 14px rgba(99,102,241,0.45)',
          }}>T</div>
          <div>
            <div style={{ color: '#f1f5f9', fontSize: 13, fontWeight: 600, letterSpacing: '-0.01em' }}>Workflow Studio</div>
            <div style={{ color: '#64748b', fontSize: 10, marginTop: 1 }}>HR Automation Designer</div>
          </div>
        </div>
      </div>

      {/* Section label */}
      <div style={{ padding: '14px 16px 8px', color: '#475569', fontSize: 9.5, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
        Node Types
      </div>

      {/* Node cards */}
      <div style={{ padding: '0 10px', display: 'flex', flexDirection: 'column', gap: 7 }}>
        {PALETTE_NODES.map((n, i) => (
          <motion.div
            key={n.type}
            draggable
            onDragStart={(e) => {
              const dragEvent = e as unknown as React.DragEvent<HTMLDivElement>;
              dragEvent.dataTransfer.setData('application/reactflow', n.type);
              dragEvent.dataTransfer.effectAllowed = 'move';
            }}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.04, duration: 0.2, ease: 'easeOut' }}
            whileHover={{ y: -2, boxShadow: `0 10px 24px ${n.glow}`, borderColor: `${n.accent}66` }}
            whileTap={{ scale: 0.97 }}
            style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '9px 11px', borderRadius: 12,
              border: '1px solid rgba(255,255,255,0.08)',
              background: 'rgba(255,255,255,0.04)',
              cursor: 'grab', userSelect: 'none',
              boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
            }}
          >
            <div style={{
              width: 30, height: 30, borderRadius: 9,
              background: `${n.accent}18`,
              border: `1px solid ${n.accent}44`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: n.accent, fontWeight: 700, fontSize: 12,
              boxShadow: `0 0 10px ${n.accent}22`,
            }}>{n.icon}</div>
            <div>
              <div style={{ color: '#e2e8f0', fontSize: 12, fontWeight: 600, letterSpacing: '-0.01em' }}>{n.label}</div>
              <div style={{ color: '#64748b', fontSize: 10, marginTop: 1 }}>{n.description}</div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Hint */}
      <div style={{
        margin: '12px 10px 0', padding: '10px 12px', borderRadius: 10,
        border: '1px dashed rgba(255,255,255,0.1)',
        textAlign: 'center', color: '#475569', fontSize: 10,
        background: 'rgba(255,255,255,0.02)',
      }}>
        Drag onto canvas
      </div>

      {/* Footer tip */}
      <div style={{ marginTop: 'auto', padding: 14, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{
          fontSize: 10, color: '#a5b4fc',
          background: 'rgba(79,70,229,0.14)',
          border: '1px solid rgba(99,102,241,0.28)',
          borderRadius: 9, padding: '7px 9px', lineHeight: 1.55,
          backdropFilter: 'blur(8px)',
        }}>
          Connect from bottom handle to next node top handle.
        </div>
      </div>
    </aside>
  );
}
