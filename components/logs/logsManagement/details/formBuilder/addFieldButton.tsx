import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface AddLogFieldProps {
    clickHandler: () => void;
}

const AddFieldButton: React.FC<AddLogFieldProps> = ({ clickHandler }) => {
    return (
        <div
            onClick={clickHandler}
            className={`
                w-full h-16 mt-5 rounded-lg
                border-1 border-dashed border-accent
                flex flex-row justify-center items-center
                transition-all hover:cursor-pointer hover:text-accent
            `}
        >
            <FontAwesomeIcon icon={faPlus} className="w-6" />
        </div>
    );
};

export default AddFieldButton;
