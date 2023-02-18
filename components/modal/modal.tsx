import CreateUser from '../../pages/settings/createUser';
import CreateProperty from '../../pages/properties/createProperty';
import EditProperty from '../../pages/properties/editProperty';
import AssignUsers from '../../pages/properties/assignUsers';
import RenameAsset from '../../pages/assets/rename';
import DeleteAsset from '../../pages/assets/delete';
import AddAsset from '../../pages/assets/create';
import CreateJob from '../../pages/jobs/createJob';
import UpdateJob from '../../pages/jobs/update';
import SparesUsed from '../../pages/spares/sparesUsed';
import AddSparesNote from '../../pages/spares/sparesManagement/sparesNotes/addSparesNote';
import DeleteSparesNote from '../../pages/spares/sparesManagement/sparesNotes/deleteSparesNote';
import AddEditSupplier from '../../pages/spares/sparesManagement/suppliers/addEditSupplier';
import DeleteSupplier from '../../pages/spares/sparesManagement/suppliers/deleteSupplier';

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
            case 'createProperty':
                return <CreateProperty closeModal={props.closeModal} />;
            case 'editProperty':
                return <EditProperty closeModal={props.closeModal} propertyNumber={props.payload} />;
            case 'assignUsers':
                return <AssignUsers closeModal={props.closeModal} propertyNumber={props.payload} />;

            // Asset
            case 'addAsset':
                return <AddAsset closeModal={props.closeModal} payload={props.payload} />;
            case 'renameAsset':
                return <RenameAsset closeModal={props.closeModal} payload={props.payload} />;
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
            case 'addEditSupplier':
                return <AddEditSupplier closeModal={props.closeModal} payload={props.payload}/>
            case 'deleteSupplier':
                return <DeleteSupplier closeModal={props.closeModal} payload={props.payload}/>
            case 'addSparesNote':
                return <AddSparesNote closeModal={props.closeModal} payload={props.payload}/>
            case 'deleteSparesNote':
                return <DeleteSparesNote closeModal={props.closeModal} payload={props.payload} />;

            // Settings
            case 'createUser':
                return <CreateUser closeModal={props.closeModal} />;
        }
    };
    return (
        <>
            {props.fullSize ? (
                <>
                    <div className="fixed left-0 top-0 h-screen w-screen bg-black opacity-70 z-40 " onClick={props.closeModal}></div>
                    <div className="absolute top-0 mx-auto rounded-lg left-0 right-0 h-full w-full bg-blue-50 z-50 ">
                        {modalToDisplay(props.modalType)}
                    </div>
                </>
            ) : (
                <>
                    <div className="fixed left-0 top-0 h-screen w-screen bg-black opacity-70 z-40 " onClick={props.closeModal}></div>
                    <div className="fixed top-0 mx-auto mt-10 rounded-lg left-0 right-0 h-5/6 w-4/5 lg:w-3/5 bg-blue-50 z-50 ">
                        {modalToDisplay(props.modalType)}
                    </div>
                </>
            )}
        </>
    );
};

export default ModalBase;

// Modal layout
/* 
<div className="h-full w-full rounded-lg relative border-4 border-blue-200">
    <h1 className="w-full h-10 flex flex-row justify-center items-center font-bold bg-blue-200">Title Here</h1>
    <form className="flex flex-col justify-start px-4 pt-2 overflow-y-auto h-[calc(100%-104px)]">

        <label htmlFor="username">Username</label>
        <input id="username" type="text" className="mb-2 rounded-sm bg-blue-200" />

        <div className="flex flex-row justify-evenly items-center absolute bottom-0 h-16 left-0 w-full bg-blue-200">
            <button className="rounded-3xl bg-blue-50 hover:bg-blue-600 h-8 px-4  border-2 border-blue-600 w-32">Cancel</button>
            <button className="rounded-3xl bg-blue-50 hover:bg-blue-600 h-8 px-4  border-2 border-blue-600 w-32">Submit</button>
        </div>
    </form>
</div>
 */
