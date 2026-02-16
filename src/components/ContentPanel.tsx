import React, { useState } from 'react';

interface Props {
    onApplyAll: (text: string) => void;
    selectedLabelIndex: number | null;
    onUpdateLabel: (index: number, text: string) => void;
    currentLabelText: string;
}

const ContentPanel: React.FC<Props> = ({ onApplyAll, selectedLabelIndex, onUpdateLabel, currentLabelText }) => {
    const [text, setText] = useState('');

    const handleApplyAll = () => {
        onApplyAll(text);
    };

    const handleUpdateCurrent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newText = e.target.value;
        setText(newText);
        if (selectedLabelIndex !== null) {
            onUpdateLabel(selectedLabelIndex, newText);
        }
    };

    // Update local text when selection changes or external prop changes
    React.useEffect(() => {
        setText(currentLabelText);
    }, [currentLabelText, selectedLabelIndex]);

    return (
        <div className="bg-gray-50 p-4 h-full overflow-y-auto">
            <h2 className="text-lg font-semibold mb-4 border-b pb-2">Conteúdo da Etiqueta</h2>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    {selectedLabelIndex !== null ? `Editando Etiqueta ${selectedLabelIndex + 1}` : 'Edição Global (Selecione uma etiqueta para editar individualmente)'}
                </label>
                <textarea
                    rows={5}
                    className="w-full rounded border-gray-300 p-2 text-sm border shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    value={text}
                    onChange={handleUpdateCurrent}
                    placeholder="Digite o conteúdo da etiqueta aqui..."
                />
            </div>

            <button
                onClick={handleApplyAll}
                className="w-full bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition mb-4"
            >
                Repetir nas demais
            </button>

            <div className="text-xs text-gray-500 mt-4">
                <p>Dica: Clique em uma etiqueta na visualização para editar seu conteúdo individualmente.</p>
            </div>
        </div>
    );
};

export default ContentPanel;
