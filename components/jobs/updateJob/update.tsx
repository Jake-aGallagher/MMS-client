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
import LoadingNoDataError from '../../loading/loadingNoDataError';
import { useUpdateJob } from './useUpdateJob';
import { yupResolverUpdateJob } from './updateJobValidation';
import { updatejobNotesHandler } from './updateJobNotesHandler';
import { updateJobFullHandler } from './updateJobFullHandler';
import AltTableHeaders from '../../dataTable/altTableHeaders';
import AltTableContainer from '../../dataTable/altTableContainer';
import SparesAddRemoveTable from '../../sparesSelector/sparesAddRemoveTable';
import TimeAddRemoveTable from '../../usersSelector/timeAddRemoveTable';
import { FieldInputs } from '../../settings/customFields/fieldInputs';

interface ModalProps {
    closeModal: () => void;
    jobId: number;
}

interface Modal {
    closeModal: () => void;
    modalType: string;
    payload: any;
    fullSize: boolean;
    passbackDeatails: any;
}

const UpdateJob = (props: ModalProps) => {
    const currentProperty = useSelector((state: RootState) => state.currentProperty.value.currentProperty);
    const {
        statusOptions,
        completableStatus,
        sparesSelected,
        setSparesSelected,
        loggedTimeDetails,
        setLoggedTimeDetails,
        sparesMissing,
        setSparesMissing,
        downtime,
        setDowntime,
        completed,
        defaultValues,
        customFields,
        loading,
        noData,
        error,
    } = useUpdateJob(currentProperty, props.jobId);
    const [viewModal, setViewModal] = useState(false);
    const [modal, setModal] = useState<Modal>({ modalType: '', payload: {}, fullSize: true, passbackDeatails: null, closeModal: () => setViewModal(false) });
    const [files, setFiles] = useState<File[]>([]);

    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors },
        setValue,
    } = useForm({
        defaultValues: useMemo(() => {
            return defaultValues;
        }, [defaultValues]),
    });

    const statusWatch = watch(['status']);

    useEffect(() => {
        reset(defaultValues);
    }, [defaultValues]);

    const modalHandler = (e: React.MouseEvent<HTMLElement>, type: 'spares' | 'users' | 'missing' | 'downtime') => {
        e.preventDefault();
        switch (type) {
            case 'spares':
                setModal({ modalType: 'sparesSelector', payload: { sparesSelected, type: 'used' }, fullSize: true, passbackDeatails: setSparesSelected, closeModal: () => setViewModal(false) });
                setViewModal(true);
                break;
            case 'users':
                setModal({
                    modalType: 'usersSelector',
                    payload: { loggedTimeDetails, type: 'updateJob' },
                    fullSize: true,
                    passbackDeatails: setLoggedTimeDetails,
                    closeModal: () => setViewModal(false),
                });
                setViewModal(true);
                break;
            case 'missing':
                setModal({ modalType: 'sparesSelector', payload: { sparesSelected: sparesMissing, type: 'missing' }, fullSize: true, passbackDeatails: setSparesMissing, closeModal: () => setViewModal(false) });
                setViewModal(true);
                break;
            case 'downtime':
                setModal({ modalType: 'downtimeSelector', payload: { assetsSelected: downtime, type: 'downtime' }, fullSize: true, passbackDeatails: setDowntime, closeModal: () => setViewModal(false) });
                setViewModal(true);
                break;
        }
    };

    const handleRegistration = async (data: any) => {
        if (completableStatus.includes(parseInt(String(statusWatch[0]))) && completed !== 1) {
            if (confirm('You are about to Complete this Job, once completed the only editable section will be the Notes, are you sure you want to continue') === true) {
                updateJobFullHandler(true, data, props.jobId, currentProperty, loggedTimeDetails, sparesSelected, sparesMissing, downtime, files, props.closeModal);
            }
        } else if (completed !== 1) {
            updateJobFullHandler(false, data, props.jobId, currentProperty, loggedTimeDetails, sparesSelected, sparesMissing, downtime, files, props.closeModal);
        } else {
            updatejobNotesHandler(data, props.jobId, props.closeModal);
        }
    };

    return (
        <>
            {viewModal ? <ModalBase modalType={modal.modalType} payload={modal.payload} fullSize={modal.fullSize} passbackDeatails={modal.passbackDeatails} closeModal={modal.closeModal} /> : null}
            <FormContainer closeModal={props.closeModal}>
                <LoadingNoDataError loading={loading} error={error} noData={noData}>
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
                                <button className="btnBlue w-48 h-8 mb-1" onClick={(e) => modalHandler(e, 'spares')}>
                                    Log Spare Parts Used
                                </button>
                                {sparesSelected.length > 0 ? (
                                    <AltTableContainer className="mb-4">
                                        <AltTableHeaders headers={['Part Number', 'Name', 'Quantity', 'Add One', 'Remove One', 'Remove']} />
                                        <SparesAddRemoveTable sparesSelected={sparesSelected} setSparesSelected={setSparesSelected} />
                                    </AltTableContainer>
                                ) : null}

                                <button className="btnBlue w-48 h-8 mt-4 mb-1" onClick={(e) => modalHandler(e, 'users')}>
                                    Log Engineer's Time
                                </button>
                                {loggedTimeDetails.length > 0 ? (
                                    <AltTableContainer className="mb-4">
                                        <AltTableHeaders headers={['Name', 'Time Logged', 'Add 5 Mins', 'Reduce 5 Mins', 'Remove']} />
                                        <TimeAddRemoveTable usersSelected={loggedTimeDetails} setUsersSelected={setLoggedTimeDetails} />
                                    </AltTableContainer>
                                ) : null}

                                <button className="btnBlue w-48 h-8 mt-4 mb-1" onClick={(e) => modalHandler(e, 'missing')}>
                                    Log Spare Parts Missing
                                </button>
                                {sparesMissing.length > 0 ? (
                                    <AltTableContainer className="mb-4">
                                        <AltTableHeaders headers={['Part Number', 'Name', 'Quantity', 'Add One', 'Remove One', 'Remove']} />
                                        <SparesAddRemoveTable sparesSelected={sparesMissing} setSparesSelected={setSparesMissing} />
                                    </AltTableContainer>
                                ) : null}

                                <button className="btnBlue w-48 h-8 mt-4 mb-1" onClick={(e) => modalHandler(e, 'downtime')}>
                                    Log Asset Downtime
                                </button>
                                {downtime.length > 0 ? (
                                    <AltTableContainer className="mb-4">
                                        <AltTableHeaders headers={['Asset', 'Downtime', 'Add 5 Mins', 'Reduce 5 Mins', 'Remove']} />
                                        <TimeAddRemoveTable usersSelected={downtime} setUsersSelected={setDowntime} />
                                    </AltTableContainer>
                                ) : (
                                    <div className="mb-8"></div>
                                )}

                                {FieldInputs(customFields, register, errors, setValue)}
                            </>
                        ) : null}
                        <GeneralFormSubmit closeModal={props.closeModal} submitLabel={completableStatus.includes(parseInt(String(statusWatch[0]))) && completed !== 1 ? 'Complete' : 'Update'} />
                    </GeneralForm>
                </LoadingNoDataError>
            </FormContainer>
        </>
    );
};

export default UpdateJob;
