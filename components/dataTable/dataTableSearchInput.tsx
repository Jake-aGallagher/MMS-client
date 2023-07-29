import { FieldValues, UseFormRegister } from 'react-hook-form/dist/types';

interface OptionNameString {
    optionNameString?: string;
}

interface Props<T extends FieldValues> extends OptionNameString {
    register: UseFormRegister<T>;
    label?: string;
    type: string;
    formName: string;
    selectOptions?: any[];
    extraClasses?: string;
}

const SearchFormInput = (props: Props<any>) => {
    const textType = ['string', 'linkWithName', 'url'];
    const numberType = ['link'];
    const dateType = ['date'];
    const selectType = [];
    const booleanType = ['completed', 'arrived'];

    return (
        <>
            {props.label ? <label htmlFor={props.formName}>{props.label}: </label> : null}

            {textType.includes(props.type) && (
                <input id={props.formName} type="text" className={`mb-2 rounded-sm bg-blue-200 ${props.extraClasses && props.extraClasses}`} {...props.register(props.formName)} />
            )}

            {numberType.includes(props.type) && (
                <input
                    id={props.formName}
                    type="number"
                    className={`mb-2 rounded-sm bg-blue-200 ${props.extraClasses && props.extraClasses}`}
                    {...props.register(props.formName, { valueAsNumber: true })}
                />
            )}

            {dateType.includes(props.type) && (
                <input id={props.formName} type="date" className={`mb-2 rounded-sm bg-blue-200 ${props.extraClasses && props.extraClasses}`} {...props.register(props.formName)} />
            )}

            {booleanType.includes(props.type) && (
                <select id={props.formName} className={`mb-2 rounded-sm bg-blue-200 ${props.extraClasses && props.extraClasses}`} {...props.register(props.formName)}>
                    <option value={''} key={props.formName + '_' + 'null'}></option>
                    <option value={0} key={props.formName + '_' + 'no'}>
                        No
                    </option>
                    <option value={1} key={props.formName + '_' + 'yes'}>
                        Yes
                    </option>
                </select>
            )}

            {/* {selectTypes.includes(props.type) && (
                <select id={props.formName} className={`mb-2 rounded-sm bg-blue-200 ${props.extraClasses && props.extraClasses}`} {...props.register(props.formName)}>
                    {props.selectOptions!.map((item) => (
                        <option value={item.id} key={props.formName + '_' + item.id}>
                            {item[props.optionNameString!]}
                        </option>
                    ))}
                </select>
            )} */}
        </>
    );
};

export default SearchFormInput;
