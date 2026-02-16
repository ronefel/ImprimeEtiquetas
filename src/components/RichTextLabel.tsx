
import React, { useRef, useEffect } from 'react';

interface RichTextLabelProps {
    htmlContent: string;
    width: string;
    height: string;
    style: React.CSSProperties;
    isSelected: boolean;
    onSelect: () => void;
    onChange: (newHtml: string) => void;
    isPrint: boolean;
}

const RichTextLabel: React.FC<RichTextLabelProps> = ({
    htmlContent,
    style,
    isSelected,
    onSelect,
    onChange,
    isPrint
}) => {
    const editorRef = useRef<HTMLDivElement>(null);

    // Atualiza o conteúdo apenas quando externo muda drasticamente ou inicialização
    useEffect(() => {
        if (editorRef.current && editorRef.current.innerHTML !== htmlContent) {
           editorRef.current.innerHTML = htmlContent;
        }
    }, [htmlContent]);

    const handleInput = () => {
        if (editorRef.current) {
            onChange(editorRef.current.innerHTML);
        }
    };

    const handleFocus = () => {
        onSelect();
    };

    return (
        <div
            ref={editorRef}
            style={{
                ...style,
                outline: 'none',
                overflow: 'hidden',
            }}
            className={`w-full h-full p-1 break-words ${!isPrint ? 'cursor-text' : ''}`}
            contentEditable={!isPrint}
            onInput={handleInput}
            onFocus={handleFocus}
            onClick={(e) => {
                e.stopPropagation();
                if (!isSelected) onSelect();
            }}
            suppressContentEditableWarning={true}
        />
    );
};

export default RichTextLabel;
