import Link from 'next/link';
import FullPage from '../../../../components/page/fullPage';
import Toolbar from '../../../../components/page/toolbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import router from 'next/router';
import AddLogField from '../../../../components/logs/logsManagement/details/formBuilder/addLogFieldButton';
import { useState } from 'react';
import LoadingNoDataError from '../../../../components/loading/loadingNoDataError';
import ModalBase from '../../../../components/modal/modal';
import { useLogFields } from '../../../../components/logs/logsManagement/details/formBuilder/useLogFields/useLogFields';
import LogFieldCard from '../../../../components/logs/logsManagement/details/formBuilder/useLogFields/logFieldCard';

interface AddEdit {
    logId: number;
    fieldId: number;
    name: string;
}

interface Delete {
    id: number;
    name: string;
    url: string;
}

const LogFormBuilder = () => {
    const logTemplateId = parseInt(router.asPath.split('/')[4]);
    const { logFields, loading, error, reload } = useLogFields(logTemplateId);
    const [modal, setModal] = useState<{ view: boolean; type: string; payload: AddEdit | Delete }>({
        view: false,
        type: '',
        payload: { logId: 0, fieldId: 0, name: '' },
    });

    const editLogField = (fieldId: number, fieldName: string) => {
        setModal({ view: true, type: 'addEditLogField', payload: { logId: logTemplateId, fieldId: fieldId, name: fieldName } });
    };

    const deleteLogField = (fieldId: number, fieldName: string) => {
        setModal({ view: true, type: 'deleteLogField', payload: { id: fieldId, name: fieldName, url: 'logs/log-fields' } });
    };

    const addLogField = () => {
        setModal({ view: true, type: 'addEditLogField', payload: { logId: logTemplateId, fieldId: 0, name: '' } });
    };

    const fields = logFields.map((field, i) => <LogFieldCard data={field} key={'logField_' + i} editLogField={editLogField} deleteLogField={deleteLogField} />);

    return (
        <>
            <FullPage>
                <Toolbar>
                    <Link href={`/logs/logsManagement/${logTemplateId}`} className="tLink">
                        <FontAwesomeIcon icon={faArrowLeft} className="mr-1 w-3" />
                        <p>Return to Log Template</p>
                    </Link>
                    <button className="tLink">
                        <FontAwesomeIcon icon={faMagnifyingGlass} className="mr-1 w-3" />
                        <p>Preview Form</p>
                    </button>
                </Toolbar>
                <LoadingNoDataError loading={loading} error={error}>
                    <>
                        {modal.view ? (
                            <ModalBase modalType={modal.type} payload={modal.payload} closeModal={() => [setModal({ view: false, type: '', payload: { logId: 0, fieldId: 0, name: '' } }), reload()]} />
                        ) : (
                            ''
                        )}
                        {fields}
                        <AddLogField clickHandler={addLogField} />
                    </>
                </LoadingNoDataError>
            </FullPage>
        </>
    );
};

export default LogFormBuilder;
