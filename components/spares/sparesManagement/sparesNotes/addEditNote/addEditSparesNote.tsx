import { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store/store';
import { useForm } from 'react-hook-form';
import FormHeader from '../../../../forms/formHeader';
import GeneralFormSubmit from '../../../../forms/generalFormSubmit';
import GeneralFormInput from '../../../../forms/generalFormInput';
import FormContainer from '../../../../forms/formContainer';
import GeneralForm from '../../../../forms/generalForm';
import LoadingNoDataError from '../../../../loading/loadingNoDataError';
import { useAddEditSparesNote } from './useAddEditSparesNote';
import { yupResolverAddEditSparesNote } from './addEditSparesNotevalidation';
import { addEditSparesNoteHandler } from './addEditSparesNoteHandler';

interface ModalProps {
    closeModal: () => void;
    payload: { id: number; title: string };
}

const AddEditSparesNote = (props: ModalProps) => {
    const currentProperty = useSelector((state: RootState) => state.currentProperty.value.currentProperty);
    const { defaultValues, loading, error } = useAddEditSparesNote(props.payload.id);

    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors },
    } = useForm({
        resolver: yupResolverAddEditSparesNote,
        defaultValues: useMemo(() => {
            return defaultValues;
        }, [defaultValues]),
    });

    const watchNote = watch(['note']);

    useEffect(() => {
        reset(defaultValues);
    }, [defaultValues]);

    const handleRegistration = async (data: any) => {
        await addEditSparesNoteHandler(data, props.payload.id, currentProperty, props.closeModal);
    };

    return (
        <>
            <LoadingNoDataError loading={loading} error={error}>
                <FormContainer>
                    <FormHeader label={props.payload.title.length > 0 ? props.payload.title : 'Add Note'} />
                    <GeneralForm handleSubmit={handleSubmit} handleRegistration={handleRegistration}>
                        <div className="text-center">This note will be visible to anyone who visits the Spares Management Page</div>
                        <GeneralFormInput register={register} label="Title" type="text" formName="title" errors={errors} required={true} />
                        <GeneralFormInput register={register} label="Note" type="textarea" formName="note" errors={errors} rows={10} />
                        <div className="text-center">{watchNote[0].length} / 1000 Charachters</div>
                        <GeneralFormSubmit closeModal={props.closeModal} />
                    </GeneralForm>
                </FormContainer>
            </LoadingNoDataError>
        </>
    );
};

export default AddEditSparesNote;
