import Link from 'next/link';
import { Dispatch, SetStateAction } from 'react';

interface Props {
    parent_id: number;
    parent_name: string;
    grand_parent_id: number;
    setModal: Dispatch<
        SetStateAction<{
            view: boolean;
            type: string;
            payload: {};
        }>
    >;
}

const ParentDetails = (props: Props) => {
    return (
        <>
            {props.grand_parent_id && props.grand_parent_id > 0 ? (
                <div className="w-full pl-10">
                    <div>Parent:</div>
                    <div className="flex flex-row outline-primary hover:outline-1 hover:outline py-1 rounded-md">
                        <div className="pl-8">{props.parent_name}</div>

                        <button className="btnBlue ml-auto text-sm h-6 px-3">
                            <Link href={'/assets/' + props.parent_id}>View Component Details</Link>
                        </button>
                        <button onClick={() => props.setModal({ view: true, type: 'createJob', payload: { assetId: props.parent_id } })} className="btnBlue ml-5 mr-2 text-sm h-6 px-3">
                            Create Job
                        </button>
                    </div>
                </div>
            ) : null}
        </>
    );
};

export default ParentDetails;
