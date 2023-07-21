import { useForm } from 'react-hook-form';
import FormContainer from '../../../forms/formContainer';
import GeneralForm from '../../../forms/generalForm';
import GeneralFormSubmit from '../../../forms/generalFormSubmit';
import FormHeader from '../../../forms/formHeader';
import { yupResolverUserGroups } from './addEditUserGroupValidation';
import GeneralFormInput from '../../../forms/generalFormInput';
import { addEditUserGroupHandler } from './addEditUserGroupHandler';

interface Props {
    payload: {
        id: number;
        name: string;
    };
    closeModal: () => void;
}

const AddEditUserGroup = (props: Props) => {
    const defaultValues = { name: props.payload.name };
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolverUserGroups,
        defaultValues: defaultValues,
    });

    const handleRegistration = async (data: any) => {
        await addEditUserGroupHandler(data, props.payload.id, props.closeModal);
    };

    return (
        <FormContainer>
            <FormHeader label={props.payload.id > 0 ? 'Edit ' + props.payload.name : 'Add User Group'} />
            <GeneralForm handleSubmit={handleSubmit} handleRegistration={handleRegistration}>
                <GeneralFormInput register={register} label="Name" type="text" formName="name" errors={errors} required={true} />
                <GeneralFormSubmit closeModal={props.closeModal} />
            </GeneralForm>
        </FormContainer>
    );
};

export default AddEditUserGroup;
