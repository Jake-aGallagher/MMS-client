interface Props {
    closeModal: () => void;
    submitLabel?: string;
}

const GeneralFormSubmit = (props: Props) => {
    return (
        <div className="flex flex-row justify-evenly items-center absolute bottom-0 h-16 left-0 w-full">
            <button className="rounded-md bg-background hover:bg-secondary h-8 px-4  border-2 border-accent hover:border-primary w-32 transition-all" onClick={(e) => [e.preventDefault(), props.closeModal()]}>
                Cancel
            </button>
            {props.submitLabel == 'Delete' ? (
                <button className="rounded-md bg-background hover:bg-red h-8 px-4 min-w-fit border-2 border-red hover:border-transparent hover:text-background w-32 transition-all">{props.submitLabel}</button>
            ) : (
                <button className="rounded-md bg-background hover:bg-secondary h-8 px-4  border-2 border-accent hover:border-primary w-32 transition-all">{props.submitLabel ? props.submitLabel : 'Submit'}</button>
            )}
        </div>
    );
};

export default GeneralFormSubmit;
