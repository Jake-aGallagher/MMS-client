interface Props {
    closeModal: () => void;
}

const DialogClose = (props: Props) => {
    return (
        <div className="flex flex-row justify-evenly items-center absolute bottom-0 h-16 left-0 w-full">
            <button className="btnBlue h-8 px-4 w-32" onClick={(e) => [e.preventDefault(), props.closeModal()]}>
                Close
            </button>
        </div>
    );
};

export default DialogClose;
