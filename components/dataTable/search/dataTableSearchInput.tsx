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

const DataTableSearchInput = (props: Props<any>) => {
    const textType = ['string', 'linkWithName', 'url'];
    const numberType = ['number', 'link', 'remaining_stock'];
    const dateType = ['date'];
    const selectType = [];
    const booleanType = ['tick'];

    return (
        <div className='flex flex-col mx-1'>
            {props.label ? <label htmlFor={props.formName} className='font-semibold'>{props.label} </label> : null}

            {textType.includes(props.type) && (
                <input id={props.formName} type="text" className={`h-6 mb-2 rounded-md bg-background w-60 hover:border-2 border-primary border-solid ${props.extraClasses && props.extraClasses}`} {...props.register(props.formName)} />
            )}

            {numberType.includes(props.type) && (
                <input
                    id={props.formName}
                    type="number"
                    className={`h-6 mb-2 rounded-md bg-background w-60 hover:border-2 border-primary border-solid ${props.extraClasses && props.extraClasses}`}
                    {...props.register(props.formName, { valueAsNumber: true })}
                />
            )}

            {dateType.includes(props.type) && (
                <input id={props.formName} type="date" className={`h-6 mb-2 rounded-md min-w-[144px] bg-background hover:border-2 border-primary border-solid ${props.extraClasses && props.extraClasses}`} {...props.register(props.formName)} />
            )}

            {booleanType.includes(props.type) && (
                <select id={props.formName} className={`h-6 mb-2 rounded-md bg-background hover:border-2 border-primary border-solid ${props.extraClasses && props.extraClasses}`} {...props.register(props.formName)}>
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
                <select id={props.formName} className={`h-6 mb-2 rounded-md bg-background hover:border-2 border-primary border-solid ${props.extraClasses && props.extraClasses}`} {...props.register(props.formName)}>
                    {props.selectOptions!.map((item) => (
                        <option value={item.id} key={props.formName + '_' + item.id}>
                            {item[props.optionNameString!]}
                        </option>
                    ))}
                </select>
            )} */}
        </div>
    );
};

export default DataTableSearchInput;
