import React, { useState } from 'react';
import { ArrowRight, Link as LinkIcon, AlertCircle } from 'lucide-react';

interface UrlInputProps {
  onAnalyze: (url: string) => void;
}

const UrlInput: React.FC<UrlInputProps> = ({ onAnalyze }) => {
  const [input, setInput] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) {
      setError('Please enter a URL');
      return;
    }
    setError(null);
    onAnalyze(input);
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
      <h2 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
        <LinkIcon className="w-5 h-5 text-indigo-500" />
        Input URL
      </h2>
      <form onSubmit={handleSubmit} className="relative">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-grow">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="https://example.com/path?query=123"
              className={`w-full pl-4 pr-4 py-3 bg-slate-50 border ${
                error ? 'border-red-300 focus:ring-red-200' : 'border-slate-200 focus:ring-indigo-200 focus:border-indigo-500'
              } rounded-xl focus:outline-none focus:ring-4 transition-all text-slate-700 font-mono text-sm`}
            />
          </div>
          <button
            type="submit"
            className="flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl transition-colors focus:ring-4 focus:ring-indigo-200 active:transform active:scale-95"
          >
            Analyze
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        {error && (
          <div className="absolute -bottom-6 left-0 flex items-center gap-1 text-red-500 text-xs mt-1">
            <AlertCircle className="w-3 h-3" />
            {error}
          </div>
        )}
      </form>
    </div>
  );
};

export default UrlInput;