export const dataTableSearchFilter = (rawData: {}[], filtersObj: { [key: string]: string | number }, colMap: { [key: string]: string }) => {
    const filtersObjKeys = Object.keys(filtersObj);
    const filteredData = <{}[]>[];

    //console.log('raw: ', rawData);
    console.log('filters: ', filtersObj);
    //console.log('all map: ', colMap);

    rawData.forEach((dataRow) => {
        let passes = true;
        filtersObjKeys.forEach((filter) => {
            //console.log('filtertype: ', colMap[filter])
            if (
                filtersObj[filter] != undefined &&
                ((typeof filtersObj[filter] == 'string' && filtersObj[filter].length > 0) || (typeof filtersObj[filter] == 'number' && !isNaN(filtersObj[filter])))
            ) {
                if (dataRow[filter] == null) {
                    passes = false;
                } else {
                    if (colMap[filter] == 'number' || colMap[filter] == 'link') {
                        if (dataRow[filter] != filtersObj[filter]) {
                            passes = false;
                        }
                    } else if (colMap[filter] == 'string') {
                        if (!dataRow[filter].toLowerCase().includes(filtersObj[filter].toLowerCase())) {
                            passes = false;
                        }
                    } else if (colMap[filter] == 'date') {
                        const rowDate = dataRow[filter].split('/');
                        if ('20' + rowDate[2] + '-' + rowDate[1] + '-' + rowDate[0] != filtersObj[filter]) {
                            passes = false;
                        }
                    } else if (colMap[filter] == 'tick') {
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

    return filteredData;
};
