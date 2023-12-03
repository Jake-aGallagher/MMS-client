import axios from 'axios';
import { SERVER_URL } from '../routing/addressAPI';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { useEffect, useRef, useState } from 'react';

interface Props {
    model: string;
    id: number;
}

const AttachedFilesBox = (props: Props) => {
    const permissions = useSelector((state: RootState) => state.permissions.value.permissions);
    const isAdmin = useSelector((state: RootState) => state.user.value.isAdmin);
    const hiddenFileInput = useRef<HTMLInputElement>(null);
    const [files, setFiles] = useState<{ id: string; name: string }[]>([]);

    useEffect(() => {
        reload();
    }, []);

    const reload = () => {
        getfilesHandler();
    }

    const getfilesHandler = async () => {
        try {
            const response = await axios.get(`${SERVER_URL}/files/${props.model}/${props.id}`, {
                headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') },
            });
            if (response.data.files) {
                setFiles(response.data.files);
            }
        } catch (err) {
            alert('There has been an issue retrieving files, please try again.');
        }
    };

    const addFileHandler = async (file: Blob) => {
        const formData = new FormData();
        formData.append('files', file);
        formData.append(
            'data',
            JSON.stringify({
                model: props.model,
                id: props.id,
            })
        );
        const response = await axios.post(`${SERVER_URL}/file`, formData, { headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') } });
        if (response.data.created) {
            reload();
        } else {
            alert('There has been an issue attaching this file, please try again.');
        }
    };

    const handleAddClick = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        if (hiddenFileInput.current) {
            hiddenFileInput.current.click();
        }
    };

    const deleteFileHandler = async (id: string) => {
        await axios.delete(`${SERVER_URL}/file`, {
            headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') },
            data: {
                id: id,
            },
        });
        reload();
    };

    return (
        <div className=" mb-4 mt-2 p-2 w-full bg-secondary rounded-xl shadow-xl">
            <div className="pl-2 mb-2 flex flex-row">
                <div>Attached Files</div>
                {permissions.files?.manage || isAdmin ? (
                    <>
                        <button onClick={(e) => handleAddClick(e)} className="ml-auto btnBlue w-28 h-8 flex flex-row justify-center items-center">
                            + Attach File
                        </button>
                        <input
                            type="file"
                            name="fileAttachment"
                            id="fileAttachment"
                            ref={hiddenFileInput}
                            className="hidden"
                            onChange={(e) => (e.target.files ? addFileHandler(e.target.files[0]) : null)}
                        />
                    </>
                ) : null}
            </div>

            {files.map((item) => (
                <div key={'file_' + item.id} className="w-full mb-1 pl-2 flex flex-row hover:outline-dotted hover:outline-1 outline-accent rounded-md">
                    <a className="text-accent hover:text-primary" href={`${SERVER_URL}/getfile/${item.id}`}>
                        {item.name}
                    </a>
                    <a className="btnBlue w-24 h-8 flex flex-col justify-center items-center ml-auto mr-2" href={`${SERVER_URL}/getfile/${item.id}`}>
                        Download
                    </a>
                    {permissions.files?.manage || isAdmin ? (
                        <button onClick={() => deleteFileHandler(item.id)} className="btnRed w-16 h-8">
                            Delete
                        </button>
                    ) : null}
                </div>
            ))}
        </div>
    );
};

export default AttachedFilesBox;
