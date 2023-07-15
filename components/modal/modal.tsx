import CreateUser from '../settings/createUser';
import AddEditProperty from '../properties/addEditProperty/addEditProperty';
import AssignUsers from '../properties/assignUsers/assignUsers';
import DeleteAsset from '../assets/delete';
import CreateJob from '../assets/createJob';
import UpdateJob from '../jobs/update';
import SparesUsed from '../jobs/sparesUsed';
import AddEditSparesNote from '../spares/sparesManagement/addEditSparesNote';
import AddEditSupplier from '../spares/sparesManagement/suppliers/addEditSupplier';
import AddSparesItem from '../spares/addEditSparesItem';
import AdjustSparesStock from '../spares/adjustSparesStock';
import AddEditDelivery from '../spares/sparesManagement/deliveries/addEditDelivery';
import ViewExtraItems from '../spares/sparesManagement/deliveries/viewExtraItems';
import AddEditEnum from '../settings/enums/addEdit/addEditEnum';
import DeleteForm from '../forms/DeleteForm';
import AddEditAsset from '../assets/addEditAsset';

interface ModalProps {
    closeModal: () => void;
    modalType: string;
    payload?: any;
    fullSize?: boolean;
    passbackDeatails?: any;
}

const ModalBase = (props: ModalProps) => {
    const modalToDisplay = (modalType: string) => {
        switch (modalType) {
            // Property
            case 'addEditProperty':
                return <AddEditProperty closeModal={props.closeModal} propertyNumber={props.payload} />;
            case 'assignUsers':
                return <AssignUsers closeModal={props.closeModal} propertyNumber={props.payload} />;

            // Asset
            case 'addEditAsset':
                return <AddEditAsset closeModal={props.closeModal} payload={props.payload} />;
            case 'deleteAsset':
                return <DeleteAsset closeModal={props.closeModal} payload={props.payload} />;

            // Job
            case 'createJob':
                return <CreateJob closeModal={props.closeModal} assetId={props.payload.assetId} />;
            case 'updateJob':
                return <UpdateJob closeModal={props.closeModal} jobId={props.payload} />;

            //Spare
            case 'sparesUsed':
                return <SparesUsed closeModal={props.closeModal} payload={props.payload} passbackDetails={props.passbackDeatails} />;
            case 'addEditDelivery':
                return <AddEditDelivery closeModal={props.closeModal} payload={props.payload} />;
            case 'deleteDelivery':
                return <DeleteForm closeModal={props.closeModal} payload={props.payload} />;
            case 'viewExtraSpares':
                return <ViewExtraItems closeModal={props.closeModal} payload={props.payload} />;
            case 'addEditSupplier':
                return <AddEditSupplier closeModal={props.closeModal} payload={props.payload} />;
            case 'deleteSupplier':
                return <DeleteForm closeModal={props.closeModal} payload={props.payload} />;
            case 'addEditSparesItem':
                return <AddSparesItem closeModal={props.closeModal} payload={props.payload} />;
            case 'adjustSparesStock':
                return <AdjustSparesStock closeModal={props.closeModal} payload={props.payload} />;
            case 'deleteSparesItem':
                return <DeleteForm closeModal={props.closeModal} payload={props.payload} />;
            case 'addEditSparesNote':
                return <AddEditSparesNote closeModal={props.closeModal} payload={props.payload} />;
            case 'deleteSparesNote':
                return <DeleteForm closeModal={props.closeModal} payload={props.payload} />;

            // Settings
            case 'createUser':
                return <CreateUser closeModal={props.closeModal} />;
            case 'addEditEnum':
                return <AddEditEnum closeModal={props.closeModal} payload={props.payload} />;
            case 'deleteEnum':
                return <DeleteForm closeModal={props.closeModal} payload={props.payload} />;
        }
    };
    return (
        <>
            <div className="fixed left-0 top-0 h-screen w-screen bg-black opacity-70 z-40 " onClick={props.closeModal}></div>
            {props.fullSize ? (
                <div className="absolute top-0 mx-auto rounded-lg left-0 right-0 h-full w-full bg-blue-50 z-50 ">{modalToDisplay(props.modalType)}</div>
            ) : (
                <div className="fixed top-0 mx-auto mt-10 rounded-lg left-0 right-0 h-5/6 w-4/5 lg:w-3/5 bg-blue-50 z-50 ">{modalToDisplay(props.modalType)}</div>
            )}
        </>
    );
};

export default ModalBase;
