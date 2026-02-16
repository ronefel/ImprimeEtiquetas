import React from 'react';
import type { LabelData } from '../types';
import { 
    Bars3BottomLeftIcon, 
    Bars3Icon, 
    Bars3BottomRightIcon, 
    ArrowUpIcon, 
    ArrowsUpDownIcon, 
    ArrowDownIcon, 
    PlusIcon, 
    MinusIcon, 
    ArrowPathIcon, 
    DocumentDuplicateIcon, 
    TrashIcon,
    BoldIcon,
    ItalicIcon,
    UnderlineIcon,
    BarsArrowUpIcon,
    BarsArrowDownIcon
} from '@heroicons/react/24/outline';

interface TextToolsPanelProps {
    onApplyAll: (data: LabelData) => void;
    currentData: LabelData | undefined;
    onUpdateAlignment: (align: 'top' | 'center' | 'bottom') => void;
}

const TextToolsPanel: React.FC<TextToolsPanelProps> = ({ onApplyAll, currentData, onUpdateAlignment }) => {

    const execCmd = (command: string, value: string | undefined = undefined) => {
        document.execCommand(command, false, value);
    };

    const handleFontSize = (delta: number) => {
        let currentSize = document.queryCommandValue('fontSize');
        let sizeInt = parseInt(currentSize) || 3; 
        
        let newSize = sizeInt + delta;
        if (newSize < 1) newSize = 1;
        if (newSize > 7) newSize = 7;
        
        execCmd('fontSize', newSize.toString());
    };

    const handleMouseDown = (e: React.MouseEvent) => {
        e.preventDefault();
    };
    
    const buttonClass = "p-2 bg-white border border-gray-200 hover:bg-gray-100 hover:border-indigo-300 rounded text-gray-700 transition shadow-sm flex items-center justify-center min-w-[36px] min-h-[36px]";
    const activeClass = "bg-indigo-50 border-indigo-500 text-indigo-700 ring-1 ring-indigo-500";
    const groupClass = "flex gap-2 mb-4 flex-wrap";

    const vAlign = currentData?.verticalAlign || 'center';

    return (
        <div className="p-4 h-full overflow-y-auto bg-gray-50">
            <h2 className="text-lg font-semibold mb-4 border-b pb-2">Formatação</h2>

            <div>
                <div className={groupClass}>
                    <button className={buttonClass} onMouseDown={handleMouseDown} onClick={() => execCmd('bold')} title="Negrito (Ctrl+B)">
                        <BoldIcon className="w-5 h-5" />
                    </button>
                    <button className={buttonClass} onMouseDown={handleMouseDown} onClick={() => execCmd('italic')} title="Itálico (Ctrl+I)">
                        <ItalicIcon className="w-5 h-5" />
                    </button>
                    <button className={buttonClass} onMouseDown={handleMouseDown} onClick={() => execCmd('underline')} title="Sublinhado (Ctrl+U)">
                        <UnderlineIcon className="w-5 h-5" />
                    </button>
                    <button className={buttonClass} onMouseDown={handleMouseDown} onClick={() => execCmd('justifyLeft')} title="Alinhar à Esquerda">
                        <Bars3BottomLeftIcon className="w-5 h-5" />
                    </button>
                    <button className={buttonClass} onMouseDown={handleMouseDown} onClick={() => execCmd('justifyCenter')} title="Centralizar">
                        <Bars3Icon className="w-5 h-5" />
                    </button>
                    <button className={buttonClass} onMouseDown={handleMouseDown} onClick={() => execCmd('justifyRight')} title="Alinhar à Direita">
                        <Bars3BottomRightIcon className="w-5 h-5" />
                    </button>
                </div>
            </div>

            <div >
                <div className={groupClass}>
                    <button 
                        className={`${buttonClass} ${vAlign === 'top' ? activeClass : ''}`} 
                        onClick={() => onUpdateAlignment('top')} 
                        title="Alinhar ao Topo"
                    >
                        <BarsArrowUpIcon className="w-5 h-5" />
                    </button>
                    <button 
                        className={`${buttonClass} ${vAlign === 'center' ? activeClass : ''}`} 
                        onClick={() => onUpdateAlignment('center')} 
                        title="Centralizar Verticalmente"
                    >
                        <ArrowsUpDownIcon className="w-5 h-5" />
                    </button>
                    <button 
                        className={`${buttonClass} ${vAlign === 'bottom' ? activeClass : ''}`} 
                        onClick={() => onUpdateAlignment('bottom')} 
                        title="Alinhar à Base"
                    >
                        <BarsArrowDownIcon className="w-5 h-5" />
                    </button>
                    <button className={buttonClass} onMouseDown={handleMouseDown} onClick={() => handleFontSize(-1)} title="Diminuir Fonte">
                        <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#364153"><path d="m101.31-250 180.77-460h55.23l180.77 460h-59.16l-46.46-124.15H206.38L158.92-250h-57.61Zm121.77-172h171.69l-83.08-219h-4.77l-83.84 219Zm360.61-32v-52h268v52h-268Z"/></svg>
                    </button>
                     <button className={buttonClass} onMouseDown={handleMouseDown} onClick={() => handleFontSize(1)} title="Aumentar Fonte">
                        <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#364153"><path d="m101.31-250 180.96-460h55.04l180.77 460h-59.16l-46.91-124.15H206.38L158.86-250h-57.55Zm121.77-172h171.69l-83.2-219h-4.65l-83.84 219Zm468.61 76v-108h-108v-52h108v-108h52v108h108v52h-108v108h-52Z"/></svg>  
                    </button>
                    <button className={buttonClass} onMouseDown={handleMouseDown} onClick={() => execCmd('removeFormat')} title="Limpar Formatação">
                        <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#364153"><path d="M489.92-565.69 444.62-611l15.77-38.08h-54.62l-52.23-52.23h396.77v60.62H522.15l-32.23 75Zm268.85 439.76L439.31-445.77l-82.16 190.61h-65.53l102-236.3-270.54-270.15 37.15-37.16 635.69 635.69-37.15 37.15Z"/></svg>
                    </button>
                </div>
            </div>

            <div className="mt-8 border-t pt-4">
                <button
                    onClick={() => currentData ? onApplyAll(currentData) : null}
                    className="w-full bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition flex items-center justify-center gap-2"
                    title="Aplica o conteúdo e formatação da etiqueta selecionada para todas as outras."
                    disabled={!currentData}
                >
                    <DocumentDuplicateIcon className="w-5 h-5" />
                    Repetir nas demais
                </button>
                <p className="text-xs text-gray-500 mt-2 text-center">
                    Copia o conteúdo da etiqueta atual para todas as outras.
                </p>
            </div>
            
             <div className="mt-auto pt-8 text-xs text-gray-400">
                <p>Selecione uma etiqueta e digite diretamente nela.</p>
                <p className="mt-1">Use esta barra para formatar o texto selecionado.</p>
            </div>
        </div>
    );
};

export default TextToolsPanel;
