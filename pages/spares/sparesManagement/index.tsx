import { useEffect, useState } from 'react';
import Link from 'next/link';
import GreaterThan from '../../../public/GreaterThan.png';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '../../../components/store/store';
import ModalBase from '../../../components/modal/modal';

interface Note {
    id: number;
    title: string;
    content: string;
    created_date: string;
}

const SparesManagement = () => {
    const [error, setError] = useState(false);
    const currentProperty = useSelector((state: RootState) => state.currentProperty.value.currentProperty);
    const [showNotes, setShowNotes] = useState(false);
    const [numOfNotes, setNumOfNotes] = useState(0);
    const [notes, setNotes] = useState<Note[]>([]);
    const [viewNote, setViewNote] = useState(0);
    const [viewModal, setViewModal] = useState(false);
    const [modalType, setModalType] = useState('');
    const [editNoteData, setEditNoteData] = useState<{ id: number; title: string }>({ id: 0, title: '' });

    useEffect(() => {
        setError(false);
        getHandler();
    }, [currentProperty]);

    const getHandler = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/spares/${currentProperty}/notes`, {
                headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') },
            });
            setNotes(response.data);
            setNumOfNotes(response.data.length);
        } catch (err) {
            setError(true);
        }
    };

    const noteTitles = notes.map((note) => (
        <div key={note.id + 'title'} className="flex flex-row rounded-md pl-6 mt-1 hover:outline-2 hover:outline hover:outline-blue-600 p-1">
            <div className="mr-5">{note.title}</div>
            <div className='flex flex-row justify-end ml-auto'>
            <div>{note.created_date}</div>
                <button
                    onClick={() => setViewNote(note.id)}
                    className="rounded-xl ml-5 text-sm font-normal bg-blue-50 hover:bg-blue-600 h-6 px-3 border-2 border-blue-600 hover:border-transparent"
                >
                    View
                </button>
                <button
                    onClick={() => [setViewModal(true), setModalType('addSparesNote'), setEditNoteData({ id: note.id, title: note.title })]}
                    className="rounded-xl ml-5 text-sm font-normal bg-blue-50 hover:bg-blue-600 h-6 px-3 border-2 border-blue-600 hover:border-transparent"
                >
                    Edit
                </button>
                <button
                    onClick={() => [setViewModal(true), setModalType('deleteSparesNote'), setEditNoteData({ id: note.id, title: note.title })]}
                    className="rounded-xl ml-5 text-sm font-normal bg-blue-50 hover:bg-red-600 h-6 px-3 border-2 border-red-600 hover:text-white hover:border-transparent"
                >
                    Delete
                </button>
            </div>
        </div>
    ));

    const noteToView = () => {
        const focusedNote = notes.find((x) => x.id === viewNote);
        if (focusedNote) {
            return (
                <div className="flex flex-col mt-4 ml-6 bg-blue-200 p-4 rounded-xl">
                    <div className="flex flex-row mb-2 font-semibold">
                        <div className="mr-5">{focusedNote.title}</div>
                        <div>{focusedNote.created_date}</div>
                        <button className="rounded-xl ml-auto text-sm font-normal bg-blue-50 hover:bg-blue-600 h-6 px-3 border-2 border-blue-600 hover:border-transparent" onClick={() => setViewNote(0)}>Close Note</button>
                    </div>
                    <div>{focusedNote.content}</div>
                </div>
            );
        }
    };

    return (
        <>
            {viewModal ? (
                <ModalBase
                    modalType={modalType}
                    payload={editNoteData}
                    closeModal={() => [setViewModal(false), setModalType(''), setEditNoteData({ id: 0, title: '' })]}
                />
            ) : null}
            <div className="bg-gray-100">
                <div className="px-10 pt-10">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-xl font-semibold mb-2">Current Stock Warnings:</h2>
                        <p className="text-yellow-600 text-lg font-semibold">5 Low Stock</p>
                        <p className="text-red-800 text-lg font-semibold">0 Out of Stock</p>
                        <button className="rounded-3xl bg-blue-50 hover:bg-blue-600 h-8 px-4 mt-4 border-2 border-blue-600 hover:border-transparent">
                            <Link href="/spares/sparesManagement/stockWarnings">view breakdown of stock warnigns</Link>
                        </button>
                    </div>
                </div>
                <div className="px-10 pt-5">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-xl font-semibold mb-2">Inventory</h2>
                        <p className="">Manage stock levels and adjust details of all spares as well as adding new spares to the database</p>
                        <button className="rounded-3xl bg-blue-50 hover:bg-blue-600 h-8 px-4 mt-4 border-2 border-blue-600 hover:border-transparent">
                            <Link href="/spares/sparesManagement/manageInventory">Manage Inventory</Link>
                        </button>
                    </div>
                </div>
                <div className="px-10 pt-5">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-xl font-semibold mb-2">Deliveries</h2>
                        <p className="">Manage Deliveries info here</p>
                        <button className="rounded-3xl bg-blue-50 hover:bg-blue-600 h-8 px-4 mt-4 border-2 border-blue-600 hover:border-transparent">
                            <Link href="/spares/sparesManagement/deliveries">Manage Deliveries</Link>
                        </button>
                    </div>
                </div>
                <div className="px-10 pt-5">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-xl font-semibold mb-2">Suppliers</h2>
                        <p className="">Manage info about suppliers and the spares they supply</p>
                        <button className="rounded-3xl bg-blue-50 hover:bg-blue-600 h-8 px-4 mt-4 border-2 border-blue-600 hover:border-transparent">
                            <Link href="/spares/sparesManagement/suppliers">Manage Suppliers info</Link>
                        </button>
                    </div>
                </div>
                <div className="px-10 p-5">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-xl font-semibold mb-2">
                            Notes
                            <button
                                onClick={() => [setViewModal(true), setModalType('addSparesNote')]}
                                className="rounded-xl ml-5 text-sm font-normal bg-blue-50 hover:bg-blue-600 h-6 px-3 border-2 border-blue-600 hover:border-transparent"
                            >
                                Add Note
                            </button>
                        </h2>
                        <button
                            className="flex flex-row items-center hover:text-blue-600 icon-filter select-none"
                            onClick={() => setShowNotes((prev) => !prev)}
                        >
                            <img className={`h-5 w-5 mr-1 duration-150 ${showNotes ? 'rotate-90' : null}`} src={GreaterThan.src} />
                            <div>
                                {numOfNotes} Saved Note{numOfNotes === 1 ? null : 's'}
                            </div>
                        </button>
                        {!showNotes ? null : notes.length > 0 ? <div className="w-max">{noteTitles}</div> : <div>No Notes Available</div>}
                        {viewNote > 0 ? noteToView() : null}
                    </div>
                </div>
            </div>
        </>
    );
};

export default SparesManagement;
