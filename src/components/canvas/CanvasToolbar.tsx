import { motion } from 'framer-motion';
import { useWorkflowStore } from '../../store/workflowStore';
import { exportWorkflowJSON } from '../../utils/serializer';

export default function CanvasToolbar() {
  const { nodes, edges, clearCanvas, setSandboxOpen } = useWorkflowStore();
  const nodeCount = nodes.length;
  const edgeCount = edges.length;

  const handleImport = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;
      const text = await file.text();
      try {
        const { nodes: n, edges: ed } = JSON.parse(text);
        useWorkflowStore.setState({ nodes: n, edges: ed });
      } catch {
        alert('Invalid workflow JSON file.');
      }
    };
    input.click();
  };

  const secondaryBtn: React.CSSProperties = {
    display: 'flex', alignItems: 'center', gap: 5,
    background: 'rgba(255,255,255,0.52)',
    color: '#334155',
    border: '1px solid rgba(255,255,255,0.72)',
    borderRadius: 11,
    padding: '5px 12px',
    fontSize: 12,
    fontWeight: 500,
    cursor: 'pointer',
    backdropFilter: 'blur(14px)',
    boxShadow: '0 2px 6px rgba(15,23,42,0.08)',
    fontFamily: 'Inter, sans-serif',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -8, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.28, ease: 'easeOut' }}
      style={{
        position: 'absolute', top: 16, left: '50%', transform: 'translateX(-50%)',
        zIndex: 10, display: 'flex', alignItems: 'center', gap: 8,
        background: 'rgba(255,255,255,0.5)',
        backdropFilter: 'blur(28px)',
        border: '1px solid rgba(255,255,255,0.72)',
        borderRadius: 18,
        padding: '7px 14px',
        boxShadow: '0 20px 44px rgba(30,41,59,0.2), inset 0 1px 0 rgba(255,255,255,0.7)',
      }}
    >
      {/* Brand mark */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginRight: 4 }}>
        <div style={{
          width: 26, height: 26, borderRadius: 8,
          background: 'linear-gradient(135deg, #4f46e5, #a855f7)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 11, color: '#fff', fontWeight: 700,
          boxShadow: '0 4px 10px rgba(99,102,241,0.45)',
        }}>W</div>
        <span style={{ fontSize: 13, fontWeight: 600, color: '#0f172a', letterSpacing: '-0.01em' }}>HR Workflow</span>
      </div>

      <div style={{ width: 1, height: 18, background: 'rgba(203,213,225,0.7)' }} />

      {/* Stats pill */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 4,
        padding: '3px 9px',
        background: 'rgba(241,245,249,0.85)',
        borderRadius: 9,
        border: '1px solid rgba(203,213,225,0.75)',
      }}>
        <span style={{ fontSize: 11, color: '#64748b', fontWeight: 500 }}>{nodeCount} nodes</span>
        <span style={{ color: '#cbd5e1', fontSize: 11, fontWeight: 300 }}>·</span>
        <span style={{ fontSize: 11, color: '#64748b', fontWeight: 500 }}>{edgeCount} edges</span>
      </div>

      <div style={{ width: 1, height: 18, background: 'rgba(203,213,225,0.7)' }} />

      {/* Primary CTA */}
      <motion.button
        whileHover={{ y: -1.5, boxShadow: '0 10px 22px rgba(79,70,229,0.42)' }}
        whileTap={{ scale: 0.96 }}
        onClick={() => setSandboxOpen(true)}
        style={{
          display: 'flex', alignItems: 'center', gap: 6,
          background: 'linear-gradient(135deg, #4f46e5, #9333ea)',
          color: '#fff', border: 'none', borderRadius: 12,
          padding: '5px 14px', fontSize: 12, fontWeight: 600,
          cursor: 'pointer',
          boxShadow: '0 4px 14px rgba(79,70,229,0.38)',
          fontFamily: 'Inter, sans-serif',
        }}
      >
        ▶ Test Workflow
      </motion.button>

      <motion.button whileHover={{ y: -1, boxShadow: '0 6px 14px rgba(15,23,42,0.1)' }} whileTap={{ scale: 0.97 }} onClick={handleImport} style={secondaryBtn}>
        ↑ Import
      </motion.button>
      <motion.button whileHover={{ y: -1, boxShadow: '0 6px 14px rgba(15,23,42,0.1)' }} whileTap={{ scale: 0.97 }} onClick={() => exportWorkflowJSON(nodes, edges)} style={secondaryBtn}>
        ↓ Export
      </motion.button>
      <motion.button
        whileHover={{ y: -1, boxShadow: '0 6px 14px rgba(239,68,68,0.18)' }}
        whileTap={{ scale: 0.97 }}
        onClick={() => { if (confirm('Clear the entire canvas?')) clearCanvas(); }}
        style={{ ...secondaryBtn, color: '#dc2626', border: '1px solid rgba(252,165,165,0.7)', background: 'rgba(255,242,242,0.62)' }}
      >
        Clear
      </motion.button>
    </motion.div>
  );
}
