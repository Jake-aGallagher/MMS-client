import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { PropsWithChildren } from 'react';

interface Props extends PropsWithChildren {
    label: string;
    icon?: IconDefinition
}

const IndexCardLayout = (props: Props) => {
    return (
        <div className="rounded-md shadow-md bg-secondary mt-5 mx-2 w-80 pb-4 pt-2 px-4">
            <div className='text-xl flex flex-row'>
                {props.icon && <FontAwesomeIcon icon={props.icon} className={`mr-2 w-3`} />}
                {props.label}
            </div>
            {props.children}
        </div>
    );
};

export default IndexCardLayout;
