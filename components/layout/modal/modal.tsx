import AddEditUser from '../../settings/users/addEditUsers/addEditUsers';
import AddEditFacility from '../../facilities/addEditFacility/addEditFacility';
import AssignUsers from '../../facilities/assignUsers/assignUsers';
import DeleteAsset from '../../maintenance/assets/delete';
import CreateJob from '../../maintenance/jobs/createJob/createJob';
import UpdateJob from '../../maintenance/jobs/updateJob/update';
import AddEditSparesNote from '../../spares/sparesManagement/sparesNotes/addEditNote/addEditSparesNote';
import AddEditSupplier from '../../supplyChain/suppliers/addEditSupplier/addEditSupplier';
import AddSparesItem from '../../spares/addEditSparesItem/addEditSparesItem';
import AdjustSparesStock from '../../spares/adjustSparesStock/adjustSparesStock';
import AddEditDelivery from '../../spares/sparesManagement/deliveries/addEditDelivery/addEditDelivery';
import ViewExtraItems from '../../spares/sparesManagement/deliveries/viewExtraItems/viewExtraItems';
import AddEditEnumGroup from '../../settings/enumgroups/addEdit/addEditEnumGroup';
import DeleteForm from '../../forms/deleteForm/DeleteForm';
import AddEditAsset from '../../maintenance/assets/addEditAsset/addEditAsset';
import AddEditUserGroup from '../../settings/userGroups/addEditUserGroups/addEditUserGroup';
import AddEditPermission from '../../settings/permissions/addEditPermissions/addEditPermission';
import SparesSelector from '../../sparesSelector/sparesSelector';
import UsersSelector from '../../usersSelector/usersSelector';
import AddEditTaskType from '../../settings/taskTypes/addEditTaskType/addEditTaskType';
import AddEditStatusType from '../../settings/statusTypes/addEditStatusType/addEditStatusType';
import AddEditUrgencyType from '../../settings/urgencyTypes/addEditUrgencyType/addEditUrgencyType';
import { GlobalDebug } from '../../utility/debug/globalDebug';
import AddEditEnumValue from '../../settings/enumgroups/enumValues/addEditEnumValues/addEditEnumValue';
import AddSchedule from '../../maintenance/pms/pmsManagement/addSchedule/addSchedule';
import EditPM from '../../maintenance/pms/editPm/editPm';
import EditSchedule from '../../maintenance/pms/pmsManagement/editSchedule/editSchedule';
import AddEditLogTemplate from '../../maintenance/logs/logsManagement/addEditLogTemplate/addEditLogTemplate';
import AddEditLogField from '../../maintenance/logs/logsManagement/details/formBuilder/addEditField/addEditLogField';
import UpdateLog from '../../maintenance/logs/updateLog/updateLog';
import AddEditField from '../../settings/customFields/addEditField/addEditFields';
import FacilityPicker from '../../navigation/facilityPicker';
import DowntimeSelector from '../../maintenance/assets/downtimeSelector/downtimeSelector';
import AddAuditTemplate from '../../settings/audits/templates/add/addAuditTemplate';
import AddEditAuditTopic from '../../settings/audits/templates/versions/addEditTopic/addEditTopic';
import AddEditAuditQuestion from '../../settings/audits/templates/versions/addEditQuestion/addEditQuestion';
import AddEditAuditOption from '../../settings/audits/templates/versions/addEditOption/addEditOption';
import AddEditAuditVersion from '../../settings/audits/templates/versions/addVersion/addEditVersion';

interface ModalProps {
    closeModal: () => void;
    modalType: string;
    payload?: any;
    fullSize?: boolean;
    passbackDeatails?: any;
}

