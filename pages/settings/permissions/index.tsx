import { useState } from 'react';
import { useUserGroups } from '../../../components/settings/userGroups/index/useUserGroups';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ModalBase from '../../../components/modal/modal';
import LoadingNoDataError from '../../../components/loading/loadingNoDataError';
import SortableTable from '../../../components/sortableTable/sortableTable';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const Permissions = () => {
    const usersTableConfig = {
        headers: [
            { id: 'id', name: 'ID', type: 'string', search: true, order: true },
            { id: 'name', name: 'Name', type: 'string', search: true, order: true },
            { id: 'edit', name: 'Edit', type: 'edit', search: false, order: false, functionIdPointer: 'id', functionNamePointer: 'name' },
        ],
        searchable: true,
    };

    const { userGroups, loading, error, reload } = useUserGroups();
    const [viewModal, setViewModal] = useState(false);
    const [modalType, setModalType] = useState('');
    const [payload, setPayload] = useState<{ id: number; name: string }>({ id: 0, name: '' });

    const addEditUserGroup = (id: number, name: string) => {
        setPayload({ id, name });
        setModalType('addEditPermissions');
        setViewModal(true);
    };

    return (
        <div className="w-full h-full pt-12 overflow-x-auto overflow-y-auto bg-gray-100">
            <div className="fixed top-0 left-52 right-0 z-10 bg-gray-200 h-12 border-b-2 border-gray-300 flex flex-row justify-start items-center">
                <Link href="/settings" className="ml-8 hover:text-blue-600 flex flex-row items-center">
                    <FontAwesomeIcon icon={faArrowLeft} className="mr-1 w-3" />
                    <p>Return to Settings</p>
                </Link>
            </div>
            {viewModal ? <ModalBase modalType={modalType} payload={payload} closeModal={() => [setPayload({ id: 0, name: '' }), setViewModal(false), reload()]} /> : null}
            <LoadingNoDataError loading={loading} error={error}>
                <SortableTable config={usersTableConfig} data={userGroups} editFunction={addEditUserGroup} />
            </LoadingNoDataError>
        </div>
    );
};

export default Permissions;
