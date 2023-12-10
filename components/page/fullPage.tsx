import { PropsWithChildren } from 'react';

const FullPage = (Props: PropsWithChildren) => {
    return <div className="w-full flex flex-col h-full pt-12 px-4 pb-4 overflow-x-auto overflow-y-auto">{Props.children}</div>;
};

export default FullPage;
