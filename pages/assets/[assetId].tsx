import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faPencil } from '@fortawesome/free-solid-svg-icons';
import ModalBase from '../../components/modal/modal';
import SortableTable from '../../components/sortableTable/sortableTable';
import { useAssetDetails } from '../../components/assets/details/useAssetDetails';
import { useOpenBranches } from '../../components/assets/assetUtil/useOpenBranches';
import ParentDetails from '../../components/assets/details/parentDetails';
import { useAssetTree } from '../../components/assets/assetUtil/useAssetTree';
import LoadingNoDataError from '../../components/loading/loadingNoDataError';

const recentJobTableConfig = {
    headers: [
        { id: 'id', name: 'Job Number', type: 'link', search: true, order: true },
        { id: 'asset_name', name: 'Asset', type: 'string', search: true, order: true },
        { id: 'type', name: 'Type', type: 'string', search: true, order: true },
        { id: 'created', name: 'Created', type: 'date', search: true, order: true },
        { id: 'completed', name: 'Completed', type: 'completed', search: true, order: true },
    ],
    searchable: false,
    linkColPrefix: '/jobs/',
};

const AssetView = () => {
    const params = useRouter();
    const assetId = params.asPath.split('/')[2];
    const [viewModal, setViewModal] = useState(false);
    const [modalType, setModalType] = useState('');
    const [modalProps, setModalProps] = useState({});
    const { assetDetails, recentJobs, children, loading, noData, error, reload } = useAssetDetails(assetId, setModalProps);
    const { openBranches, toggle } = useOpenBranches();
    const { allRoots } = useAssetTree({type: 'details', assetTree: children, openBranches, toggle, setViewModal, setModalType, setModalProps});

    return (
        <>
            <div className="w-full h-full pt-12 overflow-x-auto overflow-y-auto bg-gray-100">
                <div className="fixed top-0 left-52 right-0 z-10 bg-gray-200 h-12 border-b-2 border-gray-300 flex flex-row justify-start items-center">
                    <Link href="/assets" className="ml-8 hover:text-blue-600 flex flex-row items-center">
                        <FontAwesomeIcon icon={faArrowLeft} className="mr-1 w-3" />
                        <p>Return to all Assets</p>
                    </Link>
                    <button className="ml-8 hover:text-blue-600 flex flex-row items-center" onClick={() => [setViewModal(true), setModalType('addEditAsset')]}>
                        <FontAwesomeIcon icon={faPencil} className="mr-1 w-3" />
                        Edit
                    </button>
                </div>
                {viewModal ? <ModalBase modalType={modalType} payload={modalProps} closeModal={() => [setViewModal(false), reload()]} /> : null}
                <LoadingNoDataError loading={loading} error={error} noData={noData}>
                    <>
                        <div key={assetDetails?.id} className="border-b-2 border-blue-600 p-5 w-full ">
                            <div className="mb-2">Name: {assetDetails?.name}</div>
                            <div>Notes: {assetDetails?.notes ? assetDetails.notes : 'None'}</div>
                        </div>
                        {recentJobs.length > 0 ? (
                            <div className="w-full overflow-x-auto flex flex-col items-center pb-10 border-b-2 border-blue-600 ">
                                <div className="my-4">5 Most recent jobs for Components of {assetDetails?.name}:</div>
                                <SortableTable config={recentJobTableConfig} data={recentJobs} />
                            </div>
                        ) : null}
                        {assetDetails ? <ParentDetails grand_parent_id={assetDetails.grand_parent_id} parent_id={assetDetails.parent_id} parent_name={assetDetails.parent_name} /> : null}
                        {allRoots ? (
                            <div className="border-b-2 border-blue-600  w-full p-5 my-5 pb-10">
                                Children:
                                {allRoots}
                            </div>
                        ) : null}
                    </>
                    </LoadingNoDataError>
            </div>
        </>
    );
};

export default AssetView;
