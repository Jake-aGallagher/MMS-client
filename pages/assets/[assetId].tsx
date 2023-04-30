import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Loading from '../../components/loading/loading';
import { RootState } from '../../components/store/store';
import GreaterThan from '../../public/GreaterThan.png';
import axios from 'axios';
import Link from 'next/link';
import RetrieveError from '../../components/error/retrieveError';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faPencil } from '@fortawesome/free-solid-svg-icons';
import ModalBase from '../../components/modal/modal';
import SortableTable from '../../components/sortableTable/sortableTable';

interface Asset {
    id: number;
    property_id: number;
    name: string;
    notes: string;
    parent_id: number;
    parent_name: string;
    grand_parent_id: number;
}

interface RecentJobs {
    id: number;
    asset_name: string;
    type: string;
    title: string;
    created: string;
    completed: number;
}

interface Children {
    id: number;
    name: string;
    parentId: number;
    breadcrumb: string;
    children: [];
}

const recentJobTableConfig = {
    headers: [
        { id: 'id', name: 'Job Number', type: 'link', search: true, order: true },
        { id: 'asset_name', name: 'Asset', type: 'string', search: true, order: true },
        { id: 'type', name: 'Type', type: 'string', search: true, order: true },
        { id: 'created', name: 'Created', type: 'date', search: true, order: true },
        { id: 'completed', name: 'Completed', type: 'completed', search: true, order: true },
    ],
    searchable: false,
    linkColPrefix: '/jobs/',
};

const AssetView = () => {
    const [loading, setLoading] = useState(true);
    const [noData, setNoData] = useState(false);
    const [error, setError] = useState(false);
    const params = useRouter();
    const authLevel = useSelector((state: RootState) => state.user.value.authority);
    const [assetDetails, setAssetDetails] = useState<Asset[]>([]);
    const [recentJobs, setRecentJobs] = useState<RecentJobs[]>([]);
    const [children, setChildren] = useState<Children[]>([]);
    const [openBranches, setOpenBranches] = useState<number[]>([]);
    const [viewModal, setViewModal] = useState(false);
    const [modalType, setModalType] = useState('');
    const [modalProps, setModalProps] = useState({ id: 0, note: '' });
    const [status, setStatus] = useState('');
    const [notes, setNotes] = useState('');

    useEffect(() => {
        reload();
    }, [params]);

    const reload = () => {
        setLoading(true);
        setError(false);
        setNoData(false);
        getAssetHandler();
    };

    const getAssetHandler = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/asset/${params.asPath.split('/')[2]}`, {
                headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') },
            });
            if (response.data.length === 0) {
                setNoData(true);
            } else {
                setAssetDetails(response.data.assetDetails);
                setModalProps({ id: response.data.assetDetails[0].id, note: response.data.assetDetails[0].notes });
                setRecentJobs(response.data.recentJobs);
                setChildren(response.data.tree);
            }
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

    const details = assetDetails.map((asset: Asset) => (
        <div key={asset.id} className="border-b-2 border-blue-600 p-5 w-full ">
            <div className="mb-2">Name: {asset.name}</div>
            <div>Notes: {asset.notes ? asset.notes : 'None'}</div>
        </div>
    ));

    const parentDetails = assetDetails.map((asset: Asset) => {
        if (asset.grand_parent_id != 0) {
            return (
                <div key={asset.parent_id}>
                    <Link href={'/assets/' + asset.parent_id} className=" border-b-2 border-black hover:text-blue-600 hover:border-blue-600">
                        {asset.parent_name}
                    </Link>
                </div>
            );
        }
        return null;
    });

    const allChildren = children.map((root) => {
        const renderTree = (node: Children) => (
            <div className="pl-5 mt-2 flex flex-col" key={node.id}>
                <div className="rounded-lg px-2 h-8 flex flex-row items-center relative hover:outline-blue-600 hover:outline-2 hover:outline">
                    <div
                        onClick={() => toggle(node.id)}
                        className={` flex flex-row items-center select-none  ${
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

                    <div className="absolute right-2">
                        <button className="rounded-xl ml-5 text-sm bg-blue-50 hover:bg-blue-600 h-6 px-3 border-2 border-blue-600 hover:border-transparent">
                            <Link href={'/assets/' + node.id}>View Component Details</Link>
                        </button>
                    </div>
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
                    <Link href="/assets" className="ml-8 hover:text-blue-600 flex flex-row items-center">
                        <FontAwesomeIcon icon={faArrowLeft} className="mr-1 w-3" />
                        <p>Return to all Assets</p>
                    </Link>
                    <button
                        className="ml-8 hover:text-blue-600 flex flex-row items-center"
                        onClick={() => [setViewModal(true), setModalType('addEditAssetNotes')]}
                    >
                        <FontAwesomeIcon icon={faPencil} className="mr-1 w-3" />
                        Edit Notes
                    </button>
                </div>
                {viewModal ? <ModalBase modalType={modalType} payload={modalProps} closeModal={() => [setViewModal(false), reload()]} /> : null}
                {loading ? (
                    <Loading />
                ) : noData ? (
                    <div>There has been an issue getting the Property Data</div>
                ) : error ? (
                    <RetrieveError />
                ) : (
                    <>
                        {details}
                        {recentJobs.length > 0 ? (
                            <div className="w-full overflow-x-auto flex flex-col items-center pb-10 border-b-2 border-blue-600 ">
                                <div className="my-4">5 Most recent jobs for Components of {assetDetails[0].name}:</div>
                                <SortableTable config={recentJobTableConfig} data={recentJobs} />
                            </div>
                        ) : null}
                        {parentDetails[0] !== null ? (
                            <div className="border-b-2 border-blue-600 w-full p-5 mt-5 pb-10">
                                Parent:
                                {parentDetails}
                            </div>
                        ) : null}
                        {allChildren.length > 0 ? (
                            <div className="border-b-2 border-blue-600  w-full p-5 my-5 pb-10">
                                Children:
                                {allChildren}
                            </div>
                        ) : null}
                    </>
                )}
            </div>
        </>
    );
};

export default AssetView;
