import WorkflowCanvas from './components/canvas/WorkflowCanvas';
import NodePalette from './components/canvas/NodePalette';
import CanvasToolbar from './components/canvas/CanvasToolbar';
import NodeFormPanel from './components/forms/NodeFormPanel';
import SandboxPanel from './components/sandbox/SandboxPanel';

export default function App() {
  return (
    <div style={{
      display: 'flex',
      height: '100vh',
      width: '100vw',
      overflow: 'hidden',
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      background: 'transparent',
      position: 'relative',
    }}>
      <NodePalette />
      <div style={{ position: 'relative', flex: 1, height: '100%' }}>
        <CanvasToolbar />
        <WorkflowCanvas />
        <SandboxPanel />
      </div>
      <NodeFormPanel />
    </div>
  );
}
