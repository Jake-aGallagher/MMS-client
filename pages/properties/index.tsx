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

interface SortBy {
    column: 'id'|'name'|'type'|'address'|'city'|'county'|'postcode';
    order: 'ASC'|'DESC';
}

const Properties = () => {
    const [loading, setLoading] = useState(true);
    const [noData, setNoData] = useState(false);
    const [error, setError] = useState(false);
    const [properties, setProperties] = useState<Property[]>([]);
    const [viewModal, setViewModal] = useState(false);
    const [modalType, setmodalType] = useState('');
    const [sortBy, setSortBy] = useState<SortBy>({ column: 'id', order: 'ASC' });

    useEffect(() => {
        reload();
    }, []);

    const reload = () => {
        setLoading(true);
        setError(false);
        setNoData(false);
        getHandler();
    };

    const getHandler = async () => {
        try {
            const propertiesList = await axios.get('http://localhost:3001/properties/all-properties', {
                headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') },
            });
            if (propertiesList.data.length === 0) {
                setNoData(true);
            } else {
                propertiesList.data.sort((a: Property, b: Property) => a.id - b.id);
                setProperties(propertiesList.data);
            }
            setLoading(false);
        } catch (err) {
            setError(true);
            setLoading(false);
        }
    };

    const sortHandler = (column: 'id'|'name'|'type'|'address'|'city'|'county'|'postcode') => {
        if (sortBy.column === column && sortBy.order === 'ASC') {
            setSortBy({ column: column, order: 'DESC' });
            sortFunction(column, 'DESC')
        } else {
            setSortBy({ column: column, order: 'ASC' });
            sortFunction(column, 'ASC')
        }
    };

    const sortFunction = (column: 'id'|'name'|'type'|'address'|'city'|'county'|'postcode', order: 'ASC'|'DESC') => {
        let unorderedProps: Property[] = properties;
        if (order === 'ASC') {
            unorderedProps.sort((a, b) => (a[column] > b[column]) ? 1 : ((a[column] < b[column]) ? -1 : 0));
        } else {
            unorderedProps.sort((a, b) => (b[column] > a[column]) ? 1 : ((b[column] < a[column]) ? -1 : 0));
        }
        const orderedProperties = unorderedProps;
        setProperties(orderedProperties)
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
            {viewModal ? <ModalBase modalType={modalType} closeModal={() => [setViewModal(false), reload()]} /> : null}
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
                                <th className="border-2 border-solid border-gray-500 px-2 cursor-pointer select-none" onClick={() => sortHandler('id')}>
                                    <div className=" flex flex-row justify-center items-center">
                                        Property Number{' '}
                                        {sortBy.column != 'id' ? null : sortBy.order === 'ASC' ? (
                                            <div className="ml-2 text-2xl">&#8595;</div>
                                        ) : (
                                            <div className="ml-2 text-2xl">&#8593;</div>
                                        )}
                                    </div>
                                </th>
                                <th className="border-2 border-solid border-gray-500 px-2 cursor-pointer select-none" onClick={() => sortHandler('name')}>
                                    <div className=" flex flex-row justify-center items-center">
                                        Name{' '}
                                        {sortBy.column != 'name' ? null : sortBy.order === 'ASC' ? (
                                            <div className="ml-2 text-2xl">&#8595;</div>
                                        ) : (
                                            <div className="ml-2 text-2xl">&#8593;</div>
                                        )}
                                    </div>
                                </th>
                                <th className="border-2 border-solid border-gray-500 px-2 cursor-pointer select-none" onClick={() => sortHandler('type')}>
                                    <div className=" flex flex-row justify-center items-center">
                                        Type{' '}
                                        {sortBy.column != 'type' ? null : sortBy.order === 'ASC' ? (
                                            <div className="ml-2 text-2xl">&#8595;</div>
                                        ) : (
                                            <div className="ml-2 text-2xl">&#8593;</div>
                                        )}
                                    </div>
                                </th>
                                <th className="border-2 border-solid border-gray-500 px-2 cursor-pointer select-none" onClick={() => sortHandler('address')}>
                                    <div className=" flex flex-row justify-center items-center">
                                        Address{' '}
                                        {sortBy.column != 'address' ? null : sortBy.order === 'ASC' ? (
                                            <div className="ml-2 text-2xl">&#8595;</div>
                                        ) : (
                                            <div className="ml-2 text-2xl">&#8593;</div>
                                        )}
                                    </div>
                                </th>
                                <th className="border-2 border-solid border-gray-500 px-2 cursor-pointer select-none" onClick={() => sortHandler('city')}>
                                    <div className=" flex flex-row justify-center items-center">
                                        City{' '}
                                        {sortBy.column != 'city' ? null : sortBy.order === 'ASC' ? (
                                            <div className="ml-2 text-2xl">&#8595;</div>
                                        ) : (
                                            <div className="ml-2 text-2xl">&#8593;</div>
                                        )}
                                    </div>
                                </th>
                                <th className="border-2 border-solid border-gray-500 px-2 cursor-pointer select-none" onClick={() => sortHandler('county')}>
                                    <div className=" flex flex-row justify-center items-center">
                                        County{' '}
                                        {sortBy.column != 'county' ? null : sortBy.order === 'ASC' ? (
                                            <div className="ml-2 text-2xl">&#8595;</div>
                                        ) : (
                                            <div className="ml-2 text-2xl">&#8593;</div>
                                        )}
                                    </div>
                                </th>
                                <th className="border-2 border-solid border-gray-500 px-2 cursor-pointer select-none" onClick={() => sortHandler('postcode')}>
                                    <div className=" flex flex-row justify-center items-center">
                                        Postcode{' '}
                                        {sortBy.column != 'postcode' ? null : sortBy.order === 'ASC' ? (
                                            <div className="ml-2 text-2xl">&#8595;</div>
                                        ) : (
                                            <div className="ml-2 text-2xl">&#8593;</div>
                                        )}
                                    </div>
                                </th>
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
