import { useSelector } from 'react-redux';
import { usePMDetails } from '../../components/pms/details/usePmDetails';
import { RootState } from '../../components/store/store';
import { useRouter } from 'next/router';
import FullPage from '../../components/page/fullPage';
import Toolbar from '../../components/page/toolbar';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faPencil } from '@fortawesome/free-solid-svg-icons';
import LoadingNoDataError from '../../components/loading/loadingNoDataError';
import DetailsBox from '../../components/detailsBox/detailsBox';
import AttachedFilesBox from '../../components/attachedFilesBox/attachedFilesBox';
import DataTable from '../../components/dataTable/dataTable';
import { useState } from 'react';
import ModalBase from '../../components/modal/modal';
import { addToDetailsConfig } from '../../components/settings/customFields/addToDetailsConfig';
import { DetailsConfig } from '../../commonTypes/DetailsConfig';

const PMDetails = () => {
    const permissions = useSelector((state: RootState) => state.permissions.value.permissions);
    const isAdmin = useSelector((state: RootState) => state.user.value.isAdmin);
    const router = useRouter();
    if (!permissions.schedules?.view && !isAdmin) {
        router.push('/');
    }

    const pmId = router.asPath.split('/')[2];
    const [modal, setModal] = useState<{ view: boolean; type: string; payload: number }>({ view: false, type: '', payload: 0 });
    const { pmDetails, customFields, timeDetails, sparesDetails, loading, noData, error, reload } = usePMDetails(pmId);

    let schedulePMConfig: DetailsConfig = {
        id: pmDetails?.id,
        title: 'PM Details',
        fields: [
            { label: 'ID', value: pmDetails?.id },
            { label: 'Title', value: pmDetails?.title },
            { label: 'Asset', value: pmDetails?.asset },
            { label: 'Type', value: pmDetails?.type },
            { label: 'Description', value: pmDetails?.description },
            { label: 'Notes', value: pmDetails?.notes },
            { label: 'Created', value: pmDetails?.created },
            { label: 'Required Completion Date', value: pmDetails?.required_comp_date },
            { label: 'Status', value: pmDetails?.status },
            { label: 'Completed', value: pmDetails?.completed === 1 ? <div>&#10004;</div> : <div>&#10060;</div> },
            { label: 'Completion Date', value: pmDetails?.comp_date },
            { label: 'Total Logged Time', value: pmDetails?.logged_time },
        ],
    };
    schedulePMConfig = addToDetailsConfig(schedulePMConfig, customFields);

    const sparesTableConfig = {
        headers: [
            { id: 'id', name: 'Part Number', type: 'linkWithName', nameParam: 'part_no', search: true, order: true },
            { id: 'name', name: 'Name', type: 'string', search: true, order: true },
            { id: 'quantity', name: 'Quantity Used', type: 'number', search: true, order: true },
        ],
        title: 'Spare Parts Used',
        searchable: false,
        linkColPrefix: '/spares/',
    };

    const timeTableConfig = {
        headers: [
            { id: 'first', name: 'First Name', type: 'string', search: true, order: true },
            { id: 'last', name: 'Surname', type: 'string', search: true, order: true },
            { id: 'time', name: 'Time Logged (Mins)', type: 'number', search: true, order: true },
        ],
        title: 'Time Logged',
        searchable: false,
    };

    return (
        <FullPage>
            <Toolbar>
                <Link href='/pms' className="tLink">
                    <FontAwesomeIcon icon={faArrowLeft} className="mr-1 w-3" />
                    <p>Return to PMs</p>
                </Link>
                {(permissions.schedules?.manage || isAdmin) && pmDetails?.completed == 0 ? (
                    <button onClick={() => setModal({ view: true, type: 'editPm', payload: parseInt(pmId) })} className="tLink">
                        <FontAwesomeIcon icon={faPencil} className="mr-1 w-3" />
                        Update PM
                    </button>
                ) : null}
            </Toolbar>

            {modal.view ? <ModalBase modalType={modal.type} payload={modal.payload} closeModal={() => [setModal({ view: false, type: '', payload: 0 }), reload()]} /> : ''}
            <LoadingNoDataError loading={loading} error={error} noData={noData}>
                <div className="w-full h-full pt-4 flex flex-col">
                    <div className="flex flex-col xl:flex-row">
                        <DetailsBox data={schedulePMConfig} />
                        <div className="flex flex-col w-full">
                            <div className="w-full xl:pl-8">
                                <AttachedFilesBox model="PM" id={parseInt(pmId)} />
                            </div>
                        </div>
                    </div>
                </div>
                {sparesDetails.length > 0 ? (
                    <div className="mt-4">
                        <DataTable config={sparesTableConfig} data={sparesDetails} />
                    </div>
                ) : null}
                {timeDetails.length > 0 ? (
                    <div className="mt-4">
                        <DataTable config={timeTableConfig} data={timeDetails} />
                    </div>
                ) : null}
            </LoadingNoDataError>
        </FullPage>
    );
};

export default PMDetails;
