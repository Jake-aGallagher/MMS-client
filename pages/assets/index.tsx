import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../components/store/store';
import ModalBase from '../../components/modal/modal';
import Loading from '../../components/loading/loading';
import RetrieveError from '../../components/error/retrieveError';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faWrench } from '@fortawesome/free-solid-svg-icons';
import { useAssets } from '../../components/assets/index/useAssets';
import { useOpenBranches } from '../../components/assets/index/useOpenBranches';
import { useAssetTree } from '../../components/assets/index/useAssetTree';

const Assets = () => {
    const currentProperty = useSelector((state: RootState) => state.currentProperty.value.currentProperty);
    const { assetTree, loading, error, reload } = useAssets(currentProperty);
    const { openBranches, toggle } = useOpenBranches();
    const [editMode, setEditMode] = useState(false);
    const [viewModal, setViewModal] = useState(false);
    const [modalType, setModalType] = useState('');
    const [modalProps, setModalProps] = useState({});
    const { allRoots } = useAssetTree(assetTree, openBranches, toggle, editMode, setViewModal, setModalType, setModalProps);

    return (
        <>
            <div className="w-full h-full pt-12 overflow-x-auto overflow-y-auto bg-gray-100">
                <div className="fixed top-0 left-52 right-0 z-10 bg-gray-200 h-12 border-b-2 border-gray-300 flex flex-row justify-start items-center">
                    <button className="ml-8 hover:text-blue-600 flex flex-row items-center" onClick={() => setEditMode((prev) => !prev)}>
                        {editMode ? <FontAwesomeIcon icon={faWrench} className="mr-1 w-3" /> : <FontAwesomeIcon icon={faPencil} className="mr-1 w-3" />}
                        {editMode ? 'Switch to Work Mode' : 'Switch to Edit Mode'}
                    </button>
                </div>
                {viewModal ? <ModalBase modalType={modalType} payload={modalProps} closeModal={() => [setViewModal(false), setModalType(''), setModalProps(''), reload()]} /> : ''}
                {loading ? <Loading /> : assetTree.length === 0 ? <div>There is no data</div> : error ? <RetrieveError /> : <div className="ml-5">{allRoots}</div>}
            </div>
        </>
    );
};

export default Assets;
