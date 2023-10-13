import { store } from "../store/store";

export const GlobalDebug = (pageName: string, data: [string, any][]) => {
    const reduxState = store.getState();
    const debug = reduxState.debug.value.debug;
    if (debug) {
        console.log('---------------')
        console.log('Page: ', pageName)
        data.forEach((item) => {
            console.log('Item Name: ', item[0])
            console.log('Item Data: ', item[1])
        })
        console.log('---------------')
    }
}
