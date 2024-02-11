import Link from 'next/link';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import Logo from '../../public/Logo.svg';
import LogoWithName from '../../public/LogoName.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faBuilding,
    faBuildingUser,
    faChartColumn,
    faClipboardList,
    faFileContract,
    faFolderTree,
    faGear,
    faRightFromBracket,
    faScrewdriverWrench,
    faTruckFast,
} from '@fortawesome/free-solid-svg-icons';
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
        <div className="group fixed left-0 top-0 h-screen xl:w-52 w-16 hover:w-52 z-30 flex flex-col xl:items-start pt-3 bg-secondary text-text transition-all">
            <div className="mx-auto mb-2 flex flex-col justify-center items-center">
                <img className="w-44 h-24 transition-all hidden xl:block group-hover:block" src={LogoWithName.src} />
                <img className="w-12 h-24 transition-all block xl:hidden group-hover:hidden" src={Logo.src} />
            </div>
            <div className="h-6 mb-2">
                <div className="hidden pl-4 xl:block group-hover:block mx-auto w-full">
                    {availProps && availProps.length > 1 ? (
                        <select value={currentProperty} onChange={(e) => changeProperty(dispatch, userId, e.target.value)} className="p-1 mx-auto w-full text-accent  hover:cursor-pointer">
                            {propertySelection}
                        </select>
                    ) : (
                        <span className={`h-8 mx-auto text-accent ${availProps[0] && availProps[0].name.length > 20 ? 'text-sm' : ''}`}>{availProps[0] && availProps[0].name}</span>
                    )}
                </div>
                <div className="xl:hidden group-hover:hidden h-full w-full flex flex-row justify-center items-center">
                    <FontAwesomeIcon icon={faBuildingUser} className="w-4" />
                </div>
            </div>
            <Link href="/" className={'nLink ' + (currentRoute == '/' ? 'text-accent' : '')}>
                <FontAwesomeIcon icon={faChartColumn} className="w-3" />
                <span className="hidden group-hover:block xl:block absolute w-0 ml-4 animate-slide">Dashboard</span>
            </Link>
            {permissions.properties?.view || isAdmin ? (
                <Link href="/properties" className={'nLink ' + (currentRoute.includes('properties') ? 'text-accent' : '')}>
                    <FontAwesomeIcon icon={faBuilding} className="w-3" />
                    <span className="hidden group-hover:block xl:block absolute w-0 ml-4 animate-slide">Properties</span>
                </Link>
            ) : null}
            {permissions.jobs?.view || isAdmin ? (
                <Link href="/jobs" className={'nLink ' + (currentRoute.includes('jobs') ? 'text-accent' : '')}>
                    <FontAwesomeIcon icon={faScrewdriverWrench} className="mr-1 w-3" />
                    <span className="hidden group-hover:block xl:block absolute w-0 ml-4 animate-slide">Jobs</span>
                </Link>
            ) : null}
            {permissions.schedules?.view || isAdmin ? (
                <Link href="/pm-schedules" className={'nLink ' + (currentRoute.includes('pm-schedules') ? 'text-accent' : '')}>
                    <FontAwesomeIcon icon={faClipboardList} className="mr-1 w-3" />
                    <span className="hidden group-hover:block xl:block absolute w-0 ml-4 animate-slide">PM's</span>
                </Link>
            ) : null}
            {permissions.assets?.view || isAdmin ? (
                <Link href="/assets" className={'nLink ' + (currentRoute.includes('assets') ? 'text-accent' : '')}>
                    <FontAwesomeIcon icon={faFolderTree} className="mr-1 w-3" />
                    <span className="hidden group-hover:block xl:block absolute w-0 ml-4 animate-slide">Assets</span>
                </Link>
            ) : null}
            {permissions.jobs?.view || isAdmin ? (
                <Link href="/logs" className={'nLink ' + (currentRoute.includes('logs') ? 'text-accent' : '')}>
                    <FontAwesomeIcon icon={faFileContract} className="mr-1 w-3" />
                    <span className="hidden group-hover:block xl:block absolute w-0 ml-4 animate-slide">Logs</span>
                </Link>
            ) : null}
            {permissions.spares?.view || isAdmin ? (
                <Link href="/spares" className={'nLink ' + (currentRoute.includes('spares') ? 'text-accent' : '')}>
                    <FontAwesomeIcon icon={faTruckFast} className="mr-1 w-3" />
                    <span className="hidden group-hover:block xl:block absolute w-0 ml-4 animate-slide">Spares</span>
                </Link>
            ) : null}
            <Link href="/settings" className={'nLink ' + (currentRoute.includes('settings') ? 'text-accent' : '')}>
                <FontAwesomeIcon icon={faGear} className="mr-1 w-3" />
                <span className="hidden group-hover:block xl:block absolute w-0 ml-4 animate-slide">Settings</span>
            </Link>
            <div className="mt-auto w-full flex flex-col items-center">
                <div className="h-8 mb-2">{initials}</div>
                <button onClick={() => logoutProcess(props.logoutHandler, dispatch)} className="w-full flex flex-row justify-center items-center h-8 mb-4 transition-all hover:text-accent">
                    <FontAwesomeIcon icon={faRightFromBracket} className="mr-1 w-3" />
                    <span className="hidden xl:block group-hover:block ">Logout</span>
                </button>
            </div>
        </div>
    );
};

export default NavBar;
