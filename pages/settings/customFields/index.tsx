import { useState } from 'react';
import FullPage from '../../../components/page/fullPage';
import Toolbar from '../../../components/page/toolbar';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import ModelSelectBar from '../../../components/settings/customFields/modelSelectBar';
import FieldList from '../../../components/settings/customFields/fieldList';
import ModalBase from '../../../components/modal/modal';

const CustomFields = () => {
    const [activeTab, setActiveTab] = useState('property');
    const [modal, setModal] = useState<{ view: boolean; type: string; payload: { id: number; name: string; model: string } }>({ view: false, type: '', payload: { id: 0, name: '', model: '' } });

    const addFieldHandler = () => {
        // add reload to close modal
        setModal({ view: true, type: 'addEditField', payload: { id: 0, name: '', model: activeTab } });
    };

    return (
        <FullPage>
            <Toolbar>
                <Link href="/settings" className="tLink">
                    <FontAwesomeIcon icon={faArrowLeft} className="mr-1 w-3" />
                    <p>Return to Settings</p>
                </Link>
            </Toolbar>
            {modal.view ? <ModalBase modalType={modal.type} payload={modal.payload} closeModal={() => [setModal({ view: false, type: '', payload: { id: 0, name: '', model: '' } })]} /> : ''}
            <ModelSelectBar activeTab={activeTab} setActiveTab={setActiveTab} />
            <FieldList activeTab={activeTab} addFieldHandler={addFieldHandler} />
        </FullPage>
    );
};

export default CustomFields;
