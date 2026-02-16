import React, { useEffect, useState } from 'react';
import type { LabelConfig, LabelData } from '../types';
import RichTextLabel from './RichTextLabel';

interface Props {
    config: LabelConfig;
    contents: LabelData[];
    onSelectLabel: (index: number) => void;
    selectedIndex: number | null;
    onUpdateContent: (index: number, content: string) => void;
}

const Preview: React.FC<Props> = ({ 
    config, 
    contents, 
    onSelectLabel, 
    selectedIndex,
    onUpdateContent,
}) => {
    const [scale, setScale] = useState(1);
    const [isPrint, setIsPrint] = useState(false);

    useEffect(() => {
        const mediaQueryList = window.matchMedia('print');
        const handlePrintChange = (mql: MediaQueryListEvent) => {
            setIsPrint(mql.matches);
        };
        mediaQueryList.addEventListener('change', handlePrintChange);
        return () => mediaQueryList.removeEventListener('change', handlePrintChange);
    }, []);

    // Use scale 1 for print, variable for screen
    const effectiveScale = isPrint ? 1 : scale;

    const pageStyle: React.CSSProperties = {
        position: 'relative',
        width: `${config.pageWidth}mm`,
        height: `${config.pageHeight}mm`,
        paddingTop: `${config.marginTop}mm`,
        paddingRight: `${config.marginRight}mm`,
        paddingBottom: `${config.marginBottom}mm`,
        paddingLeft: `${config.marginLeft}mm`,
        backgroundColor: 'white',
        boxShadow: isPrint ? 'none' : '0 0 10px rgba(0,0,0,0.1)',
        transform: isPrint ? 'none' : `scale(${effectiveScale})`,
        transformOrigin: 'top left',
        marginBottom: isPrint ? 0 : `-${(1 - effectiveScale) * config.pageHeight}mm`,
        marginRight: isPrint ? 0 : `-${(1 - effectiveScale) * config.pageWidth}mm`,
    };

    const gridStyle: React.CSSProperties = {
        display: 'grid',
        gridTemplateColumns: `repeat(${config.cols}, ${config.labelWidth}mm)`,
        gridTemplateRows: `repeat(${config.rows}, ${config.labelHeight}mm)`,
        columnGap: `${config.gapHorizontal}mm`,
        rowGap: `${config.gapVertical}mm`,
    };

    const getLabelWrapperStyle = (index: number): React.CSSProperties => ({
        width: `${config.labelWidth}mm`,
        height: `${config.labelHeight}mm`,
        border: selectedIndex === index && !isPrint ? '2px solid #4f46e5' : isPrint ? 'none' : '1px dashed #ccc',
        position: 'relative', 
        backgroundColor: selectedIndex === index && !isPrint ? 'rgba(79, 70, 229, 0.05)' : 'transparent',
    });

    const labels = [];
    const totalLabels = config.rows * config.cols;

    for (let i = 0; i < totalLabels; i++) {
        const data = contents[i] || { content: '', verticalAlign: 'center' };
        
        // Mapeamento de 'top' | 'center' | 'bottom' para flex-start, center, flex-end
        const justifyContentMap = {
            'top': 'flex-start',
            'center': 'center',
            'bottom': 'flex-end',
        };

        labels.push(
            <div
                key={i}
                style={getLabelWrapperStyle(i)}
                className="print:!border-none"
                onClick={() => !isPrint && onSelectLabel(i)}
            >
                <RichTextLabel
                    htmlContent={data.content}
                    width={`${config.labelWidth}mm`}
                    height={`${config.labelHeight}mm`}
                    style={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column', 
                        justifyContent: justifyContentMap[data.verticalAlign] || 'center',
                    }}
                    isSelected={selectedIndex === i}
                    onSelect={() => onSelectLabel(i)}
                    onChange={(html) => onUpdateContent(i, html)}
                    isPrint={isPrint}
                />
            </div>
        );
    }

    return (
        <div className="w-full h-full overflow-auto bg-gray-200 p-8 flex justify-center items-start print:p-0 print:bg-white print:overflow-visible print:block">
            {/* Controls for Scale (Screen only) */}
            <div className="fixed bottom-4 right-4 bg-white p-2 rounded shadow flex gap-2 print:hidden z-50">
                <button onClick={() => setScale(s => Math.max(0.2, s - 0.1))} className="px-2 py-1 bg-gray-200 rounded">-</button>
                <span className="min-w-[3ch] text-center">{Math.round(effectiveScale * 100)}%</span>
                <button onClick={() => setScale(s => Math.min(2, s + 0.1))} className="px-2 py-1 bg-gray-200 rounded">+</button>
            </div>

            <div style={pageStyle} className="print:!transform-none print:!shadow-none print:!m-0">
                <div style={gridStyle}>
                    {labels}
                </div>
            </div>
        </div>
    );
};

export default Preview;
