import Link from 'next/link';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import ModalBase from '../../../../components/layout/modal/modal';
import { RootState } from '../../../../components/store/store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useDeliveries } from '../../../../components/spares/sparesManagement/deliveries/index/useDeliveries';
import LoadingNoDataError from '../../../../components/loading/loadingNoDataError';
import DataTable from '../../../../components/dataTable/dataTable';
import FullPage from '../../../../components/layout/page/fullPage';
import Toolbar from '../../../../components/layout/page/toolbar';
import { useRouter } from 'next/navigation';
import { DataTableConfig } from '../../../../components/dataTable/types/configType';

interface Contents {
    delivery_id: number;
    spare_id: number;
    quantity: number;
    part_no: string;
    name: string;
}

const Deliveries = () => {
    const permissions = useSelector((state: RootState) => state.permissions.value.permissions);
    const isAdmin = useSelector((state: RootState) => state.user.value.isAdmin);
    const router = useRouter();
    if (!permissions.sparesManagement?.view && !isAdmin) {
        router.push('/spares');
    }

    const currentFacility = useSelector((state: RootState) => state.currentFacility.value.currentFacility);
    const { deliveriesList, loading, error, reload } = useDeliveries({ currentFacility });
    const [modal, setModal] = useState<{ view: boolean; type: string; payload: { contents: Contents[]; name: string } | { id: number; name: string; url?: string } }>({
        view: false,
        type: '',
        payload: { contents: [], name: '' },
    });

    const deliveriesTableConfig: DataTableConfig = {
        headers: [
            { id: 'id', name: 'ID', type: 'number', search: true, order: true },
            { id: 'name', name: 'Name', type: 'string', search: true, order: true },
            { id: 'supplier', name: 'Supplier', type: 'string', search: true, order: true },
            { id: 'courier', name: 'Courier', type: 'string', search: true, order: true },
            { id: 'placed', name: 'Date Placed', type: 'date', search: true, order: true },
            { id: 'due', name: 'Date Due', type: 'date', search: true, order: true },
            { id: 'contents', name: 'Contents', type: 'contents', search: false, order: false },
            { id: 'arrived', name: 'Arrived', type: 'tick', search: true, order: true },
        ],
        searchable: true,
        modalType: 'Delivery',
        deleteUrl: 'spares/delivery',
        idPointer: 'id',
        namePointer: 'name',
        reload: reload,
    };
    if (permissions.sparesManagement?.manage || isAdmin) {
        deliveriesTableConfig.headers.push({ id: 'tools', name: 'Tools', type: 'tools', search: false, order: false, functions: ['edit', 'delete'] });
    }

    const addDelivery = () => {
        setModal({ view: true, type: 'addEditDelivery', payload: { id: 0, name: '' } });
    };

    const viewTooManyItems = (contents: Contents[], name: string) => {
        setModal({ view: true, type: 'viewExtraSpares', payload: { contents, name } });
    };

    return (
        <FullPage>
            <Toolbar>
                <Link href="/spares/sparesManagement" className="tLink">
                    <FontAwesomeIcon icon={faArrowLeft} className="mr-1 w-3" />
                    <p>Return to Spares Management</p>
                </Link>
                {permissions.sparesManagement?.manage || isAdmin ? (
                    <button className="tLink" onClick={addDelivery}>
                        <div className="text-2xl mr-1 pb-1">+</div>
                        Add Delivery
                    </button>
                ) : null}
            </Toolbar>
            {modal.view ? <ModalBase modalType={modal.type} payload={modal.payload} closeModal={() => [setModal({ view: false, type: '', payload: { contents: [], name: '' } }), reload()]} /> : null}
            <LoadingNoDataError loading={loading} error={error}>
                <DataTable config={deliveriesTableConfig} data={deliveriesList} viewTooManyItems={viewTooManyItems} />
            </LoadingNoDataError>
        </FullPage>
    );
};

export default Deliveries;
