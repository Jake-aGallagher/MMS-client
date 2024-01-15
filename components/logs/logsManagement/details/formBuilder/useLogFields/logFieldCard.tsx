interface Props {
    data: {
        id: number;
        type: string;
        name: string;
        required: boolean;
        guidance: string;
        sort_order: number;
    };
}

const LogFieldCard = (props: Props) => {
    return (
        <div className="w-full h-16 mt-5 rounded-lg border-1 border-solid border-accent flex flex-row">
            <div className="h-full w-16 rounded-lg bg-secondary flex flex-col justify-center items-center">
                <div>Order</div>
                <div>{props.data.sort_order}</div>
            </div>
            <div className="ml-4 flex flex-col justify-center">
                <div>Name: &nbsp;{props.data.name}</div>
                <div>Type: &nbsp;&nbsp;&nbsp;{props.data.type}</div>
            </div>
            <div className="ml-auto flex flex-row items-center">
                <button className="btnBlue w-16 h-8 mr-4">Edit</button>
                <button className="btnRed w-16 h-8 mr-4">Delete</button>
            </div>
        </div>
    );
};

export default LogFieldCard;
