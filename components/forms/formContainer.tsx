import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { PropsWithChildren } from 'react';

interface Props extends PropsWithChildren {
    closeModal?: () => void;
}

const FormContainer = (props: Props) => {
    return (
        <div className="h-full w-full rounded-md relative">
            {props.closeModal && (
                <button
                    className="group absolute w-6 h-6 border-solid border-1 border-red hover:bg-red right-2 top-2 rounded-md flex flex-row justify-center items-center transition-all"
                    onClick={(e) => [e.preventDefault(), props.closeModal ? props.closeModal() : null]}
                >
                    <FontAwesomeIcon icon={faTimes} className="text-red w-4 group-hover:text-background transition-all" />
                </button>
            )}

            {props.children}
        </div>
    );
};

export default FormContainer;
