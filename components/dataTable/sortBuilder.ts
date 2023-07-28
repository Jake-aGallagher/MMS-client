interface ColDir {
    col: string;
    dir: string;
}

export const sortBuilder = (chosenSort: string, currentSort: ColDir) => {
    if (chosenSort === currentSort.col) {
        if (currentSort.dir === 'DSC') {
            return { col: currentSort.col, dir: 'ASC' };
        } else {
            return { col: currentSort.col, dir: 'DSC' }
        }
    } else {
        return { col: chosenSort, dir: 'DSC' }
    }
};
