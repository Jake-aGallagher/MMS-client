import Link from 'next/link';
import IndexCardLayout from '../../components/settings/indexCardLayout';
import { useSelector } from 'react-redux';
import { RootState } from '../../components/store/store';
import FullPage from '../../components/page/fullPage';
import Toolbar from '../../components/page/toolbar';

const Settings = () => {
    const permissions = useSelector((state: RootState) => state.permissions.value.permissions);
    const isAdmin = useSelector((state: RootState) => state.user.value.isAdmin);

    return (
        <FullPage>
            <Toolbar></Toolbar>
            <div className="h-screen flex flex-row flex-wrap">
                {permissions.users?.view || permissions.userGroups?.view || isAdmin ? (
                    <IndexCardLayout label="Users">
                        {permissions.users?.view || isAdmin ? (
                            <Link href="/settings/users" className="pl-4 mt-2 hover:text-accent flex flex-row items-center">
                                Users
                            </Link>
                        ) : null}
                        {permissions.userGroups?.view || isAdmin ? (
                            <>
                                <Link href="/settings/userGroups" className="pl-4 mt-2 hover:text-accent flex flex-row items-center">
                                    User Groups
                                </Link>
                                <Link href="/settings/permissions" className="pl-4 mt-2 hover:text-accent flex flex-row items-center">
                                    User Group Permissions
                                </Link>
                            </>
                        ) : null}
                    </IndexCardLayout>
                ) : null}
                {permissions.enums?.view || isAdmin ? (
                    <IndexCardLayout label="Enums">
                        <Link href="/settings/enumgroups" className="pl-4 mt-2 hover:text-accent flex flex-row items-center">
                            Enums
                        </Link>
                        <Link href="/settings/jobTypes" className="pl-4 mt-2 hover:text-accent flex flex-row items-center">
                            Job Types
                        </Link>
                        <Link href="/settings/statusTypes" className="pl-4 mt-2 hover:text-accent flex flex-row items-center">
                            Job Status Types
                        </Link>
                        <Link href="/settings/urgencyTypes" className="pl-4 mt-2 hover:text-accent flex flex-row items-center">
                            Job Urgency Types
                        </Link>
                    </IndexCardLayout>
                ) : null}
            </div>
        </FullPage>
    );
};

export default Settings;
