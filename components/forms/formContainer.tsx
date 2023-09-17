import { PropsWithChildren } from 'react';

const FormContainer = (props: PropsWithChildren) => {
    return <div className="h-full w-full rounded-md relative border-4 bg-background border-accent">{props.children}</div>;
};

export default FormContainer;
