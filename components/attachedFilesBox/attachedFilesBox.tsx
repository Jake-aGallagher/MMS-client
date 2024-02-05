import { SERVER_URL } from '../routing/addressAPI';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { useRef } from 'react';
import { useGetFiles } from './useGetFiles';
import { addFileHandler } from './addFileHandler';
import { deleteFileHandler } from './deleteFileHandler';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleDown, faPaperclip, faTrash } from '@fortawesome/free-solid-svg-icons';

interface Props {
    model: string;
    id: number;
}

const AttachedFilesBox = (props: Props) => {
    const permissions = useSelector((state: RootState) => state.permissions.value.permissions);
    const isAdmin = useSelector((state: RootState) => state.user.value.isAdmin);
    const hiddenFileInput = useRef<HTMLInputElement>(null);
    const { files, reload } = useGetFiles(props.model, props.id);

    const handleAddClick = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        if (hiddenFileInput.current) {
            hiddenFileInput.current.click();
        }
    };

    const addFile = async (file: Blob) => {
        await addFileHandler(file, props.model, props.id, reload)
    };

    const deleteFile = async (id: string) => {
        await deleteFileHandler(id, reload)
    };

    return (
        <div className=" mb-4 mt-2 p-2 w-full bg-secondary rounded-xl shadow-xl">
            <div className="pl-2 mb-2 flex flex-row">
                <div>Attached Files ({files.length})</div>
                {permissions.files?.manage || isAdmin ? (
                    <>
                        <button onClick={(e) => handleAddClick(e)} className="ml-auto btnBlue w-28 h-8 flex flex-row justify-center items-center">
                            <FontAwesomeIcon icon={faPaperclip} className="h-5 m-auto" />
                        </button>
                        <input
                            type="file"
                            name="fileAttachment"
                            id="fileAttachment"
                            ref={hiddenFileInput}
                            className="hidden"
                            onChange={(e) => (e.target.files ? addFile(e.target.files[0]) : null)}
                        />
                    </>
                ) : null}
            </div>

            {files.map((item) => (
                <div key={'file_' + item.id} className="w-full mb-1 pl-2 flex flex-row hover:outline-dotted hover:outline-1 outline-accent rounded-md">
                    <a className="text-accent hover:text-primary" href={`${SERVER_URL}/getfile/${item.id}`}>
                        {item.name}
                    </a>
                    <a className="btnBlue w-12 h-8 flex flex-col justify-center items-center ml-auto mr-4" href={`${SERVER_URL}/getfile/${item.id}`}>
                        <FontAwesomeIcon icon={faCircleDown} className="h-5 m-auto" />
                    </a>
                    {permissions.files?.manage || isAdmin ? (
                        <button onClick={() => deleteFile(item.id)} className="btnRed w-12 h-8">
                            <FontAwesomeIcon icon={faTrash} className="h-5 m-auto" />
                        </button>
                    ) : null}
                </div>
            ))}
        </div>
    );
};

export default AttachedFilesBox;
