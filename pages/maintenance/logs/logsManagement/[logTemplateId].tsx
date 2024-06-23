import Link from 'next/link';
import FullPage from '../../../../components/layout/page/fullPage';
import Toolbar from '../../../../components/layout/page/toolbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import LoadingNoDataError from '../../../../components/loading/loadingNoDataError';
import DetailsBox from '../../../../components/layout/detailsBox/detailsBox';
import AttachedFilesBox from '../../../../components/attachedFilesBox/attachedFilesBox';
import { useState } from 'react';
import { faArrowLeft, faPencil } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../components/store/store';
import { useRouter } from 'next/router';
import ModalBase from '../../../../components/layout/modal/modal';
import { useLogTemplateDetails } from '../../../../components/maintenance/logs/logsManagement/details/useLogTemplateDetails';
import DataTable from '../../../../components/dataTable/dataTable';

const LogTemplate = () => {
    const permissions = useSelector((state: RootState) => state.permissions.value.permissions);
    const isAdmin = useSelector((state: RootState) => state.user.value.isAdmin);
    const router = useRouter();
    if (!permissions.logsManagement?.view && !isAdmin) {
        router.push('/maintenance/logs');
    }
    const currentFacility = useSelector((state: RootState) => state.currentFacility.value.currentFacility);
    const logTemplateId = parseInt(router.asPath.split('/')[4]);

    const [modal, setModal] = useState<{ view: boolean; type: string; payload: { id: number; name: string } }>({ view: false, type: '', payload: { id: 0, name: '' } });
    const { templateDetails, logs, loading, noData, error, reload } = useLogTemplateDetails(currentFacility, logTemplateId);

    const scheduleDetailsConfig = {
        id: templateDetails?.id,
        title: 'Log Template Details',
        fields: [
            { label: 'ID', value: templateDetails?.id },
            { label: 'Title', value: templateDetails?.title },
            { label: 'Up to Date', value: templateDetails?.up_to_date == 1 ? <div>&#10004;</div> : <div>&#10060;</div> },
            { label: 'Description', value: templateDetails?.description },
            { label: 'Last Completed', value: templateDetails?.last_comp_date },
            { label: 'Next Due', value: templateDetails?.next_due_date },
            { label: 'Frequency', value: templateDetails?.frequency },
        ],
    };

    const logsTableConfig = {
        headers: [
            { id: 'id', name: 'Log ID', type: 'link', search: true, order: true },
            { id: 'created', name: 'Date Created', type: 'string', search: true, order: true },
            { id: 'required_comp_date', name: 'Due Date', type: 'string', search: true, order: true },
            { id: 'completed', name: 'Completed', type: 'tick', search: true, order: true },
            { id: 'comp_date', name: 'completion Date', type: 'string', search: true, order: true },
        ],
        searchable: true,
        reverseSort: true,
        linkColPrefix: '/maintenance/logs/',
    };

    return (
        <FullPage>
            <Toolbar>
                <Link href="/maintenance/logs/logsManagement" className="tLink">
                    <FontAwesomeIcon icon={faArrowLeft} className="mr-1 w-3" />
                    <p>Return to Log Templates</p>
                </Link>
                {permissions.logsManagement?.manage || isAdmin ? (
                    <>
                        <button onClick={() => setModal({ view: true, type: 'addEditLogTemplate', payload: { id: logTemplateId, name: templateDetails?.title || '' } })} className="tLink">
                            <FontAwesomeIcon icon={faPencil} className="mr-1 w-3" />
                            Edit Log Template
                        </button>
                        <Link href={`/maintenance/logs/logsManagement/formBuilder/${logTemplateId}`} className="tLink">
                            <FontAwesomeIcon icon={faPencil} className="mr-1 w-3" />
                            <p>Form Builder</p>
                        </Link>
                    </>
                ) : null}
            </Toolbar>

            {modal.view ? <ModalBase modalType={modal.type} payload={modal.payload} closeModal={() => [setModal({ view: false, type: '', payload: { id: 0, name: '' } }), reload()]} /> : ''}
            <LoadingNoDataError loading={loading} error={error} noData={noData}>
                <div className="w-full h-full pt-4 flex flex-col">
                    <div className="flex flex-col xl:flex-row">
                        <DetailsBox data={scheduleDetailsConfig} />
                        <div className="flex flex-col w-full">
                            <div className="w-full xl:pl-8">
                                <AttachedFilesBox model="logTemplate" id={logTemplateId} />
                            </div>
                        </div>
                    </div>
                    {logs.length > 0 ? <DataTable config={logsTableConfig} data={logs} /> : null}
                </div>
            </LoadingNoDataError>
        </FullPage>
    );
};

export default LogTemplate;
