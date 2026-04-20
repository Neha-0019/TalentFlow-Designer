import { useState } from 'react';
import { useWorkflowStore } from '../store/workflowStore';
import { validateWorkflow } from '../utils/graphValidator';
import { serializeWorkflow } from '../utils/serializer';
import { postSimulate } from '../api/client';

export function useSimulation() {
  const { nodes, edges } = useWorkflowStore();
  const [loading, setLoading] = useState(false);

  const simulate = async () => {
    const validation = validateWorkflow(nodes, edges);
    if (!validation.valid) return { result: null, errors: validation.errors };
    setLoading(true);
    try {
      const result = await postSimulate(serializeWorkflow(nodes, edges));
      return { result, errors: [] as string[] };
    } finally {
      setLoading(false);
    }
  };

  return { loading, simulate };
}
