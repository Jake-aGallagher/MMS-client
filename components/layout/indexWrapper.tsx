import { PropsWithChildren } from "react";

const IndexWrapper = (props: PropsWithChildren) => {
    return (
        <div className="flex flex-row flex-wrap">
            {props.children}
        </div>
    );
};

export default IndexWrapper;