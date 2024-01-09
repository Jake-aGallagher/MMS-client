import { useState } from 'react';
import { RootState } from '../../components/store/store';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import ModalBase from '../../components/modal/modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboard } from '@fortawesome/free-solid-svg-icons';
import { useSpares } from '../../components/spares/index/useSpares';
import LoadingNoDataError from '../../components/loading/loadingNoDataError';
import DataTable from '../../components/dataTable/dataTable';
import FullPage from '../../components/page/fullPage';
import Toolbar from '../../components/page/toolbar';
import { DataTableConfig } from '../../components/dataTable/types/configType';
import { useRouter } from 'next/router';

interface PropsForModal {
    id: number;
    name: string;
    quantityRemaining?: number;
    url?: string;
}

const Spares = () => {
    const permissions = useSelector((state: RootState) => state.permissions.value.permissions);
    const isAdmin = useSelector((state: RootState) => state.user.value.isAdmin);
    const router = useRouter();
    if (!permissions.spares?.view && !isAdmin) {
        router.push('/');
    }
    
    const currentProperty = useSelector((state: RootState) => state.currentProperty.value.currentProperty);
    const { spares, loading, error, reload } = useSpares({ currentProperty });
    const [modal, setModal] = useState<{ view: boolean; type: string; payload: PropsForModal }>({ view: false, type: '', payload: { id: 0, name: '' } });

    const sparesTableConfig: DataTableConfig = {
        headers: [
            { id: 'id', name: 'Part Number', type: 'linkWithName', nameParam: 'part_no', search: true, order: true },
            { id: 'name', name: 'Part Name', type: 'string', search: true, order: true },
            { id: 'man_part_no', name: 'OEM Part Number', type: 'string', search: true, order: true },
            { id: 'man_name', name: 'OEM Part Name', type: 'string', search: true, order: true },
            { id: 'location', name: 'Location', type: 'string', search: true, order: true },
            { id: 'quant_remain', name: 'Remaining Stock', type: 'remaining_stock', search: true, order: true, avgUsagePointer: 'avg_usage' },
            { id: 'avg_usage', name: 'Usage (AVG per Month)', type: 'number', search: true, order: true },
        ],
        searchable: true,
        linkColPrefix: '/spares/',
        modalType: 'SparesItem',
        deleteUrl: 'spares/item',
        idPointer: 'id',
        namePointer: 'name',
        reload: reload,
    };
    if (permissions.spares?.manage || isAdmin) {
        sparesTableConfig.headers.push({ id: 'tools', name: 'Tools', type: 'tools', search: false, order: false, functions: ['adjust_stock', 'edit', 'delete'] });
    }

    const addItem = () => {
        setModal({ view: true, type: 'addEditSparesItem', payload: { id: 0, name: '' } });
    };

    return (
        <>
            <FullPage>
                <Toolbar>
                    {permissions.sparesManagement?.view || isAdmin ? (
                        <Link href="/spares/sparesManagement" className="tLink">
                            <FontAwesomeIcon icon={faClipboard} className="mr-1 w-3" />
                            Spares Management
                        </Link>
                    ) : null}
                    {permissions.spares?.manage || isAdmin ? (
                        <button onClick={addItem} className="tLink">
                            <div className="text-2xl mr-1 pb-1">+</div>
                            Add Spares Item
                        </button>
                    ) : null}
                </Toolbar>
                {modal.view ? <ModalBase modalType={modal.type} payload={modal.payload} closeModal={() => [setModal({ view: false, type: '', payload: { id: 0, name: '' } }), reload()]} /> : null}
                <LoadingNoDataError loading={loading} error={error}>
                    <DataTable config={sparesTableConfig} data={spares} />
                </LoadingNoDataError>
            </FullPage>
        </>
    );
};

export default Spares;
