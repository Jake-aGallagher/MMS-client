import { useState, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import axios from 'axios';
import { SERVER_URL } from '../routing/addressAPI';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import FormHeader from '../forms/formHeader';
import GeneralFormSubmit from '../forms/generalFormSubmit';
import GeneralFormInput from '../forms/generalFormInput';

interface ModalProps {
    closeModal: () => void;
}

const CreateUser = (props: ModalProps) => {
    const authLevel = useSelector((state: RootState) => state.user.value.authority);
    const [authOptions, setAuthOptions] = useState([
        { id: 'Engineer', name: 'Engineer' },
        { id: 'Staff', name: 'Staff' },
    ]);
    const [defaultValues, setDefaultValues] = useState({
        auth: authLevel == 4 ? 'Admin' : 'Engineer',
        username: '',
        first: '',
        last: '',
        password: '',
        retyped: '',
    });

    const formValidation = yup.object().shape({
        auth: yup.string().required(),
        username: yup.string().required().max(45),
        first: yup.string().required().max(45),
        last: yup.string().required().max(45),
        password: yup.string().required().min(8).max(45),
        retyped: yup
            .string()
            .required()
            .oneOf([yup.ref('password')]),
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
        if (authLevel == 4) {
            setAuthOptions([
                { id: 'Admin', name: 'Admin' },
                { id: 'Manager', name: 'Manager' },
                { id: 'Engineer', name: 'Engineer' },
                { id: 'Staff', name: 'Staff' },
            ]);
        }
    }, []);

    useEffect(() => {
        reset(defaultValues);
    }, [defaultValues]);

    const handleRegistration = async (data: any) => {
        try {
            const response = await axios.post(
                `${SERVER_URL}/users`,
                {
                    username: data.username,
                    first: data.first,
                    last: data.last,
                    password: data.password,
                    auth: data.auth,
                },
                { headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') } }
            );
            if (response.data.created) {
                props.closeModal();
            } else {
                alert('There has been an issue creating this User, please try again.');
            }
        } catch (err) {
            alert('There has been an issue creating this User, please try again.');
        }
    };

    return (
        <div className="h-full w-full rounded-lg relative border-4 border-blue-200">
            <FormHeader label={`Create New User`} />
            <form onSubmit={handleSubmit(handleRegistration)} className="flex flex-col justify-start px-4 pt-2 overflow-y-auto h-[calc(100%-104px)]">
                <GeneralFormInput register={register} label="Username" type="text" formName="username" errors={errors} required={true} />
                <GeneralFormInput register={register} label="First Name" type="text" formName="first" errors={errors} required={true} />
                <GeneralFormInput register={register} label="Last Name" type="text" formName="last" errors={errors} required={true} />
                <GeneralFormInput register={register} label="Password" type="password" formName="password" errors={errors} required={true} />
                <GeneralFormInput register={register} label="Re-Enter Password" type="password" formName="retyped" errors={errors} required={true} />
                <GeneralFormInput register={register} label="User Authority Level" type="select" formName="auth" errors={errors} required={true} optionNameString="name" selectOptions={authOptions} />
                <GeneralFormSubmit closeModal={props.closeModal} />
            </form>
        </div>
    );
};

export default CreateUser;
