import { useState, useEffect, useMemo } from 'react';
import { RootState } from '../../store/store';
import { useSelector } from 'react-redux';
import ModalBase from '../../modal/modal';
import { useForm } from 'react-hook-form';
import FormHeader from '../../forms/formHeader';
import GeneralFormSubmit from '../../forms/generalFormSubmit';
import GeneralFormInput from '../../forms/generalFormInput';
import FormContainer from '../../forms/formContainer';
import GeneralForm from '../../forms/generalForm';
import FormTextCenter from '../../forms/formTextCenter';
import LoadingNoDataError from '../../loading/loadingNoDataError';
import { useUpdateJob } from './useUpdateJob';
import LoggedTimeDisplay from './loggedTimeDisplay';
import { yupResolverUpdateJob } from './updateJobValidation';
import GeneralFileInput from '../../forms/genrealFileInput';
import { updatejobNotesHandler } from './updateJobNotesHandler';
import { updateJobFullHandler } from './updateJobFullHandler';

interface ModalProps {
    closeModal: () => void;
    jobId: number;
}

const UpdateJob = (props: ModalProps) => {
    const currentProperty = useSelector((state: RootState) => state.currentProperty.value.currentProperty);
    const { statusOptions, users, sparesSelected, setSparesSelected, completed, loggedTimeDetails, setLoggedTimeDetails, defaultValues, loading, noData, error } = useUpdateJob(
        currentProperty,
        props.jobId
    );
    const [viewModal, setViewModal] = useState(false);
    const [files, setFiles] = useState<Blob[]>([]);

    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors },
    } = useForm({
        resolver: yupResolverUpdateJob,
        defaultValues: useMemo(() => {
            return defaultValues;
        }, [defaultValues]),
    });

    const statusWatch = watch(['status']);

    useEffect(() => {
        reset(defaultValues);
    }, [defaultValues]);

    const handleRegistration = async (data: any) => {
        if ((statusWatch[0] == 19 || statusWatch[0] == 20) && completed !== 1) {
            if (confirm('You are about to Complete this Job, once completed the only editable section will be the Notes, are you sure you want to continue') === true) {
                updateJobFullHandler(true, data, props.jobId, currentProperty, loggedTimeDetails, sparesSelected, files, props.closeModal);
            }
        } else if (completed !== 1) {
            updateJobFullHandler(false, data, props.jobId, currentProperty, loggedTimeDetails, sparesSelected, files, props.closeModal);
        } else {
            updatejobNotesHandler(data, props.jobId, props.closeModal);
        }
    };

    return (
        <>
            <LoadingNoDataError loading={loading} error={error} noData={noData}>
                <>
                    {viewModal ? (
                        <ModalBase modalType="SparesSelector" payload={{ sparesSelected, type: 'used' }} fullSize={true} passbackDeatails={setSparesSelected} closeModal={() => setViewModal(false)} />
                    ) : null}
                    <FormContainer>
                        <FormHeader label={'Update Job'} />
                        <GeneralForm handleSubmit={handleSubmit} handleRegistration={handleRegistration}>
                            {completed !== 1 ? (
                                <>
                                    <GeneralFormInput
                                        register={register}
                                        label="Current Status"
                                        type="select"
                                        formName="status"
                                        errors={errors}
                                        required={true}
                                        optionNameString="value"
                                        selectOptions={statusOptions}
                                    />
                                    <GeneralFormInput register={register} label="Description" type="textarea" formName="description" errors={errors} rows={5} />
                                </>
                            ) : null}
                            <GeneralFormInput register={register} label="Notes" type="textarea" formName="notes" errors={errors} rows={5} />

                            {completed !== 1 ? (
                                <>
                                    <GeneralFileInput files={files} setFiles={setFiles} />
                                    <button className="rounded-md hover:bg-secondary h-8 my-2 border-2 border-accent hover:border-primary transition-all " onClick={(e) => [e.preventDefault(), setViewModal(true)]}>
                                        Log Spares Used
                                    </button>
                                    <div>
                                        {sparesSelected.map((spare) => (
                                            <div key={spare.id} className={`flex flex-row border-2 border-blue-600 rounded-md my-4 w-fit px-2 ${spare.quantity < 1 ? 'hidden' : ''}`}>
                                                <div className="mr-4">{spare.part_no}</div>
                                                <div className="mr-4">{spare.name}</div>
                                                <div>Quantity Used: {spare.quantity}</div>
                                            </div>
                                        ))}
                                    </div>
                                    <LoggedTimeDisplay users={users} loggedTimeDetails={loggedTimeDetails} setLoggedTimeDetails={setLoggedTimeDetails} />
                                    <FormTextCenter label={"Note: A job must be set to 'Attended - Found no Issues' or 'Attended - Fixed' in order to complete the job"} />
                                </>
                            ) : null}
                            <GeneralFormSubmit closeModal={props.closeModal} submitLabel={(statusWatch[0] == 19 || statusWatch[0] == 20) && completed !== 1 ? 'Complete' : 'Update'} />
                        </GeneralForm>
                    </FormContainer>
                </>
            </LoadingNoDataError>
        </>
    );
};

export default UpdateJob;
