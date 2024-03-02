import Link from 'next/link';
import FullPage from '../../../../components/page/fullPage';
import Toolbar from '../../../../components/page/toolbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import router from 'next/router';
import FieldSetupBase from '../../../../components/settings/customFields/fieldSetupBase';

const LogFormBuilder = () => {
    const logTemplateId = parseInt(router.asPath.split('/')[4]);

    return (
        <FullPage>
            <Toolbar>
                <Link href={`/logs/logsManagement/${logTemplateId}`} className="tLink">
                    <FontAwesomeIcon icon={faArrowLeft} className="mr-1 w-3" />
                    <p>Return to Log Template</p>
                </Link>
            </Toolbar>
            <FieldSetupBase type="log" modelId={logTemplateId} />
        </FullPage>
    );
};

export default LogFormBuilder;
