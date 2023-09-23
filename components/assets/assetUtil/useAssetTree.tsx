import Link from 'next/link';
import { SetStateAction } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretRight } from '@fortawesome/free-solid-svg-icons';

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
            <div className="rounded-md mt-2 flex flex-col outline-accent hover:outline-1 hover:outline-dashed transition-colors" key={node.id}>
                <div className="rounded-md px-2 h-8 flex flex-row items-center relative outline-accent hover:outline-2 hover:outline transition-colors">
                    <div
                        onClick={() => props.toggle(node.id)}
                        className={`flex flex-row items-center select-none text-text transition-all  ${
                            Array.isArray(node.children) && node.children.length > 0 ? 'cursor-pointer hover:text-accent ' : 'cursor-default'
                        }`}
                    >
                        {Array.isArray(node.children) && node.children.length > 0 ? (
                            <>
                                <button className={`mr-1 h-5 w-5 font-bold text-2xl ${props.openBranches.includes(node.id) ? 'rotate-90' : null}`}>
                                    <FontAwesomeIcon icon={faCaretRight} className={`mr-1 w-3`} />
                                </button>
                            </>
                        ) : (
                            <>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</> // Not pretty but can't use a div and css here as it upsets the layout of the following buttons
                        )}
                        <div>{node.name}</div>
                    </div>

                    {props.editMode ? (
                        <div className="absolute right-2 flex flex-row">
                            <button
                                onClick={() => [props.setViewModal(true), props.setModalType('addEditAsset'), props.setModalProps({ type: 'edit', id: node.id, name: node.name, note: node.note })]}
                                className="btnBlue ml-5 text-sm h-6 px-3"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => [props.setViewModal(true), props.setModalType('addEditAsset'), props.setModalProps({ type: 'add', id: node.id, name: node.name })]}
                                className="btnBlue ml-5 text-sm h-6 px-3"
                            >
                                + Add Child Component
                            </button>
                            {node.parentId != 0 ? (
                                <button
                                    onClick={() => [props.setViewModal(true), props.setModalType('deleteAsset'), props.setModalProps({ id: node.id, name: node.name })]}
                                    className="btnRed ml-5 text-sm h-6 px-3"
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
                                <button className="btnBlue ml-5 text-sm h-6 px-3">
                                    <Link href={'/assets/' + node.id}>View Component Details</Link>
                                </button>
                            ) : null}

                            <button
                                onClick={() => [props.setViewModal(true), props.setModalType('createJob'), props.setModalProps({ assetId: node.id })]}
                                className="btnBlue ml-5 text-sm h-6 px-3"
                            >
                                Create Job
                            </button>
                        </div>
                    )}
                </div>
                <div className='pl-5'>{Array.isArray(node.children) && props.openBranches.includes(node.id) ? node.children.map((nodes) => renderTree(nodes)) : null}</div>
            </div>
        );
        return renderTree(root);
    });
    return { allRoots };
};
