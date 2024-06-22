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
import AssetDetailsDefaultCharts from '../../components/charts/defaults/assetDetailsDefaultCharts';
import { useSelector } from 'react-redux';
import { RootState } from '../../components/store/store';
import AttachedFilesBox from '../../components/attachedFilesBox/attachedFilesBox';
import { DetailsConfig } from '../../commonTypes/DetailsConfig';
import { addToDetailsConfig } from '../../components/settings/customFields/addToDetailsConfig';

const AssetView = () => {
    const permissions = useSelector((state: RootState) => state.permissions.value.permissions);
    const isAdmin = useSelector((state: RootState) => state.user.value.isAdmin);
    const clientId = useSelector((state: RootState) => state.user.value.client);
    const router = useRouter();
    if (!permissions.assets?.view && !isAdmin) {
        router.push('/');
    }

    const assetId = router.asPath.split('/')[2];
    const [modal, setModal] = useState({ view: false, type: '', payload: {} });
    const { assetDetails, customFields, recentJobs, recentPms, children, jobsOfComponents6M, incompleteForAsset, loading, noData, error, reload } = useAssetDetails(assetId);
    const { openBranches, toggle } = useOpenBranches();
    const { allRoots } = useAssetTree({ type: 'details', assetTree: children, openBranches, toggle, setModal });

    let assetConfig: DetailsConfig = {
        id: assetDetails?.id,
        fields: [
            { label: 'Name', value: assetDetails?.name },
            { label: 'Revenue per Minute (£)', value: assetDetails?.revenue },
            { label: 'Notes', value: assetDetails?.notes },
        ],
    };
    assetConfig = addToDetailsConfig(clientId, assetConfig, customFields);

    const recentJobTableConfig = {
        headers: [
            { id: 'id', name: 'ID', type: 'link', search: true, order: true },
            { id: 'asset_name', name: 'Asset', type: 'string', search: true, order: true },
            { id: 'type', name: 'Type', type: 'string', search: true, order: true },
            { id: 'created', name: 'Created', type: 'date', search: true, order: true },
            { id: 'completed', name: 'Completed', type: 'tick', search: true, order: true },
        ],
        title: `5 Most recent Maintenance Tasks for Components of ${assetDetails?.name}`,
        searchable: false,
        linkColPrefix: '/maintenance/jobs/',
    };

    const recentPmTableConfig = {
        headers: [
            { id: 'id', name: 'ID', type: 'link', search: true, order: true },
            { id: 'asset_name', name: 'Asset', type: 'string', search: true, order: true },
            { id: 'type', name: 'Type', type: 'string', search: true, order: true },
            { id: 'title', name: 'Title', type: 'string', search: true, order: true },
            { id: 'required_comp_date', name: 'Due', type: 'date', search: true, order: true },
            { id: 'completed', name: 'Completed', type: 'tick', search: true, order: true },
            { id: 'frequency', name: 'Frequency', type: 'string', search: true, order: true },
        ],
        title: `5 Most recent PMs for Components of ${assetDetails?.name}`,
        searchable: false,
        linkColPrefix: '/pms/',
    };

    return (
        <>
            <FullPage>
                <Toolbar>
                    <Link href="/assets" className="tLink">
                        <FontAwesomeIcon icon={faArrowLeft} className="mr-1 w-3" />
                        <p>Return to all Assets</p>
                    </Link>
                    {permissions.assets?.manage || isAdmin ? (
                        <button className="tLink" onClick={() => setModal({ view: true, type: 'addEditAsset', payload: { id: assetDetails?.id, name: assetDetails?.name } })}>
                            <FontAwesomeIcon icon={faPencil} className="mr-1 w-3" />
                            Edit
                        </button>
                    ) : null}
                    {permissions.jobs?.manage || isAdmin ? (
                        <button onClick={() => setModal({ view: true, type: 'createJob', payload: { assetId } })} className="tLink">
                            <FontAwesomeIcon icon={faPencil} className="mr-1 w-3" />
                            Create Job
                        </button>
                    ) : null}
                    {permissions.schedules?.manage || isAdmin ? (
                        <button onClick={() => setModal({ view: true, type: 'createPm', payload: { assetId } })} className="tLink">
                            <FontAwesomeIcon icon={faPencil} className="mr-1 w-3" />
                            Create PM Schedule
                        </button>
                    ) : null}
                </Toolbar>
                {modal.view ? <ModalBase modalType={modal.type} payload={modal.payload} closeModal={() => [setModal({ view: false, type: '', payload: {} }), reload()]} /> : null}
                <LoadingNoDataError loading={loading} error={error} noData={noData}>
                    <div className="w-full h-full flex flex-col">
                        <div className="flex flex-col xl:flex-row">
                            <DetailsBox data={assetConfig} />
                            <div className="flex flex-col w-full">
                                <div className="w-full xl:pl-8">
                                    <AttachedFilesBox model="asset" id={parseInt(assetId)} />
                                </div>
                                <AssetDetailsDefaultCharts assetDetailsName={assetDetails?.name} jobsOfComponents6M={jobsOfComponents6M} incompleteForAsset={incompleteForAsset} />
                            </div>
                        </div>
                        {assetDetails || allRoots.length > 0 ? (
                            <div className='bg-secondary rounded-md shadow-md my-4 pb-5 pl-4'>
                                {assetDetails ? (
                                    <ParentDetails grand_parent_id={assetDetails.grand_parent_id} parent_id={assetDetails.parent_id} parent_name={assetDetails.parent_name} setModal={setModal} />
                                ) : null}
                                {allRoots.length > 0 ? (
                                    <div className="w-full mt-5">
                                        Children:
                                        {allRoots}
                                    </div>
                                ) : null}
                            </div>
                        ) : null}
                        {recentJobs.length > 0 ? (
                            <div className="mt-4 pb-4">
                                <DataTable config={recentJobTableConfig} data={recentJobs} />
                            </div>
                        ) : null}
                        {recentPms.length > 0 ? (
                            <div className="mt-4 pb-4">
                                <DataTable config={recentPmTableConfig} data={recentPms} />
                            </div>
                        ) : null}
                    </div>
                </LoadingNoDataError>
            </FullPage>
        </>
    );
};

export default AssetView;
