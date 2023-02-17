import axios from 'axios';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import GreaterThan from '../../public/GreaterThan.png';
import { RootState } from '../store/store';

interface LowWarnings {
    id: number;
    part_no: string;
    name: string;
    supplier: string;
    quant_remain: number;
    monthly_usage: number | string;
}

const StockWarnings = () => {
    const currentProperty = useSelector((state: RootState) => state.currentProperty.value.currentProperty);
    const [numLow, setNumLow] = useState(0);
    const [low, setLow] = useState<LowWarnings[]>([]);
    const [showLow, setShowLow] = useState(false);
    const [numOut, setNumOut] = useState(0);
    const [out, setOut] = useState<LowWarnings[]>([]);
    const [showOut, setShowOut] = useState(false);

    useEffect(() => {
        getStockWarnings();
    }, []);

    const getStockWarnings = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/spares/${currentProperty}/warnings`, {
                headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') },
            });
            console.log(response.data);
            setLow(response.data.warningsArray);
            setOut(response.data.outArray);
            setNumLow(response.data.warningsArray.length);
            setNumOut(response.data.outArray.length);
        } catch (err) {}
    };

    const lowList = low.map((item) => (
        <tr key={'low' + item.id}>
            <td className="border border-solid border-gray-500 px-2 text-center p-2">
                <Link href={'/spares/' + item.id} className="border-b-2 border-black hover:text-blue-600 hover:border-blue-600">
                    {item.part_no}
                </Link>
            </td>
            <td className="border border-solid border-gray-500 px-2 text-center p-2">{item.name}</td>
            <td className="border border-solid border-gray-500 px-2 text-center p-2">{item.supplier}</td>
            <td className="border border-solid border-gray-500 px-2 text-center p-2">{item.quant_remain}</td>
            <td className="border border-solid border-gray-500 px-2 text-center p-2">{item.monthly_usage}</td>
        </tr>
    ));

    const outList = out.map((item) => (
        <tr key={'out' + item.id}>
            <td className="border border-solid border-gray-500 px-2 text-center p-2">
                <Link href={'/spares/' + item.id} className="border-b-2 border-black hover:text-blue-600 hover:border-blue-600">
                    {item.part_no}
                </Link>
            </td>
            <td className="border border-solid border-gray-500 px-2 text-center p-2">{item.name}</td>
            <td className="border border-solid border-gray-500 px-2 text-center p-2">{item.supplier}</td>
            <td className="border border-solid border-gray-500 px-2 text-center p-2">{item.monthly_usage}</td>
        </tr>
    ));

    const LowTable = (selector: 'low' | 'out') => (
        <table className="min-w-full table-auto border-collapse border-2 border-solid border-gray-500 ">
            <thead>
                <tr className="bg-gray-200">
                    <th className="border-2 border-solid border-gray-500 px-2">Part Number</th>
                    <th className="border-2 border-solid border-gray-500 px-2">Name</th>
                    <th className="border-2 border-solid border-gray-500 px-2">Supplier</th>
                    {selector === 'low' ? <th className="border-2 border-solid border-gray-500 px-2">Qauntity Remaining</th> : null}
                    <th className="border-2 border-solid border-gray-500 px-2">AVG Monthly Usage</th>
                </tr>
            </thead>
            <tbody>{selector === 'low' ? lowList : selector === 'out' ? outList : null}</tbody>
        </table>
    );

    return (
        <div className="px-10 pt-10">
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-semibold mb-2">Current Stock Warnings:</h2>
                <button className="flex flex-row items-center hover:text-blue-600 select-none " onClick={() => setShowLow((prev) => !prev)}>
                    <img className={`h-5 w-5 mr-1 duration-150 icon-filter ${showLow ? 'rotate-90' : null}`} src={GreaterThan.src} />
                    <div className="text-yellow-600 text-lg font-semibold">{numLow} Low Stock</div>
                </button>
                {showLow ? LowTable('low') : null}

                <button className="flex flex-row items-center hover:text-blue-600 select-none " onClick={() => setShowOut((prev) => !prev)}>
                    <img className={`h-5 w-5 mr-1 duration-150 icon-filter ${showOut ? 'rotate-90' : null}`} src={GreaterThan.src} />
                    <div className="text-red-800 text-lg font-semibold">{numOut} Out of Stock</div>
                </button>
                {showOut ? LowTable('out') : null}
            </div>
        </div>
    );
};

export default StockWarnings;
