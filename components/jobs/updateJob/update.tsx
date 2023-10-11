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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus, faTrashCan } from '@fortawesome/free-solid-svg-icons';

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

    const tableHead = () => {
        const headers = ['Part Number', 'Name', 'Quantity', 'Add One', 'Remove One', 'Remove'];
        const headersHtml = headers.map((header) => (
            <th className="font-semibold" key={'current_item_header_' + header}>
                {header}
            </th>
        ));
        return (
            <thead>
                <tr>{headersHtml}</tr>
            </thead>
        );
    };

    const updateSparesSelected = (id: number, type: 'add' | 'minus' | 'remove') => {
        const index = sparesSelected.findIndex((item) => item.id == id);
        const spareItem = sparesSelected.filter((item) => item.id == id)[0];
        const newArr = [...sparesSelected];
        if (type == 'add') {
            newArr[index] = { ...spareItem, quantity: spareItem.quantity + 1 };
        } else if (type == 'minus' && spareItem.quantity > 0) {
            newArr[index] = { ...spareItem, quantity: spareItem.quantity - 1 };
        } else if (type == 'remove') {
            newArr[index] = { ...spareItem, quantity: 0 };
        }
        setSparesSelected(newArr);
    };

    const showCurrent = sparesSelected.map((item) => (
        <tr className="odd:bg-secAlt even:bg-secondary" key={'current_item_' + item.id}>
            <td className="text-center">{item.part_no}</td>
            <td className="text-center">{item.name}</td>
            <td className="text-center">{item.quantity}</td>
            <td className="hover:text-primary transition-all cursor-pointer" onClick={() => updateSparesSelected(item.id, 'add')}>
                <FontAwesomeIcon icon={faPlus} className="h-5 m-auto" />
            </td>
            <td className="hover:text-primary transition-all cursor-pointer" onClick={() => updateSparesSelected(item.id, 'minus')}>
                <FontAwesomeIcon icon={faMinus} className="h-5 m-auto" />
            </td>
            <td className="hover:text-primary transition-all cursor-pointer" onClick={() => updateSparesSelected(item.id, 'remove')}>
                <FontAwesomeIcon icon={faTrashCan} className="h-5 m-auto" />
            </td>
        </tr>
    ));

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
                                    <button className="btnBlue h-8 mt-4 mb-1" onClick={(e) => [e.preventDefault(), setViewModal(true)]}>
                                        Log Spares Used
                                    </button>
                                    <div className="w-full relative">
                                        <div className="overflow-x-auto rounded-xl shadow-lg">
                                            <table className="w-full table-auto bg-secondary">
                                                {tableHead()}
                                                <tbody>{showCurrent}</tbody>
                                            </table>
                                        </div>
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
