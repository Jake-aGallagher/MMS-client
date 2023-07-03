interface Props {
    closeModal: () => void;
}

const GeneralFormSubmit = (props: Props) => {
    return (
        <div className="flex flex-row justify-evenly items-center absolute bottom-0 h-16 left-0 w-full bg-blue-200">
            <button
                className="rounded-3xl bg-blue-50 hover:bg-blue-600 h-8 px-4  border-2 border-blue-600 w-32"
                onClick={(e) => [e.preventDefault(), props.closeModal()]}
            >
                Cancel
            </button>
            <button className="rounded-3xl bg-blue-50 hover:bg-blue-600 h-8 px-4  border-2 border-blue-600 w-32">Submit</button>
        </div>
    );
};

export default GeneralFormSubmit;
