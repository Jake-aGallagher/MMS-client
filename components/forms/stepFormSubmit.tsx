interface Props {
    closeModal: () => void;
    submitStep: boolean;
    next: () => void;
    back: () => void;
}

const StepFormSubmit = (props: Props) => {
    return (
        <div className="flex flex-row justify-end items-center absolute bottom-0 h-16 left-0 w-full">
            <button className={`btnBlue mx-4 h-8 px-4 w-32 `} onClick={(e) => [e.preventDefault(), props.closeModal()]}>
                Cancel
            </button>

            <button onClick={props.back} type="button" className="btnBlue h-8 px-4 w-32">
                Back
            </button>
            <button onClick={props.next} type="button" className="btnBlue mx-4 h-8 px-4 w-32">
                {props.submitStep ? 'Submit' : 'Next'}
            </button>
        </div>
    );
};

export default StepFormSubmit;
