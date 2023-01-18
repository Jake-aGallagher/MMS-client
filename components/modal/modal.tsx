import CreateUser from '../../pages/settings/createUser';
import CreateProperty from '../../pages/properties/createProperty'
import EditProperty from '../../pages/properties/editProperty';

interface ModalProps {
    modalType: string;
    payload?: any;
    closeModal: () => void;
}

const ModalBase = (props: ModalProps) => {
    const modalToDisplay = (modalType: string) => {
        switch (modalType) {
            case 'createUser':
                return <CreateUser closeModal={props.closeModal} />;
            case 'createProperty':
                return <CreateProperty closeModal={props.closeModal} />;
            case 'editProperty':
                return <EditProperty closeModal={props.closeModal} propertyNumber={props.payload} />;
            /* case 'createJob':
                return <CreateJob closeModal={props.closeModal} assetId={props.payload.assetId}/>;
            case 'updateJob':
                return <UpdateJob closeModal={props.closeModal} jobId={props.payload} />;
            case 'completeJob':
                return <CompleteJob closeModal={props.closeModal} jobId={props.payload} />;
            case 'assignUsers':
                return <AssignUsers closeModal={props.closeModal} propertyNumber={props.payload} />;
            case 'addAsset':
                return <AddAsset closeModal={props.closeModal} payload={props.payload}/>
            case 'renameAsset':
                return <RenameAsset closeModal={props.closeModal} payload={props.payload} />
            case 'deleteAsset':
                return <DeleteAsset closeModal={props.closeModal} payload={props.payload} /> */
        }
    };
    return (
        <>
            <div className="fixed left-0 top-0 h-screen w-screen bg-black opacity-70 z-40 " onClick={props.closeModal}></div>
            <div className="absolute mx-auto mt-10 rounded-lg left-0 right-0 h-5/6 w-4/5 lg:w-3/5 bg-blue-50 z-50 ">{modalToDisplay(props.modalType)}</div>
        </>
    );
};

export default ModalBase;

// Modal layout
/* 
<div className="h-full w-full rounded-lg relative border-4 border-blue-600">
    <h1 className="w-full h-10 flex flex-row justify-center items-center font-bold bg-blue-200 border-b-4 border-blue-600">Title Here</h1>
    <form className="flex flex-col justify-start px-4 pt-2 overflow-y-auto h-[calc(100%-104px)]">

        <label htmlFor="username">Username</label>
        <input id="username" type="text" className="mb-2 rounded-sm bg-blue-200" />

        <div className="flex flex-row justify-evenly items-center absolute bottom-0 h-16 left-0 w-full border-t-4 border-blue-600 bg-blue-200">
            <button className="rounded-3xl bg-blue-50 hover:bg-blue-600 h-8 px-4  border-2 border-blue-600 hover:border-transparent w-32">Cancel</button>
            <button className="rounded-3xl bg-blue-50 hover:bg-blue-600 h-8 px-4  border-2 border-blue-600 hover:border-transparent w-32">Submit</button>
        </div>
    </form>
</div>
 */
