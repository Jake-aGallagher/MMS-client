import { useState } from 'react';
import ModalBase from '../../components/modal/modal';
import LoadingNoDataError from '../../components/loading/loadingNoDataError';
import DataTable from '../../components/dataTable/dataTable';
import FullPage from '../../components/page/fullPage';
import Toolbar from '../../components/page/toolbar';
import { useSelector } from 'react-redux';
import { RootState } from '../../components/store/store';
import { useRouter } from 'next/router';
import { useProducts } from '../../components/products/index/useProducts';

const productsTableConfig = {
    headers: [
        { id: 'id', name: 'ID', type: 'link', search: true, order: true },
        { id: 'name', name: 'Name', type: 'string', search: true, order: true },
        { id: 'address', name: 'Address', type: 'string', search: true, order: true },
        { id: 'city', name: 'City', type: 'string', search: true, order: true },
        { id: 'county', name: 'County', type: 'string', search: true, order: true },
        { id: 'postcode', name: 'Postcode', type: 'string', search: true, order: true },
    ],
    searchable: true,
    linkColPrefix: '/products/',
};

const Products = () => {
    const permissions = useSelector((state: RootState) => state.permissions.value.permissions);
    const isAdmin = useSelector((state: RootState) => state.user.value.isAdmin);
    const router = useRouter();
    if (!permissions.products?.view && !isAdmin) {
        router.push('/');
    }

    const { allProducts, loading, error, reload } = useProducts();
    const [viewModal, setViewModal] = useState(false);
    const [modalType, setmodalType] = useState('');

    return (
        <FullPage>
            <Toolbar>
                {permissions.products?.manage || isAdmin ? (
                    <button onClick={() => [setViewModal(true), setmodalType('addEditProducts')]} className="tLink">
                        <div className="text-2xl mr-1 pb-1">+</div>
                        Add Product
                    </button>
                ) : null}
            </Toolbar>
            {viewModal ? <ModalBase modalType={modalType} payload={0} closeModal={() => [setViewModal(false), reload()]} /> : null}
            <LoadingNoDataError loading={loading} error={error}>
                <DataTable config={productsTableConfig} data={allProducts} />
            </LoadingNoDataError>
        </FullPage>
    );
};

export default Products;
