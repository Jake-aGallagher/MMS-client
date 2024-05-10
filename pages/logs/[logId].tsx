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
import { addToDetailsConfig } from '../../components/settings/customFields/addToDetailsConfig';
import { DetailsConfig } from '../../commonTypes/DetailsConfig';

const LogDetails = () => {
    const permissions = useSelector((state: RootState) => state.permissions.value.permissions);
    const isAdmin = useSelector((state: RootState) => state.user.value.isAdmin);
    const clientId = useSelector((state: RootState) => state.user.value.client);
    const router = useRouter();
    const logId = parseInt(router.asPath.split('/')[2]);
    if (!permissions.logs?.view && !isAdmin) {
        router.push('/');
    }

    const { log, customFields, loading, error, reload } = useLogDetails({ logId });
    const [modal, setModal] = useState<{ view: boolean; type: string; payload: { id: number; name?: string } }>({ view: false, type: '', payload: { id: 0, name: '' } });
    GlobalDebug('Log Details', [
        ['Log', log],
        ['Log Fields', customFields.fields],
    ]);

    let logConfig: DetailsConfig = {
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

    let logFieldsConfig: DetailsConfig = {
        id: log?.id,
        title: 'Log Fields',
        fields: [],
    };
    logFieldsConfig = addToDetailsConfig(clientId, logFieldsConfig, customFields);

    return (
        <FullPage>
            <Toolbar>
                <Link href="/logs" className="tLink">
                    <FontAwesomeIcon icon={faArrowLeft} className="mr-1 w-3" />
                    <p>Return to all logs</p>
                </Link>
                {(permissions.logs?.manage || isAdmin) && log?.completed != 1 ? (
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
                            {logFieldsConfig.fields.length > 0 ? <DetailsBox data={logFieldsConfig} /> : null}
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
