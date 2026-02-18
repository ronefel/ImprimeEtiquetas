import React from 'react';

const ConfigPanel = ({ config, onChange }) => {
    const handleChange = (e, key) => {
        onChange(key, Number(e.target.value));
    };

    return (
        <div className="bg-gray-50 p-4 h-full overflow-y-auto">
            <h2 className="text-lg font-semibold mb-4 border-b pb-2">Configuração da Página</h2>

            <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                    <label className="block text-xs font-medium text-gray-700">Largura Página (mm)</label>
                    <input
                        type="number"
                        value={config.pageWidth}
                        onChange={(e) => handleChange(e, 'pageWidth')}
                        className="mt-1 w-full rounded border-gray-300 p-2 text-sm border"
                    />
                </div>
                <div>
                    <label className="block text-xs font-medium text-gray-700">Altura Página (mm)</label>
                    <input
                        type="number"
                        value={config.pageHeight}
                        onChange={(e) => handleChange(e, 'pageHeight')}
                        className="mt-1 w-full rounded border-gray-300 p-2 text-sm border"
                    />
                </div>
            </div>

            <h2 className="text-lg font-semibold mb-4 border-b pb-2">Margens (mm)</h2>
            <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                    <label className="block text-xs font-medium text-gray-700">Topo</label>
                    <input
                        type="number"
                        value={config.marginTop}
                        onChange={(e) => handleChange(e, 'marginTop')}
                        className="mt-1 w-full rounded border-gray-300 p-2 text-sm border"
                    />
                </div>
                <div>
                    <label className="block text-xs font-medium text-gray-700">Esquerda</label>
                    <input
                        type="number"
                        value={config.marginLeft}
                        onChange={(e) => handleChange(e, 'marginLeft')}
                        className="mt-1 w-full rounded border-gray-300 p-2 text-sm border"
                    />
                </div>
                <div>
                    <label className="block text-xs font-medium text-gray-700">Direita</label>
                    <input
                        type="number"
                        value={config.marginRight}
                        onChange={(e) => handleChange(e, 'marginRight')}
                        className="mt-1 w-full rounded border-gray-300 p-2 text-sm border"
                    />
                </div>
                <div>
                    <label className="block text-xs font-medium text-gray-700">Base</label>
                    <input
                        type="number"
                        value={config.marginBottom}
                        onChange={(e) => handleChange(e, 'marginBottom')}
                        className="mt-1 w-full rounded border-gray-300 p-2 text-sm border"
                    />
                </div>
            </div>

            <h2 className="text-lg font-semibold mb-4 border-b pb-2">Etiqueta (mm)</h2>
            <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                    <label className="block text-xs font-medium text-gray-700">Largura</label>
                    <input
                        type="number"
                        value={config.labelWidth}
                        onChange={(e) => handleChange(e, 'labelWidth')}
                        className="mt-1 w-full rounded border-gray-300 p-2 text-sm border"
                    />
                </div>
                <div>
                    <label className="block text-xs font-medium text-gray-700">Altura</label>
                    <input
                        type="number"
                        value={config.labelHeight}
                        onChange={(e) => handleChange(e, 'labelHeight')}
                        className="mt-1 w-full rounded border-gray-300 p-2 text-sm border"
                    />
                </div>
            </div>

            <h2 className="text-lg font-semibold mb-4 border-b pb-2">Grid</h2>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-xs font-medium text-gray-700">Linhas</label>
                    <input
                        type="number"
                        value={config.rows}
                        onChange={(e) => handleChange(e, 'rows')}
                        className="mt-1 w-full rounded border-gray-300 p-2 text-sm border"
                    />
                </div>
                <div>
                    <label className="block text-xs font-medium text-gray-700">Colunas</label>
                    <input
                        type="number"
                        value={config.cols}
                        onChange={(e) => handleChange(e, 'cols')}
                        className="mt-1 w-full rounded border-gray-300 p-2 text-sm border"
                    />
                </div>
                <div>
                    <label className="block text-xs font-medium text-gray-700">Gap Horiz. (mm)</label>
                    <input
                        type="number"
                        value={config.gapHorizontal}
                        onChange={(e) => handleChange(e, 'gapHorizontal')}
                        className="mt-1 w-full rounded border-gray-300 p-2 text-sm border"
                    />
                </div>
                <div>
                    <label className="block text-xs font-medium text-gray-700">Gap Vert. (mm)</label>
                    <input
                        type="number"
                        value={config.gapVertical}
                        onChange={(e) => handleChange(e, 'gapVertical')}
                        className="mt-1 w-full rounded border-gray-300 p-2 text-sm border"
                    />
                </div>
            </div>
        </div>
    );
};

export default ConfigPanel;
