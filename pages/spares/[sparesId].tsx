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

const SparesView = () => {
    const params = useRouter();
    const spareId = params.asPath.split('/')[2];
    const currentProperty = useSelector((state: RootState) => state.currentProperty.value.currentProperty);
    const { sparesDetails, recentJobs, loading, noData, error, reload } = useSparesDetails(spareId, currentProperty.toString());
    const [modal, setModal] = useState<{ view: boolean; type: string; payload: { id: number; name: string } }>({ view: false, type: '', payload: { id: 0, name: '' } });

    const spareConfig = {
        id: sparesDetails?.id,
        fields: [
            { label: 'Part Number', value: sparesDetails?.part_no },
            { label: 'Name', value: sparesDetails?.name },
            { label: 'Manufacturers Part Number', value: sparesDetails?.man_part_no },
            { label: 'Manufacturers Part Name', value: sparesDetails?.man_name },
            { label: 'Description', value: sparesDetails?.description },
            { label: 'Notes', value: sparesDetails?.notes },
            { label: 'Location', value: sparesDetails?.location },
            { label: 'Quantity Remaining', value: sparesDetails?.quant_remain },
            { label: 'Supplier', value: sparesDetails?.supplier },
            { label: 'Reorder Frequency', value: sparesDetails?.reorder_freq },
            { label: 'Reorder Amount', value: sparesDetails?.reorder_num },
            { label: 'Avg Usage per Month', value: sparesDetails?.avg_usage },
            { label: 'Cost per Item', value: sparesDetails?.cost },
            { label: 'Next Delivery Due', value: 'needs implimenting' },
            { label: 'Next Delivery Quantity Expected', value: 'needs implimenting' },
        ],
    };

    const jobTableConfig = {
        headers: [
            { id: 'id', name: 'Job Number', type: 'link', search: true, order: true },
            { id: 'asset_name', name: 'Asset', type: 'string', search: true, order: true },
            { id: 'type', name: 'Type', type: 'string', search: true, order: true },
            { id: 'title', name: 'Title', type: 'string', search: true, order: true },
            { id: 'created', name: 'Created', type: 'date', search: true, order: true },
            { id: 'completed', name: 'Completed', type: 'tick', search: true, order: true },
        ],
        searchable: false,
        linkColPrefix: '/jobs/',
    };

    const editStock = () => {
        setModal({ view: true, type: 'addEditSparesItem', payload: { id: parseInt(spareId), name: sparesDetails ? sparesDetails.name : '' } });
    };

    return (
        <>
            <FullPage>
                <Toolbar>
                    <Link href="/spares" className="tLink">
                        <FontAwesomeIcon icon={faArrowLeft} className="mr-1 w-3" />
                        <p>Return to all Spares</p>
                    </Link>
                    <button onClick={() => editStock()} className="tLink">
                        <FontAwesomeIcon icon={faPencil} className="mr-1 w-3" />
                        Edit Spares Item
                    </button>
                </Toolbar>
                {modal.view ? <ModalBase modalType={modal.type} payload={modal.payload} closeModal={() => [setModal({ view: false, type: '', payload: { id: 0, name: '' } }), reload()]} /> : null}
                <LoadingNoDataError loading={loading} error={error} noData={noData}>
                    <div className="w-full h-full flex flex-col pt-4">
                        <DetailsBox data={spareConfig} />
                        {recentJobs.length > 0 ? (
                            <>
                                <div className="mt-4 mb-1 ml-10">Recent Jobs</div>
                                <DataTable config={jobTableConfig} data={recentJobs} />
                            </>
                        ) : null}
                    </div>
                </LoadingNoDataError>
            </FullPage>
        </>
    );
};

export default SparesView;
