interface Props {
    closeModal: () => void;
}

const DialogClose = (props: Props) => {
    return (
        <div className="flex flex-row justify-evenly items-center absolute bottom-0 h-16 left-0 w-full">
            <button className="rounded-md bg-background hover:bg-secondary h-8 px-4  border-2 border-accent hover:border-primary w-32 transition-all" onClick={(e) => [e.preventDefault(), props.closeModal()]}>
                Close
            </button>
        </div>
    );
};

export default DialogClose;
