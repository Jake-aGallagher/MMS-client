import axios from "axios";
import { SERVER_URL } from "../routing/addressAPI";

interface Props {
    files: {id: string; name: string}[];
    reload: () => void;
}

const AttachedFilesBox = (props: Props) => {
    const deleteFileHandler = async (id: string) => {
        await axios.delete(`${SERVER_URL}/file`, {
            headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') },
            data: {
                id: id,
            },
        });
        props.reload()
    }

    return (
        <div className=" mb-4 mt-2 p-2 w-full bg-secondary rounded-xl shadow-xl">
            <div className="text-center mb-2">Attached Files</div>
            {props.files.map(item => (
                <div key={'file_' + item.id} className="w-full mb-1 pl-2 flex flex-row hover:outline-dotted hover:outline-1 outline-accent rounded-md">
                    <a className="text-accent hover:text-primary" href={`${SERVER_URL}/getfile/${item.id}`}>{item.name}</a>
                    <a className="btnBlue w-24 h-8 flex flex-col justify-center items-center ml-auto mr-2" href={`${SERVER_URL}/getfile/${item.id}`}>Download</a>
                    <button onClick={() => deleteFileHandler(item.id)} className="btnRed w-16 h-8">Delete</button>
                </div>
            ))}
        </div>
    );
}

export default AttachedFilesBox; 