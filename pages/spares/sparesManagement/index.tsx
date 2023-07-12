import Link from 'next/link';
import StockWarnings from '../../../components/spares/sparesManagement/currentStockWarnings';
import SparesNotes from '../../../components/spares/sparesManagement/sparesNotes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import DeliveriesCard from '../../../components/spares/sparesManagement/deliveriesCard';
import SuppliersCard from '../../../components/spares/sparesManagement/suppliersCard';

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
                    <DeliveriesCard />
                    <SuppliersCard />
                    <SparesNotes />
                </div>
            </div>
        </>
    );
};

export default SparesManagement;
