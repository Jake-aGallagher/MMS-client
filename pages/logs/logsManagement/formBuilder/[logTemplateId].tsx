import Link from 'next/link';
import FullPage from '../../../../components/page/fullPage';
import Toolbar from '../../../../components/page/toolbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import router from 'next/router';
import AddLogField from '../../../../components/logs/logsManagement/details/formBuilder/addLogField';
import { useState } from 'react';
import LoadingNoDataError from '../../../../components/loading/loadingNoDataError';
import ModalBase from '../../../../components/modal/modal';

const LogFormBuilder = () => {
    const logTemplateId = parseInt(router.asPath.split('/')[4]);
    const [modal, setModal] = useState<{ view: boolean; type: string; payload: { logId: number; fieldId: number; name: string } }>({
        view: false,
        type: '',
        payload: { logId: 0, fieldId: 0, name: '' },
    });

    const functionhere = () => {
        setModal({ view: true, type: 'addEditLogField', payload: { logId: logTemplateId, fieldId: 0, name: '' } });
    };

    // add reload() to modal close
    return (
        <>
            <FullPage>
                <Toolbar>
                    <Link href={`/logs/logsManagement/${logTemplateId}`} className="tLink">
                        <FontAwesomeIcon icon={faArrowLeft} className="mr-1 w-3" />
                        <p>Return to Log Template</p>
                    </Link>
                </Toolbar>
                <LoadingNoDataError loading={false} error={false}>
                    <>
                        {modal.view ? (
                            <ModalBase modalType={modal.type} payload={modal.payload} closeModal={() => [setModal({ view: false, type: '', payload: { logId: 0, fieldId: 0, name: '' } })]} />
                        ) : (
                            ''
                        )}
                        <AddLogField clickHandler={functionhere} />
                    </>
                </LoadingNoDataError>
            </FullPage>
        </>
    );
};

export default LogFormBuilder;
