export const generateColour = (index: number) => {
    let colourIndex = index % 5;
    const colours = ['#4363d8', '#3cb44b', '#ffe119', '#f58231', '#e6194B'];
    return colours[colourIndex];
}