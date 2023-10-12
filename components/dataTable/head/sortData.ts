export const sortTableData = (unorderedData: {}[], col: string, dir: string) => {
    if (unorderedData.length > 0) {
        /// @ts-ignore
        if (typeof unorderedData[0][col] == 'string' && unorderedData[0][col].match(/\d\d\/\d\d\/\d\d/)) {
            // this is a date col
            unorderedData.sort((a, b) => {
                /// @ts-ignore
                const aSplit = a[col].split('/');
                /// @ts-ignore
                const bSplit = b[col].split('/');
                const aJoin = aSplit[2] + '/' + aSplit[1] + '/' + aSplit[0];
                const bJoin = bSplit[2] + '/' + bSplit[1] + '/' + bSplit[0];
                if (dir === 'DSC') {
                    return bJoin > aJoin ? 1 : bJoin < aJoin ? -1 : 0;
                } else {
                    return aJoin > bJoin ? 1 : aJoin < bJoin ? -1 : 0;
                }
            });
        } else {
            // this is not a date col
            if (dir === 'DSC') {
                /// @ts-ignore
                unorderedData.sort((a, b) => (b[col] > a[col] ? 1 : b[col] < a[col] ? -1 : 0));
            } else {
                /// @ts-ignore
                unorderedData.sort((a, b) => (a[col] > b[col] ? 1 : a[col] < b[col] ? -1 : 0));
            }
        }
    }
    return unorderedData;
};
