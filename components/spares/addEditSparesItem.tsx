import { useState, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import axios from 'axios';
import Loading from '../loading/loading';
import RetrieveError from '../error/retrieveError';
import { SERVER_URL } from '../routing/addressAPI';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import FormHeader from '../forms/formHeader';
import GeneralFormSubmit from '../forms/generalFormSubmit';
import GeneralFormInput from '../forms/generalFormInput';

interface ModalProps {
    closeModal: () => void;
    payload: { id: number; name: string };
}

interface Spare {
    id: number;
    part_no: string;
    man_part_no: string;
    name: string;
    man_name: string;
    description: string;
    notes: string;
    location: string;
    quant_remain: number;
    supplier: string;
    cost: number;
}

const AddEditSparesItem = (props: ModalProps) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const currentProperty = useSelector((state: RootState) => state.currentProperty.value.currentProperty);
    const alertString = `There has been an issue ${props.payload?.name && props.payload?.name.length > 0 ? 'editing' : 'creating'} this Spares Item, please try again.`;
    const [defaultValues, setDefaultValues] = useState({
        partNo: '',
        manPartNo: '',
        name: '',
        manName: '',
        description: '',
        notes: '',
        location: '',
        quantRemaining: 0,
        supplier: '',
        cost: 0,
    });

    const formValidation = yup.object().shape({
        partNo: yup.string().required().max(45),
        manPartNo: yup.string().max(45),
        name: yup.string().required().max(45),
        manName: yup.string().max(45),
        description: yup.string().max(1000),
        notes: yup.string().max(1000),
        location: yup.string().max(45),
        quantRemaining: yup.number().min(0),
        supplier: yup.string().max(45),
        cost: yup.number().min(0),
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
            const spare = await axios.get(`${SERVER_URL}/spare/${props.payload.id}/${currentProperty}`, {
                headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') },
            });
            const s: Spare = spare.data.spares[0];
            setDefaultValues({
                partNo: s.part_no,
                manPartNo: s.man_part_no,
                name: s.name,
                manName: s.man_name,
                description: s.description,
                notes: s.notes,
                location: s.location,
                quantRemaining: s.quant_remain,
                supplier: s.supplier,
                cost: s.cost,
            });
            setLoading(false);
        } catch (err) {
            setError(true);
            setLoading(false);
        }
    };

    const handleRegistration = async (data: any) => {
        try {
            const response = await axios.put(
                `${SERVER_URL}/spares/add-edit`,
                {
                    partNo: data.partNo,
                    manPartNo: data.manPartNo,
                    name: data.name,
                    manName: data.manName,
                    description: data.description,
                    notes: data.notes,
                    location: data.location,
                    quantRemaining: data.quantRemaining,
                    supplier: data.supplier,
                    cost: data.cost,
                    propertyId: currentProperty,
                    id: props.payload.id,
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
    };

    return (
        <>
            {loading ? (
                <Loading />
            ) : error ? (
                <RetrieveError />
            ) : (
                <div className="h-full w-full rounded-lg relative border-4 border-blue-200">
                    <FormHeader label={props.payload.name.length > 0 ? props.payload.name : 'Add Spares Item'} />
                    <form onSubmit={handleSubmit(handleRegistration)} className="flex flex-col justify-start px-4 pt-2 overflow-y-auto h-[calc(100%-104px)]">
                        <GeneralFormInput register={register} label="Part Number" type="text" formName="partNo" errors={errors} required={true} />
                        <GeneralFormInput register={register} label="Manufacturers Part Number" type="text" formName="manPartNo" errors={errors} />
                        <GeneralFormInput register={register} label="Item Name" type="text" formName="name" errors={errors} required={true} />
                        <GeneralFormInput register={register} label="Manufacturers Item Name" type="text" formName="manName" errors={errors} />
                        <GeneralFormInput register={register} label="Description" type="textarea" formName="description" errors={errors} rows={4} />
                        <GeneralFormInput register={register} label="Notes" type="textarea" formName="notes" errors={errors} rows={4} />
                        <GeneralFormInput register={register} label="Location" type="text" formName="location" errors={errors} />
                        <GeneralFormInput register={register} label="Quantity in Stock" type="number" formName="quantRemaining" errors={errors} min={0} />
                        <GeneralFormInput register={register} label="Supplier" type="text" formName="supplier" errors={errors} />
                        <GeneralFormInput register={register} label="Cost per Item" type="number" formName="cost" errors={errors} min={0} />
                        <GeneralFormSubmit closeModal={props.closeModal} />
                    </form>
                </div>
            )}
        </>
    );
};

export default AddEditSparesItem;
