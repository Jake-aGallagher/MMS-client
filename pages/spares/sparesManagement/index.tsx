import Link from 'next/link';
import StockWarnings from '../../../components/spares/sparesManagement/currentStockWarnings';
import SparesNotes from '../../../components/spares/sparesManagement/sparesNotes/index/sparesNotes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import DeliveriesCard from '../../../components/spares/sparesManagement/deliveriesCard';
import SuppliersCard from '../../../components/spares/sparesManagement/suppliersCard';
import FullPage from '../../../components/page/fullPage';
import Toolbar from '../../../components/page/toolbar';

const SparesManagement = () => {
    return (
        <>
            <FullPage>
                <Toolbar>
                    <Link href="/spares" className="tLink">
                        <FontAwesomeIcon icon={faArrowLeft} className="mr-1 w-3" />
                        <p>Return to Spares</p>
                    </Link>
                </Toolbar>
                <div>
                    <StockWarnings />
                    <DeliveriesCard />
                    <SuppliersCard />
                    <SparesNotes />
                </div>
            </FullPage>
        </>
    );
};

export default SparesManagement;
