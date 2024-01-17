import { useState } from 'react';
import { useRouter } from 'next/router';
import ModalBase from '../../components/modal/modal';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faCheck, faPencil } from '@fortawesome/free-solid-svg-icons';
import { useJobDetails } from '../../components/jobs/details/useJobDetails';
import LoadingNoDataError from '../../components/loading/loadingNoDataError';
import FullPage from '../../components/page/fullPage';
import Toolbar from '../../components/page/toolbar';
import DetailsBox from '../../components/detailsBox/detailsBox';
import DataTable from '../../components/dataTable/dataTable';
import JobDetailsDefaultCharts from '../../components/charts/defaults/jobDetailsDefaultCharts';
import AttachedFilesBox from '../../components/attachedFilesBox/attachedFilesBox';
import { useSelector } from 'react-redux';
import { RootState } from '../../components/store/store';

const JobView = () => {
    const permissions = useSelector((state: RootState) => state.permissions.value.permissions);
    const isAdmin = useSelector((state: RootState) => state.user.value.isAdmin);
    const router = useRouter();
    if (!permissions.jobs?.view && !isAdmin) {
        router.push('/');
    }

    const jobId = router.asPath.split('/')[2];
    const { jobDetails, files, timeDetails, sparesDetails, loading, noData, error, reload } = useJobDetails(jobId);
    const [viewModal, setViewModal] = useState(false);
    const [modalType, setModalType] = useState('');

    const jobDetailsConfig = {
        id: jobDetails?.id,
        fields: [
            { label: 'ID', value: jobDetails?.id },
            { label: 'Title', value: jobDetails?.title },
            { label: 'Completed', value: jobDetails?.completed == 1 ? <div>&#10004;</div> : <div>&#10060;</div> },
            { label: 'Facility', value: jobDetails?.property_name },
            { label: 'Asset', value: jobDetails?.asset_name },
            { label: 'Type', value: jobDetails?.type },
            { label: 'Description', value: jobDetails?.description },
            { label: 'Notes', value: jobDetails?.notes },
            { label: 'Status', value: jobDetails?.status },
            { label: 'Urgency', value: jobDetails?.urgency },
            { label: 'Date Logged', value: jobDetails?.created },
            { label: 'Completion Deadline', value: jobDetails?.required_comp_date },
            { label: 'Completion Date', value: jobDetails?.comp_date },
            { label: 'Reported By', value: jobDetails?.reported_by },
        ],
    };

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
                <Link href="/jobs" className="tLink">
                    <FontAwesomeIcon icon={faArrowLeft} className="mr-1 w-3" />
                    <p>Return to all Jobs</p>
                </Link>
                {permissions.jobs?.manage || isAdmin ? (
                    <button onClick={() => [setViewModal(true), setModalType('updateJob')]} className="tLink">
                        {jobDetails == undefined ? null : jobDetails.completed == 1 ? (
                            <FontAwesomeIcon icon={faPencil} className="mr-1 w-3" />
                        ) : (
                            <FontAwesomeIcon icon={faCheck} className="mr-1 w-3" />
                        )}
                        {jobDetails == undefined ? null : jobDetails.completed == 1 ? 'Update' : 'Update & Complete'}
                    </button>
                ) : null}
            </Toolbar>

            {viewModal ? <ModalBase modalType={modalType} payload={jobDetails?.id} closeModal={() => [setViewModal(false), reload()]} /> : ''}
            <LoadingNoDataError loading={loading} error={error} noData={noData}>
                <div className="w-full h-full pt-4 flex flex-col">
                    <div className="flex flex-col xl:flex-row">
                        <DetailsBox data={jobDetailsConfig} />
                        <div className="flex flex-col w-full">
                            <div className="w-full xl:pl-8">
                                <AttachedFilesBox model="job" id={parseInt(jobId)} />
                            </div>
                            <JobDetailsDefaultCharts JobName={jobDetails?.title} timeDetails={timeDetails} />
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
                    <div className="pb-10"></div>
                </div>
            </LoadingNoDataError>
        </FullPage>
    );
};

export default JobView;
