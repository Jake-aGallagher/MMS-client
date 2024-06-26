import { useState } from 'react';
import FullPage from '../../layout/page/fullPage';
import Toolbar from '../../layout/page/toolbar';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import ModalBase from '../../layout/modal/modal';
import { useFieldList } from '../../../components/settings/customFields/fieldList/useFieldList';
import FieldCard from '../../../components/maintenance/logs/logsManagement/details/formBuilder/useLogFields/FieldCard';
import LoadingNoDataError from '../../../components/loading/loadingNoDataError';
import AddFieldButton from '../../../components/maintenance/logs/logsManagement/details/formBuilder/addFieldButton';

interface Props {
    type: 'facility' | 'asset' | 'spare' | 'job' | 'pm' | 'log';
    modelId?: number;
}

const FieldSetupBase = (props: Props) => {
    const { fields, loading, error, reload } = useFieldList(props.type, props.modelId);
    const [modal, setModal] = useState<{ view: boolean; type: string; payload: { id: number; name: string; model: string; modelId?: number } | { id: number; name: string; url: string } }>({
        view: false,
        type: '',
        payload: { id: 0, name: '', model: '' },
    });

    const fieldList = fields.map((field, i) => (
        <FieldCard
            data={field}
            key={'logField_' + i}
            editField={() => setModal({ view: true, type: 'addEditField', payload: { id: field.id, name: field.name, model: props.type, modelId: props.modelId } })}
            deleteField={() => setModal({ view: true, type: 'deleteField', payload: { id: field.id, name: field.name, url: 'fields' } })}
        />
    ));

    return (
        <>
            {['job', 'pm', 'log'].includes(props.type) ? (
                <>
                    {modal.view ? (
                        <ModalBase modalType={modal.type} payload={modal.payload} closeModal={() => [setModal({ view: false, type: '', payload: { id: 0, name: '', model: '' } }), reload()]} />
                    ) : (
                        ''
                    )}
                    <LoadingNoDataError loading={loading} error={error}>
                        <div className="w-full h-full">
                            {fieldList}
                            <AddFieldButton clickHandler={() => setModal({ view: true, type: 'addEditField', payload: { id: 0, name: '', model: props.type, modelId: props.modelId } })} />
                        </div>
                    </LoadingNoDataError>
                </>
            ) : (
                <FullPage>
                    <Toolbar>
                        <Link href="/settings" className="tLink">
                            <FontAwesomeIcon icon={faArrowLeft} className="mr-1 w-3" />
                            <p>Return to Settings</p>
                        </Link>
                    </Toolbar>
                    {modal.view ? (
                        <ModalBase modalType={modal.type} payload={modal.payload} closeModal={() => [setModal({ view: false, type: '', payload: { id: 0, name: '', model: '' } }), reload()]} />
                    ) : (
                        ''
                    )}
                    <LoadingNoDataError loading={loading} error={error}>
                        <div className="w-full h-full">
                            {fieldList}
                            <AddFieldButton clickHandler={() => setModal({ view: true, type: 'addEditField', payload: { id: 0, name: '', model: props.type } })} />
                        </div>
                    </LoadingNoDataError>
                </FullPage>
            )}
        </>
    );
};

export default FieldSetupBase;
