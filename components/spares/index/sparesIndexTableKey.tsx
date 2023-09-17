import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTriangleExclamation, faXmark } from '@fortawesome/free-solid-svg-icons';

const SparesTableIndexKey = () => {
    return (
        <div className="flex flex-row justify-end ml-8 my-4 items-center">
            <div className="flex flex-row items-center border-2 border-accent rounded-md p-1 mr-4">
                <div>
                    <FontAwesomeIcon icon={faCheck} className="mr-1 w-5 text-green" />
                </div>
                <div className="mr-5 ml-1 text-sm">Greater than 1 Months supply</div>
                <div>
                    <FontAwesomeIcon icon={faTriangleExclamation} className="mr-1 w-5 text-yellow" />
                </div>
                <div className="mr-5 ml-1 text-sm">Less than 1 Months supply</div>
                <div>
                    <FontAwesomeIcon icon={faXmark} className="mr-1 w-5 text-red" />
                </div>
                <div className="mr-5 ml-1 text-sm">Nil stock remaining</div>
            </div>
        </div>
    );
};

export default SparesTableIndexKey;
