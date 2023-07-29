export const dataTableSearchFilter = (rawData: {}[], filtersArr: { formName: string; value: number | string; filterType: string }[]) => {
    const filteredData = <{}[]>[];

    rawData.forEach((dataRow) => {
        let passes = true;
        filtersArr.forEach((filter) => {
            if (filter.filterType == 'string' && typeof filter.value == 'string') {
                // @ts-ignore 
                if (!dataRow[filter.formName].toLowerCase().includes(filter.value.toLowerCase())) {
                    passes = false;
                }
            } else if (filter.filterType == 'number') {
                // @ts-ignore 
                if (dataRow[filter.formName] != filter.value) {
                    passes = false;
                }
            }
        });
        if (passes) {
            filteredData.push(dataRow);
        }
    });

    return filteredData;
};
