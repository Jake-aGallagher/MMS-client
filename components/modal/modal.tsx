import AddEditUser from '../settings/users/addEditUsers/addEditUsers';
import AddEditProperty from '../properties/addEditProperty/addEditProperty';
import AssignUsers from '../properties/assignUsers/assignUsers';
import DeleteAsset from '../assets/delete';
import CreateJob from '../jobs/createJob/createJob';
import UpdateJob from '../jobs/updateJob/update';
import AddEditSparesNote from '../spares/sparesManagement/sparesNotes/addEditNote/addEditSparesNote';
import AddEditSupplier from '../spares/sparesManagement/suppliers/addEditSupplier/addEditSupplier';
import AddSparesItem from '../spares/addEditSparesItem/addEditSparesItem';
import AdjustSparesStock from '../spares/adjustSparesStock/adjustSparesStock';
import AddEditDelivery from '../spares/sparesManagement/deliveries/addEditDelivery/addEditDelivery';
import ViewExtraItems from '../spares/sparesManagement/deliveries/viewExtraItems/viewExtraItems';
import AddEditEnum from '../settings/enums/addEdit/addEditEnum';
import DeleteForm from '../forms/deleteForm/DeleteForm';
import AddEditAsset from '../assets/addEditAsset/addEditAsset';
import AddEditUserGroup from '../settings/userGroups/addEditUserGroups/addEditUserGroup';
import AddEditPermission from '../settings/permissions/addEditPermissions/addEditPermission';
import SparesSelector from '../sparesSelector/sparesSelector';

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
            case 'SparesSelector':
                return <SparesSelector closeModal={props.closeModal} payload={props.payload} passbackDetails={props.passbackDeatails} />;
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
            case 'adjustStockSparesItem':
                return <AdjustSparesStock closeModal={props.closeModal} payload={props.payload} />;
            case 'deleteSparesItem':
                return <DeleteForm closeModal={props.closeModal} payload={props.payload} />;
            case 'addEditSparesNote':
                return <AddEditSparesNote closeModal={props.closeModal} payload={props.payload} />;
            case 'deleteSparesNote':
                return <DeleteForm closeModal={props.closeModal} payload={props.payload} />;

            // Settings
            case 'addEditUser':
                return <AddEditUser closeModal={props.closeModal} payload={props.payload} />;
            case 'addEditUserGroup':
                return <AddEditUserGroup closeModal={props.closeModal} payload={props.payload} />;
            case 'deleteUserGroup':
                return <DeleteForm closeModal={props.closeModal} payload={props.payload} />;
            case 'addEditPermissions':
                return <AddEditPermission closeModal={props.closeModal} payload={props.payload} />;
            case 'addEditEnum':
                return <AddEditEnum closeModal={props.closeModal} payload={props.payload} />;
            case 'deleteEnum':
                return <DeleteForm closeModal={props.closeModal} payload={props.payload} />;
        }
    };
    return (
        <>
            <div className={`fixed left-0 top-0 h-screen w-screen z-40 ${props.fullSize ? null : 'bg-black opacity-80'}`} onClick={props.closeModal}></div>
            {props.fullSize ? (
                <div className="absolute top-0 mx-auto rounded-md left-0 right-0 h-full w-full z-50 ">{modalToDisplay(props.modalType)}</div>
            ) : (
                <div className="fixed top-0 mx-auto mt-10 rounded-md left-0 right-0 h-5/6 w-4/5 lg:w-3/5 z-50 ">{modalToDisplay(props.modalType)}</div>
            )}
        </>
    );
};

export default ModalBase;
