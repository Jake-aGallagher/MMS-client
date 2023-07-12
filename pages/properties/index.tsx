import { useState } from 'react';
import RetrieveError from '../../components/error/retrieveError';
import Loading from '../../components/loading/loading';
import ModalBase from '../../components/modal/modal';
import SortableTable from '../../components/sortableTable/sortableTable';
import { useProperties } from '../../components/properties/index/useProperties';

const propertiesTableConfig = {
    headers: [
        { id: 'id', name: 'Property Number', type: 'link', search: true, order: true },
        { id: 'name', name: 'Name', type: 'string', search: true, order: true },
        { id: 'type', name: 'Type', type: 'string', search: true, order: true },
        { id: 'address', name: 'Address', type: 'string', search: true, order: true },
        { id: 'city', name: 'City', type: 'date', search: true, order: true },
        { id: 'county', name: 'County', type: 'string', search: true, order: true },
        { id: 'postcode', name: 'Postcode', type: 'string', search: true, order: true },
    ],
    searchable: true,
    linkColPrefix: '/properties/'
};

const Properties = () => {
    const { allProperties, loading, error, reload } = useProperties();
    const [viewModal, setViewModal] = useState(false);
    const [modalType, setmodalType] = useState('');

    return (
        <>
            <div className="w-full h-full pt-12 overflow-x-auto overflow-y-auto bg-gray-100">
                <div className="fixed top-0 left-52 right-0 z-10 bg-gray-200 h-12 border-b-2 border-gray-300 flex flex-row justify-start items-center">
                    <button
                        onClick={() => [setViewModal(true), setmodalType('addEditProperty')]}
                        className="ml-8 hover:text-blue-600 flex flex-row items-center"
                    >
                        <div className="text-2xl mr-1 pb-1">+</div>
                        Add Property
                    </button>
                </div>
                {viewModal ? <ModalBase modalType={modalType} payload={0} closeModal={() => [setViewModal(false), reload()]} /> : null}
                {loading ? (
                    <Loading />
                ) : allProperties.length === 0 ? (
                    <div>There is no data</div>
                ) : error ? (
                    <RetrieveError />
                ) : (
                    <SortableTable config={propertiesTableConfig} data={allProperties} /> 
                )}
            </div>
        </>
    );
};

export default Properties;
