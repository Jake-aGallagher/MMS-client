import Link from 'next/link';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import ModalBase from '../../../../components/modal/modal';
import { RootState } from '../../../../components/store/store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import SortableTable from '../../../../components/sortableTable/sortableTable';
import { useSuppliers } from '../../../../components/spares/sparesManagement/suppliers/index/useSuppliers';
import LoadingNoDataError from '../../../../components/loading/loadingNoDataError';

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
        { id: 'edit', name: 'Edit', type: 'edit', search: false, order: false, functionIdPointer: 'id', functionNamePointer: 'name' },
        { id: 'delete', name: 'Delete', type: 'delete', search: false, order: false, functionIdPointer: 'id', functionNamePointer: 'name' },
    ],
    searchable: true,
};

const Suppliers = () => {
    const currentProperty = useSelector((state: RootState) => state.currentProperty.value.currentProperty);
    const { suppliersList, loading, error, reload } = useSuppliers({ currentProperty });
    const [viewModal, setViewModal] = useState(false);
    const [modalType, setModalType] = useState('');
    const [supplierId, setSupplierId] = useState<{ id: number; name: string; url?: string }>({ id: 0, name: '' });

    const addEditSupplier = (id: number, name: string) => {
        setSupplierId({ id, name });
        setModalType('addEditSupplier');
        setViewModal(true);
    };

    const deleteSupplier = (id: number, name: string) => {
        setSupplierId({ id, name, url: 'spares/supplier' });
        setModalType('deleteSupplier');
        setViewModal(true);
    };

    return (
        <>
            <div className="w-full h-full pt-12 overflow-x-auto overflow-y-auto bg-gray-100">
                <div className="fixed top-0 left-52 right-0 z-10 bg-gray-200 h-12 border-b-2 border-gray-300 flex flex-row justify-start items-center">
                    <Link href="/spares/sparesManagement" className="ml-8 hover:text-blue-600 flex flex-row items-center">
                        <FontAwesomeIcon icon={faArrowLeft} className="mr-1 w-3" />
                        <p>Return to Spares Management</p>
                    </Link>
                    <button className="ml-8 hover:text-blue-600 flex flex-row items-center" onClick={() => addEditSupplier(0, '')}>
                        <div className="text-2xl mr-1 pb-1">+</div>
                        Add Supplier
                    </button>
                </div>
                {viewModal ? <ModalBase modalType={modalType} payload={supplierId} closeModal={() => [setViewModal(false), setModalType(''), reload()]} /> : null}
                <LoadingNoDataError loading={loading} error={error}>
                    <div className="w-full overflow-x-auto overflow-y-auto bg-gray-100">
                        <SortableTable config={suppliersTableConfig} data={suppliersList} deleteFunction={deleteSupplier} editFunction={addEditSupplier} />
                    </div>
                </LoadingNoDataError>
            </div>
        </>
    );
};

export default Suppliers;
