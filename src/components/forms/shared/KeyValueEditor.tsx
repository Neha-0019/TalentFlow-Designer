import type { KeyValuePair } from '../../../types/workflow';

interface Props { pairs: KeyValuePair[]; onChange: (pairs: KeyValuePair[]) => void; label?: string; }

export default function KeyValueEditor({ pairs: rawPairs, onChange, label = 'Custom Fields' }: Props) {
  const pairs = rawPairs ?? [];
  const addPair = () => onChange([...pairs, { id: crypto.randomUUID(), key: '', value: '' }]);
  const updatePair = (id: string, field: 'key' | 'value', val: string) => onChange(pairs.map((p) => (p.id === id ? { ...p, [field]: val } : p)));
  const removePair = (id: string) => onChange(pairs.filter((p) => p.id !== id));

  return <div className="space-y-2"><label className="text-xs font-medium text-gray-500 uppercase tracking-wide">{label}</label>{pairs.map((pair) => <div key={pair.id} className="flex gap-2 items-center"><input className="flex-1 text-sm border border-gray-200 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-400" placeholder="Key" value={pair.key} onChange={(e) => updatePair(pair.id, 'key', e.target.value)} /><input className="flex-1 text-sm border border-gray-200 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-400" placeholder="Value" value={pair.value} onChange={(e) => updatePair(pair.id, 'value', e.target.value)} /><button onClick={() => removePair(pair.id)} className="text-red-400 hover:text-red-600 text-lg font-bold leading-none">×</button></div>)}<button onClick={addPair} className="text-sm text-blue-500 hover:text-blue-700 font-medium">+ Add field</button></div>;
}
