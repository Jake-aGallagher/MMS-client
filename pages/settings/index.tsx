import Link from 'next/link';
import IndexCardLayout from '../../components/settings/indexCardLayout';
import { useSelector } from 'react-redux';
import { RootState } from '../../components/store/store';

const Settings = () => {
    const permissions = useSelector((state: RootState) => state.permissions.value.permissions);
    const isAdmin = useSelector((state: RootState) => state.user.value.isAdmin);

    return (
        <div className="h-screen flex flex-row flex-wrap">
            <IndexCardLayout label="Users">
                <Link href="/settings/users" className="ml-8 hover:text-accent flex flex-row items-center">
                    Users
                </Link>
                <Link href="/settings/userGroups" className="ml-8 hover:text-accent flex flex-row items-center">
                    User Groups
                </Link>
                <Link href="/settings/permissions" className="ml-8 hover:text-accent flex flex-row items-center">
                    User Group Permissions
                </Link>
            </IndexCardLayout>
            {permissions.enums?.view || isAdmin ? (
                <IndexCardLayout label="Enums">
                    <Link href="/settings/enumgroups" className="ml-8 hover:text-accent flex flex-row items-center">
                        Enums
                    </Link>
                    <Link href="/settings/jobTypes" className="ml-8 hover:text-accent flex flex-row items-center">
                        Job Types
                    </Link>
                    <Link href="/settings/statusTypes" className="ml-8 hover:text-accent flex flex-row items-center">
                        Job Status Types
                    </Link>
                    <Link href="/settings/urgencyTypes" className="ml-8 hover:text-accent flex flex-row items-center">
                        Job Urgency Types
                    </Link>
                </IndexCardLayout>
            ) : null}
        </div>
    );
};

export default Settings;
