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
    payload: { parentId: number; parentName: string };
}

const AddAsset = (props: ModalProps) => {
    const currentProperty = useSelector((state: RootState) => state.currentProperty.value.currentProperty);
    const alertString = `There has been an issue creating this Asset, please try again.`;

    const formValidation = yup.object().shape({
        name: yup.string().required().max(45),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(formValidation),
    });

    const handleRegistration = async (data: any) => {
        try {
            const response = await axios.post(
                `${SERVER_URL}/asset`,
                {
                    parentId: props.payload.parentId,
                    propertyId: currentProperty,
                    name: data.name,
                },
                {
                    headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') },
                }
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
        <div className="h-full w-full rounded-lg relative border-4 border-blue-200">
            <FormHeader label={'Create New Component of ' + props.payload.parentName} />
            <form onSubmit={handleSubmit(handleRegistration)} className="flex flex-col justify-start px-4 pt-2 overflow-y-auto h-[calc(100%-104px)]">
                <GeneralFormInput register={register} label="Component Name" type="text" formName="name" errors={errors} required={true} />
                <GeneralFormSubmit closeModal={props.closeModal} />
            </form>
        </div>
    );
};

export default AddAsset;