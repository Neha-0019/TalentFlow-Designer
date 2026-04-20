import KeyValueEditor from './shared/KeyValueEditor';
import type { StartNodeData, WorkflowNodeData } from '../../types/workflow';

interface Props { data: WorkflowNodeData; onChange: (data: Partial<WorkflowNodeData>) => void; }

export default function StartNodeForm({ data, onChange }: Props) {
  const d = data as StartNodeData;
  return <div className="space-y-4"><div><label className="block text-xs font-medium text-gray-500 mb-1">Start title *</label><input className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400" value={d.title} onChange={(e) => onChange({ title: e.target.value })} placeholder="e.g. Employee Onboarding" /></div><KeyValueEditor label="Metadata" pairs={d.metadata} onChange={(pairs) => onChange({ metadata: pairs })} /></div>;
}
