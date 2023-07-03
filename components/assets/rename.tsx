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
    payload: { id: number; oldName: string };
}

const RenameAsset = (props: ModalProps) => {
    const alertString = `There has been an issue renaming this Asset, please try again.`;
    const defaultValues = { name: props.payload.oldName };

    const formValidation = yup.object().shape({
        name: yup.string().required().max(45),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(formValidation),
        defaultValues: defaultValues,
    });

    const handleRegistration = async (data: any) => {
        try {
            const response = await axios.put(
                `${SERVER_URL}/asset`,
                {
                    id: props.payload.id,
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
            <FormHeader label={'Rename ' + props.payload.oldName} />
            <form onSubmit={handleSubmit(handleRegistration)} className="flex flex-col justify-start px-4 pt-2 overflow-y-auto h-[calc(100%-104px)]">
                <GeneralFormInput register={register} label="New Component Name" type="text" formName="name" errors={errors} required={true} />
                <GeneralFormSubmit closeModal={props.closeModal} />
            </form>
        </div>
    );
};

export default RenameAsset;
