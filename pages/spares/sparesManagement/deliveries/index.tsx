import Link from 'next/link';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import ModalBase from '../../../../components/modal/modal';
import { RootState } from '../../../../components/store/store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useDeliveries } from '../../../../components/spares/sparesManagement/deliveries/index/useDeliveries';
import LoadingNoDataError from '../../../../components/loading/loadingNoDataError';
import DataTable from '../../../../components/dataTable/dataTable';
import FullPage from '../../../../components/page/fullPage';
import Toolbar from '../../../../components/page/toolbar';

interface Contents {
    delivery_id: number;
    spare_id: number;
    quantity: number;
    part_no: string;
    name: string;
}

const Deliveries = () => {
    const currentProperty = useSelector((state: RootState) => state.currentProperty.value.currentProperty);
    const { deliveriesList, loading, error, reload } = useDeliveries({ currentProperty });
    const [modal, setModal] = useState<{ view: boolean; type: string; payload: { contents: Contents[]; name: string } | { id: number; name: string; url?: string } }>({
        view: false,
        type: '',
        payload: { contents: [], name: '' },
    });

    const deliveriesTableConfig = {
        headers: [
            { id: 'id', name: 'ID', type: 'string', search: true, order: true },
            { id: 'name', name: 'Name', type: 'string', search: true, order: true },
            { id: 'supplier', name: 'Supplier', type: 'string', search: true, order: true },
            { id: 'courier', name: 'Courier', type: 'string', search: true, order: true },
            { id: 'placed', name: 'Date Placed', type: 'date', search: true, order: true },
            { id: 'due', name: 'Date Due', type: 'date', search: true, order: true },
            { id: 'contents', name: 'Contents', type: 'contents', search: false, order: false, functionNamePointer: 'name' },
            { id: 'arrived', name: 'Arrived', type: 'tick', search: true, order: true },
            { id: 'tools', name: 'Tools', type: 'tools', search: false, order: false, functions: ['edit', 'delete'] },
        ],
        searchable: true,
        modalType: 'Delivery',
        idPointer: 'id',
        namePointer: 'name',
        reload: reload,
    };

    const addDelivery = () => {
        setModal({ view: true, type: 'addEditDelivery', payload: { id: 0, name: '' } });
    };

    const viewTooManyItems = (contents: Contents[], name: string) => {
        setModal({ view: true, type: 'viewExtraSpares', payload: { contents, name } });
    };

    return (
        <>
            <FullPage>
                <Toolbar>
                    <Link href="/spares/sparesManagement" className="ml-8 hover:text-accent flex flex-row items-center">
                        <FontAwesomeIcon icon={faArrowLeft} className="mr-1 w-3" />
                        <p>Return to Spares Management</p>
                    </Link>
                    <button className="ml-8 hover:text-accent flex flex-row items-center" onClick={addDelivery}>
                        <div className="text-2xl mr-1 pb-1">+</div>
                        Add Delivery
                    </button>
                </Toolbar>
                {modal.view ? <ModalBase modalType={modal.type} payload={modal.payload} closeModal={() => [setModal({ view: false, type: '', payload: { contents: [], name: '' } })]} /> : null}
                <LoadingNoDataError loading={loading} error={error}>
                    <div className="w-full overflow-x-auto overflow-y-auto">
                        <DataTable config={deliveriesTableConfig} data={deliveriesList} viewTooManyItems={viewTooManyItems} />
                    </div>
                </LoadingNoDataError>
            </FullPage>
        </>
    );
};

export default Deliveries;
