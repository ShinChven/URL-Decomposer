import React, { useState } from 'react';
import { Copy, CheckCircle, ExternalLink, RefreshCw } from 'lucide-react';

interface ResultPreviewProps {
  url: string;
}

const ResultPreview: React.FC<ResultPreviewProps> = ({ url }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  return (
    <div className="bg-indigo-900 text-white p-6 rounded-2xl shadow-xl shadow-indigo-900/20 sticky top-24 transition-all">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-indigo-200 flex items-center gap-2">
            <RefreshCw className="w-4 h-4" />
            Reconstructed URL
        </h3>
        {url && (
            <a 
                href={url} 
                target="_blank" 
                rel="noreferrer"
                className="text-xs flex items-center gap-1 text-indigo-300 hover:text-white transition-colors"
            >
                Test Link <ExternalLink className="w-3 h-3" />
            </a>
        )}
      </div>

      <div className="relative group">
        <div className="w-full bg-indigo-950/50 border border-indigo-500/30 rounded-xl p-4 font-mono text-sm break-all min-h-[80px] text-indigo-50 leading-relaxed transition-all group-hover:border-indigo-500/50">
          {url || <span className="text-indigo-400 italic">No URL generated yet...</span>}
        </div>
        
        {url && (
            <button
            onClick={handleCopy}
            className="absolute top-2 right-2 p-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-all shadow-lg hover:shadow-indigo-500/25 flex items-center gap-2"
            title="Copy to clipboard"
            >
            {copied ? (
                <>
                <CheckCircle className="w-4 h-4" />
                <span className="text-xs font-medium">Copied</span>
                </>
            ) : (
                <Copy className="w-4 h-4" />
            )}
            </button>
        )}
      </div>

      <p className="mt-4 text-xs text-indigo-300">
        Toggle components in the table to modify this URL in real-time.
      </p>
    </div>
  );
};

export default ResultPreview;