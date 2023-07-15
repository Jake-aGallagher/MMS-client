import { useState } from 'react';
import { useRouter } from 'next/router';
import ModalBase from '../../components/modal/modal';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faPencil } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { RootState } from '../../components/store/store';
import SortableTable from '../../components/sortableTable/sortableTable';
import LoadingNoDataError from '../../components/loading/loadingNoDataError';
import { useSparesDetails } from '../../components/spares/details/useSparesDetails';
import SparesDetailsRender from '../../components/spares/details/sparesDetailsRender';

const jobTableConfig = {
    headers: [
        { id: 'id', name: 'Job Number', type: 'link', search: true, order: true },
        { id: 'asset_name', name: 'Asset', type: 'string', search: true, order: true },
        { id: 'type', name: 'Type', type: 'string', search: true, order: true },
        { id: 'title', name: 'Title', type: 'string', search: true, order: true },
        { id: 'created', name: 'Created', type: 'date', search: true, order: true },
        { id: 'completed', name: 'Completed', type: 'completed', search: true, order: true },
    ],
    searchable: false,
    linkColPrefix: '/jobs/',
};

const SparesView = () => {
    const params = useRouter();
    const spareId = params.asPath.split('/')[2];
    const currentProperty = useSelector((state: RootState) => state.currentProperty.value.currentProperty);
    const { sparesDetails, recentJobs, loading, noData, error, reload } = useSparesDetails(spareId, currentProperty.toString());
    const [viewModal, setViewModal] = useState(false);
    const [modalType, setModalType] = useState('');
    const [modalProps, setModalProps] = useState({ id: 0, name: '' });

    const editStock = () => {
        setModalType('addEditSparesItem');
        setModalProps({ id: parseInt(spareId), name: sparesDetails ? sparesDetails.name : '' });
        setViewModal(true);
    };

    return (
        <>
            <div className="w-full h-full pt-12 overflow-x-auto overflow-y-auto bg-gray-100">
                <div className="fixed top-0 left-52 right-0 z-10 bg-gray-200 h-12 border-b-2 border-gray-300 flex flex-row justify-start items-center">
                    <Link href="/spares" className="ml-8 hover:text-blue-600 flex flex-row items-center">
                        <FontAwesomeIcon icon={faArrowLeft} className="mr-1 w-3" />
                        <p>Return to all Spares</p>
                    </Link>
                    <button onClick={() => editStock()} className="ml-8 hover:text-blue-600 flex flex-row items-center">
                        <FontAwesomeIcon icon={faPencil} className="mr-1 w-3" />
                        Edit Spares Item
                    </button>
                </div>

                {viewModal ? <ModalBase modalType={modalType} payload={modalProps} closeModal={() => [setViewModal(false), reload()]} /> : null}
                <LoadingNoDataError loading={loading} error={error} noData={noData}>
                    <>
                        <SparesDetailsRender sparesDetails={sparesDetails} />
                        {recentJobs.length > 0 ? <SortableTable config={jobTableConfig} data={recentJobs} /> : null}
                    </>
                </LoadingNoDataError>
            </div>
        </>
    );
};

export default SparesView;
