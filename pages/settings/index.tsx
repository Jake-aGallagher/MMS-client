import Link from 'next/link';

const Settings = () => {
    return (
        <div className="h-screen">
            <Link href="/settings/users" className="ml-8 hover:text-accent flex flex-row items-center">
                Manage Users
            </Link>
            <Link href="/settings/userGroups" className="ml-8 hover:text-accent flex flex-row items-center">
                Manage User Groups
            </Link>
            <Link href="/settings/permissions" className="ml-8 hover:text-accent flex flex-row items-center">
                Manage User Group Permissions
            </Link>
            <Link href="/settings/enums" className="ml-8 hover:text-accent flex flex-row items-center">
                Manage Enums
            </Link>
        </div>
    );
};

export default Settings;
