interface Props {
    data: {
        id: number;
        type: string;
        name: string;
        required: boolean;
        guidance: string;
        sort_order: number;
    };
    editField: (fieldId: number, fieldName: string) => void;
    deleteField: (fieldId: number, fieldName: string) => void;
}

const FieldCard = (props: Props) => {
    return (
        <div className="w-full h-16 mt-5 rounded-lg border-1 border-solid border-accent flex flex-row">
            <div className="h-full w-16 flex flex-col justify-center items-center bg-secondary rounded-l-lg">
                <div>Order</div>
                <div>{props.data.sort_order}</div>
            </div>
            <div className="ml-4 flex flex-col justify-center">
                <div>Name: &nbsp;{props.data.name.length > 75 ? props.data.name.slice(0, 80) + '...' : props.data.name}</div>
                <div>Type: &nbsp;&nbsp;&nbsp;{props.data.type}</div>
            </div>
            <div className="ml-auto flex flex-row items-center">
                <button onClick={() => props.editField(props.data.id, props.data.name)} className="btnBlue w-16 h-8 mr-4">
                    Edit
                </button>
                <button onClick={() => props.deleteField(props.data.id, props.data.name)} className="btnRed w-16 h-8 mr-4">
                    Delete
                </button>
            </div>
        </div>
    );
};

export default FieldCard;
