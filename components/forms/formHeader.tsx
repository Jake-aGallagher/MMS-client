interface Props {
    label: string;
}

const FormHeader = (props: Props) => {
    return <h1 className="w-full h-10 flex flex-row justify-center items-center font-bold bg-blue-200">{props.label}</h1>;
};

export default FormHeader;
