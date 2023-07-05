import axios from 'axios';
import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import RetrieveError from '../../error/retrieveError';
import Loading from '../../loading/loading';
import { RootState } from '../../store/store';
import { SERVER_URL } from '../../routing/addressAPI';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import FormHeader from '../../forms/formHeader';
import GeneralFormSubmit from '../../forms/generalFormSubmit';
import GeneralFormInput from '../../forms/generalFormInput';

interface ModalProps {
    closeModal: () => void;
    payload: { id: number; title: string };
}

const AddEditSparesNote = (props: ModalProps) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const alertString = `There has been an issue ${props.payload.id > 0 ? 'editing' : 'creating'} this Note, please try again.`;
    const currentProperty = useSelector((state: RootState) => state.currentProperty.value.currentProperty);
    const [title, setTitle] = useState('');
    const [note, setNote] = useState('');
    const [count, setcount] = useState(0);
    const noteId = props.payload.id;
    const [defaultValues, setDefaultValues] = useState({title: '', note: ''})

    const formValidation = yup.object().shape({
        title: yup.string().required().max(45),
        note: yup.string().required().max(1000),
    });

    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(formValidation),
        defaultValues: useMemo(() => {
            return defaultValues;
        }, [defaultValues]),
    });

    const watchType = watch(['note']);

    useEffect(() => {
        if (props.payload.id > 0) {
            setError(false);
            setLoading(true);
            getHandler();
        } else {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        reset(defaultValues);
    }, [defaultValues]);

    const getHandler = async () => {
        try {
            const response = await axios.get(`${SERVER_URL}/spares/note/${props.payload?.id}`, {
                headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') },
            });
            setDefaultValues({title: response.data[0].title, note: response.data[0].content});
            setcount(response.data[0].content.length);
            setLoading(false);
        } catch (err) {
            setError(true);
            setLoading(false);
        }
    };

    const handleRegistration = async (data: any) => {
        try {
            const response = await axios.put(
                `${SERVER_URL}/spares/notes`,
                {
                    propertyId: currentProperty,
                    title: data.title,
                    note: data.note,
                    noteId: props.payload.id,
                },
                {
                    headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') },
                }
            );
            if (response.data.created) {
                props.closeModal();
            } else {
                alert(alertString);
            }
        } catch (err) {
            alert(alertString);
        }
    };

    return (
        <>
            {loading ? (
                <Loading />
            ) : error ? (
                <RetrieveError />
            ) : (
                <div className="h-full w-full rounded-lg relative border-4 border-blue-200">
                    <FormHeader label={props.payload.title.length > 0 ? props.payload.title : 'Add Note'} />
                    <form onSubmit={handleSubmit(handleRegistration)} className="flex flex-col justify-start px-4 pt-2 overflow-y-auto h-[calc(100%-104px)]">
                        <div className="text-center">This note will be visible to anyone who visits the Spares Management Page</div>
                        <GeneralFormInput register={register} label="Title" type="text" formName="title" errors={errors} required={true} />
                        <GeneralFormInput register={register} label="Note" type="textarea" formName="note" errors={errors} rows={10} />
                        <div className="text-center">{watchType[0].length} / 1000 Charachters</div>
                        <GeneralFormSubmit closeModal={props.closeModal} />
                    </form>
                </div>
            )}
        </>
    );
};

export default AddEditSparesNote;
