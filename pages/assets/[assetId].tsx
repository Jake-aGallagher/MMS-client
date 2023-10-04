import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faPencil } from '@fortawesome/free-solid-svg-icons';
import ModalBase from '../../components/modal/modal';
import { useAssetDetails } from '../../components/assets/details/useAssetDetails';
import { useOpenBranches } from '../../components/assets/assetUtil/useOpenBranches';
import ParentDetails from '../../components/assets/details/parentDetails';
import { useAssetTree } from '../../components/assets/assetUtil/useAssetTree';
import LoadingNoDataError from '../../components/loading/loadingNoDataError';
import DataTable from '../../components/dataTable/dataTable';
import FullPage from '../../components/page/fullPage';
import Toolbar from '../../components/page/toolbar';

const AssetView = () => {
    const params = useRouter();
    const assetId = params.asPath.split('/')[2];
    const [viewModal, setViewModal] = useState(false);
    const [modalType, setModalType] = useState('');
    const [modalProps, setModalProps] = useState({});
    const { assetDetails, recentJobs, children, loading, noData, error, reload } = useAssetDetails(assetId, setModalProps);
    const { openBranches, toggle } = useOpenBranches();
    const { allRoots } = useAssetTree({ type: 'details', assetTree: children, openBranches, toggle, setViewModal, setModalType, setModalProps });

    const recentJobTableConfig = {
        headers: [
            { id: 'id', name: 'Job Number', type: 'link', search: true, order: true },
            { id: 'asset_name', name: 'Asset', type: 'string', search: true, order: true },
            { id: 'type', name: 'Type', type: 'string', search: true, order: true },
            { id: 'created', name: 'Created', type: 'date', search: true, order: true },
            { id: 'completed', name: 'Completed', type: 'tick', search: true, order: true },
        ],
        searchable: false,
        linkColPrefix: '/jobs/',
    };

    return (
        <>
            <FullPage>
                <Toolbar>
                    <Link href="/assets" className="tLink">
                        <FontAwesomeIcon icon={faArrowLeft} className="mr-1 w-3" />
                        <p>Return to all Assets</p>
                    </Link>
                    <button className="tLink" onClick={() => [setViewModal(true), setModalType('addEditAsset')]}>
                        <FontAwesomeIcon icon={faPencil} className="mr-1 w-3" />
                        Edit
                    </button>
                    <button
                        onClick={() => [setViewModal(true), setModalType('createJob'), setModalProps({ assetId })]}
                        className="tLink"
                    >
                        <FontAwesomeIcon icon={faPencil} className="mr-1 w-3" />
                        Create Job
                    </button>
                </Toolbar>
                {viewModal ? <ModalBase modalType={modalType} payload={modalProps} closeModal={() => [setViewModal(false), reload()]} /> : null}
                <LoadingNoDataError loading={loading} error={error} noData={noData}>
                    <>
                        <div key={assetDetails?.id} className="border-b-2 border-primary p-5 w-full ">
                            <div className="mb-2">Name: {assetDetails?.name}</div>
                            <div>Notes: {assetDetails?.notes ? assetDetails.notes : 'None'}</div>
                        </div>
                        {recentJobs.length > 0 ? (
                            <div className="w-full overflow-x-auto flex flex-col items-center pb-10 border-b-2 border-primary ">
                                <div className="my-4">5 Most recent jobs for Components of {assetDetails?.name}:</div>
                                <DataTable config={recentJobTableConfig} data={recentJobs} />
                            </div>
                        ) : null}
                        {assetDetails ? <ParentDetails grand_parent_id={assetDetails.grand_parent_id} parent_id={assetDetails.parent_id} parent_name={assetDetails.parent_name} /> : null}
                        {allRoots ? (
                            <div className="border-b-2 border-primary  w-full p-5 my-5 pb-10">
                                Children:
                                {allRoots}
                            </div>
                        ) : null}
                    </>
                </LoadingNoDataError>
            </FullPage>
        </>
    );
};

export default AssetView;
