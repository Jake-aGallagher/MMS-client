export const sortTableData = (unorderedData: {[key:string]: any}[], col: string, dir: string, columnType: string) => {
    if (unorderedData.length > 0) {
        if (columnType == 'date') {
            unorderedData.sort((a, b) => {
                let aSplit = ['00','00','00'];
                let bSplit = ['00','00','00'];
                if (col in a == true && a[col] != null) {
                    aSplit = a[col].split('/');
                }
                if (col in b == true && b[col] != null) {
                    bSplit = b[col].split('/');
                }
                const aJoin = aSplit[2] + '/' + aSplit[1] + '/' + aSplit[0];
                const bJoin = bSplit[2] + '/' + bSplit[1] + '/' + bSplit[0];
                if (dir === 'DSC') {
                    return bJoin > aJoin ? 1 : bJoin < aJoin ? -1 : 0;
                } else {
                    return aJoin > bJoin ? 1 : aJoin < bJoin ? -1 : 0;
                }
            });
        } else {
            if (dir === 'DSC') {
                unorderedData.sort((a, b) => (b[col] > a[col] ? 1 : b[col] < a[col] ? -1 : 0));
            } else {
                unorderedData.sort((a, b) => (a[col] > b[col] ? 1 : a[col] < b[col] ? -1 : 0));
            }
        }
    } else {
        unorderedData = [];
    }
    return unorderedData;
};
