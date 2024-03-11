import Link from 'next/link';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import Logo from '../../public/Logo.svg';
import LogoWithName from '../../public/LogoName.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding, faChartColumn, faClipboardList, faCoins, faFileContract, faFolderTree, faGear, faRetweet, faRightFromBracket, faScrewdriverWrench, faTruckFast } from '@fortawesome/free-solid-svg-icons';
import { logoutProcess } from './logoutProcess';
import { useRetrieveProperty } from './useRetrieveProperty';
import { useState } from 'react';
import ModalBase from '../modal/modal';
import Timer from './timer';

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
    const initials = userDetails.first.split('')[0].toUpperCase() + '.' + userDetails.last.split('')[0].toUpperCase();
    const currentRoute = router.pathname.split('/')[1];
    const [modal, setModal] = useState<{ view: boolean; type: string }>({ view: false, type: '' });

    return (
        <>
            {modal.view ? <ModalBase modalType={modal.type} closeModal={() => setModal({ view: false, type: '' })} /> : ''}
            <div className="group fixed left-0 top-0 h-screen xl:w-52 w-16 hover:w-52 z-30 flex flex-col xl:items-start pt-3 bg-secondary text-text transition-all">
                <div className="mx-auto mb-2 flex flex-col justify-center items-center">
                    <img className="w-44 h-24 transition-all hidden xl:block group-hover:block" src={LogoWithName.src} />
                    <img className="w-12 h-24 transition-all block xl:hidden group-hover:hidden" src={Logo.src} />
                </div>
                <div className="xl:hidden group-hover:hidden w-full h-8 mb-2 flex flex-row justify-center items-center overflow-hidden text-accent">
                    {availProps.find((item) => item.id == currentProperty)?.name.slice(0, 5) || 'None'}
                </div>
                <div className="xl:flex group-hover:flex w-full h-8 pl-6 mb-2 hidden flex-row items-center overflow-hidden relative animate-slideSlow">
                    <div className="animate-slideSlow text-accent">{availProps.find((item) => item.id == currentProperty)?.name.slice(0, 17) || 'None'}</div>
                    <button
                        onClick={() => setModal({ view: true, type: 'propertyPicker' })}
                        className="absolute right-0 w-10 h-full flex flex-row justify-center items-center transition-all hover:text-accent animate-slideSlow"
                    >
                        <FontAwesomeIcon icon={faRetweet} className="w-5" />
                    </button>
                </div>

                <Link href="/" className={'nLink ' + (currentRoute == '' ? 'text-accent' : '')}>
                    <FontAwesomeIcon icon={faChartColumn} className="w-3" />
                    <span className="hidden group-hover:block xl:block absolute w-0 ml-4 animate-slide">Dashboard</span>
                </Link>
                <Link href="/revenue" className={'nLink ' + (currentRoute == 'revenue' ? 'text-accent' : '')}>
                    <FontAwesomeIcon icon={faCoins} className="w-3" />
                    <span className="hidden group-hover:block xl:block absolute w-0 ml-4 animate-slide">Revenue</span>
                </Link>
                {permissions.properties?.view || isAdmin ? (
                    <Link href="/properties" className={'nLink ' + (currentRoute == 'properties' ? 'text-accent' : '')}>
                        <FontAwesomeIcon icon={faBuilding} className="w-3" />
                        <span className="hidden group-hover:block xl:block absolute w-0 ml-4 animate-slide">Properties</span>
                    </Link>
                ) : null}
                {permissions.jobs?.view || isAdmin ? (
                    <Link href="/jobs" className={'nLink ' + (currentRoute == 'jobs' ? 'text-accent' : '')}>
                        <FontAwesomeIcon icon={faScrewdriverWrench} className="mr-1 w-3" />
                        <span className="hidden group-hover:block xl:block absolute w-0 ml-4 animate-slide">Jobs</span>
                    </Link>
                ) : null}
                {permissions.schedules?.view || isAdmin ? (
                    <Link href="/pms" className={'nLink ' + (currentRoute == 'pms' ? 'text-accent' : '')}>
                        <FontAwesomeIcon icon={faClipboardList} className="mr-1 w-3" />
                        <span className="hidden group-hover:block xl:block absolute w-0 ml-4 animate-slide">PMs</span>
                    </Link>
                ) : null}
                {permissions.assets?.view || isAdmin ? (
                    <Link href="/assets" className={'nLink ' + (currentRoute == 'assets' ? 'text-accent' : '')}>
                        <FontAwesomeIcon icon={faFolderTree} className="mr-1 w-3" />
                        <span className="hidden group-hover:block xl:block absolute w-0 ml-4 animate-slide">Assets</span>
                    </Link>
                ) : null}
                {permissions.jobs?.view || isAdmin ? (
                    <Link href="/logs" className={'nLink ' + (currentRoute == 'logs' ? 'text-accent' : '')}>
                        <FontAwesomeIcon icon={faFileContract} className="mr-1 w-3" />
                        <span className="hidden group-hover:block xl:block absolute w-0 ml-4 animate-slide">Logs</span>
                    </Link>
                ) : null}
                {permissions.spares?.view || isAdmin ? (
                    <Link href="/spares" className={'nLink ' + (currentRoute == 'spares' ? 'text-accent' : '')}>
                        <FontAwesomeIcon icon={faTruckFast} className="mr-1 w-3" />
                        <span className="hidden group-hover:block xl:block absolute w-0 ml-4 animate-slide">Spares</span>
                    </Link>
                ) : null}
                <Link href="/settings" className={'nLink ' + (currentRoute == 'settings' ? 'text-accent' : '')}>
                    <FontAwesomeIcon icon={faGear} className="mr-1 w-3" />
                    <span className="hidden group-hover:block xl:block absolute w-0 ml-4 animate-slide">Settings</span>
                </Link>
                <div className="mt-auto w-full flex flex-col items-center">
                    <Timer expiryTime={new Date().getTime() + 60 * 60 * 1000} />
                    <div className="h-8 mb-2 select-none">{initials}</div>
                    <button onClick={() => logoutProcess(props.logoutHandler, dispatch)} className="w-full flex flex-row justify-center items-center h-8 mb-4 transition-all hover:text-accent">
                        <FontAwesomeIcon icon={faRightFromBracket} className="mr-1 w-3" />
                        <span className="hidden xl:block group-hover:block ">Logout</span>
                    </button>
                </div>
            </div>
        </>
    );
};

export default NavBar;
