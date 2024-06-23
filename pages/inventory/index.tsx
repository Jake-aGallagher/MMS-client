import FullPage from '../../components/layout/page/fullPage';
import Toolbar from '../../components/layout/page/toolbar';
import { useSelector } from 'react-redux';
import { RootState } from '../../components/store/store';
import { useRouter } from 'next/navigation';
import ProductsCard from '../../components/inventory/index/productsCard';
import StockCard from '../../components/inventory/index/stockCard';
import WarehouseCard from '../../components/inventory/index/warehouseCard';
import ForecastingCard from '../../components/inventory/index/forecastingCard';
import ValuationCard from '../../components/inventory/index/valuationCard';
import IndexWrapper from '../../components/layout/indexWrapper';

const Inventory = () => {
    const permissions = useSelector((state: RootState) => state.permissions.value.permissions);
    const isAdmin = useSelector((state: RootState) => state.user.value.isAdmin);
    const router = useRouter();
    if (!permissions.inventory?.view && !isAdmin) {
        router.push('/');
    }

    return (
        <>
            <FullPage>
                <Toolbar></Toolbar>
                <IndexWrapper>
                    <ProductsCard />
                    <StockCard />
                    <WarehouseCard />
                    <ForecastingCard />
                    <ValuationCard />
                </IndexWrapper>
            </FullPage>
        </>
    );
};

export default Inventory;