const ModalBase = (props: ModalProps) => {
    const modalToDisplay = (modalType: string) => {
        GlobalDebug('Modal', [['modal type', modalType]]);

        switch (modalType) {
            // Facility
            case 'facilityPicker':
                return <FacilityPicker closeModal={props.closeModal} />;
            case 'addEditFacility':
                return <AddEditFacility closeModal={props.closeModal} facilityNumber={props.payload} />;
            case 'assignUsers':
                return <AssignUsers closeModal={props.closeModal} facilityNumber={props.payload} />;

            // Asset
            case 'downtimeSelector':
                return <DowntimeSelector closeModal={props.closeModal} payload={props.payload} passbackDetails={props.passbackDeatails} />;
            case 'addEditAsset':
                return <AddEditAsset closeModal={props.closeModal} payload={props.payload} />;
            case 'deleteAsset':
                return <DeleteAsset closeModal={props.closeModal} payload={props.payload} />;

            // Job
            case 'createJob':
                return <CreateJob closeModal={props.closeModal} assetId={props.payload.assetId} />;
            case 'updateJob':
                return <UpdateJob closeModal={props.closeModal} jobId={props.payload} />;
            case 'usersSelector':
                return <UsersSelector closeModal={props.closeModal} payload={props.payload} passbackDetails={props.passbackDeatails} />;

            // PMs
            case 'createPmSchedule':
                return <AddSchedule closeModal={props.closeModal} assetId={props.payload.assetId} />;
            case 'addEditPmSchedule':
                return <EditSchedule closeModal={props.closeModal} payload={props.payload} />;
            case 'editPm':
                return <EditPM closeModal={props.closeModal} pmId={props.payload} />;

            // Logs
            case 'addEditLogTemplate':
                return <AddEditLogTemplate closeModal={props.closeModal} payload={props.payload} />;
            case 'addEditLogField':
                return <AddEditLogField closeModal={props.closeModal} payload={props.payload} />;
            case 'updateLog':
                return <UpdateLog closeModal={props.closeModal} payload={props.payload} />;

            //Spare
            case 'sparesSelector':
                return <SparesSelector closeModal={props.closeModal} payload={props.payload} passbackDetails={props.passbackDeatails} />;
            case 'addEditDelivery':
                return <AddEditDelivery closeModal={props.closeModal} payload={props.payload} />;
            case 'viewExtraSpares':
                return <ViewExtraItems closeModal={props.closeModal} payload={props.payload} />;
            case 'addEditSparesItem':
                return <AddSparesItem closeModal={props.closeModal} payload={props.payload} />;
            case 'adjustStockSparesItem':
                return <AdjustSparesStock closeModal={props.closeModal} payload={props.payload} />;
            case 'addEditSparesNote':
                return <AddEditSparesNote closeModal={props.closeModal} payload={props.payload} />;

            // Supply Chain
            case 'addEditSupplier':
                return <AddEditSupplier closeModal={props.closeModal} payload={props.payload} />;

            // Settings
            case 'addEditUser':
                return <AddEditUser closeModal={props.closeModal} payload={props.payload} />;
            case 'addEditUserGroup':
                return <AddEditUserGroup closeModal={props.closeModal} payload={props.payload} />;
            case 'addEditPermissions':
                return <AddEditPermission closeModal={props.closeModal} payload={props.payload} />;
            case 'addEditEnumGroup':
                return <AddEditEnumGroup closeModal={props.closeModal} payload={props.payload} />;
            case 'addEditEnumValue':
                return <AddEditEnumValue closeModal={props.closeModal} payload={props.payload} />;
            case 'addEditTaskType':
                return <AddEditTaskType closeModal={props.closeModal} payload={props.payload} />;
            case 'addEditStatusType':
                return <AddEditStatusType closeModal={props.closeModal} payload={props.payload} />;
            case 'addEditUrgencyType':
                return <AddEditUrgencyType closeModal={props.closeModal} payload={props.payload} />;

            // Audits
            case 'addAuditTemplate':
                return <AddAuditTemplate closeModal={props.closeModal} payload={props.payload} />;
            case 'addAuditVersion':
                    return <AddEditAuditVersion closeModal={props.closeModal} payload={props.payload} />;
            case 'addEditTopic':
                return <AddEditAuditTopic closeModal={props.closeModal} payload={props.payload} />;
            case 'addEditQuestion':
                return <AddEditAuditQuestion closeModal={props.closeModal} payload={props.payload} />;
            case 'addEditOption':
                return <AddEditAuditOption closeModal={props.closeModal} payload={props.payload} />;

            // Fields
            case 'addEditField':
                return <AddEditField closeModal={props.closeModal} payload={props.payload} />;

            // Delete Modals
            case 'deleteDelivery':
            case 'deleteSupplier':
            case 'deleteSparesItem':
            case 'deleteSparesNote':
            case 'deleteUser':
            case 'deleteUserGroup':
            case 'deleteEnumGroup':
            case 'deleteEnumValue':
            case 'deleteTaskType':
            case 'deleteStatusType':
            case 'deleteUrgencyType':
            case 'deletePmSchedule':
            case 'deleteLogTemplate':
            case 'deleteLogField':
            case 'deleteField':
            case 'deleteTopic':
            case 'deleteQuestion':
            case 'deleteOption':
                return <DeleteForm closeModal={props.closeModal} payload={props.payload} />;
        }
    };

    const smallerModalList = [
        'deleteDelivery',
        'deleteSupplier',
        'deleteSparesItem',
        'deleteSparesNote',
        'deleteUser',
        'deleteUserGroup',
        'deleteEnumGroup',
        'deleteEnumValue',
        'deleteTaskType',
        'deleteStatusType',
        'deleteUrgencyType',
        'deletePmSchedule',
        'deleteLogTemplate',
        'deleteLogField',
        'deleteAsset',
        'adjustStockSparesItem',
    ];

    return (
        <>
            <div className={`fixed left-0 top-0 h-screen w-screen z-40 ${props.fullSize ? null : 'bg-black opacity-80'}`} onClick={props.closeModal}></div>
            <div className={`fixed top-0 bottom-0 left-0 right-0 m-auto rounded-md ${smallerModalList.includes(props.modalType) ? 'h-1/3' : 'h-5/6'} w-4/5 lg:w-3/5 z-50 bg-background`}>
                {modalToDisplay(props.modalType)}
            </div>
        </>
    );
};

export default ModalBase;
