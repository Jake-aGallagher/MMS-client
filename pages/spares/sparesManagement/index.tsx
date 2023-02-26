import Link from 'next/link';
import GreaterThan from '../../../public/GreaterThan.png';
import StockWarnings from '../../../components/spares/currentStockWarnings';
import SparesNotes from '../../../components/spares/sparesManagement/sparesNotes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const SparesManagement = () => {
    return (
        <>
            <div className="w-full h-full pt-12 overflow-x-auto overflow-y-auto bg-gray-100">
                <div className="fixed top-0 left-52 right-0 z-10 bg-gray-200 h-12 border-b-2 border-gray-300 flex flex-row justify-start items-center">
                    <Link href="/spares" className="ml-8 hover:text-blue-600 flex flex-row items-center">
                        <FontAwesomeIcon icon={faArrowLeft} className="mr-1 w-3" />
                        <p>Return to Spares</p>
                    </Link>
                </div>

                <div className="bg-gray-100">
                    <StockWarnings />
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
            </div>
        </>
    );
};

export default SparesManagement;
