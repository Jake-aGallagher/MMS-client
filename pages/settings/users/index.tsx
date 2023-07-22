import { useState } from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { RootState } from '../../../components/store/store';
import { useUsers } from '../../../components/settings/users/index/useUsers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import LoadingNoDataError from '../../../components/loading/loadingNoDataError';
import SortableTable from '../../../components/sortableTable/sortableTable';
import ModalBase from '../../../components/modal/modal';

const usersTableConfig = {
    headers: [
        { id: 'id', name: 'ID', type: 'string', search: true, order: true },
        { id: 'username', name: 'Username', type: 'string', search: true, order: true },
        { id: 'first_name', name: 'First Name', type: 'string', search: true, order: true },
        { id: 'last_name', name: 'Last Name', type: 'string', search: true, order: true },
        { id: 'edit', name: 'Edit', type: 'edit', search: false, order: false, functionIdPointer: 'id', functionNamePointer: 'username' },
        { id: 'delete', name: 'Delete', type: 'delete', search: false, order: false, functionIdPointer: 'id', functionNamePointer: 'username' },
    ],
    searchable: true,
};

const Users = () => {
    const currentProperty = useSelector((state: RootState) => state.currentProperty.value.currentProperty);
    const { users, loading, error, reload } = useUsers(currentProperty);
    const [viewModal, setViewModal] = useState(false);
    const [modalType, setModalType] = useState('');
    const [payload, setPayload] = useState<{ id: number; name: string }>({ id: 0, name: '' });

    const addEditUser = (id: number, name: string) => {
        setPayload({ id, name });
        setModalType('addEditUser');
        setViewModal(true);
    };

    const deleteUser = (id: number, name: string) => {
        setPayload({ id, name });
        setModalType('deleteUser');
        setViewModal(true);
    };

    return (
        <div className="w-full h-full pt-12 overflow-x-auto overflow-y-auto bg-gray-100">
            <div className="fixed top-0 left-52 right-0 z-10 bg-gray-200 h-12 border-b-2 border-gray-300 flex flex-row justify-start items-center">
                <Link href="/settings" className="ml-8 hover:text-blue-600 flex flex-row items-center">
                    <FontAwesomeIcon icon={faArrowLeft} className="mr-1 w-3" />
                    <p>Return to Settings</p>
                </Link>
                <button onClick={() => addEditUser(0, '')} className="ml-8 hover:text-blue-600 flex flex-row items-center">
                    <div className="text-2xl mr-1 pb-1">+</div>
                    Add User
                </button>
            </div>
            {viewModal ? <ModalBase modalType={modalType} payload={payload} closeModal={() => [setPayload({ id: 0, name: '' }), setViewModal(false), reload()]} /> : null}
            <LoadingNoDataError loading={loading} error={error}>
                <SortableTable config={usersTableConfig} data={users} editFunction={addEditUser} deleteFunction={deleteUser} />
            </LoadingNoDataError>
        </div>
    );
};

export default Users;
