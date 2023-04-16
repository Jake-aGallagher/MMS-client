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
        { id: 'last_name', name: 'Surname', type: 'string', search: true, order: true },
        { id: 'authority', name: 'Authority', type: 'authSwitch', search: true, order: true },
        
    ],
    searchable: true,
};

const PropertyView = () => {
    const [loading, setLoading] = useState(true);
    const [noData, setNoData] = useState(false);
    const [error, setError] = useState(false);
    const params = useRouter();
    const [propertyDetails, setPropertyDetails] = useState<Property[]>([]);
    const [viewModal, setViewModal] = useState(false);
    const [modalType, setModalType] = useState('');
    const [assignedUsers, setAssignedUsers] = useState<User[]>([]);

    useEffect(() => {
        setLoading(true);
        setError(false);
        setNoData(false);
        getPropertyHandler();
        getAssignedUsersHandler();
    }, []);

    const getPropertyHandler = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/properties/${params.asPath.split('/')[2]}`, {
                headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') },
            });
            if (response.data.length === 0) {
                setNoData(true);
            } else {
                setPropertyDetails(response.data);
            }
            setLoading(false);
        } catch (err) {
            setError(true);
            setLoading(false);
        }
    };

    const getAssignedUsersHandler = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/properties/assigned-users/${params.asPath.split('/')[2]}`, {
                headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') },
            });
            if (response.data.length === 0) {
                setNoData(true);
            } else {
                setAssignedUsers(response.data);
            }
            setLoading(false);
        } catch (err) {
            setError(true);
            setLoading(false);
        }
    };

    const details = propertyDetails.map((property) => (
        <div className="ml-10 mb-4 w-4/5 max-w-lg" key={property.id}>
            <div className="flex flex-row h-6 mb-3">
                <div className="w-1/2 pl-1 border-b-2">ID Number: </div>
                <div className="w-1/2 border-b-2 flex flex-row justify-center">{property.id}</div>
            </div>
            <div className="flex flex-row h-6 mb-3">
                <div className="w-1/2 pl-1 border-b-2">Name: </div>
                <div className="w-1/2 border-b-2 flex flex-row justify-center">{property.name}</div>
            </div>
            <div className="flex flex-row h-6 mb-3">
                <div className="w-1/2 pl-1 border-b-2">Type: </div>
                <div className="w-1/2 border-b-2 flex flex-row justify-center">{property.type}</div>
            </div>
            <div className="flex flex-row h-6 mb-3">
                <div className="w-1/2 pl-1 border-b-2">Address: </div>
                <div className="w-1/2 border-b-2 flex flex-row justify-center">{property.address}</div>
            </div>
            <div className="flex flex-row h-6 mb-3">
                <div className="w-1/2 pl-1 border-b-2">City: </div>
                <div className="w-1/2 border-b-2 flex flex-row justify-center">{property.city}</div>
            </div>
            <div className="flex flex-row h-6 mb-3">
                <div className="w-1/2 pl-1 border-b-2">County: </div>
                <div className="w-1/2 border-b-2 flex flex-row justify-center">{property.county}</div>
            </div>
            <div className="flex flex-row h-6 mb-3">
                <div className="w-1/2 pl-1 border-b-2">Postcode: </div>
                <div className="w-1/2 border-b-2 flex flex-row justify-center">{property.postcode}</div>
            </div>
        </div>
    ));

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
                {viewModal ? (
                    <ModalBase
                        modalType={modalType}
                        payload={parseInt(params.asPath.split('/')[2])}
                        closeModal={() => [setViewModal(false), getPropertyHandler(), getAssignedUsersHandler()]}
                    />
                ) : null}
                {loading ? (
                    <Loading />
                ) : noData ? (
                    <div>There has been an issue getting the Property Data</div>
                ) : error ? (
                    <RetrieveError />
                ) : (
                    <>
                        <div className="flex flex-col xl:flex-row">
                            {details}
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
