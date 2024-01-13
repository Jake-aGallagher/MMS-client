import Link from 'next/link';
import FullPage from '../../components/page/fullPage';
import Toolbar from '../../components/page/toolbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboard } from '@fortawesome/free-solid-svg-icons';

const Logs = () => {
    return (
        <FullPage>
            <Toolbar>
                <Link href="/logs/logsManagement" className="tLink">
                    <FontAwesomeIcon icon={faClipboard} className="mr-1 w-3" />
                    Logs Management
                </Link>
            </Toolbar>
        </FullPage>
    );
};

export default Logs;
