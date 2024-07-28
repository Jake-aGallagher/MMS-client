import Link from 'next/link';
import IndexCardLayout from '../../components/settings/indexCardLayout';
import { useSelector } from 'react-redux';
import { RootState } from '../../components/store/store';
import FullPage from '../../components/layout/page/fullPage';
import Toolbar from '../../components/layout/page/toolbar';
import { faListOl, faPencil, faUser } from '@fortawesome/free-solid-svg-icons';

const Settings = () => {
    const permissions = useSelector((state: RootState) => state.permissions.value.permissions);
    const isAdmin = useSelector((state: RootState) => state.user.value.isAdmin);

    return (
        <FullPage>
            <Toolbar></Toolbar>
            <div className=" flex flex-row flex-wrap">
                {permissions.users?.view || permissions.userGroups?.view || isAdmin ? (
                    <IndexCardLayout label="Users" icon={faUser}>
                        {permissions.users?.view || isAdmin ? (
                            <Link
                                href="/settings/users"
                                className="mt-2 hover:text-accent flex flex-row items-center border-b-1 border-solid border-accent border-opacity-10 transition-all"
                            >
                                Users
                            </Link>
                        ) : null}
                        {permissions.userGroups?.view || isAdmin ? (
                            <>
                                <Link href="/settings/userGroups" className="mt-2 hover:text-accent flex flex-row items-center border-b-1 border-solid border-accent border-opacity-10 transition-all">
                                    User Groups
                                </Link>
                                <Link href="/settings/permissions" className="mt-2 hover:text-accent flex flex-row items-center border-b-1 border-solid border-accent border-opacity-10 transition-all">
                                    User Group Permissions
                                </Link>
                            </>
                        ) : null}
                    </IndexCardLayout>
                ) : null}
                {permissions.enums?.view || isAdmin ? (
                    <IndexCardLayout label="Enums" icon={faListOl}>
                        <Link href="/settings/enumgroups" className="mt-2 hover:text-accent flex flex-row items-center border-b-1 border-solid border-accent border-opacity-10 transition-all">
                            Enums (Select Options)
                        </Link>
                        <Link href="/settings/taskTypes" className="mt-2 hover:text-accent flex flex-row items-center border-b-1 border-solid border-accent border-opacity-10 transition-all">
                            Job/PM Types
                        </Link>
                        <Link href="/settings/statusTypes" className="mt-2 hover:text-accent flex flex-row items-center border-b-1 border-solid border-accent border-opacity-10 transition-all">
                            Status Types
                        </Link>
                        <Link href="/settings/urgencyTypes" className="mt-2 hover:text-accent flex flex-row items-center border-b-1 border-solid border-accent border-opacity-10 transition-all">
                            Urgency Types
                        </Link>
                    </IndexCardLayout>
                ) : null}

                <IndexCardLayout label="Custom Fields" icon={faPencil}>
                    <Link href="/settings/customFields/facilities" className="mt-2 hover:text-accent flex flex-row items-center border-b-1 border-solid border-accent border-opacity-10 transition-all">
                        Facilities
                    </Link>
                    <Link href="/settings/customFields/jobs" className="mt-2 hover:text-accent flex flex-row items-center border-b-1 border-solid border-accent border-opacity-10 transition-all">
                        Jobs
                    </Link>
                    <Link href="/settings/customFields/pms" className="mt-2 hover:text-accent flex flex-row items-center border-b-1 border-solid border-accent border-opacity-10 transition-all">
                        PMs
                    </Link>
                    <Link href="/settings/customFields/assets" className="mt-2 hover:text-accent flex flex-row items-center border-b-1 border-solid border-accent border-opacity-10 transition-all">
                        Assets
                    </Link>
                    <Link href="/settings/customFields/spares" className="mt-2 hover:text-accent flex flex-row items-center border-b-1 border-solid border-accent border-opacity-10 transition-all">
                        Spares
                    </Link>
                </IndexCardLayout>

                <IndexCardLayout label="Audits" icon={faPencil}>
                    <Link href="/settings/audits/assignments" className="mt-2 hover:text-accent flex flex-row items-center border-b-1 border-solid border-accent border-opacity-10 transition-all">
                        Assignments
                    </Link>
                    <Link href="/settings/audits/templates" className="mt-2 hover:text-accent flex flex-row items-center border-b-1 border-solid border-accent border-opacity-10 transition-all">
                        Templates
                    </Link>
                </IndexCardLayout>
                
            </div>
        </FullPage>
    );
};

export default Settings;
