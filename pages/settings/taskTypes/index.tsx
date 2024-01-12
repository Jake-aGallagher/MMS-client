import { useState } from 'react';
import ModalBase from '../../../components/modal/modal';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import LoadingNoDataError from '../../../components/loading/loadingNoDataError';
import DataTable from '../../../components/dataTable/dataTable';
import FullPage from '../../../components/page/fullPage';
import Toolbar from '../../../components/page/toolbar';
import { useTaskTypes } from '../../../components/settings/taskTypes/index/useTaskTypes';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { RootState } from '../../../components/store/store';
import { DataTableConfig } from '../../../components/dataTable/types/configType';

const TaskTypes = () => {
    const permissions = useSelector((state: RootState) => state.permissions.value.permissions);
    const isAdmin = useSelector((state: RootState) => state.user.value.isAdmin);
    const router = useRouter();
    if (!permissions.enums?.view && !isAdmin) {
        router.push('/settings');
    }

    const { taskTypes, loading, error, reload } = useTaskTypes();
    const [modal, setModal] = useState<{ view: boolean; type: string; payload: { id: number; name: string } }>({ view: false, type: '', payload: { id: 0, name: '' } });

    const enumsTableConfig: DataTableConfig = {
        headers: [
            { id: 'id', name: 'ID', type: 'number', search: true, order: true },
            { id: 'value', name: 'Value', type: 'string', search: true, order: true },
            { id: 'list_priority', name: 'Order', type: 'number', search: true, order: true },
        ],
        searchable: true,
        modalType: 'TaskType',
        deleteUrl: 'tasktypes',
        idPointer: 'id',
        namePointer: 'value',
        reload: reload,
    };
    if (permissions.enums?.manage || isAdmin) {
        enumsTableConfig.headers.push({ id: 'tools', name: 'Tools', type: 'tools', search: false, order: false, functions: ['edit', 'delete'] });
    }

    const addTaskType = () => {
        setModal({ view: true, type: 'addEditTaskType', payload: { id: 0, name: '' } });
    };

    return (
        <FullPage>
            <Toolbar>
                <Link href="/settings" className="tLink">
                    <FontAwesomeIcon icon={faArrowLeft} className="mr-1 w-3" />
                    <p>Return to Settings</p>
                </Link>
                {permissions.enums?.manage || isAdmin ? (
                    <button onClick={addTaskType} className="tLink">
                        <div className="text-2xl mr-1 pb-1">+</div>
                        Add Task Type
                    </button>
                ) : null}
            </Toolbar>
            {modal.view ? <ModalBase modalType={modal.type} payload={{ ...modal.payload }} closeModal={() => [setModal({ view: false, type: '', payload: { id: 0, name: '' } }), reload()]} /> : null}
            <LoadingNoDataError loading={loading} error={error}>
                <DataTable config={enumsTableConfig} data={taskTypes} />
            </LoadingNoDataError>
        </FullPage>
    );
};

export default TaskTypes;
