import FullPage from '../../components/page/fullPage';
import Toolbar from '../../components/page/toolbar';
import { useSelector } from 'react-redux';
import { RootState } from '../../components/store/store';
import { useRouter } from 'next/navigation';
import SuppliersCard from '../../components/supplyChain/index/suppliersCard';
import OrdersCard from '../../components/supplyChain/index/ordersCard';
import TransportCard from '../../components/supplyChain/index/transportCard';
import IndexWrapper from '../../components/layout/indexWrapper';

const SuplyChain = () => {
    const permissions = useSelector((state: RootState) => state.permissions.value.permissions);
    const isAdmin = useSelector((state: RootState) => state.user.value.isAdmin);
    const router = useRouter();
    if (!permissions.supply?.view && !isAdmin) {
        router.push('/');
    }

    return (
        <>
            <FullPage>
                <Toolbar></Toolbar>
                <IndexWrapper>
                    <SuppliersCard />
                    <OrdersCard />
                    <TransportCard />
                </IndexWrapper>
            </FullPage>
        </>
    );
};

export default SuplyChain;
