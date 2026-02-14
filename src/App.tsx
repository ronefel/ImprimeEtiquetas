import { useState, useEffect } from 'react';
import ConfigPanel from './components/ConfigPanel';
import ContentPanel from './components/ContentPanel';
import Preview from './components/Preview';
import ModelsModal from './components/ModelsModal';
import { defaultConfig, type LabelConfig } from './types';

function App() {
  const [config, setConfig] = useState<LabelConfig>(defaultConfig);
  const [activeTab, setActiveTab] = useState<'config' | 'content'>('config');
  const [labelContents, setLabelContents] = useState<string[]>([]);
  const [selectedLabelIndex, setSelectedLabelIndex] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Initialize or resize label contents array when rows/cols change
  useEffect(() => {
    const total = config.rows * config.cols;
    setLabelContents(prev => {
      if (prev.length === total) return prev;
      const newContents = [...prev];
      if (newContents.length < total) {
        for (let i = prev.length; i < total; i++) {
          newContents.push('');
        }
      } else {
        newContents.length = total;
      }
      return newContents;
    });
  }, [config.rows, config.cols]);

  const handleConfigChange = (key: keyof LabelConfig, value: number) => {
    setConfig((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleApplyAll = (text: string) => {
    setLabelContents(new Array(config.rows * config.cols).fill(text));
  };

  const handleUpdateLabel = (index: number, text: string) => {
    setLabelContents(prev => {
      const newContents = [...prev];
      newContents[index] = text;
      return newContents;
    });
  };

  const handleSelectLabel = (index: number) => {
    setSelectedLabelIndex(index);
    setActiveTab('content');
  };

  const handlePrint = () => {
    window.print();
  };

  const handleLoadModel = (newConfig: LabelConfig, newContents: string[]) => {
    setConfig(newConfig);
    setLabelContents(newContents);
  };

  return (
    <div className="h-screen flex flex-col print:block print:h-auto print:overflow-visible">
      <header className="bg-indigo-600 text-white p-4 shadow-md flex justify-between items-center z-10 print:hidden">
        <h1 className="text-xl font-bold">Imprime Etiquetas</h1>
        <div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-white text-indigo-600 px-4 py-1 rounded text-sm font-semibold hover:bg-gray-100 mr-2"
          >
            Modelos
          </button>
          <button
            onClick={handlePrint}
            className="bg-green-500 text-white px-4 py-1 rounded text-sm font-semibold hover:bg-green-600"
          >
            Imprimir
          </button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden print:overflow-visible print:block">
        <aside className="w-80 border-r bg-white shadow-xl z-20 overflow-hidden flex flex-col print:hidden">
          <div className="flex border-b">
            <button
              className={`flex-1 py-3 text-sm font-medium ${activeTab === 'config' ? 'text-indigo-600 border-b-2 border-indigo-600 bg-gray-50' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab('config')}
            >
              Layout
            </button>
            <button
              className={`flex-1 py-3 text-sm font-medium ${activeTab === 'content' ? 'text-indigo-600 border-b-2 border-indigo-600 bg-gray-50' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab('content')}
            >
              Conteúdo
            </button>
          </div>

          <div className="flex-1 overflow-auto">
            {activeTab === 'config' ? (
              <ConfigPanel config={config} onChange={handleConfigChange} />
            ) : (
              <ContentPanel
                onApplyAll={handleApplyAll}
                selectedLabelIndex={selectedLabelIndex}
                onUpdateLabel={handleUpdateLabel}
                currentLabelText={selectedLabelIndex !== null ? labelContents[selectedLabelIndex] || '' : ''}
              />
            )}
          </div>
        </aside>

        <main className="flex-1 bg-gray-100 relative overflow-hidden flex flex-col print:overflow-visible print:block print:bg-white print:p-0">
          <Preview
            config={config}
            contents={labelContents}
            onSelectLabel={handleSelectLabel}
            selectedIndex={selectedLabelIndex}
          />
        </main>
      </div>

      <ModelsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onLoad={handleLoadModel}
        currentConfig={config}
        currentContents={labelContents}
      />
    </div>
  );
}

export default App;
