import { useState, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store/store';
import ModalBase from '../../../../modal/modal';
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

interface ModalProps {
    closeModal: () => void;
    payload: { id: number; name: string };
}

interface Spare {
    id: number;
    part_no: string;
    name: string;
    num_used: number;
}

const AddEditDelivery = (props: ModalProps) => {
    const currentProperty = useSelector((state: RootState) => state.currentProperty.value.currentProperty);
    const { defaultValues, suppliersList, contents, loading, error, setContents } = useAddEditDelivery(props.payload.id, currentProperty);
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
        await addEditDeliveryHandler(data, contents, props.payload.id, currentProperty, props.closeModal, props.payload.name);
    };

    return (
        <>
            <LoadingNoDataError loading={loading} error={error}>
                <>
                    {viewModal ? (
                        <ModalBase
                            modalType="sparesUsed"
                            payload={{ sparesUsed: contents, type: 'delivery' }}
                            fullSize={true}
                            passbackDeatails={addSparesHandler}
                            closeModal={() => setViewModal(false)}
                        />
                    ) : (
                        ''
                    )}
                    <FormContainer>
                        <FormHeader label={props.payload.name.length > 0 ? props.payload.name : 'Add Delivery'} />
                        <GeneralForm handleSubmit={handleSubmit} handleRegistration={handleRegistration}>
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

                            <button className="rounded-3xl bg-blue-50 hover:bg-blue-600 h-8 my-2 border-2 border-blue-600" onClick={(e) => [e.preventDefault(), setViewModal(true)]}>
                                Add Spares to Delivery
                            </button>
                            <div>
                                {contents.map((spare) => (
                                    <div key={spare.id} className={`flex flex-row border-2 border-blue-600 rounded-md my-4 w-fit px-2 ${spare.num_used < 1 ? 'hidden' : ''}`}>
                                        <div className="mr-4">{spare.part_no}</div>
                                        <div className="mr-4">{spare.name}</div>
                                        <div>Quantity Ordered: {spare.num_used}</div>
                                    </div>
                                ))}
                            </div>

                            <GeneralFormInput
                                register={register}
                                label="Delivery Arrived, Selecting this Will automatically add the Spares items to stock"
                                type="checkbox"
                                formName="arrived"
                                errors={errors}
                                required={true}
                            />
                            <GeneralFormSubmit closeModal={props.closeModal} />
                        </GeneralForm>
                    </FormContainer>
                </>
            </LoadingNoDataError>
        </>
    );
};

export default AddEditDelivery;
