import { BaseSyntheticEvent, PropsWithChildren } from 'react';
import { SubmitErrorHandler, SubmitHandler } from 'react-hook-form';

interface Props {
    handleSubmit: (onValid: SubmitHandler<any>, onInvalid?: SubmitErrorHandler<any> | undefined) => (e?: BaseSyntheticEvent<any> | undefined) => Promise<any>;
    handleRegistration: (data: any) => Promise<void>;
}

const DataTableSeachForm = (props: PropsWithChildren<Props>) => {
    return (
        <form onSubmit={props.handleSubmit(props.handleRegistration)} className="w-full">
            {props.children}
        </form>
    );
};

export default DataTableSeachForm;
