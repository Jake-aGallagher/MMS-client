import { useState } from 'react';
import { useRouter } from 'next/router';
import ModalBase from '../../components/modal/modal';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faPencil, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import SortableTable from '../../components/sortableTable/sortableTable';
import DetailsBox from '../../components/detailsBox/detailsBox';
import { usePropertyDetails } from '../../components/properties/details/usePropertyDetails';
import LoadingNoDataError from '../../components/loading/loadingNoDataError';

const userTableConfig = {
    headers: [
        { id: 'username', name: 'Username', type: 'string', search: true, order: true },
        { id: 'first_name', name: 'First Name', type: 'string', search: true, order: true },
        { id: 'last_name', name: 'Last name', type: 'string', search: true, order: true },
        { id: 'user_group_name', name: 'User Group', type: 'string', search: true, order: true },
    ],
    searchable: true,
};

const PropertyView = () => {
    const params = useRouter();
    const propertyNumber = params.asPath.split('/')[2];
    const { propertyDetails, assignedUsers, loading, noData, error, reload } = usePropertyDetails(propertyNumber);
    const [viewModal, setViewModal] = useState(false);
    const [modalType, setModalType] = useState('');

    const propertyDetailsConfig = {
        id: propertyDetails?.id,
        fields: [
            { label: 'ID Number', value: propertyDetails?.id },
            { label: 'Name', value: propertyDetails?.name },
            { label: 'Type', value: propertyDetails?.type },
            { label: 'Address', value: propertyDetails?.address },
            { label: 'City', value: propertyDetails?.city },
            { label: 'County', value: propertyDetails?.county },
            { label: 'Postcode', value: propertyDetails?.postcode },
        ],
    };

    return (
        <>
            <div className="w-full h-full pt-12 overflow-x-auto overflow-y-auto bg-gray-100">
                <div className="fixed top-0 left-52 right-0 z-10 bg-gray-200 h-12 border-b-2 border-gray-300 flex flex-row justify-start items-center">
                    <Link href="/properties" className="ml-8 hover:text-blue-600 flex flex-row items-center">
                        <FontAwesomeIcon icon={faArrowLeft} className="mr-1 w-3" />
                        <p>Return to all Properties</p>
                    </Link>
                    <button className="ml-8 hover:text-blue-600 flex flex-row items-center" onClick={() => [setViewModal(true), setModalType('addEditProperty')]}>
                        <FontAwesomeIcon icon={faPencil} className="mr-1 w-3" />
                        Edit Property
                    </button>
                    <button className="ml-8 hover:text-blue-600 flex flex-row items-center" onClick={() => [setViewModal(true), setModalType('assignUsers')]}>
                        <FontAwesomeIcon icon={faUserPlus} className="mr-1 w-3" />
                        Assign Users
                    </button>
                </div>
                {viewModal ? <ModalBase modalType={modalType} payload={parseInt(propertyNumber)} closeModal={() => [setViewModal(false), reload()]} /> : null}
                <LoadingNoDataError loading={loading} error={error} noData={noData}>
                    <div className="flex flex-col xl:flex-row">
                        <DetailsBox data={propertyDetailsConfig} />
                        <div className="ml-10">
                            <p className="xl:text-center text-left mb-2 font-semibold">Assigned Users</p>
                            <SortableTable config={userTableConfig} data={assignedUsers} />
                        </div>
                    </div>
                </LoadingNoDataError>
            </div>
        </>
    );
};

export default PropertyView;
