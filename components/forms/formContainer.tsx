import { PropsWithChildren } from 'react';

const FormContainer = (props: PropsWithChildren) => {
    return <div className="h-full w-full rounded-lg relative border-4 border-blue-200">{props.children}</div>;
};

export default FormContainer;
