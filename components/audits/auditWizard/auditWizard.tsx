import { useForm } from 'react-hook-form';
import { useAuditWizard } from './useAuditWizard';
import { useEffect, useMemo, useState } from 'react';
import FormContainer from '../../forms/formContainer';
import LoadingNoDataError from '../../loading/loadingNoDataError';
import FormHeader from '../../forms/formHeader';
import GeneralForm from '../../forms/generalForm';
import GeneralFormInput from '../../forms/generalFormInput';
import StepFormSubmit from '../../forms/stepFormSubmit';
import { auditWizardHandler } from './auditWizardHandler';
import FileInput from '../../forms/fileInput';
import SignatureInput from '../../forms/signatureInput';

interface Props {
    closeModal: () => void;
    payload: {
        eventType: string;
        id: number;
    };
}

const AuditWizard = (props: Props) => {
    const { auditId, audit, files, setFiles, defaultValues, loading, error } = useAuditWizard(props.payload.eventType, props.payload.id);
    const [step, setStep] = useState(1);

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm({
        defaultValues: useMemo(() => {
            return defaultValues;
        }, [defaultValues]),
    });

    useEffect(() => {
        reset(defaultValues);
    }, [defaultValues]);

    const handleRegistration = async (data: any) => {
        await auditWizardHandler(data, auditId, props.closeModal);
    };

    const advancedSetter = (keyId: string, id: string, encodedId: string, name: string, deleteFile: boolean) => {
        if (deleteFile) {
            setFiles((files) => {
                const existingFiles = files[keyId] || [];
                return { ...files, [keyId]: existingFiles.filter((file) => file.encodedId !== encodedId) };
            });
        } else {
            setFiles((files) => {
                const existingFiles = files[keyId] || [];
                existingFiles.push({ id, encodedId, name });
                return { ...files, [keyId]: existingFiles };
            });
        }
    };

    const steps = audit.map((topic) => {
        const questions = topic.questions.map((question) => {
            if (question.question_type === 'file' || question.question_type === 'image') {
                return (
                    <FileInput
                        key={'question_' + question.id}
                        register={register}
                        label={question.title}
                        formName={question.id.toString()}
                        errors={errors}
                        required={false}
                        setValue={setValue}
                        setValueAdvanced={advancedSetter}
                        existingFiles={files[question.id] || []}
                        type={question.question_type}
                    />
                );
            } else if (question.question_type === 'signature') {
                return (
                    <SignatureInput
                        key={'question_' + question.id}
                        register={register}
                        label={question.title}
                        formName={question.id.toString()}
                        errors={errors}
                        required={false}
                        setValue={setValue}
                        setValueAdvanced={advancedSetter}
                        existingFiles={files[question.id] || []}
                        type={question.question_type}
                    />
                );
            }
            return (
                <GeneralFormInput
                    key={'question_' + question.id}
                    register={register}
                    label={question.title}
                    type={question.question_type}
                    formName={question.id.toString()}
                    errors={errors}
                    required={false}
                    selectOptions={question.options}
                    optionNameString="title"
                />
            );
        });

        return (
            <>
                <div className="flex flex-row justify-center text-lg mb-4">
                    <p className="w-8"></p>
                    <h2 className="text-center mx-auto">{topic.title}</h2>
                    <p className="w-8">
                        {step}/{audit.length}
                    </p>
                </div>
                <div>{questions}</div>
            </>
        );
    });

    const back = () => {
        if (step === 1) {
            return;
        }
        setStep((step) => step - 1);
    };

    const next = async () => {
        if (step === audit.length) {
            await handleSubmit(handleRegistration)();
        }
        setStep((step) => step + 1);
    };

    return (
        <FormContainer closeModal={props.closeModal}>
            <LoadingNoDataError loading={loading} error={error}>
                <FormHeader label="Edit Audit" />
                <GeneralForm handleSubmit={handleSubmit} handleRegistration={handleRegistration}>
                    {steps[step - 1]}
                    <StepFormSubmit closeModal={props.closeModal} submitStep={step === audit.length} next={next} back={back} />
                </GeneralForm>
            </LoadingNoDataError>
        </FormContainer>
    );
};

export default AuditWizard;
