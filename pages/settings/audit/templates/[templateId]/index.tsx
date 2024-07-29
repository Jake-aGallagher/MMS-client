import Link from "next/link";
import FullPage from "../../../../../components/layout/page/fullPage";
import Toolbar from "../../../../../components/layout/page/toolbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import LoadingNoDataError from "../../../../../components/loading/loadingNoDataError";
import { DataTableConfig } from "../../../../../components/dataTable/types/configType";
import DataTable from "../../../../../components/dataTable/dataTable";
import ModalBase from "../../../../../components/layout/modal/modal";
import { useState } from "react";
import { useRouter } from "next/router";
import { useTemplateVersions } from "../../../../../components/settings/audits/templates/versions/useTemplateVersions";

const TemplateVersions = () => {
    const router = useRouter();
    const templateId = parseInt(router.asPath.split('/')[4]);
    const { templateVersions, loading, error, reload } = useTemplateVersions(templateId);
    const [modal, setModal] = useState<{ view: boolean; type: string; payload: { id: number; name: string } }>({ view: false, type: '', payload: { id: 0, name: '' } });

    const templateVersionsCofig: DataTableConfig = {
        headers: [
            { id: 'version', name: 'version', type: 'link', search: true, order: true },
            { id: 'title', name: 'Title', type: 'string', search: true, order: true },
        ],
        searchable: true,
        linkColPrefix: `/settings/audit/templates/${templateId}/version/`,
    };

    /* const addAuditTemplate = () => {
        setModal({ view: true, type: 'addAuditTemplate', payload: { id: 0, name: '' } });
    }; */
    
    return (
        <FullPage>
            <Toolbar>
                <Link href="/settings/audits/templates" className="tLink">
                    <FontAwesomeIcon icon={faArrowLeft} className="mr-1 w-3" />
                    <p>Return to Templates</p>
                </Link>
                {/* <button onClick={addAuditTemplate} className="tLink">
                        <div className="text-2xl mr-1 pb-1">+</div>
                        Add Template
                    </button> */}
            </Toolbar>
            {modal.view ? <ModalBase modalType={modal.type} payload={{ ...modal.payload }} closeModal={() => [setModal({ view: false, type: '', payload: { id: 0, name: '' } }), reload()]} /> : null}
            <LoadingNoDataError loading={loading} error={error}>
                <DataTable config={templateVersionsCofig} data={templateVersions} />
            </LoadingNoDataError>
        </FullPage>
    );
};

export default TemplateVersions;
