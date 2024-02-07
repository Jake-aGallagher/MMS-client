import SignatureCanvas from 'react-signature-canvas';
import SignaturePad from 'react-signature-canvas';
import { SERVER_URL } from '../routing/addressAPI';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleDown, faFloppyDisk, faTrash } from '@fortawesome/free-solid-svg-icons';
import { deleteFileHandler } from '../attachedFilesBox/deleteFileHandler';
import { useEffect, useRef, useState } from 'react';
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';
import axios from 'axios';

interface Props<T extends FieldValues> {
    register: UseFormRegister<T>;
    setValue: (name: string, value: string) => void;
    formName: string;
    label: string;
    required: boolean;
    errors: FieldErrors;
    existingFiles: { id: string; encodedId: string; name: string }[];
    type: 'file' | 'image' | 'signature';
}

const SignatureInput = (props: Props<any>) => {
    const sigPadRef = useRef<SignaturePad | null>(null);
    const [fileList, setFileList] = useState<{ id: string; encodedId: string; name: string }[]>(props.existingFiles);

    useEffect(() => {
        props.setValue(props.formName, fileList.map((item) => item.id).join(','));
    }, [fileList]);

    const saveSig = async (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        if (sigPadRef.current && sigPadRef.current.isEmpty() === false) {
            const signature = sigPadRef.current.toDataURL('image/png');
            const response = await axios.post(`${SERVER_URL}/file/signature`, JSON.stringify({ signature }), {
                headers: { Authorisation: 'Bearer ' + localStorage.getItem('token'), 'Content-Type': 'application/json' },
            });
            const resFile = response.data;
            setFileList((prev) => [...prev, { id: resFile.fileId, encodedId: resFile.encodedId, name: resFile.fileName }]);
        }
    };

    const deleteFile = async (encodedId: string) => {
        deleteFileHandler(encodedId);
        setFileList((prev) => prev.filter((item) => item.encodedId !== encodedId));
    };

    return (
        <div className="flex flex-col w-full relative mb-2">
            <label htmlFor="fileAttachment" className="text-sm absolute ml-3 px-1 -top-1 z-10 bg-background rounded-b-md">
                {props.label}
            </label>
            <div className={`mb-4 mt-2 p-2 w-full rounded-md border-1 ${props.errors[props.formName] ? 'border-red border-2' : 'border-primary'} border-solid`}>
                <input id={props.formName} type={'text'} className={'hidden'} {...props.register(props.formName, { required: props.required })} />
                {fileList.length > 0 ? (
                    fileList.map((item) => (
                        <div key={item.encodedId} className="flex flex-row">
                            <img src={`${SERVER_URL}/getimage/${item.encodedId}`} alt="Uploaded Photo" className="w-full h-48 bg-secAlt mr-2 rounded-md" />
                            <a className="btnBlue w-12 h-8 flex flex-col justify-center items-center ml-auto mr-4" href={`${SERVER_URL}/getfile/${item.encodedId}`}>
                                <FontAwesomeIcon icon={faCircleDown} className="h-5 m-auto" />
                            </a>
                            <button onClick={() => deleteFile(item.encodedId)} className="btnRed w-12 h-8">
                                <FontAwesomeIcon icon={faTrash} className="h-5 m-auto" />
                            </button>
                        </div>
                    ))
                ) : (
                    <div className="pl-2 mb-2 flex flex-row">
                        <SignatureCanvas ref={sigPadRef} penColor="black" canvasProps={{ className: 'sigCanvas w-full h-48 bg-secAlt rounded-md' }} />
                        <button onClick={saveSig} className="btnBlue h-8 w-12 ml-2">
                            <FontAwesomeIcon icon={faFloppyDisk} className="h-5 m-auto" />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SignatureInput;
