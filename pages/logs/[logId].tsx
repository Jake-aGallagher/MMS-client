import { useSelector } from 'react-redux';
import { useLogDetails } from '../../components/logs/details/useLogDetails';
import { RootState } from '../../components/store/store';
import { useRouter } from 'next/router';
import { GlobalDebug } from '../../components/debug/globalDebug';
import FullPage from '../../components/page/fullPage';
import Toolbar from '../../components/page/toolbar';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faPencil } from '@fortawesome/free-solid-svg-icons';
import ModalBase from '../../components/modal/modal';
import LoadingNoDataError from '../../components/loading/loadingNoDataError';
import DetailsBox from '../../components/detailsBox/detailsBox';
import AttachedFilesBox from '../../components/attachedFilesBox/attachedFilesBox';
import { useState } from 'react';
import { SERVER_URL } from '../../components/routing/addressAPI';

const LogDetails = () => {
    const permissions = useSelector((state: RootState) => state.permissions.value.permissions);
    const isAdmin = useSelector((state: RootState) => state.user.value.isAdmin);
    const router = useRouter();
    const logId = parseInt(router.asPath.split('/')[2]);
    if (!permissions.logs?.view && !isAdmin) {
        router.push('/');
    }

    const { log, logFields, enumGroups, fileData, loading, error, reload } = useLogDetails({ logId });
    const [modal, setModal] = useState<{ view: boolean; type: string; payload: { id: number; name?: string } }>({ view: false, type: '', payload: { id: 0, name: '' } });
    GlobalDebug('Log Details', [
        ['Log', log],
        ['Log Fields', logFields],
    ]);

    const logConfig = {
        id: log?.id,
        title: 'Log Details',
        fields: [
            { label: 'ID', value: log?.id },
            { label: 'Title', value: log?.title },
            { label: 'Description', value: log?.description },
            { label: 'Created', value: log?.created },
            { label: 'Required Completion Date', value: log?.required_comp_date },
            { label: 'Completed', value: log?.completed === 1 ? <div>&#10004;</div> : <div>&#10060;</div> },
            { label: 'Completion Date', value: log?.comp_date },
            { label: 'Completed By', value: log?.completed_by },
        ],
    };

    const logFieldsConfig: { id: number | undefined; title: string; fields: { label: string; value: any }[] } = {
        id: log?.id,
        title: 'Log Fields',
        fields: [],
    };

    const prettyFieldValues = (fieldId: number, type: string, value: string, enumGroupId: number | null) => {
        if (value === 'undefined' || value === null || value === '') return '';
        switch (type) {
            case 'checkbox':
                return value ? 'Yes' : 'No';
            case 'date':
                return new Date(value).toLocaleDateString();
            case 'select':
                return enumGroups[enumGroupId!].find((item) => item.id == value)?.value || 'Enum Group Not Found';
            case 'file':
                const values = value.split(',');
                const fileList = values.map((item, i) => (
                    <li key={'file_list_' + fileData[fieldId][i].encodedId}>
                        <a className="text-accent hover:text-primary" href={`${SERVER_URL}/getfile/${fileData[fieldId][i].encodedId}`}>
                            {fileData[fieldId][i].name}
                        </a>
                    </li>
                ));
                return <ul>{fileList}</ul>;
            case 'image':
            case 'signature':
                return <img src={`${SERVER_URL}/getimage/${fileData[fieldId][0].encodedId}`} alt="Uploaded Photo" className="w-full" />
            default:
                return value;
        }
    };

    if (logFields.length > 0) {
        logFields?.forEach((field) => {
            if (field.type === 'info') return;
            logFieldsConfig.fields.push({ label: field.name, value: prettyFieldValues(field.id, field.type, field.value || '', field.enumGroupId) });
        });
    }

    return (
        <FullPage>
            <Toolbar>
                <Link href="/logs" className="tLink">
                    <FontAwesomeIcon icon={faArrowLeft} className="mr-1 w-3" />
                    <p>Return to all logs</p>
                </Link>
                {(permissions.logs?.manage || isAdmin) && log?.completed == 0 ? (
                    <button onClick={() => setModal({ view: true, type: 'updateLog', payload: { id: logId, name: log?.title } })} className="tLink">
                        <FontAwesomeIcon icon={faPencil} className="mr-1 w-3" />
                        Update Log
                    </button>
                ) : null}
            </Toolbar>

            {modal.view ? <ModalBase modalType={modal.type} payload={modal.payload} closeModal={() => [setModal({ view: false, type: '', payload: { id: 0, name: '' } }), reload()]} /> : ''}
            <LoadingNoDataError loading={loading} error={error}>
                <div className="w-full h-full pt-4 flex flex-col">
                    <div className="flex flex-col xl:flex-row">
                        <div className="w-full">
                            <DetailsBox data={logConfig} />
                            {logFields.length > 0 ? <DetailsBox data={logFieldsConfig} /> : null}
                        </div>
                        <div className="flex flex-col w-full">
                            <div className="w-full xl:pl-8">
                                <AttachedFilesBox model="log" id={logId} />
                            </div>
                        </div>
                    </div>
                    <div className="pb-10"></div>
                </div>
            </LoadingNoDataError>
        </FullPage>
    );
};

export default LogDetails;
