import type { EndNodeData, WorkflowNodeData } from '../../types/workflow';

interface Props { data: WorkflowNodeData; onChange: (d: Partial<WorkflowNodeData>) => void; }

export default function EndNodeForm({ data, onChange }: Props) {
  const d = data as EndNodeData;
  return <div className="space-y-4"><div><label className="block text-xs font-medium text-gray-500 mb-1">End message</label><input className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400" value={d.endMessage} onChange={(e) => onChange({ endMessage: e.target.value })} placeholder="e.g. Onboarding complete!" /></div><div className="flex items-center gap-3"><input type="checkbox" id="summary-flag" checked={d.showSummary} onChange={(e) => onChange({ showSummary: e.target.checked })} className="w-4 h-4 rounded border-gray-300 text-red-500 focus:ring-red-400" /><label htmlFor="summary-flag" className="text-sm text-gray-700">Show summary on completion</label></div></div>;
}
