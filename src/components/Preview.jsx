import React, { useEffect, useState } from 'react';
import RichTextLabel from './RichTextLabel';

const Preview = ({
    config,
    contents,
    onSelectLabel,
    selectedIndex,
    onUpdateContent,
}) => {
    const [isPrint, setIsPrint] = useState(false);

    useEffect(() => {
        const mediaQueryList = window.matchMedia('print');
        const handlePrintChange = (e) => {
            setIsPrint(e.matches);
        };
        mediaQueryList.addEventListener('change', handlePrintChange);
        return () => mediaQueryList.removeEventListener('change', handlePrintChange);
    }, []);

    const pageStyle = {
        position: 'relative',
        width: `${config.pageWidth}mm`,
        height: `${config.pageHeight}mm`,
        paddingTop: `${config.marginTop}mm`,
        paddingRight: `${config.marginRight}mm`,
        paddingBottom: `${config.marginBottom}mm`,
        paddingLeft: `${config.marginLeft}mm`,
        backgroundColor: 'white',
        boxShadow: isPrint ? 'none' : '0 0 10px rgba(0,0,0,0.1)',
    };

    const gridStyle = {
        display: 'grid',
        gridTemplateColumns: `repeat(${config.cols}, ${config.labelWidth}mm)`,
        gridTemplateRows: `repeat(${config.rows}, ${config.labelHeight}mm)`,
        columnGap: `${config.gapHorizontal}mm`,
        rowGap: `${config.gapVertical}mm`,
    };

    const getLabelWrapperStyle = (index) => ({
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
                        textAlign: 'center',
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
        <div className="w-full h-full overflow-y-scroll overflow-x-hidden bg-gray-200 p-8 flex justify-center items-start print:p-0 print:bg-white print:overflow-visible print:block">
            <div style={pageStyle} className="print:!transform-none print:!shadow-none print:!m-0">
                <div style={gridStyle}>
                    {labels}
                </div>
            </div>
        </div>
    );
};

export default Preview;
