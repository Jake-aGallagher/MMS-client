import Link from 'next/link';
import FullPage from '../../../components/page/fullPage';
import Toolbar from '../../../components/page/toolbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import LoadingNoDataError from '../../../components/loading/loadingNoDataError';
import DetailsBox from '../../../components/detailsBox/detailsBox';
import AttachedFilesBox from '../../../components/attachedFilesBox/attachedFilesBox';
import { useState } from 'react';
import { faArrowLeft, faPencil } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { RootState } from '../../../components/store/store';
import { useRouter } from 'next/router';
import ModalBase from '../../../components/modal/modal';
import { useLogTemplateDetails } from '../../../components/logs/logsManagement/details/useLogTemplateDetails';

const LogTemplate = () => {
    const permissions = useSelector((state: RootState) => state.permissions.value.permissions);
    const isAdmin = useSelector((state: RootState) => state.user.value.isAdmin);
    const router = useRouter();
    if (!permissions.logsManagement?.view && !isAdmin) {
        router.push('/logs');
    }
    const currentProperty = useSelector((state: RootState) => state.currentProperty.value.currentProperty);
    const logTemplateId = parseInt(router.asPath.split('/')[2]);
    
    const [modal, setModal] = useState<{ view: boolean; type: string; payload: { id: number; name: string } }>({ view: false, type: '', payload: { id: 0, name: '' } });
    const { templateDetails, loading, noData, error, reload } = useLogTemplateDetails(currentProperty, logTemplateId);

    const scheduleDetailsConfig = {
        id: templateDetails?.id,
        title: 'Log Template Details',
        fields: [
            { label: 'ID', value: templateDetails?.id },
            { label: 'Title', value: templateDetails?.title },
            { label: 'Description', value: templateDetails?.description },
            { label: 'Frequency', value: templateDetails?.frequency },
        ],
    };

    return (
        <>
            <FullPage>
                <Toolbar>
                    <Link href="/logs/logsManagement" className="tLink">
                        <FontAwesomeIcon icon={faArrowLeft} className="mr-1 w-3" />
                        <p>Return to Log Templates</p>
                    </Link>
                    {permissions.logsManagement?.manage || isAdmin ? (
                        <button onClick={() => setModal({view: true, type: 'addEditLogTemplate', payload: {id: logTemplateId, name: templateDetails?.title || ''}})} className="tLink">
                            <FontAwesomeIcon icon={faPencil} className="mr-1 w-3" />
                            Edit Log Template
                        </button>
                    ) : null}
                </Toolbar>

                <LoadingNoDataError loading={loading} error={error} noData={noData}>
                    <>
                        {modal.view ? <ModalBase modalType={modal.type} payload={modal.payload} closeModal={() => [setModal({view:false,type:'',payload:{id:0,name:''}}), reload()]} /> : ''}

                        <div className="w-full h-full pt-4 flex flex-col">
                            <div className="flex flex-col xl:flex-row">
                                <DetailsBox data={scheduleDetailsConfig} />
                                <div className="flex flex-col w-full">
                                    <div className="w-full xl:pl-8">
                                        <AttachedFilesBox model="logTemplate" id={logTemplateId} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                </LoadingNoDataError>
            </FullPage>
        </>
    );
};

export default LogTemplate;
