import { SetStateAction } from 'react';

interface Props {
    files: Blob[];
    setFiles: (value: SetStateAction<Blob[]>) => void;
}

const GeneralFileInput = (props: Props) => {
    const addFile = (file: Blob) => {
        if (props.files && props.files.length > 0) {
            props.setFiles((prev) => [...prev, file]);
        } else {
            props.setFiles([file]);
        }
    };
    return (
        <>
            <label htmlFor="fileAttachment">Attach Files</label>
            <input type="file" name="fileAttachment" id="fileAttachment" onChange={(e) => (e.target.files ? addFile(e.target.files[0]) : null)} />
        </>
    );
};
export default GeneralFileInput;
