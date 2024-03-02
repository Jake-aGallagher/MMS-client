import Link from "next/link";
import FullPage from "../../../../components/page/fullPage";
import Toolbar from "../../../../components/page/toolbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import LoadingNoDataError from "../../../../components/loading/loadingNoDataError";
import { useTaskTypes } from "../../../../components/settings/taskTypes/index/useTaskTypes";
import { DataTableConfig } from "../../../../components/dataTable/types/configType";
import DataTable from "../../../../components/dataTable/dataTable";

const CustomFieldsJobs = () => {
    const { taskTypes, loading, error } = useTaskTypes();

    const taskTypeTableConfig: DataTableConfig = {
        headers: [
            { id: 'id', name: 'ID', type: 'link', search: true, order: true },
            { id: 'value', name: 'Value', type: 'string', search: true, order: true },
            { id: 'list_priority', name: 'Order', type: 'number', search: true, order: true },
        ],
        searchable: true,
        linkColPrefix: '/settings/customFields/jobs/',
    };
    
    return (
        <FullPage>
            <Toolbar>
                <Link href="/settings" className="tLink">
                    <FontAwesomeIcon icon={faArrowLeft} className="mr-1 w-3" />
                    <p>Return to Settings</p>
                </Link>
            </Toolbar>
            <LoadingNoDataError loading={loading} error={error}>
                <DataTable config={taskTypeTableConfig} data={taskTypes} />
            </LoadingNoDataError>
        </FullPage>
    );
};

export default CustomFieldsJobs;
