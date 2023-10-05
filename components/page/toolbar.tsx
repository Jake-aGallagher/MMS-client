import { PropsWithChildren } from 'react';

const Toolbar = (props: PropsWithChildren) => {
    return <div className="fixed top-0 left-0 right-0 pl-20 xl:pl-56 z-10 bg-secondary text-text h-12 flex flex-row justify-start items-center transition-all">{props.children}</div>;
};

export default Toolbar;
