import type { AutomationAction, SimulationResult, SimulationRequest } from '../types/workflow';

export const MOCK_AUTOMATIONS: AutomationAction[] = [
  { id: 'send_email', label: 'Send Email', params: ['to', 'subject', 'body'] },
  { id: 'generate_doc', label: 'Generate Document', params: ['template', 'recipient'] },
  { id: 'notify_slack', label: 'Notify Slack', params: ['channel', 'message'] },
  { id: 'update_hrms', label: 'Update HRMS Record', params: ['employee_id', 'field', 'value'] },
  { id: 'create_task', label: 'Create Jira Task', params: ['project', 'summary'] },
];

export function buildMockSimulation(req: SimulationRequest): SimulationResult {
  const steps = req.nodes.map((node) => ({
    nodeId: node.id,
    type: node.type,
    label: ('title' in node.data ? node.data.title : '') || node.type,
    status: 'passed' as const,
    message: getMockMessage(node.type, node.data),
  }));
  return { status: 'completed', steps };
}

function getMockMessage(type: string, data: unknown): string {
  const d = data as Record<string, unknown>;
  switch (type) {
    case 'start': return `Workflow "${d.title}" started`;
    case 'task': return `Task assigned to ${d.assignee || 'unassigned'}`;
    case 'approval': return `Pending approval from ${d.approverRole}`;
    case 'automated': return `Action "${d.actionId || 'none'}" executed`;
    case 'end': return String(d.endMessage || 'Workflow complete');
    default: return 'Step executed';
  }
}
