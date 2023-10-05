import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { setUser } from '../store/userSlice';
import { setCurrentProperty } from '../store/propertySlice';
import CompanyLogo from '../../public/CompanyLogo.png';
import axios from 'axios';
import { SERVER_URL } from '../routing/addressAPI';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding, faFolderTree, faGear, faRightFromBracket, faScrewdriverWrench, faTruckFast } from '@fortawesome/free-solid-svg-icons';

interface Props {
    logoutHandler: () => void;
}

interface AvailProps {
    id: number;
    name: string;
    lastProperty?: boolean;
}

const NavBar = (props: Props) => {
    const userId = useSelector((state: RootState) => state.user.value.id);
    const currentProperty = useSelector((state: RootState) => state.currentProperty.value.currentProperty);
    const [availProps, setAvailProps] = useState<AvailProps[]>([]);
    const userDetails = useSelector((state: RootState) => state.user.value);
    const name = userDetails.first + ' ' + userDetails.last;
    const initials = userDetails.first.split('')[0].toUpperCase() + '.' + userDetails.last.split('')[0].toUpperCase();
    const router = useRouter();
    const currentRoute = router.pathname;
    const dispatch = useDispatch();

    useEffect(() => {
        retrieveProperty();
    }, [currentProperty]);

    const retrieveProperty = async () => {
        try {
            const response = await axios.get(`${SERVER_URL}/properties/last-property/${userId}`, {
                headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') },
            });
            if (response.data.length === 0) {
                alert('You are not assigned to any Properties, please speak to your Line Manager');
            } else {
                setAvailProps(response.data);
                let hasSelectedProp = false;
                response.data.forEach((property: AvailProps) => {
                    if (property.lastProperty == true) {
                        dispatch(
                            setCurrentProperty({
                                currentProperty: property.id,
                            })
                        );
                        hasSelectedProp = true;
                    }
                });
                if (hasSelectedProp === false) {
                    dispatch(
                        setCurrentProperty({
                            currentProperty: response.data[0].id,
                        })
                    );
                }
            }
        } catch (err) {
            alert('There has been an error whilst attempting to retrive your assigned properties, please try again');
        }
    };

    const changedProperty = async (newPropIdString: string) => {
        try {
            const newPropId = parseInt(newPropIdString);
            const response = await axios.put(
                `${SERVER_URL}/properties/Last-property`,
                {
                    userId: userId,
                    propertyId: newPropId,
                },
                {
                    headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') },
                }
            );
            if (response.data.created) {
                dispatch(
                    setCurrentProperty({
                        currentProperty: newPropId,
                    })
                );
            } else {
                alert('There has been an issue changing property, please try again.');
            }
        } catch (err) {
            alert('There has been an issue changing property, please try again.');
        }
    };

    const logoutProcess = () => {
        dispatch(
            setUser({
                username: '',
                first: '',
                last: '',
                user_group_id: 0,
                id: 0,
            })
        );
        localStorage.removeItem('token');
        localStorage.removeItem('expiryDate');
        props.logoutHandler();
    };

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
                <div className='hidden xl:block group-hover:block mx-auto w-full'>
                    {availProps && availProps.length > 1 ? (
                        <select value={currentProperty} onChange={(e) => changedProperty(e.target.value)} className="p-1 mx-auto w-full text-accent  hover:cursor-pointer">
                            {propertySelection}
                        </select>
                    ) : (
                        <div className="mx-auto text-accent border-b-2 border-accent">{availProps[0] && availProps[0].name}</div>
                    )}
                </div>
            </div>

            <Link href="/properties" className={'nLink ' + (currentRoute.includes('properties') ? 'text-accent' : '')}>
                <FontAwesomeIcon icon={faBuilding} className="w-3" />
                <span className="hidden xl:block group-hover:block transition-all absolute ml-4">Properties</span>
            </Link>
            <Link href="/jobs" className={'nLink ' + (currentRoute.includes('jobs') ? 'text-accent' : '')}>
                <FontAwesomeIcon icon={faScrewdriverWrench} className="mr-1 w-3" />
                <span className="hidden xl:block group-hover:block transition-all absolute ml-4">Jobs</span>
            </Link>
            <Link href="/assets" className={'nLink ' + (currentRoute.includes('assets') ? 'text-accent' : '')}>
                <FontAwesomeIcon icon={faFolderTree} className="mr-1 w-3" />
                <span className="hidden xl:block group-hover:block transition-all absolute ml-4">Assets</span>
            </Link>
            <Link href="/spares" className={'nLink ' + (currentRoute.includes('spares') ? 'text-accent' : '')}>
                <FontAwesomeIcon icon={faTruckFast} className="mr-1 w-3" />
                <span className="hidden xl:block group-hover:block transition-all absolute ml-4">Spares</span>
            </Link>
            <Link href="/settings" className={'nLink ' + (currentRoute.includes('settings') ? 'text-accent' : '')}>
                <FontAwesomeIcon icon={faGear} className="mr-1 w-3" />
                <span className="hidden xl:block group-hover:block transition-all absolute ml-4">Settings</span>
            </Link>
            <div className="mt-auto xl:w-52">
                <div className="w-32 h-8 mx-auto mb-2 hidden xl:block group-hover:block ml-5 transition-all">{name}</div>
                <div className="h-8 mx-auto mb-2 xl:hidden group-hover:hidden ml-5 transition-all">{initials}</div>
                <button onClick={logoutProcess} className="nLink h-8 items-center transition-all">
                    <FontAwesomeIcon icon={faRightFromBracket} className="mr-1 w-3" />
                    <span className="hidden xl:block group-hover:block transition-all">Logout</span>
                </button>
            </div>
        </div>
    );
};

export default NavBar;
