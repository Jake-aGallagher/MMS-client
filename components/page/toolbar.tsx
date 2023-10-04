import { PropsWithChildren } from 'react';

const Toolbar = (props: PropsWithChildren) => {
    return <div className="fixed top-0 left-52 right-0 z-10 bg-secondary text-text h-12 flex flex-row justify-start items-center">{props.children}</div>;
};

export default Toolbar;
