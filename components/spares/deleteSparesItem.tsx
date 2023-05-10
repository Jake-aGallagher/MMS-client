import axios from "axios";
import { SERVER_URL } from "../routing/addressAPI";

interface ModalProps {
    closeModal: () => void;
    payload: { id: number; name: string };
}

const DeleteSparesItem = (props: ModalProps) => {
    const submitHandler = async (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        try {
            const response = await axios.delete(`${SERVER_URL}/spares/spares-item`, {
                headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') },
                data: {
                    id: props.payload.id,
                },
            });
            if (response.data.deleted) {
                props.closeModal();
            } else {
                alert('There has been an issue deleting this Spares Item, please try again.');
            }
        } catch (err) {
            alert('There has been an issue deleting this Spares Item, please try again.');
        }
    };

    return (
        <div className="h-full w-full rounded-lg relative border-4 border-blue-200">
            <h1 className="w-full h-10 flex flex-row justify-center items-center font-bold bg-blue-200">
                Delete Spares Item
            </h1>
            <form className="flex flex-col justify-center items-center px-4 pt-2 overflow-y-auto h-[calc(100%-104px)]">
                <div className="px-10 font-semibold text-center mb-10">
                    Name: {props.payload.name}
                </div>
                <div className="px-10 font-semibold text-center mb-10">
                    You are about to delete this spares Item, please click delete to confirm.
                </div>

                <div className="flex flex-row justify-evenly items-center absolute bottom-0 h-16 left-0 w-full bg-blue-200">
                    <button className="rounded-3xl bg-blue-50 hover:bg-blue-600 h-8 px-4  border-2 border-blue-600 w-32" onClick={props.closeModal}>
                        Cancel
                    </button>
                    <button
                        className="rounded-3xl bg-blue-50 hover:bg-red-600 h-8 px-4 min-w-fit border-2 border-red-600 hover:border-transparent hover:text-white w-32"
                        onClick={(e) => submitHandler(e)}
                    >
                        Delete
                    </button>
                </div>
            </form>
        </div>
    );
};

export default DeleteSparesItem;
