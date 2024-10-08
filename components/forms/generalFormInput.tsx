import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form/dist/types';

interface OptionNameString {
    optionNameString?: string;
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
    max?: number;
    step?: string;
    checked?: boolean;
}

const GeneralFormInput = (props: Props<any>) => {
    const singleTypes = ['text', 'number', 'date', 'time', 'password'];
    const areaTypes = ['textarea'];
    const selectTypes = ['select'];
    const multiSelectTypes = ['multi-select'];
    const checkboxTypes = ['checkbox'];

    return (
        <div className="flex flex-col relative mb-5 w-full group">
            {props.label && props.type != 'checkbox' ? (
                <label htmlFor={props.formName} className="text-sm absolute ml-3 px-1 -top-1 z-10 bg-background group-hover:text-accent group-focus-within:text-accent transition-all">
                    {props.label}
                </label>
            ) : null}

            {singleTypes.includes(props.type) && (
                <input
                    id={props.formName}
                    type={props.type}
                    min={props.min}
                    max={props.max}
                    step={props.step}
                    className={`h-10 pl-1 my-2 rounded-md w-full border-1 border-primary border-solid ${props.extraClasses && props.extraClasses} ${
                        props.errors[props.formName] && 'border-red border-2'
                    }`}
                    {...props.register(props.formName, { required: props.required, valueAsNumber: props.type == 'number' })}
                />
            )}

            {areaTypes.includes(props.type) && (
                <textarea
                    id={props.formName}
                    rows={props.rows}
                    className={`h-20 pl-1 pt-2 my-2 rounded-md w-full border-1 border-primary border-solid ${props.extraClasses && props.extraClasses} ${
                        props.errors[props.formName] && 'border-red border-2'
                    }`}
                    {...props.register(props.formName, { required: props.required })}
                />
            )}

            {selectTypes.includes(props.type) && (
                <select
                    id={props.formName}
                    className={`h-10 pl-1 my-2 rounded-md w-full bg-background border-1 border-primary border-solid ${props.extraClasses && props.extraClasses} ${
                        props.errors[props.formName] && 'border-red border-2'
                    }`}
                    {...props.register(props.formName, { required: props.required })}
                >
                    {props.selectOptions!.map((item) => (
                        <option value={item.id} key={props.formName + '_' + item.id}>
                            {item[props.optionNameString!]}
                        </option>
                    ))}
                </select>
            )}

            {multiSelectTypes.includes(props.type) && (
                <select
                    multiple
                    id={props.formName}
                    className={`h-32 pl-1 py-2 my-2 rounded-md w-full bg-background border-1 border-primary border-solid ${props.extraClasses && props.extraClasses} ${
                        props.errors[props.formName] && 'border-red border-2'
                    }`}
                    {...props.register(props.formName, { required: props.required })}
                >
                    {props.selectOptions!.map((item) => (
                        <option value={item.id} key={props.formName + '_' + item.id}>
                            {item[props.optionNameString!]}
                        </option>
                    ))}
                </select>
            )}

            {checkboxTypes.includes(props.type) && (
                <div
                    className={`rounded-md my-2 p-2 border-1 border-primary w-full flex flex-row ${props.extraClasses && props.extraClasses} ${props.errors[props.formName] && 'border-red border-2'}`}
                >
                    <label htmlFor={props.formName} className="w-full text-left select-none hover:cursor-pointer group-hover:text-accent group-focus:text-accent transition-all">
                        {props.label}
                    </label>
                    <input id={props.formName} type="checkbox" className="mx-2" {...props.register(props.formName, { required: props.required, value: props.checked })} />
                </div>
            )}
        </div>
    );
};

export default GeneralFormInput;
