import { useEffect, useMemo, useState } from 'react';
import FormContainer from '../../../forms/formContainer';
import FormHeader from '../../../forms/formHeader';
import GeneralForm from '../../../forms/generalForm';
import GeneralFormInput from '../../../forms/generalFormInput';
import GeneralFormSubmit from '../../../forms/generalFormSubmit';
import LoadingNoDataError from '../../../loading/loadingNoDataError';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { useForm } from 'react-hook-form';
import AltTableContainer from '../../../dataTable/altTableContainer';
import AltTableHeaders from '../../../dataTable/altTableHeaders';
import TimeAddRemoveTable from '../../../usersSelector/timeAddRemoveTable';
import SparesAddRemoveTable from '../../../sparesSelector/sparesAddRemoveTable';
import { useEditPM } from './useEditPm';
import ModalBase from '../../../layout/modal/modal';
import FormTextCenter from '../../../forms/formTextCenter';
import { editPMHandler } from './editPMHandler';
import { FieldInputs } from '../../../settings/customFields/fieldInputs';

interface Props {
    closeModal: () => void;
    pmId: number;
}

interface Modal {
    closeModal: () => void;
    modalType: string;
    payload: any;
    fullSize: boolean;
    passbackDeatails: any;
}

const EditPM = (props: Props) => {
    const currentFacility = useSelector((state: RootState) => state.currentFacility.value.currentFacility);
    const { statusOptions, completableStatus, sparesSelected, setSparesSelected, scheduleDates, loggedTimeDetails, setLoggedTimeDetails, defaultValues, customFields, loading, noData, error } = useEditPM(
        currentFacility,
        props.pmId
    );
    const continueScheduleOptions = [
        { id: 'Yes', value: `Continue on current schedule (next due: ${scheduleDates[0].current_schedule || ''})` },
        { id: 'Adjust', value: `Adjust schedule (next due: ${scheduleDates[0].new_schedule || ''})` },
    ];
    const [viewModal, setViewModal] = useState(false);
    const [modal, setModal] = useState<Modal>({ modalType: '', payload: {}, fullSize: true, passbackDeatails: null, closeModal: () => setViewModal(false) });

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

    const modalHandler = (e: React.MouseEvent<HTMLElement>, type: 'spares' | 'users') => {
        e.preventDefault();
        if (type == 'spares') {
            setModal({ modalType: 'sparesSelector', payload: { sparesSelected, type: 'used' }, fullSize: true, passbackDeatails: setSparesSelected, closeModal: () => setViewModal(false) });
            setViewModal(true);
        } else {
            setModal({ modalType: 'usersSelector', payload: { loggedTimeDetails, type: 'updateJob' }, fullSize: true, passbackDeatails: setLoggedTimeDetails, closeModal: () => setViewModal(false) });
            setViewModal(true);
        }
    };

    const handleRegistration = async (data: any) => {
        const complete = completableStatus.includes(parseInt(data.status));
        editPMHandler(data, props.pmId, complete, currentFacility, loggedTimeDetails, sparesSelected, props.closeModal);
    };

    return (
        <>
            {viewModal ? <ModalBase modalType={modal.modalType} payload={modal.payload} fullSize={modal.fullSize} passbackDeatails={modal.passbackDeatails} closeModal={modal.closeModal} /> : null}
            <FormContainer closeModal={props.closeModal}>
                <LoadingNoDataError loading={loading} error={error} noData={noData}>
                    <FormHeader label={'Update PM'} />
                    <GeneralForm handleSubmit={handleSubmit} handleRegistration={handleRegistration}>
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
                        <GeneralFormInput register={register} label="Notes" type="textarea" formName="notes" errors={errors} rows={5} />
                        

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
                            Log Time
                        </button>
                        {loggedTimeDetails.length > 0 ? (
                            <AltTableContainer className="mb-8">
                                <AltTableHeaders headers={['Name', 'Time Logged', 'Add 5 Mins', 'Reduce 5 Mins', 'Remove']} />
                                <TimeAddRemoveTable usersSelected={loggedTimeDetails} setUsersSelected={setLoggedTimeDetails} />
                            </AltTableContainer>
                        ) : <div className='h-8'></div>}

                        {FieldInputs(customFields, register, errors, setValue)}

                        {completableStatus.includes(parseInt(String(statusWatch[0]))) ? (
                            <>
                                <GeneralFormInput
                                    register={register}
                                    label="Continue Schedule"
                                    type="select"
                                    formName="continueSchedule"
                                    errors={errors}
                                    required={true}
                                    optionNameString="value"
                                    selectOptions={continueScheduleOptions}
                                />
                                <div className="mt-auto">
                                    <FormTextCenter label="You are about to Complete this PM, once completed the only editable section will be the Notes" />
                                </div>
                            </>
                        ) : null}
                        <GeneralFormSubmit closeModal={props.closeModal} submitLabel={completableStatus.includes(parseInt(String(statusWatch[0]))) ? 'Complete' : 'Update'} />
                    </GeneralForm>
                </LoadingNoDataError>
            </FormContainer>
        </>
    );
};

export default EditPM;
