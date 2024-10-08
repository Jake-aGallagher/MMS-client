import { useState } from 'react';
import { useRouter } from 'next/router';
import ModalBase from '../../../components/layout/modal/modal';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faCheck, faPencil, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { useJobDetails } from '../../../components/maintenance/jobs/details/useJobDetails';
import LoadingNoDataError from '../../../components/loading/loadingNoDataError';
import FullPage from '../../../components/layout/page/fullPage';
import Toolbar from '../../../components/layout/page/toolbar';
import DetailsBox from '../../../components/layout/detailsBox/detailsBox';
import DataTable from '../../../components/dataTable/dataTable';
import JobDetailsDefaultCharts from '../../../components/charts/defaults/jobDetailsDefaultCharts';
import AttachedFilesBox from '../../../components/attachedFilesBox/attachedFilesBox';
import { useSelector } from 'react-redux';
import { RootState } from '../../../components/store/store';
import { DetailsConfig } from '../../../commonTypes/DetailsConfig';
import { addToDetailsConfig } from '../../../components/settings/customFields/addToDetailsConfig';
import AuditView from '../../../components/audits/auditView';

const JobView = () => {
    const permissions = useSelector((state: RootState) => state.permissions.value.permissions);
    const isAdmin = useSelector((state: RootState) => state.user.value.isAdmin);
    const clientId = useSelector((state: RootState) => state.user.value.client);
    const router = useRouter();
    if (!permissions.jobs?.view && !isAdmin) {
        router.push('/maintenance');
    }

    const jobId = router.asPath.split('/')[3];
    const { jobDetails, audit, auditFiles, customFields, timeDetails, sparesDetails, missingSpares, downtime, loading, noData, error, reload } = useJobDetails(jobId);
    const [modal, setModal] = useState<{ view: boolean; type: string; payload: { id: number; name: string; eventType?: string } }>({ view: false, type: '', payload: { id: 0, name: '' } });

    let jobDetailsConfig: DetailsConfig = {
        id: jobDetails?.id,
        fields: [
            { label: 'ID', value: jobDetails?.id },
            { label: 'Title', value: jobDetails?.title },
            { label: 'Completed', value: jobDetails?.completed == 1 ? <div>&#10004;</div> : <div>&#10060;</div> },
            { label: 'Facility', value: jobDetails?.facility_name },
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
    jobDetailsConfig = addToDetailsConfig(clientId, jobDetailsConfig, customFields);

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

    const missingSparesTableConfig = {
        headers: [
            { id: 'id', name: 'Part Number', type: 'linkWithName', nameParam: 'part_no', search: true, order: true },
            { id: 'name', name: 'Name', type: 'string', search: true, order: true },
        ],
        title: 'Missing Spares',
        searchable: false,
        linkColPrefix: '/spares/',
    };

    const downtimeTableConfig = {
        headers: [
            { id: 'id', name: 'ID', type: 'link', search: true, order: true },
            { id: 'name', name: 'Asset', type: 'string', search: true, order: true },
            { id: 'time', name: 'Time (Mins)', type: 'number', search: true, order: true },
        ],
        title: 'Downtime',
        searchable: false,
        linkColPrefix: '/maintenance/assets/',
    };

    return (
        <FullPage>
            <Toolbar>
                <Link href="/maintenance/jobs" className="tLink">
                    <FontAwesomeIcon icon={faArrowLeft} className="mr-1 w-3" />
                    <p>Return to all Jobs</p>
                </Link>
                {permissions.jobs?.manage || isAdmin ? (
                    <button onClick={() => setModal({ view: true, type: 'updateJob', payload: { id: jobDetails?.id || 0, name: '' } })} className="tLink">
                        {jobDetails == undefined ? null : jobDetails.completed == 1 ? (
                            <FontAwesomeIcon icon={faPencil} className="mr-1 w-3" />
                        ) : (
                            <FontAwesomeIcon icon={faCheck} className="mr-1 w-3" />
                        )}
                        {jobDetails == undefined ? null : jobDetails.completed == 1 ? 'Update' : 'Update & Complete'}
                    </button>
                ) : null}
                <button onClick={() => setModal({ view: true, type: 'audit', payload: {eventType: 'job', id: jobDetails?.id || 0, name: '' } })} className="tLink">
                    <FontAwesomeIcon icon={faPenToSquare} className="mr-1 w-3" />
                    Edit Audit
                </button>
            </Toolbar>

            {modal.view ? <ModalBase modalType={modal.type} payload={modal.payload} closeModal={() => [setModal({ view: false, type: '', payload: { id: 0, name: '' } }), reload()]} /> : ''}
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
                        <div className="mt-4 pb-4">
                            <DataTable config={sparesTableConfig} data={sparesDetails} />
                        </div>
                    ) : null}
                    {timeDetails.length > 0 ? (
                        <div className="mt-4 pb-4">
                            <DataTable config={timeTableConfig} data={timeDetails} />
                        </div>
                    ) : null}
                    {missingSpares.length > 0 ? (
                        <div className="mt-4 pb-4">
                            <DataTable config={missingSparesTableConfig} data={missingSpares} />
                        </div>
                    ) : null}
                    {downtime.length > 0 ? (
                        <div className="mt-4 pb-4">
                            <DataTable config={downtimeTableConfig} data={downtime} />
                        </div>
                    ) : null}
                    <div className="pb-10"></div>
                </div>
                <AuditView audit={audit} fileData={auditFiles} />
            </LoadingNoDataError>
        </FullPage>
    );
};

export default JobView;
