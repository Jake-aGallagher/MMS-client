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
        <div className="ml-10 mb-4 w-4/5 max-w-lg">
            {props.data.fields.map((item) => (
                <div key={item.label} className="flex flex-row h-6 mb-3 border-b-2 border-secondary">
                    <div className="w-1/2 pl-1">{item.label}: </div>
                    <div className="w-1/2 flex flex-row justify-center">{item.value}</div>
                </div>
            ))}
        </div>
    );
};

export default DetailsBox;
