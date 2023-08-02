export const sortTableData = (unorderedData: {}[], col: string, dir: string) => {
    if (unorderedData.length > 0) {
        if (dir === 'DSC') {
            /// @ts-ignore
            unorderedData.sort((a, b) => (b[col] > a[col] ? 1 : b[col] < a[col] ? -1 : 0));
        } else {
            /// @ts-ignore
            unorderedData.sort((a, b) => (a[col] > b[col] ? 1 : a[col] < b[col] ? -1 : 0));
        }
    }
    return unorderedData;
};
