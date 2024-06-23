import { useState, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store/store';
import ModalBase from '../../../../layout/modal/modal';
import { useForm } from 'react-hook-form';
import FormHeader from '../../../../forms/formHeader';
import GeneralFormSubmit from '../../../../forms/generalFormSubmit';
import GeneralFormInput from '../../../../forms/generalFormInput';
import FormContainer from '../../../../forms/formContainer';
import GeneralForm from '../../../../forms/generalForm';
import LoadingNoDataError from '../../../../loading/loadingNoDataError';
import { useAddEditDelivery } from './useAddEditDelivery';
import { yupResolverAddEditDelivery } from './addEditDeliveryValidation';
import { addEditDeliveryHandler } from './addEditDeliveryHandler';
import AltTableContainer from '../../../../dataTable/altTableContainer';
import AltTableHeaders from '../../../../dataTable/altTableHeaders';
import SparesAddRemoveTable from '../../../../sparesSelector/sparesAddRemoveTable';
import FormTextCenter from '../../../../forms/formTextCenter';

interface ModalProps {
    closeModal: () => void;
    payload: { id: number; name: string };
}

interface Spare {
    id: number;
    part_no: string;
    name: string;
    quantity: number;
}

const AddEditDelivery = (props: ModalProps) => {
    const currentFacility = useSelector((state: RootState) => state.currentFacility.value.currentFacility);
    const { defaultValues, suppliersList, contents, loading, error, setContents } = useAddEditDelivery(props.payload.id, currentFacility);
    const [viewModal, setViewModal] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolverAddEditDelivery,
        defaultValues: useMemo(() => {
            return defaultValues;
        }, [defaultValues]),
    });

    useEffect(() => {
        reset(defaultValues);
    }, [defaultValues]);

    const addSparesHandler = (spares: Spare[]) => {
        setContents(spares);
    };

    const handleRegistration = async (data: any) => {
        await addEditDeliveryHandler(data, contents, props.payload.id, currentFacility, props.closeModal, props.payload.name);
    };

    return (
        <>
            {viewModal ? (
                <ModalBase
                    modalType="sparesSelector"
                    payload={{ sparesSelected: contents, type: 'delivery' }}
                    fullSize={true}
                    passbackDeatails={addSparesHandler}
                    closeModal={() => setViewModal(false)}
                />
            ) : (
                ''
            )}
            <FormContainer closeModal={props.closeModal}>
                <LoadingNoDataError loading={loading} error={error}>
                    <FormHeader label={props.payload.name.length > 0 ? props.payload.name : 'Add Delivery'} />
                    <GeneralForm handleSubmit={handleSubmit} handleRegistration={handleRegistration}>
                        {defaultValues.arrived ? (
                            <FormTextCenter label="This delivery has arrived, the spares have automatically been added to stock" />
                        ) : (
                            <>
                                <GeneralFormInput register={register} label="Delivery Name" type="text" formName="name" errors={errors} required={true} />
                                <GeneralFormInput
                                    register={register}
                                    label="Supplier"
                                    type="select"
                                    formName="supplier"
                                    errors={errors}
                                    required={true}
                                    optionNameString="name"
                                    selectOptions={suppliersList}
                                />
                                <GeneralFormInput register={register} label="Courier" type="text" formName="courier" errors={errors} required={true} />
                                <GeneralFormInput register={register} label="Placed" type="date" formName="placed" errors={errors} required={true} />
                                <GeneralFormInput register={register} label="Due" type="date" formName="due" errors={errors} required={true} />

                                <button className="btnBlue w-48 mx-auto h-8 mt-8 mb-1" onClick={(e) => [e.preventDefault(), setViewModal(true)]}>
                                    Add Spares to Delivery
                                </button>
                                {contents.length > 0 ? (
                                    <AltTableContainer className="mb-12">
                                        <AltTableHeaders headers={['Part Number', 'Name', 'Quantity', 'Add One', 'Remove One', 'Remove']} />
                                        <SparesAddRemoveTable sparesSelected={contents} setSparesSelected={setContents} />
                                    </AltTableContainer>
                                ) : (
                                    <div className="h-12"></div>
                                )}

                                <GeneralFormInput
                                    register={register}
                                    label="Delivery Arrived, Selecting this Will automatically add the Spares items to stock"
                                    type="checkbox"
                                    formName="arrived"
                                    errors={errors}
                                    required={true}
                                />
                            </>
                        )}
                        <GeneralFormSubmit closeModal={props.closeModal} cancelOnly={defaultValues.arrived} />
                    </GeneralForm>
                </LoadingNoDataError>
            </FormContainer>
        </>
    );
};

export default AddEditDelivery;
