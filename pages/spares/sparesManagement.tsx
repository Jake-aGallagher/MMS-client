import { useEffect, useState } from "react";
import Loading from "../../components/loading/loading";
import RetrieveError from "../../components/error/retrieveError";
import axios from "axios";

const SparesManagement = () => {
    const [loading, setLoading] = useState(true);
    const [noData, setNoData] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        setLoading(true);
        setError(false);
        setNoData(false);
        getJobHandler();
    }, []);

    const getJobHandler = async () => {
        /* try {
            const response = await axios.get(`http://localhost:3001/jobs/${params.asPath.split('/')[2]}`, {
                headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') },
            });
            if (response.data.length === 0) {
                setNoData(true);
            } else {
                setJobDetails(response.data);
            }
            setLoading(false);
        } catch (err) {
            setError(true);
            setLoading(false);
        } */
    };


return (
        <>
            {/* {loading ? (
                <Loading />
            ) : noData ? (
                <div>There is no data</div>
            ) : error ? (
                <RetrieveError />
            ) : (
                <div className="w-full h-full grid overflow-hidden  grid-cols-5 grid-rows-12 gap-0.5"></div>
            )} */}
            <div>
                <ul>
                    <li>Manage inventory</li>
                    <li>manage deliveries</li>
                    <li>supplier info</li>
                    <li>notes</li>
                    <li>stock warnings</li>
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
            </div>
        </>
    );
}

export default SparesManagement;