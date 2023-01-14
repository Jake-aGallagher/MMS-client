import { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import RetrieveError from '../../components/error/retrieveError';
import Loading from '../../components/loading/loading';

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

    useEffect(() => {
        setLoading(true);
        setNoData(false);
        getHandler();
    }, []);

    const getHandler = async () => {
        try {
            const propertiesList = await axios.get('http://localhost:3001/properties/all-properties', { headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') } });
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
            {loading ? (
                <Loading />
            ) : noData ? (
                <div>There is no data</div>
            ) : error ? (
                <RetrieveError />
            ) : (
                <div className="w-full overflow-x-auto overflow-y-auto bg-gray-100">
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
    )
}

export default Properties 