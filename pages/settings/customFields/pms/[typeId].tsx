import Link from "next/link";
import FullPage from "../../../../components/layout/page/fullPage";
import Toolbar from "../../../../components/layout/page/toolbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import FieldSetupBase from "../../../../components/settings/customFields/fieldSetupBase";
import { useRouter } from "next/router";

const PmFieldList = () => {
    const router = useRouter();
    const modelId = router.asPath.split('/')[4];
    return (
        <FullPage>
            <Toolbar>
                <Link href="/settings/customFields/pms" className="tLink">
                    <FontAwesomeIcon icon={faArrowLeft} className="mr-1 w-3" />
                    <p>Return to PM types</p>
                </Link>
            </Toolbar>
                <FieldSetupBase type="pm" modelId={parseInt(modelId)} />
        </FullPage>
    );
};

export default PmFieldList;
