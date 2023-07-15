import { ReactNode } from 'react';
import RetrieveError from '../error/retrieveError';
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
        return <div>There has been an issue getting the Property Data</div>;
    } else if (props.error) {
        return <RetrieveError />;
    } else {
        return <>{props.children}</>;
    }
};

export default LoadingNoDataError;
