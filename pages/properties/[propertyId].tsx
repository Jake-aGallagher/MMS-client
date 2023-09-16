import { useState } from 'react';
import { useRouter } from 'next/router';
import ModalBase from '../../components/modal/modal';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faPencil, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import DetailsBox from '../../components/detailsBox/detailsBox';
import { usePropertyDetails } from '../../components/properties/details/usePropertyDetails';
import LoadingNoDataError from '../../components/loading/loadingNoDataError';
import DataTable from '../../components/dataTable/dataTable';
import FullPage from '../../components/page/fullPage';
import Toolbar from '../../components/page/toolbar';

const PropertyView = () => {
    const params = useRouter();
    const propertyNumber = params.asPath.split('/')[2];
    const { propertyDetails, assignedUsers, loading, noData, error, reload } = usePropertyDetails(propertyNumber);
    const [viewModal, setViewModal] = useState(false);
    const [modalType, setModalType] = useState('');

    const userTableConfig = {
        headers: [
            { id: 'username', name: 'Username', type: 'string', search: true, order: true },
            { id: 'first_name', name: 'First Name', type: 'string', search: true, order: true },
            { id: 'last_name', name: 'Last name', type: 'string', search: true, order: true },
            { id: 'user_group_name', name: 'User Group', type: 'string', search: true, order: true },
        ],
        searchable: true,
    };

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
            <FullPage>
                <Toolbar>
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
                </Toolbar>
                {viewModal ? <ModalBase modalType={modalType} payload={parseInt(propertyNumber)} closeModal={() => [setViewModal(false), reload()]} /> : null}
                <LoadingNoDataError loading={loading} error={error} noData={noData}>
                    <div className="flex flex-col xl:flex-row">
                        <DetailsBox data={propertyDetailsConfig} />
                        <div className="ml-10">
                            <p className="xl:text-center text-left mb-2 font-semibold">Assigned Users</p>
                            <DataTable config={userTableConfig} data={assignedUsers} />
                        </div>
                    </div>
                </LoadingNoDataError>
            </FullPage>
        </>
    );
};

export default PropertyView;
