import { useState, useEffect } from 'react';
import axios from 'axios';
import Loading from '../loading/loading';
import { useRouter } from 'next/router';
import RetrieveError from '../error/retrieveError';
import { RootState } from '../store/store';
import { useSelector } from 'react-redux';
import ModalBase from '../modal/modal';

interface ModalProps {
    closeModal: () => void;
    jobId: number;
}

interface StatusOptions {
    value: string;
}

interface User {
    id: number;
    username: string;
    first_name: string;
    last_name: string;
    authority: number;
}

interface SparesUsed {
    id: number;
    part_no: string;
    name: string;
    num_used: number;
}

interface LoggedTime {
    id: number;
    time: number;
}

const UpdateJob = (props: ModalProps) => {
    const [loading, setLoading] = useState(true);
    const [noData, setNoData] = useState(false);
    const [error, setError] = useState(false);
    const currentProperty = useSelector((state: RootState) => state.currentProperty.value.currentProperty);
    const params = useRouter();
    const [statusOptions, setStatusOptions] = useState<StatusOptions[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [id, setId] = useState(0);
    const [status, setStatus] = useState('');
    const [description, setDescription] = useState('');
    const [notes, setNotes] = useState('');
    const [sparesUsed, setSparesUsed] = useState<SparesUsed[]>([])
    const [time, setTime] = useState(0);
    const [completed, setCompleted] = useState(0);
    const [loggedTimeId, setLoggedTimeId] = useState(0);
    const [loggedTimeNum, setLoggedTimeNum] = useState(0);
    const [loggedTimeDetails, setLoggedTimeDetails] = useState<LoggedTime[]>([]);
    const [viewModal, setViewModal] = useState(false);

    useEffect(() => {
        setLoading(true);
        setError(false);
        setNoData(false);
        getJobUpdate();
    }, []);

    let idToSearch = 0;
    if (params.asPath.split('/')[2] === undefined) {
        idToSearch = props.jobId;
    } else {
        idToSearch = parseInt(params.asPath.split('/')[2]);
    }

    const getJobUpdate = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/jobs/update/${currentProperty}/${idToSearch}`, {
                headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') },
            });
            if (response.data.jobDetails === 0) {
                setNoData(true);
            } else {
                setStatusOptions(response.data.statusOptions);
                setUsers(response.data.users);
                if (response.data.usedSpares) {
                    setSparesUsed(response.data.usedSpares)
                }
                if (response.data.timeDetails) {
                    setLoggedTimeDetails(response.data.timeDetails);
                    let totalTime = 0;
                    response.data.timeDetails.forEach((detail: LoggedTime) => {
                        totalTime += detail.time;
                    });
                    setTime(totalTime);
                }
                const data = response.data.jobDetails[0];
                setId(data.id);
                setStatus(data.status);
                if (data.description === null) {
                    setDescription('');
                } else {
                    setDescription(data.description);
                }
                if (data.notes === null) {
                    setNotes('');
                } else {
                    setNotes(data.notes);
                }
                setCompleted(data.completed);
                setNoData(false);
            }
            setLoading(false);
        } catch (err) {
            setError(true);
            setLoading(false);
        }
    };

    const addSparesHandler = (
        spares: {
            id: number;
            part_no: string;
            name: string;
            num_used: number;
        }[]
    ) => {
        setSparesUsed(spares)
    };

    const addTimeHandler = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        if (loggedTimeId > 0 && loggedTimeNum > 0) {
            let totalTime = 0;
            loggedTimeDetails.forEach((detail) => {
                totalTime += detail.time;
            });
            setTime(totalTime + loggedTimeNum);
            const indexOfMatch = loggedTimeDetails.findIndex((x) => x.id === loggedTimeId);
            if (indexOfMatch != -1) {
                setLoggedTimeDetails((prev) => {
                    const filtered = prev.filter((item) => item.id != loggedTimeId);
                    return [...filtered, { id: loggedTimeId, time: prev[indexOfMatch].time + loggedTimeNum }];
                });
            } else {
                setLoggedTimeDetails((prev) => [...prev, { id: loggedTimeId, time: loggedTimeNum }]);
            }
            setLoggedTimeId(0);
            setLoggedTimeNum(0);
        }
    };

    const submitHandler = async (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        if ((status === 'Attended - Fixed' || status === 'Attended - Found no Issues') && completed !== 1) {
            if (
                confirm('You are about to Complete this Job, once completed the only editable section will be the Notes, are you sure you want to continue') ===
                true
            ) {
                submitFull(true);
            }
        } else if (completed !== 1) {
            submitFull(false);
        } else {
            submitNotes();
        }
    };

    const submitFull = async (complete: boolean) => {
        const response = await axios.put(
            'http://localhost:3001/jobs/update',
            {
                id: id,
                status: status,
                description: description,
                notes: notes,
                logged_time: time,
                logged_time_details: loggedTimeDetails,
                complete,
                sparesUsed,
                propertyId: currentProperty
            },
            {
                headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') },
            }
        );
        if (response.data.created) {
            props.closeModal();
        } else {
            alert('There has been an issue updating this Job, please try again.');
        }
    };

    const submitNotes = async () => {
        const response = await axios.put(
            'http://localhost:3001/jobs/notes',
            {
                id: id,
                notes: notes,
            },
            {
                headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') },
            }
        );
        if (response.data.created) {
            props.closeModal();
        } else {
            alert('There has been an issue updating this Job, please try again.');
        }
    };

    return (
        <>
            {loading ? (
                <Loading />
            ) : noData ? (
                <div>There is no data</div>
            ) : error ? (
                <RetrieveError />
            ) : (
                <>
                    {viewModal ? (
                        <ModalBase
                            modalType="sparesUsed"
                            payload={{idToSearch, sparesUsed}}
                            fullSize={true}
                            passbackDeatails={addSparesHandler}
                            closeModal={() => setViewModal(false)}
                        />
                    ) : (
                        ''
                    )}
                    <div className="h-full w-full rounded-lg relative border-4 border-blue-200">
                        <h1 className="w-full h-10 flex flex-row justify-center items-center font-bold bg-blue-200">Update Job</h1>
                        <form className="flex flex-col justify-start px-4 pt-2 overflow-y-auto h-[calc(100%-104px)]">
                            {completed !== 1 ? (
                                <>
                                    <label htmlFor="status">Current Status:</label>
                                    <select id="status" className="mb-2 rounded-sm bg-blue-200" onChange={(e) => setStatus(e.target.value)} value={status}>
                                        {statusOptions.map((statusOption) => (
                                            <option value={statusOption.value} key={statusOption.value}>
                                                {statusOption.value}
                                            </option>
                                        ))}
                                    </select>

                                    <label htmlFor="description">Description:</label>
                                    <textarea
                                        id="description"
                                        rows={5}
                                        className="mb-2 rounded-sm bg-blue-200 resize-none"
                                        onChange={(e) => setDescription(e.target.value)}
                                        value={description}
                                    />
                                </>
                            ) : null}
                            <label htmlFor="notes">Notes:</label>
                            <textarea
                                id="notes"
                                rows={5}
                                className="mb-2 rounded-sm bg-blue-200 resize-none"
                                onChange={(e) => setNotes(e.target.value)}
                                value={notes}
                            />
                            {completed !== 1 ? (
                                <>
                                    <button
                                        className="rounded-3xl bg-blue-50 hover:bg-blue-600 h-8 my-2 border-2 border-blue-600"
                                        onClick={(e) => [e.preventDefault(), setViewModal(true)]}
                                    >
                                        Log Spares Used
                                    </button>
                                    <div>
                                        {sparesUsed.map((spare) => (
                                            <div key={spare.id} className={`flex flex-row border-2 border-blue-600 rounded-md my-4 w-fit px-2 ${spare.num_used < 1 ? 'hidden' : ''}`}>
                                                <div className='mr-4'>{spare.part_no}</div>
                                                <div className='mr-4'>{spare.name}</div>
                                                <div>Quantity Used: {spare.num_used}</div>
                                                
                                            </div>
                                        ))}
                                    </div>
                                    <label htmlFor="time">Logged Time (mins):</label>
                                    <div className="flex flex-row">
                                        <select className="bg-blue-200" value={loggedTimeId} onChange={(e) => setLoggedTimeId(parseInt(e.target.value))}>
                                            <option value={0} key="0"></option>
                                            {users.map((user) => (
                                                <option value={user.id} key={user.id}>
                                                    {user.first_name + ' ' + user.last_name}
                                                </option>
                                            ))}
                                        </select>
                                        <input
                                            className="ml-4 bg-blue-200"
                                            type="number"
                                            min="0"
                                            value={loggedTimeNum}
                                            onChange={(e) => setLoggedTimeNum(parseInt(e.target.value))}
                                        />
                                        <button className="text-green-600 text-xl ml-4" onClick={addTimeHandler}>
                                            &#10010;
                                        </button>
                                    </div>
                                    <div>
                                        {loggedTimeDetails.map((pair) => {
                                            const data = users.find((x) => x.id === pair.id);
                                            return (
                                                <div key={pair.id} className="flex flex-row border-2 border-blue-600 rounded-md my-4 w-fit px-2">
                                                    <div className="mr-4">{data?.first_name + ' ' + data?.last_name}</div>
                                                    <div className="mr-4">{pair.time} mins</div>
                                                    <button
                                                        onClick={() => {
                                                            setLoggedTimeDetails((prev) => prev.filter((item) => item.id != pair.id));
                                                            setTime((prev) => prev - pair.time);
                                                        }}
                                                    >
                                                        &#10060;
                                                    </button>
                                                </div>
                                            );
                                        })}
                                    </div>
                                    <div className="text-center mb-2">
                                        Note: A job must be set to 'Attended - Found no Issues' or 'Attended - Fixed' in order to complete the job
                                    </div>
                                </>
                            ) : null}
                            <div className="flex flex-row justify-evenly items-center absolute bottom-0 h-16 left-0 w-full bg-blue-200">
                                <button className="rounded-3xl bg-blue-50 hover:bg-blue-600 h-8 px-4  border-2 border-blue-600 w-32" onClick={props.closeModal}>
                                    Cancel
                                </button>
                                <button className="rounded-3xl bg-blue-50 hover:bg-blue-600 h-8 px-4  border-2 border-blue-600 w-32" onClick={submitHandler}>
                                    {(status === 'Attended - Fixed' || status === 'Attended - Found no Issues') && completed !== 1 ? 'Complete' : 'Update'}
                                </button>
                            </div>
                        </form>
                    </div>
                </>
            )}
        </>
    );
};

export default UpdateJob;
