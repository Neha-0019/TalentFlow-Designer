import { motion } from 'framer-motion';
import type { SimulationResult } from '../../types/workflow';

const STEP_CONFIG = {
  passed:  { bg: 'linear-gradient(135deg,rgba(240,253,244,0.9),rgba(220,252,231,0.85))', border: 'rgba(134,239,172,0.8)', dot: '#22c55e', icon: '✓', shadow: 'rgba(34,197,94,0.2)' },
  failed:  { bg: 'linear-gradient(135deg,rgba(254,242,242,0.9),rgba(254,226,226,0.85))', border: 'rgba(252,165,165,0.8)', dot: '#ef4444', icon: '✗', shadow: 'rgba(239,68,68,0.2)' },
  skipped: { bg: 'linear-gradient(135deg,rgba(248,250,252,0.9),rgba(241,245,249,0.85))', border: 'rgba(203,213,225,0.8)', dot: '#94a3b8', icon: '–', shadow: 'rgba(148,163,184,0.15)' },
};

const NODE_BADGE: Record<string, { bg: string; color: string }> = {
  start:     { bg: 'linear-gradient(135deg,#dcfce7,#bbf7d0)', color: '#15803d' },
  task:      { bg: 'linear-gradient(135deg,#dbeafe,#bfdbfe)', color: '#1d4ed8' },
  approval:  { bg: 'linear-gradient(135deg,#fef3c7,#fde68a)', color: '#92400e' },
  automated: { bg: 'linear-gradient(135deg,#f3e8ff,#e9d5ff)', color: '#6b21a8' },
  end:       { bg: 'linear-gradient(135deg,#fee2e2,#fecaca)', color: '#991b1b' },
};

interface Props { result: SimulationResult; }

export default function ExecutionLog({ result }: Props) {
  const isComplete = result.status === 'completed';
  return (
    <div>
      {/* Status header */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
        style={{
          display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14,
          padding: '10px 14px',
          background: isComplete
            ? 'linear-gradient(135deg,rgba(240,253,244,0.9),rgba(220,252,231,0.85))'
            : 'linear-gradient(135deg,rgba(254,242,242,0.9),rgba(254,226,226,0.85))',
          border: `1px solid ${isComplete ? 'rgba(134,239,172,0.8)' : 'rgba(252,165,165,0.8)'}`,
          borderRadius: 13,
          boxShadow: `0 4px 18px ${isComplete ? 'rgba(34,197,94,0.12)' : 'rgba(239,68,68,0.12)'}`,
        }}
      >
        <div style={{
          width: 26, height: 26, borderRadius: '50%',
          background: isComplete
            ? 'linear-gradient(135deg,#22c55e,#16a34a)'
            : 'linear-gradient(135deg,#ef4444,#dc2626)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 12, color: '#fff', fontWeight: 700,
          boxShadow: `0 4px 12px ${isComplete ? 'rgba(34,197,94,0.4)' : 'rgba(239,68,68,0.4)'}`,
          flexShrink: 0,
        }}>
          {isComplete ? '✓' : '✗'}
        </div>
        <div>
          <span style={{ fontSize: 13, fontWeight: 600, color: isComplete ? '#15803d' : '#dc2626', letterSpacing: '-0.01em' }}>
            {isComplete ? 'Workflow completed successfully' : 'Workflow failed'}
          </span>
          <span style={{ fontSize: 11, color: '#64748b', marginLeft: 8 }}>{result.steps.length} steps</span>
        </div>
      </motion.div>

      {/* Steps */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {result.steps.map((step, i) => {
          const cfg = STEP_CONFIG[step.status];
          const badge = NODE_BADGE[step.type] ?? { bg: '#f1f5f9', color: '#475569' };
          return (
            <motion.div
              key={step.nodeId}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.07, duration: 0.2, ease: 'easeOut' }}
              style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}
            >
              {/* Step indicator */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                <div style={{
                  width: 27, height: 27, borderRadius: '50%',
                  background: cfg.bg,
                  border: `2px solid ${cfg.dot}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 11, color: cfg.dot, fontWeight: 700,
                  boxShadow: `0 0 14px ${cfg.shadow}, 0 2px 4px rgba(0,0,0,0.08)`,
                }}>{cfg.icon}</div>
                {i < result.steps.length - 1 && (
                  <div style={{ width: 2, height: 14, background: 'linear-gradient(180deg,rgba(203,213,225,0.8),transparent)', margin: '2px 0' }} />
                )}
              </div>

              {/* Step card */}
              <div style={{
                flex: 1, padding: '9px 13px', borderRadius: 12,
                background: cfg.bg,
                border: `1px solid ${cfg.border}`,
                backdropFilter: 'blur(8px)',
                boxShadow: `0 2px 12px ${cfg.shadow}, 0 1px 3px rgba(0,0,0,0.04)`,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 3 }}>
                  <span style={{ fontSize: 12, fontWeight: 600, color: '#1e293b', letterSpacing: '-0.01em' }}>{step.label}</span>
                  <span style={{
                    fontSize: 9, fontWeight: 700, padding: '1px 7px', borderRadius: 20,
                    background: badge.bg, color: badge.color,
                    textTransform: 'uppercase', letterSpacing: '0.06em',
                    boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
                  }}>{step.type}</span>
                </div>
                <p style={{ fontSize: 11, color: '#64748b', margin: 0, lineHeight: 1.5 }}>{step.message}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
