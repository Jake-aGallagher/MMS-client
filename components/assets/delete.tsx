import axios from 'axios';
import { SERVER_URL } from '../routing/addressAPI';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import FormHeader from '../forms/formHeader';
import GeneralFormSubmit from '../forms/generalFormSubmit';
import GeneralFormInput from '../forms/generalFormInput';
import FormContainer from '../forms/formContainer';
import GeneralForm from '../forms/generalForm';
import FormTextCenter from '../forms/formTextCenter';
import { GlobalDebug } from '../debug/globalDebug';

interface ModalProps {
    closeModal: () => void;
    payload: { id: number; name: string };
}

const DeleteAsset = (props: ModalProps) => {
    const alertString = `There has been an issue deleting this Asset, please try again.`;
    const deleteOptions = [
        { id: 'asset', value: 'Asset Only' },
        { id: 'assetAndJobs', value: 'Asset and Linked Jobs' },
    ];
    const formValidation = yup.object().shape({
        deleteType: yup.string().required(),
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
            const response = await axios.delete(`${SERVER_URL}/asset/${props.payload.id}`, {
                headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') },
                data: {
                    deleteType: data.deleteType,
                },
            });
            if (response.data.deleted) {
                props.closeModal();
            } else {
                alert(alertString);
            }
        } catch (err) {
            GlobalDebug('DeleteAsset/handleRegistration', [
                ['error', err],
                ['data', data],
            ]);
            alert(alertString);
        }
    };

    return (
        <FormContainer closeModal={props.closeModal}>
            <FormHeader label={'Delete ' + props.payload.name + ' and all child components'} />
            <GeneralForm handleSubmit={handleSubmit} handleRegistration={handleRegistration}>
                <FormTextCenter label="You are about to delete this Asset/Component, this will also delete all child components." />
                <GeneralFormInput
                    register={register}
                    label="Please select if you would like to delete all Jobs linked with the Assets that are deleted"
                    type="select"
                    formName="deleteType"
                    errors={errors}
                    required={true}
                    optionNameString="value"
                    selectOptions={deleteOptions}
                />
                <GeneralFormSubmit closeModal={props.closeModal} submitLabel="Delete" />
            </GeneralForm>
        </FormContainer>
    );
};

export default DeleteAsset;
