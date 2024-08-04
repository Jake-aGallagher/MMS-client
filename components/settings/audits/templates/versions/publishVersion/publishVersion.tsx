import FormHeader from '../../../../../forms/formHeader';
import FormContainer from '../../../../../forms/formContainer';
import { publishVersionHandler } from './publishVersionHandler';
import FormTextLeft from '../../../../../forms/formTextLeft';

interface ModalProps {
    closeModal: () => void;
    payload: { id: number; name: string; templateId: number; version: number };
}

const PublishVersion = (props: ModalProps) => {
    const submit = async () => {
        await publishVersionHandler(props.payload.templateId, props.payload.version, props.closeModal);
    };

    const text1 = `Publishing this version will make it the current version for the ${props.payload.name} template.`;
    const text2 = `This version will be locked and no further edits can be made, all events that use the currently active version of this template will be updated to use this version.`;
    const text3 = `All audits that have been started/comleted will retain all of their data and will not be affected by this change.`;
    const text4 = `This action cannot be undone. Are you sure you want to publish this version?`;

    return (
        <FormContainer closeModal={props.closeModal}>
            <FormHeader label="Publish Version" />
            <div className="flex flex-col px-4 pt-2 overflow-y-auto h-[calc(100%-104px)]">
                <div className="mt-20"></div>
                <FormTextLeft label={text1} />
                <div className="mt-4"></div>
                <FormTextLeft label={text2} />
                <div className="mt-4"></div>
                <FormTextLeft label={text3} />
                <div className="mt-4"></div>
                <FormTextLeft label={text4} />
                <div className="flex flex-row justify-end items-center absolute bottom-0 h-16 left-0 w-full">
                    <button className={`btnBlue h-8 px-4 w-32`} onClick={(e) => [e.preventDefault(), props.closeModal()]}>
                        Cancel
                    </button>

                    <button onClick={submit} className="btnBlue mx-4 h-8 px-4 w-32">
                        Publish
                    </button>
                </div>
            </div>
        </FormContainer>
    );
};

export default PublishVersion;
