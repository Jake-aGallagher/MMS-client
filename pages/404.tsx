import Link from 'next/link';

const NotFound = () => {
    return (
        <div className='h-screen flex flex-col items-center pt-32'>
            <div className='mb-8 '>The page you are looking for could not be found</div>
            <Link href="/" className='border-b-2 border-blue-600 hover:text-blue-600'>Return to the Dashboard</Link>
        </div>
    );
};

export default NotFound;
