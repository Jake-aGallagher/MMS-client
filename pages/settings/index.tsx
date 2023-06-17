import { useState } from 'react';
import ModalBase from '../../components/modal/modal';
import Link from 'next/link';

const Settings = () => {
    const [viewModal, setViewModal] = useState(false);
    const [modalType, setmodalType] = useState('');

    return (
        <div className='h-screen'>
            {viewModal ? <ModalBase modalType={modalType} closeModal={() => setViewModal(false)} /> : null}
            <div>
                <button
                    onClick={() => [setViewModal(true), setmodalType('createUser')]}
                    className="ml-8 hover:text-blue-600 flex flex-row items-center"
                >
                    Create User
                </button>
                <Link href="/settings/enums" className="ml-8 hover:text-blue-600 flex flex-row items-center">
                    Manage Enums
                </Link>
            </div>
        </div>
    );
};

export default Settings;
