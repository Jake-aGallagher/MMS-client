import { useForm } from 'react-hook-form';
import { useAddEditPermissions } from './useAddEditPermissions';
import LoadingNoDataError from '../../../loading/loadingNoDataError';
import FormContainer from '../../../forms/formContainer';
import FormHeader from '../../../forms/formHeader';
import GeneralForm from '../../../forms/generalForm';
import GeneralFormSubmit from '../../../forms/generalFormSubmit';
import GeneralFormInput from '../../../forms/generalFormInput';
import { addEditPermissionsHandler } from './addEditPermissionsHandler';

interface Props {
    payload: {
        id: number;
        name: string;
    };
    closeModal: () => void;
}

const AddEditPermission = (props: Props) => {
    const { permissionsList, loading, error } = useAddEditPermissions({ id: props.payload.id });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const handleRegistration = async (data: any) => {
        await addEditPermissionsHandler(data, props.payload.id, props.closeModal);
    };

    return (
        <FormContainer>
            <LoadingNoDataError loading={loading} error={error}>
                <FormHeader label={'Assign Permissions to ' + props.payload.name} />
                <GeneralForm handleSubmit={handleSubmit} handleRegistration={handleRegistration}>
                    {permissionsList.map((permission) => (
                        <GeneralFormInput
                            key={permission.id}
                            register={register}
                            label={permission.area.toUpperCase() + ' / ' + permission.permission.toUpperCase()}
                            type="checkbox"
                            formName={permission.id.toString()}
                            errors={errors}
                            checked={permission.selected}
                        />
                    ))}
                    <GeneralFormSubmit closeModal={props.closeModal} />
                </GeneralForm>
            </LoadingNoDataError>
        </FormContainer>
    );
};

export default AddEditPermission;
