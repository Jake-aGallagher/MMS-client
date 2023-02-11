import { useState, useEffect } from 'react';
import axios from 'axios';
import RetrieveError from '../../components/error/retrieveError';
import Loading from '../../components/loading/loading';
import { RootState } from '../../components/store/store';
import { useSelector } from 'react-redux';
import Link from 'next/link';

interface Spare {
    id: number;
    part_no: string;
    man_part_no: string;
    name: string;
    man_name: string;
    description: string | null;
    notes: string | null;
    location: string;
    quant_remain: number;
    supplier: string;
    reorder_freq: string;
    reorder_num: number;
    running_low: number;
    avg_usage: number;
    cost: number;
}

const Spares = () => {
    const [loading, setLoading] = useState(true);
    const [noData, setNoData] = useState(false);
    const [error, setError] = useState(false);
    const currentProperty = useSelector((state: RootState) => state.currentProperty.value.currentProperty);
    const [spares, setSpares] = useState<Spare[]>([]);

    useEffect(() => {
        setLoading(true);
        setError(false);
        setNoData(false);
        getHandler();
    }, [currentProperty]);

    const getHandler = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/all-spares/${currentProperty}`, {
                headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') },
            });
            if (response.data.length === 0) {
                setNoData(true);
            } else {
                setSpares(response.data);
            }
            setLoading(false);
        } catch (err) {
            setError(true);
            setLoading(false);
        }
    };

    var sparesList;
    sparesList = spares.map((spare) => (
        <tr key={spare.id} className="">
            <td className="border border-solid border-gray-500 px-2 text-center p-2">
                <Link href={'/spares/' + spare.id} className="border-b-2 border-black hover:text-blue-600 hover:border-blue-600">
                    {spare.part_no}
                </Link>
            </td>
            <td className="border border-solid border-gray-500 px-2 text-center p-2">{spare.man_part_no}</td>
            <td className="border border-solid border-gray-500 px-2 text-center p-2">{spare.name}</td>
            <td className="border border-solid border-gray-500 px-2 text-center p-2">{spare.man_name}</td>
            <td className="border border-solid border-gray-500 px-2 text-center p-2">{spare.location}</td>
            <td className="border border-solid border-gray-500 px-2 text-center p-2">
                <div className="flex flex-row justify-center">
                    {spare.quant_remain === 0 ? (
                        <div>&#10060;</div>
                    ) : spare.avg_usage != 0 && spare.quant_remain / spare.avg_usage > 1 ? (
                        <div>&#10004;</div>
                    ) : (
                        <div>&#9888;</div>
                    )}
                    {spare.quant_remain}
                </div>
            </td>
            <td className="border border-solid border-gray-500 px-2 text-center p-2">{spare.avg_usage}</td>
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
                    <div className="flex flex-row ml-8 my-4 items-center">
                        <label htmlFor="search">Search:</label>
                        <input type="text" id="search" name="search" className=" ml-2 bg-blue-200 rounded-sm" />
                        <Link href="/spares/sparesManagement">
                            <button className='ml-10 rounded-3xl bg-blue-50 hover:bg-blue-600 h-8 px-4 border-2 border-blue-600 hover:border-transparent"'>
                                Spares Management
                            </button>
                        </Link>
                    </div>
                    <div className="flex flex-row justify-end ml-8 my-4 items-center">
                        <div className="flex flex-row items-center border-2 border-gray-500 p-1 mr-4">
                            <div>&#10004;</div>
                            <div className="mr-5 ml-1 text-sm">Greater than 1 Months supply</div>
                            <div>&#9888;</div>
                            <div className="mr-5 ml-1 text-sm">Less than 1 Months supply</div>
                            <div>&#10060;</div>
                            <div className="mr-5 ml-1 text-sm">Nil stock remaining</div>
                        </div>
                    </div>
                    <table className="min-w-full table-auto border-collapse border-2 border-solid border-gray-500 ">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="border-2 border-solid border-gray-500 px-2">Part Number</th>
                                <th className="border-2 border-solid border-gray-500 px-2">Manufacturers Part Number</th>
                                <th className="border-2 border-solid border-gray-500 px-2">Name</th>
                                <th className="border-2 border-solid border-gray-500 px-2">Manufacturers Part Name</th>
                                <th className="border-2 border-solid border-gray-500 px-2">Location</th>
                                <th className="border-2 border-solid border-gray-500 px-2">Remaining Stock</th>
                                <th className="border-2 border-solid border-gray-500 px-2">Usage (Avg per Month)</th>
                            </tr>
                        </thead>
                        <tbody>{sparesList}</tbody>
                    </table>
                </div>
            )}
        </>
    );
};

export default Spares;
