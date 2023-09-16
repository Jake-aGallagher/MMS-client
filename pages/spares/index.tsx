import { useState } from 'react';
import { RootState } from '../../components/store/store';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import ModalBase from '../../components/modal/modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboard } from '@fortawesome/free-solid-svg-icons';
import { useSpares } from '../../components/spares/index/useSpares';
import SparesTableIndexKey from '../../components/spares/index/sparesIndexTableKey';
import LoadingNoDataError from '../../components/loading/loadingNoDataError';
import DataTable from '../../components/dataTable/dataTable';

interface PropsForModal {
    id: number;
    name: string;
    quantityRemaining?: number;
    url?: string;
}

const Spares = () => {
    const currentProperty = useSelector((state: RootState) => state.currentProperty.value.currentProperty);
    const { spares, loading, error, reload } = useSpares({ currentProperty });
    const [modal, setModal] = useState<{ view: boolean; type: string; payload: PropsForModal }>({ view: false, type: '', payload: { id: 0, name: '' } });

    const sparesTableConfig = {
        headers: [
            { id: 'id', name: 'Part Number', type: 'linkWithName', nameParam: 'part_no', search: true, order: true },
            { id: 'man_part_no', name: 'Manufacturers Part Number', type: 'string', search: true, order: true },
            { id: 'name', name: 'Name', type: 'string', search: true, order: true },
            { id: 'man_name', name: 'Manufacturers Part Name', type: 'string', search: true, order: true },
            { id: 'location', name: 'Location', type: 'string', search: true, order: true },
            { id: 'quant_remain', name: 'Remaining Stock', type: 'remaining_stock', search: true, order: true, avgUsagePointer: 'avg_usage' },
            { id: 'avg_usage', name: 'Usage (AVG per Month)', type: 'string', search: true, order: true },
            { id: 'tools', name: 'Tools', type: 'tools', search: false, order: false, functions: ['adjust_stock', 'edit', 'delete'] },
        ],
        searchable: true,
        linkColPrefix: '/spares/',
        modalType: 'SparesItem',
        idPointer: 'id',
        namePointer: 'name',
        reload: reload,
    };

    const addItem = () => {
        setModal({ view: true, type: 'addEditSparesItem', payload: { id: 0, name: '' } });
    };

    const editStock = (id: number, name: string, quantityRemaining: number) => {
        setModal({ view: true, type: 'adjustSparesStock', payload: { id, name, quantityRemaining } });
    };

    const deleteItem = (id: number, name: string) => {
        setModal({ view: true, type: 'deleteSparesItem', payload: { id, name, quantityRemaining: 0, url: 'spares/spares-item' } });
    };

    return (
        <>
            <div className="w-full h-full pt-12 overflow-x-auto overflow-y-auto bg-gray-100">
                <div className="fixed top-0 left-52 right-0 z-10 bg-gray-200 h-12 border-b-2 border-gray-300 flex flex-row justify-start items-center">
                    <Link href="/spares/sparesManagement" className="ml-8 hover:text-blue-600 flex flex-row items-center">
                        <FontAwesomeIcon icon={faClipboard} className="mr-1 w-3" />
                        Spares Management
                    </Link>
                    <button onClick={addItem} className="ml-8 hover:text-blue-600 flex flex-row items-center">
                        <div className="text-2xl mr-1 pb-1">+</div>
                        Add Spares Item
                    </button>
                </div>
                {modal.view ? <ModalBase modalType={modal.type} payload={modal.type} closeModal={() => [setModal({ view: false, type: '', payload: { id: 0, name: '' } }), reload()]} /> : null}
                <LoadingNoDataError loading={loading} error={error}>
                    <SparesTableIndexKey />
                    <DataTable config={sparesTableConfig} data={spares} />
                </LoadingNoDataError>
            </div>
        </>
    );
};

export default Spares;
