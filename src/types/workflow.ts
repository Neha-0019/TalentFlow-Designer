export type NodeType = 'start' | 'task' | 'approval' | 'automated' | 'end';

export interface KeyValuePair { id: string; key: string; value: string; }
export interface StartNodeData { type: 'start'; title: string; metadata: KeyValuePair[]; }
export interface TaskNodeData { type: 'task'; title: string; description: string; assignee: string; dueDate: string; customFields: KeyValuePair[]; }
export interface ApprovalNodeData { type: 'approval'; title: string; approverRole: 'Manager' | 'HRBP' | 'Director'; autoApproveThreshold: number | null; }
export interface AutomatedStepNodeData { type: 'automated'; title: string; actionId: string; actionParams: Record<string, string>; }
export interface EndNodeData { type: 'end'; endMessage: string; showSummary: boolean; }

export type WorkflowNodeData = StartNodeData | TaskNodeData | ApprovalNodeData | AutomatedStepNodeData | EndNodeData;

export const defaultNodeData: Record<NodeType, WorkflowNodeData> = {
  start: { type: 'start', title: 'Start', metadata: [] },
  task: { type: 'task', title: 'New Task', description: '', assignee: '', dueDate: '', customFields: [] },
  approval: { type: 'approval', title: 'Approval', approverRole: 'Manager', autoApproveThreshold: null },
  automated: { type: 'automated', title: 'Automated Step', actionId: '', actionParams: {} },
  end: { type: 'end', endMessage: 'Workflow complete', showSummary: false },
};

export interface AutomationAction { id: string; label: string; params: string[]; }
export interface SimulationStep { nodeId: string; type: NodeType; label: string; status: 'passed' | 'failed' | 'skipped'; message: string; }
export interface SimulationResult { status: 'completed' | 'failed' | 'invalid'; steps: SimulationStep[]; errors?: string[]; }
export interface SimulationRequest {
  nodes: { id: string; type: NodeType; data: WorkflowNodeData }[];
  edges: { id: string; source: string; target: string }[];
}
export interface ValidationResult { valid: boolean; errors: string[]; }
