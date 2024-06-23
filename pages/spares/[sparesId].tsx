import { useState } from 'react';
import { useRouter } from 'next/router';
import ModalBase from '../../components/modal/modal';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faPencil } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { RootState } from '../../components/store/store';
import LoadingNoDataError from '../../components/loading/loadingNoDataError';
import { useSparesDetails } from '../../components/spares/details/useSparesDetails';
import DataTable from '../../components/dataTable/dataTable';
import FullPage from '../../components/page/fullPage';
import Toolbar from '../../components/page/toolbar';
import DetailsBox from '../../components/detailsBox/detailsBox';
import SparesDetailsDefaultCharts from '../../components/charts/defaults/sparesDetailsDefaultCharts';
import AttachedFilesBox from '../../components/attachedFilesBox/attachedFilesBox';
import { DetailsConfig } from '../../commonTypes/DetailsConfig';
import { addToDetailsConfig } from '../../components/settings/customFields/addToDetailsConfig';

const SparesView = () => {
    const permissions = useSelector((state: RootState) => state.permissions.value.permissions);
    const isAdmin = useSelector((state: RootState) => state.user.value.isAdmin);
    const clientId = useSelector((state: RootState) => state.user.value.client);
    const router = useRouter();
    if (!permissions.spares?.view && !isAdmin) {
        router.push('/');
    }

    const spareId = router.asPath.split('/')[2];
    const currentFacility = useSelector((state: RootState) => state.currentFacility.value.currentFacility);
    const { sparesDetails, customFields, deliveryInfo, recentJobs, recentPms, loading, used6M, noData, error, reload } = useSparesDetails(spareId, currentFacility.toString());
    const [modal, setModal] = useState<{ view: boolean; type: string; payload: { id: number; name: string } }>({ view: false, type: '', payload: { id: 0, name: '' } });

    let spareConfig: DetailsConfig = {
        id: sparesDetails?.id,
        fields: [
            { label: 'Part Number', value: sparesDetails?.part_no },
            { label: 'Part Name', value: sparesDetails?.name },
            { label: 'OEM Part Number', value: sparesDetails?.man_part_no },
            { label: 'OEM Part Name', value: sparesDetails?.man_name },
            { label: 'Description', value: sparesDetails?.description },
            { label: 'Notes', value: sparesDetails?.notes },
            { label: 'Location', value: sparesDetails?.location },
            { label: 'Quantity Remaining', value: sparesDetails?.quant_remain },
            { label: 'Supplier', value: sparesDetails?.supplier },
            { label: 'Reorder Frequency', value: sparesDetails?.reorder_freq },
            { label: 'Reorder Amount', value: sparesDetails?.reorder_num },
            { label: 'Avg Usage per Month', value: sparesDetails?.avg_usage },
            { label: 'Cost per Item (£)', value: sparesDetails?.cost },
            { label: 'Next Delivery Due', value: deliveryInfo?.due ? new Date(deliveryInfo?.due).toLocaleDateString() : 'Not on Order' },
            { label: 'Next Delivery Quantity Expected', value: deliveryInfo?.quantity },
        ],
    };
    spareConfig = addToDetailsConfig(clientId, spareConfig, customFields);

    const jobTableConfig = {
        headers: [
            { id: 'id', name: 'ID', type: 'link', search: true, order: true },
            { id: 'asset_name', name: 'Asset', type: 'string', search: true, order: true },
            { id: 'type', name: 'Type', type: 'string', search: true, order: true },
            { id: 'title', name: 'Title', type: 'string', search: true, order: true },
            { id: 'created', name: 'Created', type: 'date', search: true, order: true },
            { id: 'completed', name: 'Completed', type: 'tick', search: true, order: true },
        ],
        title: 'Recent Jobs',
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
        title: `5 Most recent PMs where ${sparesDetails?.name} was used`,
        searchable: false,
        linkColPrefix: '/maintenance/pms/',
    };

    const editStock = () => {
        setModal({ view: true, type: 'addEditSparesItem', payload: { id: parseInt(spareId), name: sparesDetails ? sparesDetails.name : '' } });
    };

    return (
        <FullPage>
            <Toolbar>
                <Link href="/spares" className="tLink">
                    <FontAwesomeIcon icon={faArrowLeft} className="mr-1 w-3" />
                    <p>Return to all Spares</p>
                </Link>
                {permissions.spares?.manage || isAdmin ? (
                    <button onClick={() => editStock()} className="tLink">
                        <FontAwesomeIcon icon={faPencil} className="mr-1 w-3" />
                        Edit Spares Item
                    </button>
                ) : null}
            </Toolbar>
            {modal.view ? <ModalBase modalType={modal.type} payload={modal.payload} closeModal={() => [setModal({ view: false, type: '', payload: { id: 0, name: '' } }), reload()]} /> : null}
            <LoadingNoDataError loading={loading} error={error} noData={noData}>
                <div className="flex flex-col">
                    <div className="flex flex-col xl:flex-row">
                        <DetailsBox data={spareConfig} />
                        <div className="flex flex-col w-full">
                            <div className="w-full xl:pl-8">
                                <AttachedFilesBox model="spare" id={parseInt(spareId)} />
                            </div>
                            <SparesDetailsDefaultCharts sparesDetailsName={sparesDetails?.name} used6M={used6M} />
                        </div>
                    </div>
                    {recentJobs.length > 0 ? (
                        <div className="mt-4 pb-4">
                            <DataTable config={jobTableConfig} data={recentJobs} />
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
    );
};

export default SparesView;
