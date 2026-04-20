import type { ChangeEvent } from 'react';
import KeyValueEditor from './shared/KeyValueEditor';
import type { TaskNodeData, WorkflowNodeData } from '../../types/workflow';

interface Props { data: WorkflowNodeData; onChange: (data: Partial<WorkflowNodeData>) => void; }

export default function TaskNodeForm({ data, onChange }: Props) {
  const d = data as TaskNodeData;
  const f = (field: keyof TaskNodeData) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => onChange({ [field]: e.target.value } as Partial<WorkflowNodeData>);
  return <div className="space-y-4"><div><label className="block text-xs font-medium text-gray-500 mb-1">Title *</label><input className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" value={d.title} onChange={f('title')} placeholder="Task title" /></div><div><label className="block text-xs font-medium text-gray-500 mb-1">Description</label><textarea className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none" rows={3} value={d.description} onChange={f('description')} placeholder="Describe the task..." /></div><div><label className="block text-xs font-medium text-gray-500 mb-1">Assignee</label><input className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" value={d.assignee} onChange={f('assignee')} placeholder="e.g. HR Manager" /></div><div><label className="block text-xs font-medium text-gray-500 mb-1">Due date</label><input type="date" className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" value={d.dueDate} onChange={f('dueDate')} /></div><KeyValueEditor pairs={d.customFields} onChange={(pairs) => onChange({ customFields: pairs })} /></div>;
}
