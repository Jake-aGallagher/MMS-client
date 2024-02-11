import LoadingNoDataError from '../loading/loadingNoDataError';
import FormContainer from '../forms/formContainer';
import FormHeader from '../forms/formHeader';
import SparesAvailableTable from './sparesAvailableTable';
import AltTableContainer from '../dataTable/altTableContainer';
import AltTableHeaders from '../dataTable/altTableHeaders';
import { useSparesSelector } from './useSparesSelector';

interface ModalProps {
    closeModal: () => void;
    payload: { sparesSelected: SparesSelected[]; type: string };
    passbackDetails: (usedSparesArray: SparesSelected[]) => void;
}

interface SparesSelected {
    id: number;
    part_no: string;
    name: string;
    quantity: number;
}

const SparesSelector = (props: ModalProps) => {
    const { spareslist, loading, error } = useSparesSelector(props.payload.sparesSelected);

    const updateSparesSelected = (item: SparesSelected) => {
        props.passbackDetails([...props.payload.sparesSelected, { ...item, quantity: 1 }]);
        props.closeModal();
    };

    return (
        <FormContainer closeModal={props.closeModal}>
            <LoadingNoDataError loading={loading} error={error}>
                <FormHeader label={props.payload.type === 'delivery' ? 'Add to Delivery' : 'Spares Used'} />
                <div className="flex flex-col justify-start px-4 pt-2 overflow-y-auto h-[calc(100%-104px)]">
                    <AltTableContainer>
                        <AltTableHeaders headers={['Part Number', 'Name', 'Add']} />
                        <SparesAvailableTable sparesList={spareslist} updateSparesSelected={updateSparesSelected} />
                    </AltTableContainer>

                    <div className="flex flex-row justify-end items-center absolute bottom-0 h-16 left-0 w-full">
                        <button className="btnBlue h-8 mr-4 px-4 w-32" onClick={(e) => [e.preventDefault(), props.closeModal()]}>
                            Cancel
                        </button>
                    </div>
                </div>
            </LoadingNoDataError>
        </FormContainer>
    );
};

export default SparesSelector;
