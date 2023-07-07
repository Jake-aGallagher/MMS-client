import { BaseSyntheticEvent, PropsWithChildren } from 'react';
import { SubmitErrorHandler, SubmitHandler } from 'react-hook-form';

interface Props {
    handleSubmit: (onValid: SubmitHandler<any>, onInvalid?: SubmitErrorHandler<any> | undefined) => (e?: BaseSyntheticEvent<any> | undefined) => Promise<any>;
    handleRegistration: (data: any) => Promise<void>;
}

const GeneralForm = (props: PropsWithChildren<Props>) => {
    return (
        <form onSubmit={props.handleSubmit(props.handleRegistration)} className="flex flex-col justify-start px-4 pt-2 overflow-y-auto h-[calc(100%-104px)]">
            {props.children}
        </form>
    );
};

export default GeneralForm;
