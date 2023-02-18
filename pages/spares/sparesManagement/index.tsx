import Link from 'next/link';
import GreaterThan from '../../../public/GreaterThan.png';
import StockWarnings from '../../../components/spares/currentStockWarnings';
import SparesNotes from '../../../components/sparesNotes/sparesNotes';

const SparesManagement = () => {
    return (
        <>
            <Link href="/spares" className="icon-filter  hover:text-blue-600 flex flex-row items-center">
                <img className="h-4 rotate-180 mr-2" src={GreaterThan.src} />
                <p className="pb-1">Return to Spares</p>
            </Link>
            <div className="bg-gray-100">
                <StockWarnings />
                <div className="px-10 pt-5">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-xl font-semibold mb-2">Inventory</h2>
                        <p className="">Manage stock levels and adjust details of all spares as well as adding new spares to the database</p>
                        <button className="rounded-3xl bg-blue-50 hover:bg-blue-600 h-8 px-4 mt-4 border-2 border-blue-600 hover:border-transparent">
                            <Link href="/spares/sparesManagement/manageInventory">Manage Inventory</Link>
                        </button>
                    </div>
                </div>
                <div className="px-10 pt-5">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-xl font-semibold mb-2">Deliveries</h2>
                        <p className="">Manage Deliveries info here</p>
                        <button className="rounded-3xl bg-blue-50 hover:bg-blue-600 h-8 px-4 mt-4 border-2 border-blue-600 hover:border-transparent">
                            <Link href="/spares/sparesManagement/deliveries">Manage Deliveries</Link>
                        </button>
                    </div>
                </div>
                <div className="px-10 pt-5">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-xl font-semibold mb-2">Suppliers</h2>
                        <p className="">Manage info about suppliers and the spares they supply</p>
                        <button className="rounded-3xl bg-blue-50 hover:bg-blue-600 h-8 px-4 mt-4 border-2 border-blue-600 hover:border-transparent">
                            <Link href="/spares/sparesManagement/suppliers">Manage Suppliers info</Link>
                        </button>
                    </div>
                </div>
                <SparesNotes />
            </div>
        </>
    );
};

export default SparesManagement;
