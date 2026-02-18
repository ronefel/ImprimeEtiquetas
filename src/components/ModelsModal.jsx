import React, { useState, useEffect } from 'react';

const ModelsModal = ({ isOpen, onClose, onLoad, currentConfig, currentContents }) => {
    const [models, setModels] = useState({});
    const [newModelName, setNewModelName] = useState('');
    const [loading, setLoading] = useState(false);
    const [view, setView] = useState('list');

    useEffect(() => {
        if (isOpen) {
            fetchModels();
            setView('list');
        }
    }, [isOpen]);

    const fetchModels = async () => {
        if (!window.ipcRenderer) {
            console.error('ipcRenderer not available');
            return;
        }
        setLoading(true);
        try {
            const data = await window.ipcRenderer.invoke('get-models');
            setModels(data || {});
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        if (!newModelName.trim()) return;
        if (!window.ipcRenderer) {
            alert('Não foi possível salvar: Sistema de arquivos não disponível.');
            return;
        }
        const model = {
            config: currentConfig,
            contents: currentContents,
            updatedAt: Date.now(),
        };
        try {
            await window.ipcRenderer.invoke('save-model', newModelName, model);
            await fetchModels();
            setNewModelName('');
            setView('list');
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = async (name) => {
        if (!confirm(`Tem certeza que deseja excluir o modelo "${name}"?`)) return;
        if (!window.ipcRenderer) return;
        try {
            await window.ipcRenderer.invoke('delete-model', name);
            await fetchModels();
        } catch (error) {
            console.error(error);
        }
    };

    const handleLoad = (name) => {
        const model = models[name];
        if (model) {
            onLoad(model.config, model.contents);
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden">
                <div className="p-4 border-b flex justify-between items-center bg-gray-50">
                    <h2 className="font-semibold text-lg text-gray-800">Gerenciar Modelos</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">&times;</button>
                </div>

                <div className="p-4">
                    <div className="flex gap-2 mb-4">
                        <button
                            className={`flex-1 py-1 text-sm rounded ${view === 'list' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-600 hover:bg-gray-100'}`}
                            onClick={() => setView('list')}
                        >
                            Meus Modelos
                        </button>
                        <button
                            className={`flex-1 py-1 text-sm rounded ${view === 'save' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-600 hover:bg-gray-100'}`}
                            onClick={() => setView('save')}
                        >
                            Salvar Atual
                        </button>
                    </div>

                    {view === 'save' && (
                        <div className="space-y-3">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Nome do Modelo</label>
                                <input
                                    type="text"
                                    className="w-full border rounded p-2 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none"
                                    value={newModelName}
                                    onChange={(e) => setNewModelName(e.target.value)}
                                    placeholder="Ex: Carta 3 colunas"
                                />
                            </div>
                            <button
                                onClick={handleSave}
                                disabled={!newModelName.trim()}
                                className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 disabled:opacity-50"
                            >
                                Salvar Configuração
                            </button>
                        </div>
                    )}

                    {view === 'list' && (
                        <div className="space-y-2 max-h-60 overflow-y-auto">
                            {loading ? (
                                <p className="text-center text-gray-500 py-4">Carregando...</p>
                            ) : Object.keys(models).length === 0 ? (
                                <p className="text-center text-gray-500 py-4">Nenhum modelo salvo.</p>
                            ) : (
                                Object.entries(models).map(([name, model]) => (
                                    <div key={name} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded border border-transparent hover:border-gray-200 group">
                                        <div className="flex-1 cursor-pointer" onClick={() => handleLoad(name)}>
                                            <div className="font-medium text-gray-800">{name}</div>
                                            <div className="text-xs text-gray-500">
                                                {new Date(model.updatedAt).toLocaleDateString()}
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => handleDelete(name)}
                                            className="text-red-500 opacity-0 group-hover:opacity-100 hover:text-red-700 px-2"
                                            title="Excluir"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                                        </button>
                                    </div>
                                ))
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ModelsModal;
