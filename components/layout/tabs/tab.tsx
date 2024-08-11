import { PropsWithChildren } from 'react';

interface Props extends PropsWithChildren {
    id: string;
    label: string;
}

const Tab = (props: Props) => {
    return props.children;
};

export default Tab;
