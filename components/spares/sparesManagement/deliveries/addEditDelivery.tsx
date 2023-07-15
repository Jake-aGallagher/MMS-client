import { useState, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import axios from 'axios';
import ModalBase from '../../../modal/modal';
import { SERVER_URL } from '../../../routing/addressAPI';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import FormHeader from '../../../forms/formHeader';
import GeneralFormSubmit from '../../../forms/generalFormSubmit';
import GeneralFormInput from '../../../forms/generalFormInput';
import FormContainer from '../../../forms/formContainer';
import GeneralForm from '../../../forms/generalForm';
import LoadingNoDataError from '../../../loading/loadingNoDataError';

interface ModalProps {
    closeModal: () => void;
    payload: { id: number; name: string };
}

interface Supplier {
    id: number;
    name: string;
}

interface Contents {
    id: number;
    part_no: string;
    name: string;
    num_used: number;
}

interface RetrievedContents {
    spare_id: number;
    part_no: string;
    name: string;
    quantity: number;
}

interface Delivery {
    id: number;
    name: string;
    supplier: string;
    courier: string;
    placed: string;
    due: string;
    contents: Contents[];
}

const AddEditDelivery = (props: ModalProps) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const currentProperty = useSelector((state: RootState) => state.currentProperty.value.currentProperty);
    const alertString = `There has been an issue ${props.payload.name.length > 0 ? 'editing' : 'creating'} this Delivery, please try again.`;
    const [suppliersList, setSuppliersList] = useState<Supplier[]>();
    const [id, setId] = useState(0);
    const [contents, setContents] = useState<Contents[]>([]);
    const [viewModal, setViewModal] = useState(false);
    const [defaultValues, setDefaultValues] = useState({
        name: '',
        supplier: 0,
        courier: '',
        placed: '',
        due: '',
        arrived: false,
    });

    const formValidation = yup.object().shape({
        name: yup.string().required().max(45),
        supplier: yup.number().required().min(0),
        courier: yup.string().required().max(45),
        placed: yup.string().required().max(45),
        due: yup.string().required().max(45),
        arrived: yup.boolean().required(),
    });

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(formValidation),
        defaultValues: useMemo(() => {
            return defaultValues;
        }, [defaultValues]),
    });

    useEffect(() => {
        if (props.payload.id > 0) {
            setLoading(true);
            setError(false);
            getHandlerFull();
        } else {
            setLoading(true);
            setError(false);
            getHandlerLimited();
        }
    }, []);

    useEffect(() => {
        reset(defaultValues);
    }, [defaultValues]);

    const getHandlerLimited = async () => {
        try {
            const response = await axios.get(`${SERVER_URL}/spares/suppliers/${currentProperty}`, {
                headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') },
            });
            setSuppliersList(response.data);
            setDefaultValues({ ...defaultValues, supplier: response.data[0].id });
            setLoading(false);
        } catch (err) {
            setError(true);
            setLoading(false);
        }
    };

    const getHandlerFull = async () => {
        try {
            const response = await axios.get(`${SERVER_URL}/spares/deliveries/${currentProperty}/${props.payload.id}`, {
                headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') },
            });
            setSuppliersList(response.data.suppliers);
            const delivery = response.data.deliverywithContents[0];
            setId(delivery.id);
            formatContents(delivery.contents);
            setDefaultValues({
                name: delivery.name,
                supplier: delivery.supplier,
                courier: delivery.courier,
                placed: delivery.placed,
                due: delivery.due,
                arrived: false,
            });
            setLoading(false);
        } catch (err) {
            setError(true);
            setLoading(false);
        }
    };

    // todo adjust architecture of used spares to use quantity so that the following function can be removed
    // This is a stop gap function required due to tight coupling but incorrect typings of the used spares modal helper
    const formatContents = (deliveryItems: RetrievedContents[]) => {
        const adjustedContentsArr: Contents[] = [];

        deliveryItems.forEach((deliveryItem) => {
            adjustedContentsArr.push({ id: deliveryItem.spare_id, part_no: deliveryItem.part_no, name: deliveryItem.name, num_used: deliveryItem.quantity });
        });

        setContents(adjustedContentsArr);
    };

    const addSparesHandler = (
        spares: {
            id: number;
            part_no: string;
            name: string;
            num_used: number;
        }[]
    ) => {
        setContents(spares);
    };

    const handleRegistration = async (data: any) => {
        const contentsRemovedNone = contents.filter((item) => item.num_used > 0);
        if (contentsRemovedNone.length > 0) {
            try {
                const response = await axios.put(
                    `${SERVER_URL}/spares/delivery/add-edit`,
                    {
                        id,
                        name: data.name,
                        supplier: data.supplier,
                        courier: data.courier,
                        placed: data.placed,
                        due: data.due,
                        arrived: data.arrived,
                        contents: contentsRemovedNone,
                        propertyId: currentProperty,
                        deliveryId: props.payload.id,
                    },
                    { headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') } }
                );
                if (response.data.created) {
                    props.closeModal();
                } else {
                    alert(alertString);
                }
            } catch (err) {
                alert(alertString);
            }
        }
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
