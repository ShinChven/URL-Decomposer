import React from 'react';
import { UrlComponent } from '../types';
import { Check, X, Filter, Tag, Hash, Globe, Server, Lock } from 'lucide-react';

interface PartsTableProps {
  parts: UrlComponent[];
  onToggle: (id: string) => void;
  onUpdateValue: (id: string, value: string) => void;
  onToggleAll: (enabled: boolean) => void;
}

const TypeIcon = ({ type }: { type: string }) => {
  switch (type) {
    case 'protocol': return <Lock className="w-4 h-4 text-purple-500" />;
    case 'hostname': return <Globe className="w-4 h-4 text-blue-500" />;
    case 'pathname': return <Server className="w-4 h-4 text-orange-500" />;
    case 'search': return <Filter className="w-4 h-4 text-green-500" />;
    case 'hash': return <Hash className="w-4 h-4 text-pink-500" />;
    default: return <Tag className="w-4 h-4 text-slate-500" />;
  }
};

const PartsTable: React.FC<PartsTableProps> = ({ parts, onToggle, onUpdateValue, onToggleAll }) => {
  if (parts.length === 0) return null;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
      <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
        <h3 className="font-semibold text-slate-700">Components</h3>
        <div className="flex gap-2 text-xs">
            <button 
                onClick={() => onToggleAll(true)}
                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg transition-colors font-medium"
            >
                Check All
            </button>
            <button 
                onClick={() => onToggleAll(false)}
                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg transition-colors font-medium"
            >
                Uncheck All
            </button>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-100">
            <tr>
              <th className="px-6 py-3 w-16 text-center">Include</th>
              <th className="px-6 py-3 w-32">Type</th>
              <th className="px-6 py-3 w-40">Key / Label</th>
              <th className="px-6 py-3">Value</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {parts.map((part) => (
              <tr 
                key={part.id} 
                className={`transition-colors hover:bg-slate-50/80 ${!part.isEnabled ? 'opacity-70' : ''}`}
              >
                <td className="px-6 py-4 text-center">
                  <label className="relative inline-flex items-center cursor-pointer justify-center">
                    <input 
                        type="checkbox" 
                        className="peer sr-only" 
                        checked={part.isEnabled}
                        onChange={() => onToggle(part.id)}
                    />
                    <div className={`
                        w-5 h-5 rounded border flex items-center justify-center transition-all
                        ${part.isEnabled 
                            ? 'bg-indigo-600 border-indigo-600 text-white' 
                            : 'bg-white border-slate-300 text-transparent hover:border-slate-400'
                        }
                    `}>
                        <Check className="w-3.5 h-3.5" strokeWidth={3} />
                    </div>
                  </label>
                </td>
                <td className="px-6 py-4">
                  <div className={`flex items-center gap-2 px-2 py-1 rounded-md w-fit ${part.isEnabled ? 'bg-slate-100' : 'bg-slate-50 text-slate-400'}`}>
                    <TypeIcon type={part.type} />
                    <span className="font-medium text-slate-600 capitalize">{part.type}</span>
                  </div>
                </td>
                <td className="px-6 py-4 font-medium text-slate-700">
                    {part.type === 'search' ? (
                         <span className={`font-mono text-xs px-2 py-1 rounded border ${
                             part.isEnabled 
                             ? 'bg-green-50 text-green-700 border-green-100' 
                             : 'bg-slate-100 text-slate-500 border-slate-200'
                         }`}>
                            {part.key}
                         </span>
                    ) : (
                        <span className="text-slate-500">{part.label}</span>
                    )}
                </td>
                <td className="px-6 py-4">
                  <input
                    type="text"
                    value={part.value}
                    disabled={!part.isEnabled}
                    onChange={(e) => onUpdateValue(part.id, e.target.value)}
                    className={`w-full font-mono text-sm px-3 py-2 rounded-lg border outline-none transition-all
                        ${part.isEnabled 
                            ? 'bg-white border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-slate-800 shadow-sm' 
                            : 'bg-transparent border-transparent text-slate-400 cursor-not-allowed'
                        }
                    `}
                    placeholder="Empty"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PartsTable;