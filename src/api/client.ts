import type { AutomationAction, SimulationRequest, SimulationResult } from '../types/workflow';
import { MOCK_AUTOMATIONS } from './mocks';

export async function fetchAutomations(): Promise<AutomationAction[]> {
  try {
    const res = await fetch('/automations');
    if (!res.ok) throw new Error('Failed to fetch automations');
    return res.json();
  } catch {
    // Fallback keeps the Automated node usable even if MSW/API fails to initialize.
    return MOCK_AUTOMATIONS;
  }
}

export async function postSimulate(req: SimulationRequest): Promise<SimulationResult> {
  const res = await fetch('/simulate', {
    method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(req),
  });
  if (!res.ok) throw new Error('Simulation failed');
  return res.json();
}
