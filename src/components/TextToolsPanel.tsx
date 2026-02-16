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

    const [bold, setBold] = React.useState(false);
    const [italic, setItalic] = React.useState(false);
    const [underline, setUnderline] = React.useState(false);
    const [align, setAlign] = React.useState<'left' | 'center' | 'right'>('center');

    const checkState = () => {
        setBold(document.queryCommandState('bold'));
        setItalic(document.queryCommandState('italic'));
        setUnderline(document.queryCommandState('underline'));

        if (document.queryCommandState('justifyLeft')) {
            setAlign('left');
        } else if (document.queryCommandState('justifyRight')) {
            setAlign('right');
        } else if (document.queryCommandState('justifyCenter')) {
            setAlign('center');
        } else {
            // Default to center if none are explicitly set (and we know our default is center)
            setAlign('center');
        }
    };

    React.useEffect(() => {
        document.addEventListener('selectionchange', checkState);
        return () => {
            document.removeEventListener('selectionchange', checkState);
        };
    }, []);

    const handleClearFormatting = () => {
        execCmd('removeFormat');
        execCmd('justifyCenter');
        execCmd('fontSize', '3');
        if (currentData) {
            onUpdateAlignment('center');
        }
        checkState();
    };

    return (
        <div className="p-4 h-full overflow-y-auto bg-gray-50">
            <h2 className="text-lg font-semibold mb-4 border-b pb-2">Formatação</h2>

            <div>
                <div className={groupClass}>
                    <button className={`${buttonClass} ${bold ? activeClass : ''}`} onMouseDown={handleMouseDown} onClick={() => { execCmd('bold'); checkState(); }} title="Negrito (Ctrl+B)">
                        <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#364153"><path d="M266-192v-576h227.95q67.05 0 123.55 41.32Q674-685.35 674-612q0 51-22.5 79.5T609-490.96Q635-479 665-448t30 91q0 91-67.03 128t-125.81 37H266Zm127-118h104.68Q546-310 556-334.5t10-35.5q0-11-10.5-35.5T494-430H393v120Zm0-232h93q33 0 48.5-17.5T550-597q0-24-17.11-39t-44.28-15H393v109Z"/></svg>
                    </button>
                    <button className={`${buttonClass} ${italic ? activeClass : ''}`} onMouseDown={handleMouseDown} onClick={() => { execCmd('italic'); checkState(); }} title="Itálico (Ctrl+I)">
                        <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#364153"><path d="M216-192v-96h160l124-384H336v-96h408v96H596L472-288h152v96H216Z"/></svg>
                    </button>
                    <button className={`${buttonClass} ${underline ? activeClass : ''}`} onMouseDown={handleMouseDown} onClick={() => { execCmd('underline'); checkState(); }} title="Sublinhado (Ctrl+U)">
                        <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#364153"><path d="M240-144v-72h480v72H240Zm91.5-203.4Q279-406.8 279-504.86V-816h97.21v317.09q0 52.85 26.43 85.88Q429.07-380 480.03-380q50.97 0 77.39-33.03 26.41-33.03 26.41-85.88V-816H681v311.14q0 98.06-52.5 157.46Q576-288 480-288t-148.5-59.4Z"/></svg>
                    </button>
                    <button className={`${buttonClass} ${align === 'left' ? activeClass : ''}`} onMouseDown={handleMouseDown} onClick={() => { execCmd('justifyLeft'); checkState(); }} title="Alinhar à Esquerda">
                        <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#364153"><path d="M144-144v-72h672v72H144Zm0-150v-72h480v72H144Zm0-150v-72h672v72H144Zm0-150v-72h480v72H144Zm0-150v-72h672v72H144Z"/></svg>
                    </button>
                    <button className={`${buttonClass} ${align === 'center' ? activeClass : ''}`} onMouseDown={handleMouseDown} onClick={() => { execCmd('justifyCenter'); checkState(); }} title="Centralizar">
                        <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#364153"><path d="M144-144v-72h672v72H144Zm144-150v-72h384v72H288ZM144-444v-72h672v72H144Zm144-150v-72h384v72H288ZM144-744v-72h672v72H144Z"/></svg>
                    </button>
                    <button className={`${buttonClass} ${align === 'right' ? activeClass : ''}`} onMouseDown={handleMouseDown} onClick={() => { execCmd('justifyRight'); checkState(); }} title="Alinhar à Direita">
                        <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#364153"><path d="M144-744v-72h672v72H144Zm192 150v-72h480v72H336ZM144-444v-72h672v72H144Zm192 150v-72h480v72H336ZM144-144v-72h672v72H144Z"/></svg>
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
                        <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#364153"><path d="M192-744v-72h576v72H192Zm252 600v-390L339-429l-51-51 192-192 192 192-51 51-105-105v390h-72Z"/></svg>
                    </button>
                    <button 
                        className={`${buttonClass} ${vAlign === 'center' ? activeClass : ''}`} 
                        onClick={() => onUpdateAlignment('center')} 
                        title="Centralizar Verticalmente"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#364153"><path d="m438-80 6-166-57 57-51-51 144-144 144 144-51 51-57-57 6 166h-84ZM192-432v-72h576v72H192Zm288-144L336-720l51-51 57 57v-150h72v150l57-57 51 51-144 144Z"/></svg>
                    </button>
                    <button 
                        className={`${buttonClass} ${vAlign === 'bottom' ? activeClass : ''}`} 
                        onClick={() => onUpdateAlignment('bottom')} 
                        title="Alinhar à Base"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#364153"><path d="M192-144v-72h576v72H192Zm288-144L288-480l51-51 105 105v-390h72v390l105-105 51 51-192 192Z"/></svg>
                    </button>
                    <button className={buttonClass} onMouseDown={handleMouseDown} onClick={() => handleFontSize(-1)} title="Diminuir Fonte">
                        <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#364153"><path d="m89-240 180-480h86l180 480h-83l-43-123H216l-44 123H89Zm151-192h144l-70-199h-4l-70 199Zm336-12v-72h288v72H576Z"/></svg>
                    </button>
                     <button className={buttonClass} onMouseDown={handleMouseDown} onClick={() => handleFontSize(1)} title="Aumentar Fonte">
                        <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#364153"><path d="m89-240 180.19-480H355l180 480h-83l-43.45-123H216l-44.06 123H89Zm151-192h144l-70-199h-4l-70 199Zm444 96v-108H576v-72h108v-108h72v108h108v72H756v108h-72Z"/></svg>
                    </button>
                    <button className={buttonClass} onMouseDown={handleMouseDown} onClick={handleClearFormatting} title="Limpar Formatação">
                        <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#364153"><path d="m503-558-73-73-88-88h426v96H531l-28 65ZM768-89 442-415l-76 176H262l107-249L90-767l51-51 678 678-51 51Z"/></svg>
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
            </div>
        </div>
    );
};

export default TextToolsPanel;
