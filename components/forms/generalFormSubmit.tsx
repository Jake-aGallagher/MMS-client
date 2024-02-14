interface Props {
    closeModal: () => void;
    submitLabel?: string;
    cancelOnly?: boolean;
}

const GeneralFormSubmit = (props: Props) => {
    return (
        <div className="flex flex-row justify-end items-center absolute bottom-0 h-16 left-0 w-full">
            <button className={`btnBlue h-8 px-4 w-32 ${props.cancelOnly && 'mr-4'}`} onClick={(e) => [e.preventDefault(), props.closeModal()]}>
                Cancel
            </button>
            {!props.cancelOnly &&
                (props.submitLabel == 'Delete' ? (
                    <button className="btnRed mx-4 h-8 px-4 w-32">{props.submitLabel}</button>
                ) : (
                    <button className="btnBlue mx-4 h-8 px-4 w-32">{props.submitLabel ? props.submitLabel : 'Submit'}</button>
                ))}
        </div>
    );
};

export default GeneralFormSubmit;
