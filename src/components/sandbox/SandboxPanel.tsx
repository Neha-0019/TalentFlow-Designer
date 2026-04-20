import { motion } from 'framer-motion';
import { useState } from 'react';
import { useWorkflowStore } from '../../store/workflowStore';
import { validateWorkflow } from '../../utils/graphValidator';
import { serializeWorkflow } from '../../utils/serializer';
import { postSimulate } from '../../api/client';
import type { SimulationResult } from '../../types/workflow';
import ExecutionLog from './ExecutionLog';

export default function SandboxPanel() {
  const { nodes, edges, sandboxOpen, setSandboxOpen } = useWorkflowStore();
  const [result, setResult] = useState<SimulationResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const runSimulation = async () => {
    setErrors([]);
    setResult(null);
    const validation = validateWorkflow(nodes, edges);
    if (!validation.valid) {
      setErrors(validation.errors);
      return;
    }
    setLoading(true);
    try {
      setResult(await postSimulate(serializeWorkflow(nodes, edges)));
    } catch {
      setErrors(['Simulation request failed. Check your mock API setup.']);
    } finally {
      setLoading(false);
    }
  };

  if (!sandboxOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 18 }}
      transition={{ duration: 0.26, ease: 'easeOut' }}
      style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        height: 310,
        background: 'rgba(255,255,255,0.65)',
        backdropFilter: 'blur(28px)',
        borderTop: '1px solid rgba(255,255,255,0.82)',
        boxShadow: '0 -16px 44px rgba(15,23,42,0.18), 0 -2px 8px rgba(99,102,241,0.06)',
        zIndex: 10,
        display: 'flex', flexDirection: 'column',
      }}
    >
      {/* Header */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '10px 16px',
        borderBottom: '1px solid rgba(226,232,240,0.65)',
        background: 'linear-gradient(90deg, rgba(224,231,255,0.7) 0%, rgba(243,232,255,0.65) 100%)',
        backdropFilter: 'blur(10px)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 30, height: 30, borderRadius: 10,
            background: 'linear-gradient(135deg, #4f46e5, #9333ea)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 12, color: '#fff',
            boxShadow: '0 4px 12px rgba(99,102,241,0.4)',
          }}>▶</div>
          <div>
            <span style={{ fontSize: 13, fontWeight: 600, color: '#1e293b', letterSpacing: '-0.01em' }}>Workflow Sandbox</span>
            <span style={{ fontSize: 11, color: '#64748b', marginLeft: 8 }}>{nodes.length} nodes · {edges.length} edges</span>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <motion.button
            whileHover={{ y: -1.5, boxShadow: loading ? 'none' : '0 10px 22px rgba(79,70,229,0.42)' }}
            whileTap={{ scale: 0.96 }}
            onClick={runSimulation}
            disabled={loading}
            style={{
              background: loading ? '#94a3b8' : 'linear-gradient(135deg, #4f46e5, #9333ea)',
              color: '#fff', border: 'none', borderRadius: 11,
              padding: '6px 16px', fontSize: 12, fontWeight: 600,
              cursor: loading ? 'not-allowed' : 'pointer',
              boxShadow: loading ? 'none' : '0 4px 14px rgba(79,70,229,0.38)',
              fontFamily: 'Inter, sans-serif',
              letterSpacing: '-0.01em',
            }}
          >
            {loading ? '⟳ Running...' : '▶ Run Workflow'}
          </motion.button>
          <motion.button
            whileHover={{ background: 'rgba(241,245,249,0.9)' }}
            whileTap={{ scale: 0.96 }}
            onClick={() => setSandboxOpen(false)}
            style={{
              background: 'rgba(255,255,255,0.6)',
              border: '1px solid rgba(203,213,225,0.7)',
              color: '#64748b', cursor: 'pointer', fontSize: 16, lineHeight: 1,
              borderRadius: 8, padding: '5px 9px', fontWeight: 400,
            }}
          >×</motion.button>
        </div>
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflowY: 'auto', padding: 16 }}>
        {errors.length > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{
              marginBottom: 12, padding: '11px 14px',
              borderRadius: 12,
              border: '1px solid rgba(252,165,165,0.75)',
              background: 'linear-gradient(135deg, rgba(254,242,242,0.9), rgba(255,237,237,0.85))',
              boxShadow: '0 4px 16px rgba(239,68,68,0.1)',
            }}
          >
            <p style={{ fontSize: 11, fontWeight: 700, color: '#dc2626', margin: '0 0 4px' }}>Validation errors</p>
            {errors.map((e, i) => (
              <p key={i} style={{ fontSize: 12, color: '#ef4444', margin: '2px 0 0' }}>• {e}</p>
            ))}
          </motion.div>
        )}
        {result && <ExecutionLog result={result} />}
        {!result && !loading && errors.length === 0 && (
          <p style={{ fontSize: 12, color: '#94a3b8', textAlign: 'center', marginTop: 28, letterSpacing: '-0.01em' }}>
            Click <strong style={{ color: '#6366f1' }}>"Run Workflow"</strong> to simulate your workflow
          </p>
        )}
      </div>
    </motion.div>
  );
}
