import { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import RetrieveError from '../../components/error/retrieveError';
import Loading from '../../components/loading/loading';
import ModalBase from '../../components/modal/modal';
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

interface SortBy {
    column: 'id' | 'name' | 'type' | 'address' | 'city' | 'county' | 'postcode';
    order: 'ASC' | 'DESC';
}

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
    const [loading, setLoading] = useState(true);
    const [noData, setNoData] = useState(false);
    const [error, setError] = useState(false);
    const [allProperties, setAllProperties] = useState<Property[]>([]);
    const [properties, setProperties] = useState<Property[]>([]);
    const [searchBy, setSearchBy] = useState('id');
    const [searchTerm, setSearchTerm] = useState('');
    const [viewModal, setViewModal] = useState(false);
    const [modalType, setmodalType] = useState('');
    const [sortBy, setSortBy] = useState<SortBy>({ column: 'id', order: 'ASC' });
    //console.log('search by: ', searchBy, 'term: ', searchTerm);

    useEffect(() => {
        reload();
    }, []);

    const reload = () => {
        setLoading(true);
        setError(false);
        setNoData(false);
        getHandler();
    };

    useEffect(() => {
        searchFilter();
    }, [searchBy, searchTerm]);

    const getHandler = async () => {
        try {
            const propertiesList = await axios.get('http://localhost:3001/properties/all-properties', {
                headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') },
            });
            if (propertiesList.data.length === 0) {
                setNoData(true);
            } else {
                propertiesList.data.sort((a: Property, b: Property) => a.id - b.id);
                setAllProperties(propertiesList.data);
                setProperties(propertiesList.data);
            }
            setLoading(false);
        } catch (err) {
            setError(true);
            setLoading(false);
        }
    };

    const searchFilter = () => {
        let filtered = allProperties;
        if (searchTerm.length > 0) {
            filtered = allProperties.filter((prop) => {
                // @ts-ignore
                return prop[searchBy].toString().toLowerCase().includes(searchTerm.toLowerCase());
            });
            setProperties(filtered);
        } else {
            setProperties(filtered);
        }
        sortFunction(sortBy.column, sortBy.order, filtered);
    };

    const sortHandler = (column: 'id' | 'name' | 'type' | 'address' | 'city' | 'county' | 'postcode') => {
        if (sortBy.column === column && sortBy.order === 'ASC') {
            setSortBy({ column: column, order: 'DESC' });
            sortFunction(column, 'DESC');
        } else {
            setSortBy({ column: column, order: 'ASC' });
            sortFunction(column, 'ASC');
        }
    };

    const sortFunction = (
        column: 'id' | 'name' | 'type' | 'address' | 'city' | 'county' | 'postcode',
        order: 'ASC' | 'DESC',
        propertiesGiven: Property[] = properties
    ) => {
        let unorderedProps: Property[] = propertiesGiven;
        if (order === 'ASC') {
            unorderedProps.sort((a, b) => (a[column] > b[column] ? 1 : a[column] < b[column] ? -1 : 0));
        } else {
            unorderedProps.sort((a, b) => (b[column] > a[column] ? 1 : b[column] < a[column] ? -1 : 0));
        }
        const orderedProperties = unorderedProps;
        setProperties(orderedProperties);
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
                ) : noData ? (
                    <div>There is no data</div>
                ) : error ? (
                    <RetrieveError />
                ) : (
                    <>
                        <div className="flex flex-row my-4 items-center">
                            <div className="ml-8">
                                <div className="grid grid-cols-2 grid-rows-2 gap-2">
                                    <label htmlFor="searchBy" className="justify-self-center">
                                        Search By:
                                    </label>
                                    <select id="searchBy" name="searchBy" value={searchBy} onChange={(e) => [setSearchBy(e.target.value), setSearchTerm('')]}>
                                        <option value="id">Property Number</option>
                                        <option value="name">Name</option>
                                        <option value="type">Type</option>
                                        <option value="address">Address</option>
                                        <option value="city">City</option>
                                        <option value="county">County</option>
                                        <option value="postcode">Postcode</option>
                                    </select>
                                    <label htmlFor="search" className="justify-self-center">
                                        Search For:
                                    </label>
                                    <input
                                        type="text"
                                        id="search"
                                        name="search"
                                        className="bg-blue-200 rounded-sm"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>
                            </div>
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
                                    <th
                                        className="border-2 border-solid border-gray-500 px-2 cursor-pointer select-none"
                                        onClick={() => sortHandler('address')}
                                    >
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
                                    <th
                                        className="border-2 border-solid border-gray-500 px-2 cursor-pointer select-none"
                                        onClick={() => sortHandler('postcode')}
                                    >
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
                        <br />
                        <br />
                        <SortableTable config={propertiesTableConfig} data={allProperties} /> 
                    </>
                )}
            </div>
        </>
    );
};

export default Properties;
