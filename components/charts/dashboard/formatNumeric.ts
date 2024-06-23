export const formatNumeric = (input: number) => {
    let numText = input.toString();
    let afterText = '';
    if (input > 1000000) {
        const num = Math.round((input / 1000000 + Number.EPSILON) * 100) / 100;
        numText = num.toString();
        afterText = 'm';
    } else if (input > 1000) {
        const num = Math.round((input / 1000 + Number.EPSILON) * 100) / 100;
        numText = num.toString();
        afterText = 'k';
    }
    return { numText, afterText };
};
