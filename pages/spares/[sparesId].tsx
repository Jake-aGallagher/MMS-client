import { useState } from 'react';
import { useRouter } from 'next/router';
import ModalBase from '../../components/modal/modal';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faPencil } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { RootState } from '../../components/store/store';
import LoadingNoDataError from '../../components/loading/loadingNoDataError';
import { useSparesDetails } from '../../components/spares/details/useSparesDetails';
import SparesDetailsRender from '../../components/spares/details/sparesDetailsRender';
import DataTable from '../../components/dataTable/dataTable';
import FullPage from '../../components/page/fullPage';
import Toolbar from '../../components/page/toolbar';

const jobTableConfig = {
    headers: [
        { id: 'id', name: 'Job Number', type: 'link', search: true, order: true },
        { id: 'asset_name', name: 'Asset', type: 'string', search: true, order: true },
        { id: 'type', name: 'Type', type: 'string', search: true, order: true },
        { id: 'title', name: 'Title', type: 'string', search: true, order: true },
        { id: 'created', name: 'Created', type: 'date', search: true, order: true },
        { id: 'completed', name: 'Completed', type: 'tick', search: true, order: true },
    ],
    searchable: false,
    linkColPrefix: '/jobs/',
};

const SparesView = () => {
    const params = useRouter();
    const spareId = params.asPath.split('/')[2];
    const currentProperty = useSelector((state: RootState) => state.currentProperty.value.currentProperty);
    const { sparesDetails, recentJobs, loading, noData, error, reload } = useSparesDetails(spareId, currentProperty.toString());
    const [modal, setModal] = useState<{ view: boolean; type: string; payload: { id: number; name: string } }>({ view: false, type: '', payload: { id: 0, name: '' } });

    const editStock = () => {
        setModal({ view: true, type: 'addEditSparesItem', payload: { id: parseInt(spareId), name: sparesDetails ? sparesDetails.name : '' } });
    };

    return (
        <>
            <FullPage>
                <Toolbar>
                    <Link href="/spares" className="ml-8 hover:text-accent flex flex-row items-center">
                        <FontAwesomeIcon icon={faArrowLeft} className="mr-1 w-3" />
                        <p>Return to all Spares</p>
                    </Link>
                    <button onClick={() => editStock()} className="ml-8 hover:text-accent flex flex-row items-center">
                        <FontAwesomeIcon icon={faPencil} className="mr-1 w-3" />
                        Edit Spares Item
                    </button>
                </Toolbar>
                {modal.view ? <ModalBase modalType={modal.type} payload={modal.payload} closeModal={() => [setModal({ view: false, type: '', payload: { id: 0, name: '' } }), reload()]} /> : null}
                <LoadingNoDataError loading={loading} error={error} noData={noData}>
                    <>
                        <SparesDetailsRender sparesDetails={sparesDetails} />
                        {recentJobs.length > 0 ? <DataTable config={jobTableConfig} data={recentJobs} /> : null}
                    </>
                </LoadingNoDataError>
            </FullPage>
        </>
    );
};

export default SparesView;
