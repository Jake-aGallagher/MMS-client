import Link from 'next/link';
import { Dispatch, SetStateAction } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

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
    const permissions = useSelector((state: RootState) => state.permissions.value.permissions);
    const isAdmin = useSelector((state: RootState) => state.user.value.isAdmin);

    return (
        <>
            {props.grand_parent_id && props.grand_parent_id > 0 ? (
                <div className="w-full pl-4">
                    <div>Parent:</div>
                    <div className="flex flex-row outline-primary hover:outline-1 hover:outline py-1 rounded-md">
                        <div className="pl-8">{props.parent_name}</div>

                        <button className="btnBlue ml-auto mr-2 text-sm h-6 px-3">
                            <Link href={'/assets/' + props.parent_id}>View</Link>
                        </button>
                        {permissions.jobs?.manage || isAdmin ? (
                            <button onClick={() => props.setModal({ view: true, type: 'createJob', payload: { assetId: props.parent_id } })} className="btnBlue ml-3 mr-2 text-sm h-6 px-3">
                                Create Job
                            </button>
                        ) : null}
                        {permissions.schedules?.manage || isAdmin ? (
                            <button onClick={() => props.setModal({ view: true, type: 'createPm', payload: { assetId: props.parent_id } })} className="btnBlue ml-3 mr-2 text-sm h-6 px-3">
                                Create PM
                            </button>
                        ) : null}
                    </div>
                </div>
            ) : null}
        </>
    );
};

export default ParentDetails;
