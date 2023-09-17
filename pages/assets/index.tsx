import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../components/store/store';
import ModalBase from '../../components/modal/modal';
import Loading from '../../components/loading/loading';
import RetrieveError from '../../components/error/retrieveError';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faWrench } from '@fortawesome/free-solid-svg-icons';
import { useAssets } from '../../components/assets/index/useAssets';
import { useOpenBranches } from '../../components/assets/assetUtil/useOpenBranches';
import { useAssetTree } from '../../components/assets/assetUtil/useAssetTree';
import FullPage from '../../components/page/fullPage';
import Toolbar from '../../components/page/toolbar';

const Assets = () => {
    const currentProperty = useSelector((state: RootState) => state.currentProperty.value.currentProperty);
    const { assetTree, loading, error, reload } = useAssets(currentProperty);
    const { openBranches, toggle } = useOpenBranches();
    const [editMode, setEditMode] = useState(false);
    const [viewModal, setViewModal] = useState(false);
    const [modalType, setModalType] = useState('');
    const [modalProps, setModalProps] = useState({});
    const { allRoots } = useAssetTree({ type: 'index', assetTree, openBranches, toggle, editMode, setViewModal, setModalType, setModalProps });

    return (
        <>
            <FullPage>
                <Toolbar>
                    <button className="ml-8 hover:text-accent flex flex-row items-center" onClick={() => setEditMode((prev) => !prev)}>
                        {editMode ? <FontAwesomeIcon icon={faWrench} className="mr-1 w-3" /> : <FontAwesomeIcon icon={faPencil} className="mr-1 w-3" />}
                        {editMode ? 'Switch to Work Mode' : 'Switch to Edit Mode'}
                    </button>
                </Toolbar>
                {viewModal ? <ModalBase modalType={modalType} payload={modalProps} closeModal={() => [setViewModal(false), setModalType(''), setModalProps(''), reload()]} /> : ''}
                {loading ? <Loading /> : assetTree.length === 0 ? <div>There is no data</div> : error ? <RetrieveError /> : <div className="ml-5">{allRoots}</div>}
            </FullPage>
        </>
    );
};

export default Assets;
