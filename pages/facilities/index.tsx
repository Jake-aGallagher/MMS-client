import { useState } from 'react';
import ModalBase from '../../components/layout/modal/modal';
import { useFacilities } from '../../components/facilities/index/useFacilities';
import LoadingNoDataError from '../../components/loading/loadingNoDataError';
import DataTable from '../../components/dataTable/dataTable';
import FullPage from '../../components/layout/page/fullPage';
import Toolbar from '../../components/layout/page/toolbar';
import { useSelector } from 'react-redux';
import { RootState } from '../../components/store/store';
import { useRouter } from 'next/router';

const facilitiesTableConfig = {
    headers: [
        { id: 'id', name: 'ID', type: 'link', search: true, order: true },
        { id: 'name', name: 'Name', type: 'string', search: true, order: true },
        { id: 'address', name: 'Address', type: 'string', search: true, order: true },
        { id: 'city', name: 'City', type: 'string', search: true, order: true },
        { id: 'county', name: 'County', type: 'string', search: true, order: true },
        { id: 'postcode', name: 'Postcode', type: 'string', search: true, order: true },
    ],
    searchable: true,
    linkColPrefix: '/facilities/',
};

const Facilities = () => {
    const permissions = useSelector((state: RootState) => state.permissions.value.permissions);
    const isAdmin = useSelector((state: RootState) => state.user.value.isAdmin);
    const router = useRouter();
    if (!permissions.facilities?.view && !isAdmin) {
        router.push('/');
    }

    const { allFacilities, loading, error, reload } = useFacilities();
    const [viewModal, setViewModal] = useState(false);
    const [modalType, setmodalType] = useState('');

    return (
        <FullPage>
            <Toolbar>
                {permissions.facilities?.manage || isAdmin ? (
                    <button onClick={() => [setViewModal(true), setmodalType('addEditFacility')]} className="tLink">
                        <div className="text-2xl mr-1 pb-1">+</div>
                        Add Facility
                    </button>
                ) : null}
            </Toolbar>
            {viewModal ? <ModalBase modalType={modalType} payload={0} closeModal={() => [setViewModal(false), reload()]} /> : null}
            <LoadingNoDataError loading={loading} error={error}>
                <DataTable config={facilitiesTableConfig} data={allFacilities} />
            </LoadingNoDataError>
        </FullPage>
    );
};

export default Facilities;
