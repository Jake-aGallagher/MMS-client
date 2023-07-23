import { SetStateAction, useState } from 'react';

interface User {
    id: number;
    username: string;
    first_name: string;
    last_name: string;
    user_group_id: number;
}

interface LoggedTime {
    id: number;
    time: number;
}

interface Props {
    users: User[];
    loggedTimeDetails: LoggedTime[];
    setLoggedTimeDetails: (value: SetStateAction<LoggedTime[]>) => void;
}

const LoggedTimeDisplay = (props: Props) => {
    const [loggedTimeId, setLoggedTimeId] = useState(0);
    const [loggedTimeNum, setLoggedTimeNum] = useState(0);

    const addTimeHandler = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        if (loggedTimeId > 0 && loggedTimeNum > 0) {
            const indexOfMatch = props.loggedTimeDetails.findIndex((x) => x.id === loggedTimeId);
            if (indexOfMatch != -1) {
                props.setLoggedTimeDetails((prev) => {
                    const filtered = prev.filter((item) => item.id != loggedTimeId);
                    return [...filtered, { id: loggedTimeId, time: prev[indexOfMatch].time + loggedTimeNum }];
                });
            } else {
                props.setLoggedTimeDetails((prev) => [...prev, { id: loggedTimeId, time: loggedTimeNum }]);
            }
            setLoggedTimeId(0);
            setLoggedTimeNum(0);
        }
    };

    return (
        <>
            <label htmlFor="time">Logged Time (mins):</label>
            <div className="flex flex-row">
                <select className="bg-blue-200" value={loggedTimeId} onChange={(e) => setLoggedTimeId(parseInt(e.target.value))}>
                    <option value={0} key="0"></option>
                    {props.users.map((user) => (
                        <option value={user.id} key={user.id}>
                            {user.first_name + ' ' + user.last_name}
                        </option>
                    ))}
                </select>
                <input className="ml-4 bg-blue-200" type="number" min="0" value={loggedTimeNum} onChange={(e) => setLoggedTimeNum(e.target.value ? parseInt(e.target.value) : 0)} />
                <button className="text-green-600 text-xl ml-4" onClick={addTimeHandler}>
                    &#10010;
                </button>
            </div>
            <div>
                {props.loggedTimeDetails.map((pair) => {
                    const data = props.users.find((x) => x.id === pair.id);
                    return (
                        <div key={pair.id} className="flex flex-row border-2 border-blue-600 rounded-md my-4 w-fit px-2">
                            <div className="mr-4">{data?.first_name + ' ' + data?.last_name}</div>
                            <div className="mr-4">{pair.time} mins</div>
                            <button
                                onClick={() => {
                                    props.setLoggedTimeDetails((prev) => prev.filter((item) => item.id != pair.id));
                                }}
                            >
                                &#10060;
                            </button>
                        </div>
                    );
                })}
            </div>
        </>
    );
};

export default LoggedTimeDisplay;
