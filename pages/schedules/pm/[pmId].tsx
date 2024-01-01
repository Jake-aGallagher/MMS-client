import { useSelector } from 'react-redux';
import { useSchedulePMDetails } from '../../../components/schedules/pm/usePM';
import { RootState } from '../../../components/store/store';
import { useRouter } from 'next/router';
import FullPage from '../../../components/page/fullPage';
import Toolbar from '../../../components/page/toolbar';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faPencil } from '@fortawesome/free-solid-svg-icons';
import LoadingNoDataError from '../../../components/loading/loadingNoDataError';
import DetailsBox from '../../../components/detailsBox/detailsBox';
import AttachedFilesBox from '../../../components/attachedFilesBox/attachedFilesBox';
import DataTable from '../../../components/dataTable/dataTable';
import { useState } from 'react';
import ModalBase from '../../../components/modal/modal';

const PMDetails = () => {
    const permissions = useSelector((state: RootState) => state.permissions.value.permissions);
    const isAdmin = useSelector((state: RootState) => state.user.value.isAdmin);
    const router = useRouter();
    if (!permissions.schedules?.view && !isAdmin) {
        router.push('/');
    }
    
    const schedulePMId = router.asPath.split('/')[3];
    const [modal, setModal] = useState<{view: boolean; type: string; payload: number}>({view: false, type: '', payload: 0})
    const { schedulePMDetails, timeDetails, sparesDetails, loading, noData, error, reload } = useSchedulePMDetails(schedulePMId);

    const schedulePMConfig = {
        id: schedulePMDetails?.id,
        title: 'PM Details',
        fields: [
            { label: 'ID Number', value: schedulePMDetails?.id },
            { label: 'Title', value: schedulePMDetails?.title },
            { label: 'Asset Name', value: schedulePMDetails?.asset },
            { label: 'Type', value: schedulePMDetails?.type },
            { label: 'Description', value: schedulePMDetails?.description },
            { label: 'Notes', value: schedulePMDetails?.notes },
            { label: 'Created', value: schedulePMDetails?.created },
            { label: 'Required Completion Date', value: schedulePMDetails?.required_comp_date },
            { label: 'Status', value: schedulePMDetails?.status },
            { label: 'Completed', value: schedulePMDetails?.completed === 1 ? <div>&#10004;</div> : <div>&#10060;</div> },
            { label: 'Completion Date', value: schedulePMDetails?.comp_date },
            { label: 'Total Logged Time', value: schedulePMDetails?.logged_time },
        ],
    };

    const sparesTableConfig = {
        headers: [
            { id: 'id', name: 'Part Number', type: 'linkWithName', nameParam: 'part_no', search: true, order: true },
            { id: 'name', name: 'Name', type: 'string', search: true, order: true },
            { id: 'quantity', name: 'Quantity Used', type: 'number', search: true, order: true },
        ],
        searchable: false,
        linkColPrefix: '/spares/',
    };

    const timeTableConfig = {
        headers: [
            { id: 'first', name: 'First Name', type: 'string', search: true, order: true },
            { id: 'last', name: 'Surname', type: 'string', search: true, order: true },
            { id: 'time', name: 'Time Logged (Mins)', type: 'number', search: true, order: true },
        ],
        searchable: false,
    };

    let returnHref = '/schedules';
    if (schedulePMDetails) {
        returnHref = `/schedules/${schedulePMDetails.template_id}`;
    }

    return (
        <FullPage>
            <Toolbar>
                <Link href={returnHref} className="tLink">
                    <FontAwesomeIcon icon={faArrowLeft} className="mr-1 w-3" />
                    <p>Return to PM Schedule</p>
                </Link>
                {(permissions.schedules?.manage || isAdmin) && schedulePMDetails?.completed == 0 ? (
                    <button onClick={() => setModal({view: true, type: 'editPm', payload: parseInt(schedulePMId)})} className="tLink">
                        <FontAwesomeIcon icon={faPencil} className="mr-1 w-3" />
                        Update
                    </button>
                ) : null}
            </Toolbar>

            <LoadingNoDataError loading={loading} error={error} noData={noData}>
                <>
                    {modal.view ? <ModalBase modalType={modal.type} payload={modal.payload} closeModal={() => [setModal({view: false, type: '', payload: 0}), reload()]} /> : ''}
                    <div className="w-full h-full pt-4 flex flex-col">
                        <div className="flex flex-col xl:flex-row">
                            <DetailsBox data={schedulePMConfig} />
                            <div className="flex flex-col w-full">
                                <div className="w-full xl:pl-8">
                                    <AttachedFilesBox model="schedulePM" id={parseInt(schedulePMId)} />
                                </div>
                            </div>
                        </div>
                    </div>
                    {sparesDetails.length > 0 ? (
                        <>
                            <div className="mt-4 mb-1 ml-10">Spare Parts Used</div>
                            <DataTable config={sparesTableConfig} data={sparesDetails} />
                        </>
                    ) : null}
                    {timeDetails.length > 0 ? (
                        <>
                            <div className="mt-4 mb-1 ml-10">Logged Time</div>
                            <DataTable config={timeTableConfig} data={timeDetails} />
                        </>
                    ) : null}
                </>
            </LoadingNoDataError>
        </FullPage>
    );
};

export default PMDetails;
