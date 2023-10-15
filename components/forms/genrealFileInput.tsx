import { SetStateAction, useRef } from 'react';

interface Props {
    files: Blob[];
    setFiles: (value: SetStateAction<Blob[]>) => void;
}

const GeneralFileInput = (props: Props) => {
    const hiddenFileInput = useRef<HTMLInputElement>(null);

    const addFile = (file: Blob) => {
        if (props.files && props.files.length > 0) {
            props.setFiles((prev) => [...prev, file]);
        } else {
            props.setFiles([file]);
        }
    };

    const handleClick = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        if (hiddenFileInput.current) {
            hiddenFileInput.current.click();
        }
    };

    const listFiles = props.files.map((file) => <div key={'file_' + file.name}>{file.name}</div>);

    return (
        <>
            <div className="flex flex-col mx-1 relative mb-2">
                <label htmlFor="fileAttachment" className="text-sm absolute ml-3 px-1 -top-1 z-10 bg-background rounded-b-md">
                    Attach Files
                </label>
                <button className={`h-10 pl-1 my-2 rounded-md w-40 border-1 border-primary border-solid hover:bg-primary hover:text-background transition-all`} onClick={(e) => handleClick(e)}>
                    Browse...
                </button>
                <input type="file" name="fileAttachment" id="fileAttachment" ref={hiddenFileInput} className="hidden" onChange={(e) => (e.target.files ? addFile(e.target.files[0]) : null)} />
            </div>
            {props.files.length > 0 ? (
                <div className="flex flex-col mx-1 relative mb-2">
                    <label htmlFor="fileAttachment" className="text-sm absolute ml-3 px-1 -top-1 z-10 bg-background rounded-b-md">
                        Attached
                    </label>
                    <div className={`pl-1 py-1 my-2 rounded-md w-full border-1 border-primary border-solid `}>{listFiles}</div>
                </div>
            ) : null}
        </>
    );
};
export default GeneralFileInput;
