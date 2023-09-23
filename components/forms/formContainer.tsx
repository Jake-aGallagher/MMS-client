import { PropsWithChildren } from 'react';

const FormContainer = (props: PropsWithChildren) => {
    return <div className="h-full w-full rounded-md relative bg-background">{props.children}</div>;
};

export default FormContainer;
