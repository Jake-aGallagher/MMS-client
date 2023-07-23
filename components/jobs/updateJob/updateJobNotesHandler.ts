import { updateJobNotesConn } from './updateJobNotesConn';

export const updatejobNotesHandler = async (data: any, jobId: number, closeModal: () => void) => {
    const response = await updateJobNotesConn({
        id: jobId,
        notes: data.notes,
    });
    if (response.data.created) {
        closeModal();
    } else {
        alert('There has been an issue updating this Job, please try again.');
    }
};
