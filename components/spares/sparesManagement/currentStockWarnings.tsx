import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import GreaterThan from '../../../public/GreaterThan.png';
import { RootState } from '../../store/store';
import { SERVER_URL } from '../../routing/addressAPI';
import DataTable from '../../dataTable/dataTable';

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

    const lowTableConfig = {
        headers: [
            { id: 'id', name: 'Part Number', type: 'linkWithName', nameParam: 'part_no', search: true, order: true },
            { id: 'name', name: 'Name', type: 'string', search: true, order: true },
            { id: 'supplier', name: 'Supplier', type: 'string', search: true, order: true },
            { id: 'quant_remain', name: 'Quantity Remaining', type: 'string', search: true, order: true },
            { id: 'monthly_usage', name: 'AVG Monthly Usage', type: 'string', search: true, order: true },
        ],
        searchable: false,
        linkColPrefix: '/spares/'
    };
    
    const outTableConfig = {
        headers: [
            { id: 'id', name: 'Part Number', type: 'linkWithName', nameParam: 'part_no', search: true, order: true },
            { id: 'name', name: 'Name', type: 'string', search: true, order: true },
            { id: 'supplier', name: 'Supplier', type: 'string', search: true, order: true },
            { id: 'monthly_usage', name: 'AVG Monthly Usage', type: 'string', search: true, order: true },
        ],
        searchable: false,
        linkColPrefix: '/spares/'
    };

    useEffect(() => {
        getStockWarnings();
    }, [currentProperty]);

    const getStockWarnings = async () => {
        try {
            const response = await axios.get(`${SERVER_URL}/spares/warnings/${currentProperty}`, {
                headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') },
            });
            setLow(response.data.warningsArray);
            setOut(response.data.outArray);
            setNumLow(response.data.warningsArray.length);
            setNumOut(response.data.outArray.length);
        } catch (err) {}
    };

    return (
        <div className="px-10 pt-5">
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-semibold mb-2">Current Stock Warnings:</h2>
                {numLow > 0 ? (<button className="flex flex-row items-center hover:text-blue-600 select-none " onClick={() => setShowLow((prev) => !prev)}>
                    <img className={`h-5 w-5 mr-1 duration-150 icon-filter ${showLow ? 'rotate-90' : null}`} src={GreaterThan.src} />
                    <div className="text-yellow-600 text-lg font-semibold">{numLow} Low Stock</div>
                </button>) : null}
                {showLow ? <DataTable config={lowTableConfig} data={low} /> : null}
                
                {numOut > 0 ? (<button className="flex flex-row items-center hover:text-blue-600 select-none " onClick={() => setShowOut((prev) => !prev)}>
                    <img className={`h-5 w-5 mr-1 duration-150 icon-filter ${showOut ? 'rotate-90' : null}`} src={GreaterThan.src} />
                    <div className="text-red-800 text-lg font-semibold">{numOut} Out of Stock</div>
                </button>) : null}
                {showOut ? <DataTable config={outTableConfig} data={out} /> : null}
                {numLow == 0 && numOut == 0 && 'No Stock Wanings'}
            </div>
        </div>
    );
};

export default StockWarnings;
