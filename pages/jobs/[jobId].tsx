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

const JobView = () => {
    const params = useRouter();
    const jobId = params.asPath.split('/')[2];
    const { jobDetails, files, timeDetails, sparesDetails, loading, noData, error, reload } = useJobDetails(jobId);
    const [viewModal, setViewModal] = useState(false);
    const [modalType, setModalType] = useState('');

    const jobDetailsConfig = {
        id: jobDetails?.id,
        fields: [
            { label: 'ID Number', value: jobDetails?.id },
            { label: 'Title', value: jobDetails?.title },
            { label: 'Completed', value: jobDetails?.completed == 1 ? <div>&#10004;</div> : <div>&#10060;</div> },
            { label: 'Property Name', value: jobDetails?.property_name },
            { label: 'Asset Name', value: jobDetails?.asset_name },
            { label: 'Type', value: jobDetails?.type },
            { label: 'Description', value: jobDetails?.description },
            { label: 'Notes', value: jobDetails?.notes },
            { label: 'Status', value: jobDetails?.status },
            { label: 'Urgency', value: jobDetails?.urgency },
            { label: 'Date Logged', value: jobDetails?.created },
            { label: 'Completion Deadline', value: jobDetails?.required_comp_date },
            { label: 'Completion Date', value: jobDetails?.comp_date },
            { label: 'Reported By', value: jobDetails?.reporter },
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

    return (
        <>
            <FullPage>
                <Toolbar>
                    <Link href="/jobs" className="tLink">
                        <FontAwesomeIcon icon={faArrowLeft} className="mr-1 w-3" />
                        <p>Return to all Jobs</p>
                    </Link>
                    <button onClick={() => [setViewModal(true), setModalType('updateJob')]} className="tLink">
                        {jobDetails == undefined ? null : jobDetails.completed == 1 ? (
                            <FontAwesomeIcon icon={faPencil} className="mr-1 w-3" />
                        ) : (
                            <FontAwesomeIcon icon={faCheck} className="mr-1 w-3" />
                        )}
                        {jobDetails == undefined ? null : jobDetails.completed == 1 ? 'Update' : 'Update & Complete'}
                    </button>
                </Toolbar>

                <LoadingNoDataError loading={loading} error={error} noData={noData}>
                    <>
                        {viewModal ? <ModalBase modalType={modalType} payload={jobDetails?.id} closeModal={() => [setViewModal(false), reload()]} /> : ''}

                        <div className="w-full h-full pt-4 flex flex-col">
                            <div className="flex flex-col xl:flex-row">
                                <DetailsBox data={jobDetailsConfig} />
                                <div className="flex flex-col w-full">
                                    {files.length > 0 ? (
                                        <div className="w-full xl:pl-8">
                                            <AttachedFilesBox files={files} reload={reload} />
                                        </div>
                                    ) : null}
                                    <JobDetailsDefaultCharts JobName={jobDetails?.title} timeDetails={timeDetails} />
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
                            <div className="pb-10"></div>
                        </div>
                    </>
                </LoadingNoDataError>
            </FullPage>
        </>
    );
};

export default JobView;
