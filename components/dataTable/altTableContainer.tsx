import { PropsWithChildren } from 'react';

interface Props extends PropsWithChildren {
    className?: string
}

const AltTableContainer = (props: Props) => {
    return (
        <div className={`w-full relative ${props.className && props.className}`}>
            <div className="overflow-x-auto border-1 border-solid border-primary rounded-md">
                <table className="w-full table-auto">{props.children}</table>
            </div>
        </div>
    );
};

export default AltTableContainer;
