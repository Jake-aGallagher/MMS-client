import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import GreaterThan from '../../../../public/GreaterThan.png';
import ModalBase from '../../../modal/modal';
import { useSparesNotes } from './useSparesNotes';
import NoteTitlesList from './noteTitlesList';
import NoteToView from './noteToView';

const SparesNotes = () => {
    const currentProperty = useSelector((state: RootState) => state.currentProperty.value.currentProperty);
    const { notes, numOfNotes, reload } = useSparesNotes(currentProperty);
    const [showNotes, setShowNotes] = useState(false);
    const [viewNote, setViewNote] = useState(0);
    const [viewModal, setViewModal] = useState(false);
    const [modalType, setModalType] = useState('');
    const [editNoteData, setEditNoteData] = useState<{ id: number; title: string }>({ id: 0, title: '' });

    return (
        <>
            {viewModal ? (
                <ModalBase
                    modalType={modalType}
                    payload={modalType == 'addEditSparesNote' ? editNoteData : { id: editNoteData.id, name: editNoteData.title, url: 'spares/note' }}
                    closeModal={() => [setViewModal(false), setModalType(''), setEditNoteData({ id: 0, title: '' }), reload()]}
                />
            ) : null}
            <div className="px-10 p-5">
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h2 className="text-xl font-semibold mb-2">
                        Notes
                        <button
                            onClick={() => [setViewModal(true), setModalType('addEditSparesNote'), setEditNoteData({ id: 0, title: '' })]}
                            className="rounded-xl ml-5 text-sm font-normal bg-blue-50 hover:bg-blue-600 h-6 px-3 border-2 border-blue-600 hover:border-transparent"
                        >
                            Add Note
                        </button>
                    </h2>
                    <button className="flex flex-row items-center hover:text-blue-600 icon-filter select-none" onClick={() => setShowNotes((prev) => !prev)}>
                        <img className={`h-5 w-5 mr-1 duration-150 ${showNotes ? 'rotate-90' : null}`} src={GreaterThan.src} />
                        <div>
                            {numOfNotes} Saved Note{numOfNotes === 1 ? null : 's'}
                        </div>
                    </button>
                    {!showNotes ? null : notes.length > 0 ? (
                        <NoteTitlesList notes={notes} setViewNote={setViewNote} setViewModal={setViewModal} setModalType={setModalType} setEditNoteData={setEditNoteData} />
                    ) : (
                        <div>No Notes Available</div>
                    )}
                    {viewNote > 0 ? <NoteToView notes={notes} viewNote={viewNote} setViewNote={setViewNote} /> : null}
                </div>
            </div>
        </>
    );
};

export default SparesNotes;
