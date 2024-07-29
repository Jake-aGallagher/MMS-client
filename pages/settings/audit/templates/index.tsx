import Link from "next/link";
import FullPage from "../../../../components/layout/page/fullPage";
import Toolbar from "../../../../components/layout/page/toolbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import LoadingNoDataError from "../../../../components/loading/loadingNoDataError";
import { DataTableConfig } from "../../../../components/dataTable/types/configType";
import DataTable from "../../../../components/dataTable/dataTable";
import { useAuditTemplates } from "../../../../components/settings/audits/templates/useAuditTemplates";
import ModalBase from "../../../../components/layout/modal/modal";
import { useState } from "react";

const AuditTemplates = () => {
    const { templates, loading, error, reload } = useAuditTemplates();
    const [modal, setModal] = useState<{ view: boolean; type: string; payload: { id: number; name: string } }>({ view: false, type: '', payload: { id: 0, name: '' } });

    const auditTemplateTableConfig: DataTableConfig = {
        headers: [
            { id: 'id', name: 'ID', type: 'link', search: true, order: true },
            { id: 'title', name: 'Title', type: 'string', search: true, order: true },
            { id: 'latest_version', name: 'Latest Version', type: 'number', search: true, order: true },
        ],
        searchable: true,
        linkColPrefix: '/settings/audit/templates/',
    };

    const addAuditTemplate = () => {
        setModal({ view: true, type: 'addAuditTemplate', payload: { id: 0, name: '' } });
    };
    
    return (
        <FullPage>
            <Toolbar>
                <Link href="/settings" className="tLink">
                    <FontAwesomeIcon icon={faArrowLeft} className="mr-1 w-3" />
                    <p>Return to Settings</p>
                </Link>
                <button onClick={addAuditTemplate} className="tLink">
                        <div className="text-2xl mr-1 pb-1">+</div>
                        Add Template
                    </button>
            </Toolbar>
            {modal.view ? <ModalBase modalType={modal.type} payload={{ ...modal.payload }} closeModal={() => [setModal({ view: false, type: '', payload: { id: 0, name: '' } }), reload()]} /> : null}
            <LoadingNoDataError loading={loading} error={error}>
                <DataTable config={auditTemplateTableConfig} data={templates} />
            </LoadingNoDataError>
        </FullPage>
    );
};

export default AuditTemplates;
