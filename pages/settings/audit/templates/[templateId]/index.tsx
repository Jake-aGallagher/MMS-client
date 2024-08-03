import Link from 'next/link';
import FullPage from '../../../../../components/layout/page/fullPage';
import Toolbar from '../../../../../components/layout/page/toolbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import LoadingNoDataError from '../../../../../components/loading/loadingNoDataError';
import { DataTableConfig } from '../../../../../components/dataTable/types/configType';
import DataTable from '../../../../../components/dataTable/dataTable';
import ModalBase from '../../../../../components/layout/modal/modal';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useTemplateVersions } from '../../../../../components/settings/audits/templates/versions/useTemplateVersions';

const TemplateVersions = () => {
    const router = useRouter();
    const templateId = parseInt(router.asPath.split('/')[4]);
    const { templateVersions, loading, error, reload } = useTemplateVersions(templateId);
    const latestIsPublished = templateVersions.find((version) => version.latest === 1)?.published;
    const [modal, setModal] = useState<{ view: boolean; type: string; payload: { id: number; name: string } }>({ view: false, type: '', payload: { id: 0, name: '' } });

    const templateVersionsCofig: DataTableConfig = {
        headers: [
            { id: 'version', name: 'version', type: 'link', search: true, order: true },
            { id: 'title', name: 'Title', type: 'string', search: true, order: true },
            { id: 'published', name: 'Published', type: 'tick', search: true, order: true },
            { id: 'latest', name: 'Latest', type: 'tick', search: true, order: true },
        ],
        searchable: true,
        linkColPrefix: `/settings/audit/templates/${templateId}/version/`,
    };

    const addAuditVersion = () => {
        setModal({ view: true, type: 'addAuditVersion', payload: { id: templateId, name: '' } });
    };

    return (
        <FullPage>
            <Toolbar>
                <Link href="/settings/audit/templates" className="tLink">
                    <FontAwesomeIcon icon={faArrowLeft} className="mr-1 w-3" />
                    <p>Return to Templates</p>
                </Link>
                {latestIsPublished === 1 && (
                    <button onClick={addAuditVersion} className="tLink">
                        <div className="text-2xl mr-1 pb-1">+</div>
                        Add Version
                    </button>
                )}
            </Toolbar>
            {modal.view ? <ModalBase modalType={modal.type} payload={{ ...modal.payload }} closeModal={() => [setModal({ view: false, type: '', payload: { id: 0, name: '' } }), reload()]} /> : null}
            <LoadingNoDataError loading={loading} error={error}>
                <DataTable config={templateVersionsCofig} data={templateVersions} />
            </LoadingNoDataError>
        </FullPage>
    );
};

export default TemplateVersions;
