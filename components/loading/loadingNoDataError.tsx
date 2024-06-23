import { ReactNode } from 'react';
import RetrieveError from '../layout/error/retrieveError';
import Loading from './loading';

interface Props {
    children: ReactNode;
    loading: boolean;
    error: boolean;
    noData?: boolean;
}

const LoadingNoDataError = (props: Props) => {
    if (props.loading) {
        return <Loading />;
    } else if (props.noData) {
        return <div className='text-center pt-10'>No Data Found</div>;
    } else if (props.error) {
        return <RetrieveError />;
    } else {
        return <>{props.children}</>;
    }
};

export default LoadingNoDataError;
