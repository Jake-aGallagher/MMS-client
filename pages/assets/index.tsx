import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../components/store/store';
import Link from 'next/link';
import GreaterThan from '../../public/GreaterThan.png';
import axios from 'axios';
import ModalBase from '../../components/modal/modal';
import Loading from '../../components/loading/loading';
import RetrieveError from '../../components/error/retrieveError';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faWrench } from '@fortawesome/free-solid-svg-icons';
import { SERVER_URL } from '../../components/routing/addressAPI';

interface AssetTreeItem {
    id: number;
    parentId: number;
    name: string;
    breadcrumbs: string;
    children: [];
}

const Assets = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const currentProperty = useSelector((state: RootState) => state.currentProperty.value.currentProperty);
    const [assetTree, setAssetTree] = useState<AssetTreeItem[]>([]);
    const [openBranches, setOpenBranches] = useState<number[]>([]);
    const [editMode, setEditMode] = useState(false);
    const [viewModal, setViewModal] = useState(false);
    const [modalType, setModalType] = useState('');
    const [modalProps, setModalProps] = useState({});

    useEffect(() => {
        setLoading(true);
        setError(false);
        getAssetTree();
    }, [currentProperty]);

    const getAssetTree = async () => {
        try {
            const response = await axios.get(`${SERVER_URL}/asset-tree/${currentProperty}`, {
                headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') },
            });
            setAssetTree(response.data);
            setLoading(false);
        } catch (err) {
            setError(true);
            setLoading(false);
        }
    };

    const toggle = (id: number) => {
        if (openBranches.includes(id)) {
            const newArray = openBranches.filter((item: number) => item != id);
            setOpenBranches(newArray);
        } else {
            setOpenBranches((prev) => [...prev, id]);
        }
    };

    const allRoots = assetTree.map((root) => {
        const renderTree = (node: AssetTreeItem) => (
            <div className="pl-5 mt-2 flex flex-col" key={node.id}>
                <div className="rounded-lg px-2 h-8 flex flex-row items-center relative hover:outline-blue-600 hover:outline-2 hover:outline">
                    <div
                        onClick={() => toggle(node.id)}
                        className={`flex flex-row items-center select-none  ${
                            Array.isArray(node.children) && node.children.length > 0 ? 'cursor-pointer hover:text-blue-600 icon-filter' : 'cursor-default'
                        }`}
                    >
                        {Array.isArray(node.children) && node.children.length > 0 ? (
                            <>
                                <button className={`mr-1 h-5 w-5 font-bold text-2xl duration-150 ${openBranches.includes(node.id) ? 'rotate-90' : null}`}>
                                    <img src={GreaterThan.src} />
                                </button>
                            </>
                        ) : (
                            <>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</> // Not pretty but can't use a div and css here as it upsets the layout of the following buttons
                        )}
                        {node.name}
                    </div>

                    {editMode ? (
                        <div className="absolute right-2 flex flex-row">
                            <button
                                onClick={() => [setViewModal(true), setModalType('addEditAsset'), setModalProps({ type: 'edit', id: node.id, name: node.name })]}
                                className="rounded-xl ml-5 text-sm bg-blue-50 hover:bg-blue-600 h-6 px-3 border-2 border-blue-600 hover:border-transparent"
                            >
                                Rename
                            </button>
                            <button
                                onClick={() => [setViewModal(true), setModalType('addEditAsset'), setModalProps({ type: 'add', id: node.id, name: node.name })]}
                                className="rounded-xl ml-5 text-sm bg-blue-50 hover:bg-blue-600 h-6 px-3 border-2 border-blue-600 hover:border-transparent"
                            >
                                + Add Child Component
                            </button>
                            {node.parentId != 0 ? (
                                <button
                                    onClick={() => [setViewModal(true), setModalType('deleteAsset'), setModalProps({ id: node.id, name: node.name })]}
                                    className="rounded-xl ml-5 text-sm hover:font-medium hover:text-white bg-sky-50 hover:bg-red-600 h-6 px-3 border-2 border-red-600 hover:border-transparent"
                                >
                                    Delete
                                </button>
                            ) : (
                                <div className="w-16 ml-6"></div>
                            )}
                        </div>
                    ) : (
                        <div className="absolute right-2">
                            {node.parentId != 0 ? (
                                <button className="rounded-xl ml-5 text-sm bg-blue-50 hover:bg-blue-600 h-6 px-3 border-2 border-blue-600 hover:border-transparent">
                                    <Link href={'/assets/' + node.id}>View Component Details</Link>
                                </button>
                            ) : null}

                            <button
                                onClick={() => [setViewModal(true), setModalType('createJob'), setModalProps({ assetId: node.id })]}
                                className="rounded-xl ml-5 text-sm bg-blue-50 hover:bg-blue-600 h-6 px-3 border-2 border-blue-600 hover:border-transparent"
                            >
                                Create Job
                            </button>
                        </div>
                    )}
                </div>
                {Array.isArray(node.children) && openBranches.includes(node.id) ? node.children.map((nodes) => renderTree(nodes)) : null}
            </div>
        );
        return renderTree(root);
    });

    return (
        <>
            <div className="w-full h-full pt-12 overflow-x-auto overflow-y-auto bg-gray-100">
                <div className="fixed top-0 left-52 right-0 z-10 bg-gray-200 h-12 border-b-2 border-gray-300 flex flex-row justify-start items-center">
                    <button className="ml-8 hover:text-blue-600 flex flex-row items-center" onClick={() => setEditMode((prev) => !prev)}>
                        {editMode ? <FontAwesomeIcon icon={faWrench} className="mr-1 w-3" /> : <FontAwesomeIcon icon={faPencil} className="mr-1 w-3" />}
                        {editMode ? 'Switch to Work Mode' : 'Switch to Edit Mode'}
                    </button>
                </div>
                {viewModal ? (
                    <ModalBase
                        modalType={modalType}
                        payload={modalProps}
                        closeModal={() => [setViewModal(false), setModalType(''), setModalProps(''), getAssetTree()]}
                    />
                ) : (
                    ''
                )}
                {loading ? <Loading /> : assetTree.length === 0 ? <div>There is no data</div> : error ? <RetrieveError /> : <div className="ml-5">{allRoots}</div>}
            </div>
        </>
    );
};

export default Assets;
