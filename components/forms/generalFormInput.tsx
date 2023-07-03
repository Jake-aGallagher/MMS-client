import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form/dist/types';

interface OptionNameString {
    optionNameString?: string
}

interface Props<T extends FieldValues> extends OptionNameString {
    register: UseFormRegister<T>;
    label?: string;
    type: string;
    formName: string;
    errors: FieldErrors;
    required?: boolean;
    selectOptions?: any[];
    extraClasses?: string;
    rows?: number;
    min?: number;
}

const GeneralFormInput = (props: Props<any>) => {
    const singleTypes = ['text', 'number'];
    const areaTypes = ['textarea'];
    const selectTypes = ['select'];

    return (
        <>
            {props.label ? (<label htmlFor={props.formName}>{props.label}: </label>) : null}
            {singleTypes.includes(props.type) && (
                <input
                    id={props.formName}
                    type={props.type}
                    min={props.min}
                    className={`mb-2 rounded-sm bg-blue-200 ${props.extraClasses && props.extraClasses} ${props.errors[props.formName] && 'border-red-600 border-2'}`}
                    {...props.register(props.formName, { required: props.required })}
                />
            )}
            {areaTypes.includes(props.type) && (
                <textarea
                    id={props.formName}
                    rows={props.rows}
                    className={`mb-2 rounded-sm bg-blue-200 ${props.extraClasses && props.extraClasses} ${props.errors[props.formName] && 'border-red-600 border-2'}`}
                    {...props.register(props.formName, { required: props.required })}
                />
            )}
            {selectTypes.includes(props.type) && (
                <select
                    id={props.formName}
                    className={`mb-2 rounded-sm bg-blue-200 ${props.extraClasses && props.extraClasses} ${props.errors[props.formName] && 'border-red-600 border-2'}`}
                    {...props.register(props.formName, { required: props.required })}
                >
                    {props.selectOptions!.map((item) => (
                        <option value={item.id} key={props.formName + '_' + item.id}>
                            {item[props.optionNameString!]}
                        </option>
                    ))}
                </select>
            )}
            
        </>

    );
};

export default GeneralFormInput;
