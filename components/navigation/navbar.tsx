import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { setUser } from '../store/userSlice';
import { setCurrentProperty } from '../store/propertySlice';
import CompanyLogo from '../../public/CompanyLogo.png';
import axios from 'axios';

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
    const router = useRouter();
    const currentRoute = router.pathname;
    const dispatch = useDispatch();

    useEffect(() => {
        retrieveProperty();
    }, []);

    const retrieveProperty = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/properties/last-property/${userId}`, {
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
                'http://localhost:3001/properties/Last-property',
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
                authority: 0,
                id: 0,
            })
        );
        localStorage.removeItem('token');
        localStorage.removeItem('expiryDate');
        props.logoutHandler();
    };

    const propertySelection = availProps.map((p) => (
        <option key={p.id} value={p.id} className="text-blue-600">
            {p.name}
        </option>
    ));

    return (
        <div className="fixed left-0 top-0 h-screen w-52 z-30 bg-gray-200 flex flex-col pt-4 px-4">
            <div className="w-32 h-32 mx-auto mb-2">
                <img src={CompanyLogo.src} />
            </div>
            <div className="w-32 h-8 mx-auto mb-6 text-center font-bold text-2xl text-blue-600">UpTime</div>

            {availProps && availProps.length > 1 ? (
                <select
                    value={currentProperty}
                    onChange={(e) => changedProperty(e.target.value)}
                    className="w-32 h-8 mx-auto mb-6 text-blue-600 border-b-2 border-blue-600"
                >
                    {propertySelection}
                </select>
            ) : (
                <div className="w-32 h-8 mx-auto mb-6 text-blue-600 border-b-2 border-blue-600">{availProps[0] && availProps[0].name}</div>
            )}

            <Link href="/" className={'mb-2 w-32 mx-auto hover:text-blue-600 ' + (currentRoute === '/' ? 'text-blue-600' : '')}>
                Dashboard
            </Link>
            <Link href="/properties" className={'mb-2 w-32 mx-auto hover:text-blue-600 ' + (currentRoute.includes('properties') ? 'text-blue-600' : '')}>
                Properties
            </Link>
            <Link href="/jobs" className={'mb-2 w-32 mx-auto hover:text-blue-600 ' + (currentRoute.includes('jobs') ? 'text-blue-600' : '')}>
                Jobs
            </Link>
            <Link href="/assets" className={'mb-2 w-32 mx-auto hover:text-blue-600 ' + (currentRoute.includes('assets') ? 'text-blue-600' : '')}>
                Assets
            </Link>
            <Link href="/spares" className={'mb-2 w-32 mx-auto hover:text-blue-600 ' + (currentRoute.includes('spares') ? 'text-blue-600' : '')}>
                Spares
            </Link>
            <Link href="/forecast" className={'mb-2 w-32 mx-auto hover:text-blue-600 ' + (currentRoute.includes('forecast') ? 'text-blue-600' : '')}>
                Forecast
            </Link>
            <Link href="/matrix" className={'mb-2 w-32 mx-auto hover:text-blue-600 ' + (currentRoute.includes('matrix') ? 'text-blue-600' : '')}>
                Matrix
            </Link>
            <Link href="/notifications" className={'mb-2 w-32 mx-auto hover:text-blue-600 ' + (currentRoute.includes('notifications') ? 'text-blue-600' : '')}>
                Notifications
            </Link>
            <Link href="/messages" className={'mb-2 w-32 mx-auto hover:text-blue-600 ' + (currentRoute.includes('messages') ? 'text-blue-600' : '')}>
                Messages
            </Link>
            <Link href="/settings" className={'mb-2 w-32 mx-auto hover:text-blue-600 ' + (currentRoute.includes('settings') ? 'text-blue-600' : '')}>
                Settings
            </Link>
            <div className="absolute left-0 bottom-0 h-24 w-52 ">
                <div className="w-32 h-8 mx-auto mb-2">{name}</div>
                <button onClick={logoutProcess} className="w-32 h-8 mx-auto mb-2">
                    Logout
                </button>
            </div>
        </div>
    );
};

export default NavBar;
