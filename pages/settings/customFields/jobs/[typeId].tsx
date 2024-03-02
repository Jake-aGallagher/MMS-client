import Link from "next/link";
import FullPage from "../../../../components/page/fullPage";
import Toolbar from "../../../../components/page/toolbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import FieldSetupBase from "../../../../components/settings/customFields/fieldSetupBase";
import { useRouter } from "next/router";

const jobPmFieldList = () => {
    const router = useRouter();
    const modelId = router.asPath.split('/')[4];
    return (
        <FullPage>
            <Toolbar>
                <Link href="/settings/customFields/jobs" className="tLink">
                    <FontAwesomeIcon icon={faArrowLeft} className="mr-1 w-3" />
                    <p>Return to Job/PM types</p>
                </Link>
            </Toolbar>
                <FieldSetupBase type="job" modelId={parseInt(modelId)} />
        </FullPage>
    );
};

export default jobPmFieldList;
