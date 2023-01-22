import { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import RetrieveError from '../../components/error/retrieveError';
import Loading from '../../components/loading/loading';
import ModalBase from '../../components/modal/modal';

interface Property {
    id: number;
    name: string;
    type: string;
    address: string;
    city: string;
    county: string;
    postcode: string;
}

const Properties = () => {
    const [loading, setLoading] = useState(true);
    const [noData, setNoData] = useState(false);
    const [error, setError] = useState(false);
    const [properties, setProperties] = useState<Property[]>([]);
    const [viewModal, setViewModal] = useState(false);
    const [modalType, setmodalType] = useState('');

    useEffect(() => {
        setLoading(true);
        setError(false);
        setNoData(false);
        getHandler();
    }, []);

    const getHandler = async () => {
        try {
            const propertiesList = await axios.get('http://localhost:3001/properties/all-properties', {
                headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') },
            });
            if (propertiesList.data.length === 0) {
                setNoData(true);
            } else {
                setProperties(propertiesList.data);
            }
            setLoading(false);
        } catch (err) {
            setError(true);
            setLoading(false);
        }
    };

    var propertiesList;
    propertiesList = properties.map((property) => (
        <tr key={property.id} className="">
            <td className="border border-solid border-gray-500 px-2 text-center p-2">
                <Link href={'/properties/' + property.id} className="border-b-2 border-black hover:text-blue-600 hover:border-blue-600">
                    {property.id}
                </Link>
            </td>
            <td className="border border-solid border-gray-500 px-2 text-center p-2">{property.name}</td>
            <td className="border border-solid border-gray-500 px-2 text-center p-2">{property.type}</td>
            <td className="border border-solid border-gray-500 px-2 text-center p-2">{property.address}</td>
            <td className="border border-solid border-gray-500 px-2 text-center p-2">{property.city}</td>
            <td className="border border-solid border-gray-500 px-2 text-center p-2">{property.county}</td>
            <td className="border border-solid border-gray-500 px-2 text-center p-2">{property.postcode}</td>
        </tr>
    ));

    return (
        <>
            {viewModal ? <ModalBase modalType={modalType} closeModal={() => setViewModal(false)} /> : null}
            {loading ? (
                <Loading />
            ) : noData ? (
                <div>There is no data</div>
            ) : error ? (
                <RetrieveError />
            ) : (
                <div className="w-full overflow-x-auto overflow-y-auto bg-gray-100">
                    <div className="flex flex-row my-4 items-center">
                        <div className="ml-8">
                            <label htmlFor="search">Search:</label>
                            <input type="text" id="search" name="search" className=" ml-2 bg-blue-200 rounded-sm" />
                        </div>
                        <button
                            onClick={() => [setViewModal(true), setmodalType('createProperty')]}
                            className='ml-10 rounded-3xl bg-blue-50 hover:bg-blue-600 h-8 px-4 border-2 border-blue-600 hover:border-transparent"'
                        >
                            Create Property
                        </button>
                    </div>
                    <table className="min-w-full table-auto border-collapse border-2 border-solid border-gray-500 ">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="border-2 border-solid border-gray-500 px-2">Property Number</th>
                                <th className="border-2 border-solid border-gray-500 px-2">Name</th>
                                <th className="border-2 border-solid border-gray-500 px-2">Type</th>
                                <th className="border-2 border-solid border-gray-500 px-2">Address</th>
                                <th className="border-2 border-solid border-gray-500 px-2">City</th>
                                <th className="border-2 border-solid border-gray-500 px-2">County</th>
                                <th className="border-2 border-solid border-gray-500 px-2">Postcode</th>
                            </tr>
                        </thead>
                        <tbody>{propertiesList}</tbody>
                    </table>
                </div>
            )}
        </>
    );
};

export default Properties;
