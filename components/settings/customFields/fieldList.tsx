import AddFieldButton from "../../logs/logsManagement/details/formBuilder/addFieldButton";

interface Props {
    activeTab: string;
    addFieldHandler: () => void;
}

const FieldList = (props: Props) => {
    return (
        <div className="w-full h-full">
            <AddFieldButton clickHandler={props.addFieldHandler} />
        </div>
    )
}

export default FieldList;