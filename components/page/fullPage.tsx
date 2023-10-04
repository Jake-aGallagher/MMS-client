import { PropsWithChildren } from 'react';

const FullPage = (Props: PropsWithChildren) => {
    return <div className="w-full h-full pt-12 px-4 pb-4 overflow-x-auto overflow-y-auto bg-background">{Props.children}</div>;
};

export default FullPage;
