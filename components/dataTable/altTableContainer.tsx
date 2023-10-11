import { PropsWithChildren } from 'react';

const AltTableContainer = (props: PropsWithChildren) => {
    return (
        <div className="w-full relative">
            <div className="overflow-x-auto rounded-xl shadow-lg">
                <table className="w-full table-auto bg-secondary">{props.children}</table>
            </div>
        </div>
    );
};

export default AltTableContainer;
