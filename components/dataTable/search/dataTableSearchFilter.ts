export const dataTableSearchFilter = (rawData: { [key: string]: any }[], filtersObj: { [key: string]: string | number }, colMap: { [key: string]: string }) => {
    const filtersObjKeys = Object.keys(filtersObj);
    const filteredData = <{ [key: string]: any }[]>[];

    if (rawData.length > 0) {
        rawData.forEach((dataRow) => {
            let passes = true;
            filtersObjKeys.forEach((filter) => {
                if (
                    filtersObj[filter] != undefined &&
                    // @ts-ignore
                    ((typeof filtersObj[filter] == 'string' && filtersObj[filter].length > 0) || (typeof filtersObj[filter] == 'number' && !isNaN(filtersObj[filter])))
                ) {
                    if (dataRow[filter] == null) {
                        passes = false;
                    } else {
                        if (colMap[filter] == 'number' || colMap[filter] == 'link' || colMap[filter] == 'remaining_stock') {
                            if (dataRow[filter] != filtersObj[filter]) {
                                passes = false;
                            }
                        } else if (colMap[filter] == 'string') {
                            // @ts-ignore
                            if (!dataRow[filter].toLowerCase().includes(filtersObj[filter].toLowerCase())) {
                                passes = false;
                            }
                        } else if (colMap[filter] == 'date') {
                            const rowDate = dataRow[filter].split('/');
                            if ('20' + rowDate[2] + '-' + rowDate[1] + '-' + rowDate[0] != filtersObj[filter]) {
                                passes = false;
                            }
                        } else if (colMap[filter] == 'tick') {
                            // @ts-ignore

                            if (dataRow[filter] != parseInt(filtersObj[filter])) {
                                passes = false;
                            }
                        }
                    }
                }
            });
            if (passes) {
                filteredData.push(dataRow);
            }
        });
    } else {
        return rawData;
    }
    return filteredData;
};
