import axios from 'axios';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
//import ModalBase from '../../Components/Modal/ModalBase';
import { RootState } from '../../components/store/store';
import Loading from '../../components/loading/loading';
import ModalBase from '../../components/modal/modal';
import RetrieveError from '../../components/error/retrieveError';

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
            const response = await axios.get(`http://localhost:3001/properties/${params.asPath.split('/')[2]}/assigned-users`, {
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

    const authSwitch = (auth: number) => {
        switch (auth) {
            case 4:
                return 'Admin';
            case 3:
                return 'Manager';
            case 2:
                return 'Engineer';
            default:
                return 'Staff';
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

    const users = assignedUsers.map((user) => {
        return (
            <tr key={user.username}>
                <td className="border-2 border-solid border-gray-500 px-2">{user.username}</td>
                <td className="border-2 border-solid border-gray-500 px-2">{user.first_name + ' ' + user.last_name}</td>
                <td className="border-2 border-solid border-gray-500 px-2">{authSwitch(user.authority)}</td>
            </tr>
        );
    });

    return (
        <>
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
                <div>
                    <div className="w-full h-14 flex flex-row items-center">
                        <div className="flex flex-row w-full mr-10 md:mr-14 2xl:mr-32">
                            <button
                                className="rounded-3xl ml-10 bg-blue-50 hover:bg-blue-600 h-8 px-4 border-2 border-blue-600 hover:border-transparent"
                                onClick={() => [setViewModal(true), setModalType('editProperty')]}
                            >
                                Edit Property
                            </button>
                            <button
                                className="rounded-3xl ml-4 bg-blue-50 hover:bg-blue-600 h-8 px-4 border-2 border-blue-600 hover:border-transparent"
                                onClick={() => [setViewModal(true), setModalType('assignUsers')]}
                            >
                                Assign Users
                            </button>
                        </div>
                    </div>
                    <div className="flex flex-col xl:flex-row">
                        {details}
                        <div className="ml-10">
                            <p className="xl:text-center text-left mb-2 font-semibold">Assigned Users</p>
                            <table>
                                <thead>
                                    <tr className="bg-gray-200">
                                        <th className="border-2 border-solid border-gray-500 px-2">Username</th>
                                        <th className="border-2 border-solid border-gray-500 px-2">Name</th>
                                        <th className="border-2 border-solid border-gray-500 px-2">Authority</th>
                                    </tr>
                                </thead>
                                <tbody>{users}</tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default PropertyView;
