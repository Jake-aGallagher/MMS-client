interface Props {
    data: {
        id?: number;
        fields: {
            label: string;
            value?: any;
        }[];
    };
}

const DetailsBox = (props: Props) => {
    return (
        <div className="ml-10 mb-4  max-w-3xl">
            {props.data.fields.map((item) => (
                <div key={item.label} className="flex flex-row mb-3 pb-1 border-b-1 border-secondary">
                    <div className="w-1/4 pl-1">{item.label}: </div>
                    <div className="w-3/4 pl-4">{item.value}</div>
                </div>
            ))}
        </div>
    );
};

export default DetailsBox;
