import React, { useState, useEffect } from 'react';
import UrlInput from './components/UrlInput';
import PartsTable from './components/PartsTable';
import ResultPreview from './components/ResultPreview';
import { UrlComponent } from './types';
import { parseUrl, reconstructUrl } from './utils/urlHelper';
import { Layout } from 'lucide-react';

function App() {
  const [parts, setParts] = useState<UrlComponent[]>([]);
  const [generatedUrl, setGeneratedUrl] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = (inputUrl: string) => {
    const result = parseUrl(inputUrl);
    if (result.error) {
      setError(result.error);
      setParts([]);
      setGeneratedUrl('');
    } else {
      setError(null);
      setParts(result.parts);
    }
  };

  // Reconstruct URL whenever parts change
  useEffect(() => {
    if (parts.length > 0) {
      const newUrl = reconstructUrl(parts);
      setGeneratedUrl(newUrl);
    } else {
        setGeneratedUrl('');
    }
  }, [parts]);

  const togglePart = (id: string) => {
    setParts(prev => prev.map(part => 
      part.id === id ? { ...part, isEnabled: !part.isEnabled } : part
    ));
  };

  const updatePartValue = (id: string, value: string) => {
    setParts(prev => prev.map(part => 
      part.id === id ? { ...part, value } : part
    ));
  };

  const toggleAll = (enabled: boolean) => {
    setParts(prev => prev.map(part => ({ ...part, isEnabled: enabled })));
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shadow-md shadow-indigo-200">
                    <Layout className="text-white w-5 h-5" />
                </div>
                <h1 className="text-xl font-bold text-slate-800 tracking-tight">URL Decomposer</h1>
            </div>
            <div className="text-sm text-slate-500 font-medium">v1.0</div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        
        {/* Intro */}
        <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-3xl font-bold text-slate-900 mb-3">Deconstruct & Build</h2>
            <p className="text-slate-500 text-lg">
                Paste any URL below to break it down into its components. Toggle parts on or off to create a clean, customized link.
            </p>
        </div>

        {/* Input Section */}
        <section className="max-w-3xl mx-auto">
             <UrlInput onAnalyze={handleAnalyze} />
        </section>

        {/* Error Display */}
        {error && (
            <div className="max-w-3xl mx-auto bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl flex items-center justify-center">
                {error}
            </div>
        )}

        {/* Two Column Layout for Results */}
        {parts.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fade-in-up">
            
            {/* Left: Table */}
            <div className="lg:col-span-8 space-y-4">
              <PartsTable 
                parts={parts} 
                onToggle={togglePart} 
                onUpdateValue={updatePartValue}
                onToggleAll={toggleAll}
              />
            </div>

            {/* Right: Preview (Sticky) */}
            <div className="lg:col-span-4">
              <ResultPreview url={generatedUrl} />
            </div>

          </div>
        )}

        {parts.length === 0 && !error && (
            <div className="flex flex-col items-center justify-center py-20 text-slate-300">
                <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
                    <Layout className="w-8 h-8" />
                </div>
                <p className="font-medium">Waiting for URL input...</p>
            </div>
        )}
      </main>
    </div>
  );
}

export default App;