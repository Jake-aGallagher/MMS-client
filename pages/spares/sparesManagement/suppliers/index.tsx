import Link from 'next/link';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import ModalBase from '../../../../components/modal/modal';
import { RootState } from '../../../../components/store/store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useSuppliers } from '../../../../components/spares/sparesManagement/suppliers/index/useSuppliers';
import LoadingNoDataError from '../../../../components/loading/loadingNoDataError';
import DataTable from '../../../../components/dataTable/dataTable';
import FullPage from '../../../../components/page/fullPage';
import Toolbar from '../../../../components/page/toolbar';

const Suppliers = () => {
    const currentProperty = useSelector((state: RootState) => state.currentProperty.value.currentProperty);
    const { suppliersList, loading, error, reload } = useSuppliers({ currentProperty });
    const [modal, setModal] = useState<{ view: boolean; type: string; payload: { id: number; name: string; url?: string } }>({ view: false, type: '', payload: { id: 0, name: '' } });

    const suppliersTableConfig = {
        headers: [
            { id: 'name', name: 'Name', type: 'string', search: true, order: true },
            { id: 'website', name: 'Website', type: 'url', search: true, order: true },
            { id: 'phone', name: 'Phone', type: 'string', search: true, order: true },
            { id: 'prim_contact', name: 'Primary Contact', type: 'string', search: true, order: true },
            { id: 'prim_contact_phone', name: 'Primary Contact Phone', type: 'string', search: true, order: true },
            { id: 'address', name: 'Address', type: 'string', search: true, order: true },
            { id: 'city', name: 'City', type: 'string', search: true, order: true },
            { id: 'county', name: 'County', type: 'string', search: true, order: true },
            { id: 'postcode', name: 'Postcode', type: 'string', search: true, order: true },
            { id: 'supplies', name: 'Supplies', type: 'string', search: true, order: true },
            { id: 'tools', name: 'Tools', type: 'tools', search: false, order: false, functions: ['edit', 'delete'] },
        ],
        searchable: true,
        modalType: 'Supplier',
        idPointer: 'id',
        namePointer: 'name',
        reload: reload,
    };

    const addEditSupplier = () => {
        setModal({ view: true, type: 'addEditSupplier', payload: { id: 0, name: '' } });
    };

    return (
        <>
            <FullPage>
                <Toolbar>
                    <Link href="/spares/sparesManagement" className="ml-8 hover:text-blue-600 flex flex-row items-center">
                        <FontAwesomeIcon icon={faArrowLeft} className="mr-1 w-3" />
                        <p>Return to Spares Management</p>
                    </Link>
                    <button className="ml-8 hover:text-blue-600 flex flex-row items-center" onClick={addEditSupplier}>
                        <div className="text-2xl mr-1 pb-1">+</div>
                        Add Supplier
                    </button>
                </Toolbar>
                {modal.view ? <ModalBase modalType={modal.type} payload={modal.payload} closeModal={() => [setModal({ view: false, type: '', payload: { id: 0, name: '' } }), reload()]} /> : null}
                <LoadingNoDataError loading={loading} error={error}>
                    <div className="w-full overflow-x-auto overflow-y-auto bg-gray-100">
                        <DataTable config={suppliersTableConfig} data={suppliersList} />
                    </div>
                </LoadingNoDataError>
            </FullPage>
        </>
    );
};

export default Suppliers;
