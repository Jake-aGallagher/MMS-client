interface Props {
    data: {
        id?: number;
        title?: string;
        fields: {
            label: string;
            value?: any;
        }[];
    };
}

const DetailsBox = (props: Props) => {
    return (
        <div className=" mb-4 w-full max-w-3xl bg-secondary mt-2 p-2 rounded-xl shadow-xl">
            {props.data.title ? <div className="text-xl text-center mb-4">{props.data.title}</div> : null}
            {props.data.fields.map((item) => (
                <div key={item.label} className="flex flex-row mb-3 pb-1 border-b-1 border-text border-opacity-10">
                    <div className="w-1/4 pl-1">{item.label}: </div>
                    <div className="w-3/4 pl-4">{item.value}</div>
                </div>
            ))}
        </div>
    );
};

export default DetailsBox;
