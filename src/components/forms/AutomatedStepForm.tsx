import { useEffect, useState } from 'react';
import type { AutomatedStepNodeData, WorkflowNodeData, AutomationAction } from '../../types/workflow';
import { fetchAutomations } from '../../api/client';

interface Props { data: WorkflowNodeData; onChange: (d: Partial<WorkflowNodeData>) => void; }

export default function AutomatedStepForm({ data, onChange }: Props) {
  const d = data as AutomatedStepNodeData;
  const [actions, setActions] = useState<AutomationAction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchAutomations().then(setActions).finally(() => setLoading(false)); }, []);

  const selectedAction = actions.find((a) => a.id === d.actionId);
  const handleActionChange = (actionId: string) => onChange({ actionId, actionParams: {} });
  const handleParamChange = (param: string, value: string) => onChange({ actionParams: { ...d.actionParams, [param]: value } });

  return <div className="space-y-4"><div><label className="block text-xs font-medium text-gray-500 mb-1">Title *</label><input className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400" value={d.title} onChange={(e) => onChange({ title: e.target.value })} placeholder="Step title" /></div><div><label className="block text-xs font-medium text-gray-500 mb-1">Action *</label>{loading ? <p className="text-sm text-gray-400 animate-pulse">Loading actions...</p> : <select className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400" value={d.actionId} onChange={(e) => handleActionChange(e.target.value)}><option value="">— Select an action —</option>{actions.map((a) => <option key={a.id} value={a.id}>{a.label}</option>)}</select>}</div>{selectedAction && selectedAction.params.length > 0 && <div className="space-y-3 border-t border-gray-100 pt-3"><p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Action parameters</p>{selectedAction.params.map((param) => <div key={param}><label className="block text-xs font-medium text-gray-500 mb-1 capitalize">{param}</label><input className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400" value={d.actionParams[param] ?? ''} onChange={(e) => handleParamChange(param, e.target.value)} placeholder={`Enter ${param}...`} /></div>)}</div>}</div>;
}
