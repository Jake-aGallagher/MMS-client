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
import DetailsBox from '../../components/detailsBox/detailsBox';

const AssetView = () => {
    const params = useRouter();
    const assetId = params.asPath.split('/')[2];
    const [modal, setModal] = useState({ view: false, type: '', payload: {} });
    const { assetDetails, recentJobs, children, loading, noData, error, reload } = useAssetDetails(assetId);
    const { openBranches, toggle } = useOpenBranches();
    const { allRoots } = useAssetTree({ type: 'details', assetTree: children, openBranches, toggle, setModal });

    const assetConfig = {
        id: assetDetails?.id,
        fields: [
            { label: 'Name', value: assetDetails?.name },
            { label: 'Notes', value: assetDetails?.notes },
        ],
    };

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
                    <button className="tLink" onClick={() => setModal({ view: true, type: 'addEditAsset', payload: { id: assetDetails?.id, name: assetDetails?.name } })}>
                        <FontAwesomeIcon icon={faPencil} className="mr-1 w-3" />
                        Edit
                    </button>
                    <button onClick={() => setModal({ view: true, type: 'createJob', payload: { assetId } })} className="tLink">
                        <FontAwesomeIcon icon={faPencil} className="mr-1 w-3" />
                        Create Job
                    </button>
                </Toolbar>
                {modal.view ? <ModalBase modalType={modal.type} payload={modal.payload} closeModal={() => [setModal({ view: false, type: '', payload: {} }), reload()]} /> : null}
                <LoadingNoDataError loading={loading} error={error} noData={noData}>
                    <div className="w-full h-full flex flex-col pt-4">
                        <DetailsBox data={assetConfig} />

                        {assetDetails ? (
                            <ParentDetails grand_parent_id={assetDetails.grand_parent_id} parent_id={assetDetails.parent_id} parent_name={assetDetails.parent_name} setModal={setModal} />
                        ) : null}
                        {allRoots.length > 0 ? (
                            <div className="w-full my-5 pl-10">
                                Children:
                                {allRoots}
                            </div>
                        ) : null}

                        {recentJobs.length > 0 ? (
                            <>
                                <div className="mt-4 mb-1 ml-10">5 Most recent jobs for Components of {assetDetails?.name}:</div>
                                <DataTable config={recentJobTableConfig} data={recentJobs} />
                            </>
                        ) : null}
                    </div>
                </LoadingNoDataError>
            </FullPage>
        </>
    );
};

export default AssetView;
