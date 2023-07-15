import axios from 'axios';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Loading from '../../components/loading/loading';
import ModalBase from '../../components/modal/modal';
import RetrieveError from '../../components/error/retrieveError';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faPencil, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import SortableTable from '../../components/sortableTable/sortableTable';
import { SERVER_URL } from '../../components/routing/addressAPI';
import DetailsBox from '../../components/detailsBox/detailsBox';

interface Property {
    id: number;
    name: string;
    type: string;
    address: string;
    city: string;
    county: string;
    postcode: string;
}

interface User {
    username: string;
    first_name: string;
    last_name: string;
    authority: number;
}

const userTableConfig = {
    headers: [
        { id: 'username', name: 'Username', type: 'string', search: true, order: true },
        { id: 'first_name', name: 'First Name', type: 'string', search: true, order: true },
        { id: 'last_name', name: 'Last name', type: 'string', search: true, order: true },
        { id: 'authority', name: 'Authority', type: 'authSwitch', search: true, order: true },
    ],
    searchable: true,
};

const PropertyView = () => {
    const [loading, setLoading] = useState(true);
    const [noData, setNoData] = useState(false);
    const [error, setError] = useState(false);
    const params = useRouter();
    const [propertyDetails, setPropertyDetails] = useState<Property>();
    const [viewModal, setViewModal] = useState(false);
    const [modalType, setModalType] = useState('');
    const [assignedUsers, setAssignedUsers] = useState<User[]>([]);

    useEffect(() => {
        reload();
    }, []);

    const reload = () => {
        setLoading(true);
        setError(false);
        setNoData(false);
        getPropertyHandler();
    };

    const getPropertyHandler = async () => {
        try {
            const response = await axios.get(`${SERVER_URL}/properties/${params.asPath.split('/')[2]}`, {
                headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') },
            });
            if (response.data.propDetails.length === 0) {
                setNoData(true);
            } else {
                setPropertyDetails(response.data.propDetails[0]);
                setAssignedUsers(response.data.assignedUsers);
            }
            setLoading(false);
        } catch (err) {
            setError(true);
            setLoading(false);
        }
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
                {viewModal ? <ModalBase modalType={modalType} payload={parseInt(params.asPath.split('/')[2])} closeModal={() => [setViewModal(false), reload()]} /> : null}
                {loading ? (
                    <Loading />
                ) : noData ? (
                    <div>There has been an issue getting the Property Data</div>
                ) : error ? (
                    <RetrieveError />
                ) : (
                    <>
                        <div className="flex flex-col xl:flex-row">
                            <DetailsBox data={propertyDetailsConfig} />
                            <div className="ml-10">
                                <p className="xl:text-center text-left mb-2 font-semibold">Assigned Users</p>
                                <SortableTable config={userTableConfig} data={assignedUsers} />
                            </div>
                        </div>
                    </>
                )}
            </div>
        </>
    );
};

export default PropertyView;
