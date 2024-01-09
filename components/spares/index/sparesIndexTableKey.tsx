import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faCircleInfo, faTriangleExclamation, faXmark } from '@fortawesome/free-solid-svg-icons';

const SparesTableIndexKey = () => {
    return (
        <div className="group relative">
            <div>
                <FontAwesomeIcon icon={faCircleInfo} className="ml-1 w-4 hover:text-accent transition-all" />
            </div>
            <div
                className={`
                absolute invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all
                flex flex-col gap-2 top-5 right-4 w-60 z-10 rounded-lg p-2
                border-1 border-solid bg-background border-accent 
            `}
            >
                <div className="flex flex-row items-center gap-2">
                    <FontAwesomeIcon icon={faCheck} className="w-6 text-green" />
                    <div className="text-sm">Greater than 1 Months supply</div>
                </div>
                <div className="flex flex-row items-center gap-2">
                    <FontAwesomeIcon icon={faTriangleExclamation} className="w-6 text-yellow" />
                    <div className="text-sm">Less than 1 Months supply</div>
                </div>
                <div className="flex flex-row items-center gap-2">
                    <FontAwesomeIcon icon={faXmark} className="w-6 text-red" />
                    <div className="text-sm">Nil stock remaining</div>
                </div>
            </div>
        </div>
    );
};

export default SparesTableIndexKey;
