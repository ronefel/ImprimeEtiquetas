export interface LabelConfig {
    pageWidth: number;
    pageHeight: number;
    marginTop: number;
    marginLeft: number;
    marginBottom: number;
    marginRight: number;
    labelWidth: number;
    labelHeight: number;
    gapHorizontal: number;
    gapVertical: number;
    rows: number;
    cols: number;
}

export const defaultConfig: LabelConfig = {
    pageWidth: 210,
    pageHeight: 297,
    marginTop: 10,
    marginLeft: 10,
    marginBottom: 10,
    marginRight: 10,
    labelWidth: 63.5,
    labelHeight: 33.9,
    gapHorizontal: 2,
    gapVertical: 0,
    rows: 8,
    cols: 3,
};
