import Link from 'next/link';
import GreaterThan from '../../../public/GreaterThan.png';
import { SetStateAction } from 'react';

interface Props {
    type: string;
    assetTree: AssetTreeItem[];
    openBranches: number[];
    toggle: (id: number) => void;
    editMode?: boolean;
    setViewModal: (value: SetStateAction<boolean>) => void;
    setModalType: (value: SetStateAction<string>) => void;
    setModalProps: (value: SetStateAction<{}>) => void;
}

interface AssetTreeItem {
    id: number;
    parentId: number;
    name: string;
    note: string;
    breadcrumbs: string;
    children: [];
}

export const useAssetTree = (props: Props) => {
    const allRoots = props.assetTree.map((root) => {
        const renderTree = (node: AssetTreeItem) => (
            <div className="pl-5 mt-2 flex flex-col" key={node.id}>
                <div className="rounded-lg px-2 h-8 flex flex-row items-center relative hover:outline-blue-600 hover:outline-2 hover:outline">
                    <div
                        onClick={() => props.toggle(node.id)}
                        className={`flex flex-row items-center select-none  ${
                            Array.isArray(node.children) && node.children.length > 0 ? 'cursor-pointer hover:text-blue-600 icon-filter' : 'cursor-default'
                        }`}
                    >
                        {Array.isArray(node.children) && node.children.length > 0 ? (
                            <>
                                <button className={`mr-1 h-5 w-5 font-bold text-2xl duration-150 ${props.openBranches.includes(node.id) ? 'rotate-90' : null}`}>
                                    <img src={GreaterThan.src} />
                                </button>
                            </>
                        ) : (
                            <>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</> // Not pretty but can't use a div and css here as it upsets the layout of the following buttons
                        )}
                        {node.name}
                    </div>

                    {props.editMode ? (
                        <div className="absolute right-2 flex flex-row">
                            <button
                                onClick={() => [props.setViewModal(true), props.setModalType('addEditAsset'), props.setModalProps({ type: 'edit', id: node.id, name: node.name, note: node.note })]}
                                className="rounded-xl ml-5 text-sm bg-blue-50 hover:bg-blue-600 h-6 px-3 border-2 border-blue-600 hover:border-transparent"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => [props.setViewModal(true), props.setModalType('addEditAsset'), props.setModalProps({ type: 'add', id: node.id, name: node.name })]}
                                className="rounded-xl ml-5 text-sm bg-blue-50 hover:bg-blue-600 h-6 px-3 border-2 border-blue-600 hover:border-transparent"
                            >
                                + Add Child Component
                            </button>
                            {node.parentId != 0 ? (
                                <button
                                    onClick={() => [props.setViewModal(true), props.setModalType('deleteAsset'), props.setModalProps({ id: node.id, name: node.name })]}
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
                                onClick={() => [props.setViewModal(true), props.setModalType('createJob'), props.setModalProps({ assetId: node.id })]}
                                className="rounded-xl ml-5 text-sm bg-blue-50 hover:bg-blue-600 h-6 px-3 border-2 border-blue-600 hover:border-transparent"
                            >
                                Create Job
                            </button>
                        </div>
                    )}
                </div>
                {Array.isArray(node.children) && props.openBranches.includes(node.id) ? node.children.map((nodes) => renderTree(nodes)) : null}
            </div>
        );
        return renderTree(root);
    });
    return { allRoots };
};
