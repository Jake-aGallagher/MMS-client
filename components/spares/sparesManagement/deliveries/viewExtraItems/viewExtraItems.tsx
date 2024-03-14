import FormContainer from '../../../../forms/formContainer';
import FormHeader from '../../../../forms/formHeader';
import DialogClose from '../../../../forms/dialogClose';
import AltTableContainer from '../../../../dataTable/altTableContainer';
import AltTableHeaders from '../../../../dataTable/altTableHeaders';

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
    const sparesTable = props.payload.contents.map((item) => (
        <tr className="border-t-1 h-12 border-solid border-primary" key={'current_item_' + item.spare_id}>
            <td className="text-center">{item.part_no}</td>
            <td className="text-center">{item.name}</td>
            <td className="text-center">{item.quantity}</td>
        </tr>
    ));

    return (
        <FormContainer closeModal={props.closeModal}>
            <FormHeader label={props.payload.name} />
            <div className='px-4'>
                <AltTableContainer>
                    <AltTableHeaders headers={['Part Number', 'Name', 'Quantity']} />
                    <tbody>{sparesTable}</tbody>
                </AltTableContainer>
            </div>
            <DialogClose closeModal={props.closeModal} />
        </FormContainer>
    );
};

export default ViewExtraItems;
