import { PropsWithChildren } from 'react';

interface Props extends PropsWithChildren {
    label: string;
}

const IndexCardLayout = (props: Props) => {
    return (
        <div className="rounded-lg shadow-lg bg-secondary my-5 mx-2 w-96 pb-4 pt-2 h-fit">
            <div className='text-center text-2xl'>{props.label}</div>
            {props.children}
        </div>
    );
};

export default IndexCardLayout;
