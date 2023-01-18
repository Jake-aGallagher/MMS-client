import { useState } from 'react';
import ModalBase from '../../components/modal/modal';

const Settings = () => {
    const [viewModal, setViewModal] = useState(false);
    const [modalType, setmodalType] = useState('');

    return (
        <div className='h-screen'>
            {viewModal ? <ModalBase modalType={modalType} closeModal={() => setViewModal(false)} /> : null}
            <div>
                <button
                    onClick={() => [setViewModal(true), setmodalType('createUser')]}
                    className="rounded-3xl bg-blue-50 hover:bg-blue-600 h-8 px-4  border-2 border-blue-600 hover:border-transparent"
                >
                    Create User
                </button>
            </div>
        </div>
    );
};

export default Settings;
