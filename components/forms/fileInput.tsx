import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { SERVER_URL } from '../routing/addressAPI';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleDown, faPaperclip, faTrash } from '@fortawesome/free-solid-svg-icons';
import { deleteFileHandler } from '../attachedFilesBox/deleteFileHandler';
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';

interface Props<T extends FieldValues> {
    register: UseFormRegister<T>;
    setValue: (name: string, value: string) => void;
    formName: string;
    label: string;
    required: boolean;
    errors: FieldErrors;
    existingFiles: { id: string; encodedId: string; name: string }[];
    type: 'file' | 'image';
}

const FileInput = (props: Props<any>) => {
    const hiddenFileInput = useRef<HTMLInputElement>(null);
    const [fileList, setFileList] = useState<{ id: string; encodedId: string; name: string }[]>(props.existingFiles);

    useEffect(() => {
        props.setValue(props.formName, fileList.map((item) => item.id).join(','));
    }, [fileList]);

    const addFile = async (file: File) => {
        const formData = new FormData();
        formData.append('files', file);
        const response = await axios.post(`${SERVER_URL}/file/field-file`, formData, { headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') } });
        const resFile = response.data;
        setFileList((prev) => [...prev, { id: resFile.fileId, encodedId: resFile.encodedId, name: resFile.fileName }]);
    };

    const deleteFile = async (encodedId: string) => {
        deleteFileHandler(encodedId);
        setFileList((prev) => prev.filter((item) => item.encodedId !== encodedId));
    };

    const handleClick = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        if (hiddenFileInput.current) {
            hiddenFileInput.current.click();
        }
    };

    return (
        <div className="flex flex-col w-full relative mb-2 group">
            <label htmlFor="fileAttachment" className="text-sm absolute ml-3 px-1 -top-1 z-10 bg-background rounded-b-md group-hover:text-accent group-focus-within:text-accent transition-all">
                {props.label}
            </label>
            <div className={`mb-4 mt-2 p-2 w-full rounded-md border-1 ${props.errors[props.formName] ? 'border-red border-2' : 'border-primary'} border-solid`}>
                <div className="pl-2 mb-2 flex flex-row">
                    {props.type == 'file' && <div>Attached Files ({fileList.length})</div>}
                    {props.type != 'image' || (props.type == 'image' && fileList.length < 1) ? (
                        <>
                            <button onClick={(e) => handleClick(e)} className="ml-auto btnBlue w-28 h-8 flex flex-row justify-center items-center">
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
                    ) : (
                        <div className="w-full h-8"></div>
                    )}
                </div>

                <input id={props.formName} type={'text'} className={'hidden'} {...props.register(props.formName, { required: props.required })} />

                {props.type != 'image' &&
                    fileList.map((item) => (
                        <div key={'file_' + item.id} className="w-full mb-1 pl-2 flex flex-row hover:outline-dotted hover:outline-1 outline-accent rounded-md">
                            <a className="text-accent hover:text-primary" href={`${SERVER_URL}/getfile/${item.encodedId}`}>
                                {item.name}
                            </a>
                            <a className="btnBlue w-12 h-8 flex flex-col justify-center items-center ml-auto mr-4" href={`${SERVER_URL}/getfile/${item.encodedId}`}>
                                <FontAwesomeIcon icon={faCircleDown} className="h-5 m-auto" />
                            </a>
                            <button onClick={() => deleteFile(item.encodedId)} className="btnRed w-12 h-8">
                                <FontAwesomeIcon icon={faTrash} className="h-5 m-auto" />
                            </button>
                        </div>
                    ))}
                {props.type == 'image' &&
                    fileList.map((item) => (
                        <div key={'file_' + item.encodedId} className="flex flex-row">
                            <img src={`${SERVER_URL}/getimage/${item.encodedId}`} alt="Uploaded Photo" className="w-96" />
                            <a className="btnBlue w-12 h-8 flex flex-col justify-center items-center ml-auto mr-4" href={`${SERVER_URL}/getfile/${item.encodedId}`}>
                                <FontAwesomeIcon icon={faCircleDown} className="h-5 m-auto" />
                            </a>
                            <button onClick={() => deleteFile(item.encodedId)} className="btnRed w-12 h-8">
                                <FontAwesomeIcon icon={faTrash} className="h-5 m-auto" />
                            </button>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default FileInput;
