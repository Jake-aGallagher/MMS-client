import axios from 'axios';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import RetrieveError from '../../../../components/error/retrieveError';
import Loading from '../../../../components/loading/loading';
import ModalBase from '../../../../components/modal/modal';
import { RootState } from '../../../../components/store/store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

interface Suppliers {
    id: number;
    name: string;
    website: string;
    phone: string;
    prim_contact: string;
    prim_contact_phone: string;
    address: string;
    city: string;
    county: string;
    postcode: string;
    supplies: string;
}

const Suppliers = () => {
    const [loading, setLoading] = useState(true);
    const [noData, setNoData] = useState(false);
    const [error, setError] = useState(false);
    const currentProperty = useSelector((state: RootState) => state.currentProperty.value.currentProperty);
    const [suppliersList, setSuppliersList] = useState<Suppliers[]>([]);
    const [viewModal, setViewModal] = useState(false);
    const [modalType, setModalType] = useState('');
    const [supplierId, setSupplierId] = useState({ id: 0, name: '' });

    useEffect(() => {
        setLoading(true);
        setError(false);
        setNoData(false);
        getHandler();
    }, []);

    const getHandler = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/spares/suppliers/${currentProperty}`, {
                headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') },
            });
            if (response.data.length === 0) {
                setNoData(true);
            } else {
                setSuppliersList(response.data);
            }
            setLoading(false);
        } catch (err) {
            setError(true);
            setLoading(false);
        }
    };

    const addEditSupplier = (e: React.MouseEvent<HTMLElement>, id: number, name: string) => {
        e.preventDefault();
        setSupplierId({ id, name });
        setModalType('addEditSupplier');
        setViewModal(true);
    };

    const deleteSupplier = (e: React.MouseEvent<HTMLElement>, id: number, name: string) => {
        e.preventDefault();
        setSupplierId({ id, name });
        setModalType('deleteSupplier');
        setViewModal(true);
    };

    const suppliers = suppliersList.map((i) => (
        <tr key={'supplier' + i.id} className="">
            <td className="border border-solid border-gray-500 px-2 text-center p-2">{i.name}</td>
            <td className="border border-solid border-gray-500 px-2 text-center p-2">
                <a className="border-b-2 border-black hover:text-blue-600 hover:border-blue-600" href={'https://' + i.website} target="_blank">
                    {i.website}
                </a>
            </td>
            <td className="border border-solid border-gray-500 px-2 text-center p-2">{i.phone}</td>
            <td className="border border-solid border-gray-500 px-2 text-center p-2">{i.prim_contact}</td>
            <td className="border border-solid border-gray-500 px-2 text-center p-2">{i.prim_contact_phone}</td>
            <td className="border border-solid border-gray-500 px-2 text-center p-2">{i.address}</td>
            <td className="border border-solid border-gray-500 px-2 text-center p-2">{i.city}</td>
            <td className="border border-solid border-gray-500 px-2 text-center p-2">{i.county}</td>
            <td className="border border-solid border-gray-500 px-2 text-center p-2">{i.postcode}</td>
            <td className="border border-solid border-gray-500 px-2 text-center p-2">{i.supplies}</td>
            <td
                className="border border-solid border-gray-500 px-2 text-center p-2 hover:cursor-pointer select-none"
                onClick={(e) => addEditSupplier(e, i.id, i.name)}
            >
                &#9998;
            </td>
            <td
                className="border border-solid border-gray-500 px-2 text-center p-2 hover:cursor-pointer select-none"
                onClick={(e) => deleteSupplier(e, i.id, i.name)}
            >
                &#10060;
            </td>
        </tr>
    ));

    return (
        <>
            <div className="w-full h-full pt-12 overflow-x-auto overflow-y-auto bg-gray-100">
                <div className="fixed top-0 left-52 right-0 z-10 bg-gray-200 h-12 border-b-2 border-gray-300 flex flex-row justify-start items-center">
                    <Link href="/spares/sparesManagement" className="ml-8 hover:text-blue-600 flex flex-row items-center">
                        <FontAwesomeIcon icon={faArrowLeft} className="mr-1 w-3" />
                        <p>Return to Spares Management</p>
                    </Link>
                    <button className="ml-8 hover:text-blue-600 flex flex-row items-center" onClick={(e) => addEditSupplier(e, 0, '')}>
                        <div className="text-2xl mr-1 pb-1">+</div>
                        Add Supplier
                    </button>
                </div>
                {viewModal ? <ModalBase modalType={modalType} payload={supplierId} closeModal={() => [setViewModal(false), setModalType('')]} /> : null}
                {loading ? (
                    <Loading />
                ) : noData ? (
                    <div>There is no data</div>
                ) : error ? (
                    <RetrieveError />
                ) : (
                    <>
                        <div className="flex flex-row ml-8 my-4 items-center">
                            <label htmlFor="search">Search:</label>
                            <input type="text" id="search" name="search" className=" ml-2 bg-blue-200 rounded-sm" />
                        </div>
                        <div className="w-full overflow-x-auto overflow-y-auto bg-gray-100 mt-6">
                            <table className="min-w-full table-auto border-collapse border-2 border-solid border-gray-500 ">
                                <thead>
                                    <tr className="bg-gray-200">
                                        <th className="border-2 border-solid border-gray-500 px-2">Name</th>
                                        <th className="border-2 border-solid border-gray-500 px-2">Website</th>
                                        <th className="border-2 border-solid border-gray-500 px-2">Phone</th>
                                        <th className="border-2 border-solid border-gray-500 px-2">Primary Contact</th>
                                        <th className="border-2 border-solid border-gray-500 px-2">Primary Contact Phone</th>
                                        <th className="border-2 border-solid border-gray-500 px-2">Address</th>
                                        <th className="border-2 border-solid border-gray-500 px-2">City</th>
                                        <th className="border-2 border-solid border-gray-500 px-2">County</th>
                                        <th className="border-2 border-solid border-gray-500 px-2">Postcode</th>
                                        <th className="border-2 border-solid border-gray-500 px-2">Supplies</th>
                                        <th className="border-2 border-solid border-gray-500 px-2">Edit</th>
                                        <th className="border-2 border-solid border-gray-500 px-2">Delete</th>
                                    </tr>
                                </thead>
                                <tbody>{suppliers}</tbody>
                            </table>
                        </div>
                    </>
                )}
            </div>
        </>
    );
};

export default Suppliers;
