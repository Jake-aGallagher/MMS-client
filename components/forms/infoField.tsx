interface Props {
    name: string;
}

const InfoField = (props: Props) => {
    return <div className="w-full mt-2 mb-4 px-4 text-sm border-l-1 border-r-1 border-primary border-solid">{props.name}</div>;
};

export default InfoField;
