import Link from 'next/link';
import FullPage from '../../../../../components/layout/page/fullPage';
import Toolbar from '../../../../../components/layout/page/toolbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import router from 'next/router';
import FieldSetupBase from '../../../../../components/settings/customFields/fieldSetupBase';

const LogFormBuilder = () => {
    const logTemplateId = parseInt(router.asPath.split('/')[5]);

    return (
        <FullPage>
            <Toolbar>
                <Link href={`/maintenance/logs/logsManagement/${logTemplateId}`} className="tLink">
                    <FontAwesomeIcon icon={faArrowLeft} className="mr-1 w-3" />
                    <p>Return to Log Template</p>
                </Link>
            </Toolbar>
            <FieldSetupBase type="log" modelId={logTemplateId} />
        </FullPage>
    );
};

export default LogFormBuilder;
