import Link from 'next/link'
import { useRouter } from 'next/router'
import CompanyLogo from '../public/CompanyLogo.png'


const NavBar = () => {
    const router = useRouter();
    const currentRoute = router.pathname;

    return (
        <div className="absolute left-0 top-0 h-screen w-52 z-50 bg-gray-200 flex flex-col pt-4 px-4">
            <div className='w-32 h-32 mx-auto mb-2'><img src={CompanyLogo.src} /></div>
            <div className='w-32 h-8 mx-auto mb-6 text-center font-bold text-2xl text-blue-600'>UpTime</div>
            <select className='w-32 h-8 mx-auto mb-6 text-blue-600 border-b-2 border-blue-600'>
                <option>Current Property</option>
            </select>
            <Link href="/" className={'mb-2 w-32 mx-auto hover:text-blue-600 ' + (currentRoute === "/" ? "text-blue-600" : "")}>Dashboard</Link>
            <Link href="/properties" className={'mb-2 w-32 mx-auto hover:text-blue-600 ' + (currentRoute.includes("properties") ? "text-blue-600" : "")}>Properties</Link>
            <Link href="/jobs" className={'mb-2 w-32 mx-auto hover:text-blue-600 ' + (currentRoute.includes("jobs") ? "text-blue-600" : "")}>Jobs</Link>
            <Link href="/assets" className={'mb-2 w-32 mx-auto hover:text-blue-600 ' + (currentRoute.includes("assets") ? "text-blue-600" : "")}>Assets</Link>
            <Link href="/notifications" className={'mb-2 w-32 mx-auto hover:text-blue-600 ' + (currentRoute.includes("notifications") ? "text-blue-600" : "")}>Notifications</Link>
            <Link href="/settings" className={'mb-2 w-32 mx-auto hover:text-blue-600 ' + (currentRoute.includes("settings") ? "text-blue-600" : "")}>Settings</Link>
            <div className='absolute left-0 bottom-0 h-24 w-52 '>
                <div className='w-32 h-8 mx-auto mb-2'>Username</div>
                <button className='w-32 h-8 mx-auto mb-2'>Logout</button>
            </div>
        </div>
    )
}

export default NavBar