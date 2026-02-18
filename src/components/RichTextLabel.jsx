import React, { useRef, useEffect } from 'react';

const RichTextLabel = ({
    htmlContent,
    style,
    isSelected,
    onSelect,
    onChange,
    isPrint
}) => {
    const editorRef = useRef(null);

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
            className={`w-full h-full p-1 break-words ${!isPrint ? 'cursor-text' : ''} print:!text-black`}
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
