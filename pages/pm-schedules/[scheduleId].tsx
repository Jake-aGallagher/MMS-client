import { useState } from 'react';
import { useRouter } from 'next/router';
import ModalBase from '../../components/modal/modal';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faPencil } from '@fortawesome/free-solid-svg-icons';
import LoadingNoDataError from '../../components/loading/loadingNoDataError';
import FullPage from '../../components/page/fullPage';
import Toolbar from '../../components/page/toolbar';
import DetailsBox from '../../components/detailsBox/detailsBox';
import AttachedFilesBox from '../../components/attachedFilesBox/attachedFilesBox';
import { useSelector } from 'react-redux';
import { RootState } from '../../components/store/store';
import { useScheduleDetails } from '../../components/pm-schedules/details/useScheduleDetails';
import DataTable from '../../components/dataTable/dataTable';

const ScheduleView = () => {
    const permissions = useSelector((state: RootState) => state.permissions.value.permissions);
    const isAdmin = useSelector((state: RootState) => state.user.value.isAdmin);
    const router = useRouter();
    if (!permissions.schedules?.view && !isAdmin) {
        router.push('/');
    }
    const currentProperty = useSelector((state: RootState) => state.currentProperty.value.currentProperty);
    const scheduleTemplateId = router.asPath.split('/')[2];
    const { scheduleDetails, schedulePMs, loading, noData, error, reload } = useScheduleDetails(currentProperty, scheduleTemplateId);
    const [viewModal, setViewModal] = useState(false);
    const [modalType, setModalType] = useState('');

    const scheduleDetailsConfig = {
        id: scheduleDetails?.id,
        title: 'Schedule Details',
        fields: [
            { label: 'ID', value: scheduleDetails?.id },
            { label: 'Title', value: scheduleDetails?.title },
            { label: 'Up to Date', value: scheduleDetails?.up_to_date == 1 ? <div>&#10004;</div> : <div>&#10060;</div> },
            { label: 'Asset', value: scheduleDetails?.asset },
            { label: 'Type', value: scheduleDetails?.type },
            { label: 'Description', value: scheduleDetails?.description },
            { label: 'Last Completed', value: scheduleDetails?.last_comp_date },
            { label: 'Next Due', value: scheduleDetails?.next_due_date },
            { label: 'Frequency', value: scheduleDetails?.frequency },
        ],
    };

    const scheduleJobsTableConfig = {
        headers: [
            { id: 'id', name: 'PM ID', type: 'link', search: true, order: true },
            { id: 'created', name: 'Date Created', type: 'string', search: true, order: true },
            { id: 'required_comp_date', name: 'Due Date', type: 'string', search: true, order: true },
            { id: 'completed', name: 'Completed', type: 'tick', search: true, order: true },
            { id: 'comp_date', name: 'completion Date', type: 'string', search: true, order: true },
            { id: 'logged_time', name: 'Total loged Time', type: 'number', search: true, order: true },
            { id: 'status', name: 'Current Status', type: 'string', search: true, order: true },
        ],
        searchable: true,
        reverseSort: true,
        linkColPrefix: `/pm-schedules/pm/`,
    };

    return (
        <>
            <FullPage>
                <Toolbar>
                    <Link href="/pm-schedules" className="tLink">
                        <FontAwesomeIcon icon={faArrowLeft} className="mr-1 w-3" />
                        <p>Return to PM Schedules</p>
                    </Link>
                    {permissions.schedules?.manage || isAdmin ? (
                        <button onClick={() => [setViewModal(true), setModalType('editSchedule')]} className="tLink">
                            <FontAwesomeIcon icon={faPencil} className="mr-1 w-3" />
                            Update Schedule
                        </button>
                    ) : null}
                </Toolbar>

                <LoadingNoDataError loading={loading} error={error} noData={noData}>
                    <>
                        {viewModal ? <ModalBase modalType={modalType} payload={scheduleDetails?.id} closeModal={() => [setViewModal(false), reload()]} /> : ''}

                        <div className="w-full h-full pt-4 flex flex-col">
                            <div className="flex flex-col xl:flex-row">
                                <DetailsBox data={scheduleDetailsConfig} />
                                <div className="flex flex-col w-full">
                                    <div className="w-full xl:pl-8">
                                        <AttachedFilesBox model="scheduleTemplate" id={parseInt(scheduleTemplateId)} />
                                    </div>
                                </div>
                            </div>
                            {schedulePMs.length > 0 ? <DataTable config={scheduleJobsTableConfig} data={schedulePMs} /> : null}
                        </div>
                    </>
                </LoadingNoDataError>
            </FullPage>
        </>
    );
};

export default ScheduleView;
