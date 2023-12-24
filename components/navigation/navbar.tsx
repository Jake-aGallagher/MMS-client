import Link from 'next/link';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import CompanyLogo from '../../public/CompanyLogo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding, faChartColumn, faClipboardList, faFolderTree, faGear, faRightFromBracket, faScrewdriverWrench, faTruckFast } from '@fortawesome/free-solid-svg-icons';
import { logoutProcess } from './logoutProcess';
import { changeProperty } from './changeProperty';
import { useRetrieveProperty } from './useRetrieveProperty';

interface Props {
    logoutHandler: () => void;
}

const NavBar = (props: Props) => {
    const permissions = useSelector((state: RootState) => state.permissions.value.permissions);
    const isAdmin = useSelector((state: RootState) => state.user.value.isAdmin);
    const dispatch = useDispatch();
    const router = useRouter();
    const userId = useSelector((state: RootState) => state.user.value.id);
    const currentProperty = useSelector((state: RootState) => state.currentProperty.value.currentProperty);
    const userDetails = useSelector((state: RootState) => state.user.value);
    const { availProps } = useRetrieveProperty({ currentProperty, userId });
    const name = userDetails.first + ' ' + userDetails.last;
    const initials = userDetails.first.split('')[0].toUpperCase() + '.' + userDetails.last.split('')[0].toUpperCase();
    const currentRoute = router.pathname;

    const propertySelection = availProps.map((p) => (
        <option key={p.id} value={p.id} className="text-accent">
            {p.name}
        </option>
    ));

    return (
        <div className="group fixed left-0 top-0 h-screen xl:w-52 w-16 hover:w-52 z-30 flex flex-col xl:items-start pt-4 bg-secondary text-text transition-all">
            <div className="mx-auto mb-2 h-32 flex flex-col justify-center items-center">
                <img className="w-8 h-8 xl:w-32 xl:h-32 group-hover:w-32 group-hover:h-32 transition-all" src={CompanyLogo.src} />
            </div>
            <div className="xl:w-32 h-8 mx-auto mb-6 text-center xl:text-2xl text-text transition-all">GIMMS</div>
            <div className="h-8 mb-6 px-2">
                <div className="hidden xl:block group-hover:block mx-auto w-full">
                    {availProps && availProps.length > 1 ? (
                        <select value={currentProperty} onChange={(e) => changeProperty(dispatch, userId, e.target.value)} className="p-1 mx-auto w-full text-accent  hover:cursor-pointer">
                            {propertySelection}
                        </select>
                    ) : (
                        <div className="mx-auto text-accent border-b-2 border-accent">{availProps[0] && availProps[0].name}</div>
                    )}
                </div>
            </div>
            <Link href="/" className={'nLink ' + (currentRoute == '/' ? 'text-accent' : '')}>
                <FontAwesomeIcon icon={faChartColumn} className="w-3" />
                <span className="hidden xl:block group-hover:block transition-all absolute ml-4">Dashboard</span>
            </Link>
            {permissions.properties?.view || isAdmin ? (
                <Link href="/properties" className={'nLink ' + (currentRoute.includes('properties') ? 'text-accent' : '')}>
                    <FontAwesomeIcon icon={faBuilding} className="w-3" />
                    <span className="hidden xl:block group-hover:block transition-all absolute ml-4">Properties</span>
                </Link>
            ) : null}
            {permissions.jobs?.view || isAdmin ? (
                <Link href="/jobs" className={'nLink ' + (currentRoute.includes('jobs') ? 'text-accent' : '')}>
                    <FontAwesomeIcon icon={faScrewdriverWrench} className="mr-1 w-3" />
                    <span className="hidden xl:block group-hover:block transition-all absolute ml-4">Jobs</span>
                </Link>
            ) : null}
            {permissions.schedules?.view || isAdmin ? (
                <Link href="/schedules" className={'nLink ' + (currentRoute.includes('schedules') ? 'text-accent' : '')}>
                    <FontAwesomeIcon icon={faClipboardList} className="mr-1 w-3" />
                    <span className="hidden xl:block group-hover:block transition-all absolute ml-4">PM's</span>
                </Link>
            ) : null}
            {permissions.assets?.view || isAdmin ? (
                <Link href="/assets" className={'nLink ' + (currentRoute.includes('assets') ? 'text-accent' : '')}>
                    <FontAwesomeIcon icon={faFolderTree} className="mr-1 w-3" />
                    <span className="hidden xl:block group-hover:block transition-all absolute ml-4">Assets</span>
                </Link>
            ) : null}
            {permissions.spares?.view || isAdmin ? (
                <Link href="/spares" className={'nLink ' + (currentRoute.includes('spares') ? 'text-accent' : '')}>
                    <FontAwesomeIcon icon={faTruckFast} className="mr-1 w-3" />
                    <span className="hidden xl:block group-hover:block transition-all absolute ml-4">Spares</span>
                </Link>
            ) : null}
            <Link href="/settings" className={'nLink ' + (currentRoute.includes('settings') ? 'text-accent' : '')}>
                <FontAwesomeIcon icon={faGear} className="mr-1 w-3" />
                <span className="hidden xl:block group-hover:block transition-all absolute ml-4">Settings</span>
            </Link>
            <div className="mt-auto xl:w-52">
                <div className="w-32 h-8 mx-auto mb-2 hidden xl:block group-hover:block ml-5 transition-all">{name}</div>
                <div className="h-8 mx-auto mb-2 xl:hidden group-hover:hidden ml-5 transition-all">{initials}</div>
                <button onClick={() => logoutProcess(props.logoutHandler, dispatch)} className="nLink h-8 items-center transition-all">
                    <FontAwesomeIcon icon={faRightFromBracket} className="mr-1 w-3" />
                    <span className="hidden xl:block group-hover:block transition-all">Logout</span>
                </button>
            </div>
        </div>
    );
};

export default NavBar;
