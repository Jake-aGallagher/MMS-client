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
import { useRouter } from 'next/navigation';
import { DataTableConfig } from '../../../../components/dataTable/types/configType';

const Suppliers = () => {
    const permissions = useSelector((state: RootState) => state.permissions.value.permissions);
    const isAdmin = useSelector((state: RootState) => state.user.value.isAdmin);
    const router = useRouter();
    if (!permissions.sparesManagement?.view && !isAdmin) {
        router.push('/spares');
    }

    const currentProperty = useSelector((state: RootState) => state.currentProperty.value.currentProperty);
    const { suppliersList, loading, error, reload } = useSuppliers({ currentProperty });
    const [modal, setModal] = useState<{ view: boolean; type: string; payload: { id: number; name: string; url?: string } }>({ view: false, type: '', payload: { id: 0, name: '' } });

    const suppliersTableConfig: DataTableConfig = {
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
        ],
        searchable: true,
        modalType: 'Supplier',
        idPointer: 'id',
        namePointer: 'name',
        reload: reload,
    };
    if (permissions.sparesManagement?.manage || isAdmin) {
        suppliersTableConfig.headers.push({ id: 'tools', name: 'Tools', type: 'tools', search: false, order: false, functions: ['edit', 'delete'] });
    }

    const addEditSupplier = () => {
        setModal({ view: true, type: 'addEditSupplier', payload: { id: 0, name: '' } });
    };

    return (
        <>
            <FullPage>
                <Toolbar>
                    <Link href="/spares/sparesManagement" className="tLink">
                        <FontAwesomeIcon icon={faArrowLeft} className="mr-1 w-3" />
                        <p>Return to Spares Management</p>
                    </Link>
                    {permissions.sparesManagement?.manage || isAdmin ? (
                        <button className="tLink" onClick={addEditSupplier}>
                            <div className="text-2xl mr-1 pb-1">+</div>
                            Add Supplier
                        </button>
                    ) : null}
                </Toolbar>
                {modal.view ? <ModalBase modalType={modal.type} payload={modal.payload} closeModal={() => [setModal({ view: false, type: '', payload: { id: 0, name: '' } }), reload()]} /> : null}
                <LoadingNoDataError loading={loading} error={error}>
                    <DataTable config={suppliersTableConfig} data={suppliersList} />
                </LoadingNoDataError>
            </FullPage>
        </>
    );
};

export default Suppliers;
