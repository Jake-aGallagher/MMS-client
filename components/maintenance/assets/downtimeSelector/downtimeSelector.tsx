import LoadingNoDataError from '../../../loading/loadingNoDataError';
import FormContainer from '../../../forms/formContainer';
import FormHeader from '../../../forms/formHeader';
import AssetsAvailableTable from './assetsAvailableTable';
import AltTableContainer from '../../../dataTable/altTableContainer';
import AltTableHeaders from '../../../dataTable/altTableHeaders';
import { useDowntimeSelector } from './useDowntimeSelector';

interface ModalProps {
    closeModal: () => void;
    payload: { assetsSelected: AssetDowntime[]; type: string };
    passbackDetails: (assetDowntimeArray: AssetDowntime[]) => void;
}

interface AssetDowntime {
    id: number;
    name: string;
    time: number;
}

const DowntimeSelector = (props: ModalProps) => {
    const { assetList, loading, error } = useDowntimeSelector(props.payload.assetsSelected);
    const header = () => {
        switch (props.payload.type) {
            case 'downtime':
                return 'Select Assets with revenue that incurred Downtime';
            default:
                return '';
        }
    };

    const updateAssetsSelected = (item: AssetDowntime) => {
        props.passbackDetails([...props.payload.assetsSelected, { ...item, time: 5 }]);
        props.closeModal();
    };

    return (
        <FormContainer closeModal={props.closeModal}>
            <LoadingNoDataError loading={loading} error={error}>
                <FormHeader label={header()} />
                <div className="flex flex-col justify-start px-4 pt-2 overflow-y-auto h-[calc(100%-104px)]">
                    <AltTableContainer>
                        <AltTableHeaders headers={['Asset', 'Add']} />
                        <AssetsAvailableTable assetList={assetList} updateAssetsSelected={updateAssetsSelected} />
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

export default DowntimeSelector;
