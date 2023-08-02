export const columnTypeMap = (headers: { id: string; type: string }[]) => {
    const map: { [key: string]: string } = {};
    headers.forEach((item) => {
        map[item.id] = item.type;
    });
    return map;
};
