import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store/store';
import ModalBase from '../../../../modal/modal';
import { useSparesNotes } from './useSparesNotes';
import NoteTitlesList from './noteTitlesList';
import NoteToView from './noteToView';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretRight } from '@fortawesome/free-solid-svg-icons';

const SparesNotes = () => {
    const permissions = useSelector((state: RootState) => state.permissions.value.permissions);
    const isAdmin = useSelector((state: RootState) => state.user.value.isAdmin);
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
                <div className="bg-background p-6 rounded-md shadow-lg">
                    <h2 className="text-xl font-semibold mb-2">
                        Notes
                        {permissions.sparesManagement?.manage || isAdmin ? (
                            <button
                                onClick={() => [setViewModal(true), setModalType('addEditSparesNote'), setEditNoteData({ id: 0, title: '' })]}
                                className="btnBlue font-normal ml-5 text-sm h-6 px-3"
                            >
                                Add Note
                            </button>
                        ) : null}
                    </h2>
                    <button className="flex flex-row items-center hover:text-accent transition-all select-none" onClick={() => setShowNotes((prev) => !prev)}>
                        <FontAwesomeIcon icon={faCaretRight} className={`mr-1 w-3 transition-all ${showNotes ? 'rotate-90' : null}`} />
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
