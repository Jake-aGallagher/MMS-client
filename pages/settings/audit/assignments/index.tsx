import Link from 'next/link';
import FullPage from '../../../../components/layout/page/fullPage';
import Toolbar from '../../../../components/layout/page/toolbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import ModalBase from '../../../../components/layout/modal/modal';
import { useState } from 'react';
import Tabset from '../../../../components/layout/tabs/tabset';
import Tab from '../../../../components/layout/tabs/tab';
import JobAssignments from '../../../../components/settings/audits/assignments/jobAssignments';

const AuditAssignments = () => {
    const [modal, setModal] = useState<{ view: boolean; type: string; payload: { id: number; name: string } }>({ view: false, type: '', payload: { id: 0, name: '' } });
    return (
        <FullPage>
            <Toolbar>
                <Link href="/settings" className="tLink">
                    <FontAwesomeIcon icon={faArrowLeft} className="mr-1 w-3" />
                    <p>Return to Settings</p>
                </Link>
            </Toolbar>
            {modal.view ? <ModalBase modalType={modal.type} payload={{ ...modal.payload }} closeModal={() => [setModal({ view: false, type: '', payload: { id: 0, name: '' } })]} /> : null}
            <Tabset>
                <Tab id="Assets" label="Assets"></Tab>
                <Tab id="Jobs" label="Jobs"><JobAssignments /></Tab>
                <Tab id="PMs" label="PMs">this is another test 2</Tab>
                <Tab id="Logs" label="Logs">this is another test 3</Tab>
                <Tab id="Suppliers" label="Suppliers">this is another test </Tab>
                <Tab id="Orders" label="Orders">this is another test </Tab>
                <Tab id="Parts" label="Parts">this is another test </Tab>
                <Tab id="Products" label="Products">this is another test </Tab>
                <Tab id="Procedures" label="Procedures">this is another test </Tab>
                <Tab id="Policies" label="Policies">this is another test </Tab>
            </Tabset>
        </FullPage>
    );
};

export default AuditAssignments;
