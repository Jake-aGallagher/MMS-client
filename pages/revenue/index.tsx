import { useSelector } from "react-redux";
import DataTable from "../../components/dataTable/dataTable";
import LoadingNoDataError from "../../components/loading/loadingNoDataError";
import FullPage from "../../components/layout/page/fullPage";
import Toolbar from "../../components/layout/page/toolbar";
import { useRevenue } from "../../components/revenue/index/useRevenue";
import { RootState } from "../../components/store/store";

const RevenueCenter = () => {
    const currentFacility = useSelector((state: RootState) => state.currentFacility.value.currentFacility);
    const { assets, loading, error, reload } = useRevenue({ currentFacility });

    const assetsTableConfig = {
        headers: [
            { id: 'id', name: 'ID', type: 'link', search: true, order: true },
            { id: 'name', name: 'Asset', type: 'string', search: true, order: true },
            { id: 'revenue', name: 'Revenue per Min (£)', type: 'string', search: true, order: true },
        ],
        title: 'Assets with recorded Revenue per Minute',
        searchable: true,
        linkColPrefix: '/maintenance/assets/',
    };

    return (
        <FullPage>
            <Toolbar>
            </Toolbar>
            <LoadingNoDataError loading={loading} error={error}>
                <DataTable config={assetsTableConfig} data={assets} />
            </LoadingNoDataError>
        </FullPage>
    );
};

export default RevenueCenter;
