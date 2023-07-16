import FormContainer from '../../../../forms/formContainer';
import FormHeader from '../../../../forms/formHeader';
import DialogClose from '../../../../forms/dialogClose';

interface Contents {
    delivery_id: number;
    spare_id: number;
    quantity: number;
    part_no: string;
    name: string;
}

interface ModalProps {
    closeModal: () => void;
    payload: { contents: Contents[]; name: string };
}

const ViewExtraItems = (props: ModalProps) => {
    const items = props.payload.contents.map((i) => (
        <div className="flex flex-row border-2 border-blue-600 rounded-md my-4 ml-4 w-fit px-2" key={'spares_item_' + i.spare_id}>
            {i.part_no + ' / ' + i.name + ' / Quantity: ' + i.quantity}
        </div>
    ));

    return (
        <FormContainer>
            <FormHeader label={props.payload.name} />
            {items}
            <DialogClose closeModal={props.closeModal} />
        </FormContainer>
    );
};

export default ViewExtraItems;
