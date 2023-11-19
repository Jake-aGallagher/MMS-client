import { useState } from 'react';
import ModalBase from '../../../components/modal/modal';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import LoadingNoDataError from '../../../components/loading/loadingNoDataError';
import DataTable from '../../../components/dataTable/dataTable';
import FullPage from '../../../components/page/fullPage';
import Toolbar from '../../../components/page/toolbar';
import { useJobTypes } from '../../../components/settings/jobTypes/index/useJobTypes';

const JobTypes = () => {
    const { jobTypes, loading, error, reload } = useJobTypes();
    const [modal, setModal] = useState<{ view: boolean; type: string; payload: { id: number; name: string } }>({ view: false, type: '', payload: { id: 0, name: '' } });

    const enumsTableConfig = {
        headers: [
            { id: 'id', name: 'ID', type: 'number', search: true, order: true },
            { id: 'value', name: 'Value', type: 'string', search: true, order: true },
            { id: 'list_priority', name: 'Order', type: 'number', search: true, order: true },
            { id: 'tools', name: 'Tools', type: 'tools', search: false, order: false, functions: ['edit', 'delete'] },
        ],
        searchable: true,
        modalType: 'JobType',
        deleteUrl: 'jobtypes',
        idPointer: 'id',
        namePointer: 'value',
        reload: reload,
    };

    const addJobType = () => {
        setModal({ view: true, type: 'addEditJobType', payload: { id: 0, name: '' } });
    };

    return (
        <FullPage>
            <Toolbar>
                <Link href="/settings" className="tLink">
                    <FontAwesomeIcon icon={faArrowLeft} className="mr-1 w-3" />
                    <p>Return to Settings</p>
                </Link>
                <button onClick={addJobType} className="tLink">
                    <div className="text-2xl mr-1 pb-1">+</div>
                    Add Job Type
                </button>
            </Toolbar>
            {modal.view ? (
                <ModalBase modalType={modal.type} payload={{ ...modal.payload }} closeModal={() => [setModal({ view: false, type: '', payload: { id: 0, name: '' } }), reload()]} />
            ) : null}
            <LoadingNoDataError loading={loading} error={error}>
                <DataTable config={enumsTableConfig} data={jobTypes} />
            </LoadingNoDataError>
        </FullPage>
    );
};

export default JobTypes;