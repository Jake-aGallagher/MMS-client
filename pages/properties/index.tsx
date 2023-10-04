import { useState } from 'react';
import ModalBase from '../../components/modal/modal';
import { useProperties } from '../../components/properties/index/useProperties';
import LoadingNoDataError from '../../components/loading/loadingNoDataError';
import DataTable from '../../components/dataTable/dataTable';
import FullPage from '../../components/page/fullPage';
import Toolbar from '../../components/page/toolbar';

const propertiesTableConfig = {
    headers: [
        { id: 'id', name: 'Property Number', type: 'link', search: true, order: true },
        { id: 'name', name: 'Name', type: 'string', search: true, order: true },
        { id: 'type', name: 'Type', type: 'string', search: true, order: true },
        { id: 'address', name: 'Address', type: 'string', search: true, order: true },
        { id: 'city', name: 'City', type: 'string', search: true, order: true },
        { id: 'county', name: 'County', type: 'string', search: true, order: true },
        { id: 'postcode', name: 'Postcode', type: 'string', search: true, order: true },
    ],
    searchable: true,
    linkColPrefix: '/properties/',
};

const Properties = () => {
    const { allProperties, loading, error, reload } = useProperties();
    const [viewModal, setViewModal] = useState(false);
    const [modalType, setmodalType] = useState('');

    return (
        <>
            <FullPage>
                <Toolbar>
                    <button onClick={() => [setViewModal(true), setmodalType('addEditProperty')]} className="tLink">
                        <div className="text-2xl mr-1 pb-1">+</div>
                        Add Property
                    </button>
                </Toolbar>
                {viewModal ? <ModalBase modalType={modalType} payload={0} closeModal={() => [setViewModal(false), reload()]} /> : null}
                <LoadingNoDataError loading={loading} error={error}>
                    <DataTable config={propertiesTableConfig} data={allProperties} />
                </LoadingNoDataError>
            </FullPage>
        </>
    );
};

export default Properties;
