import { useReducer, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../components/store/store';
import axios from 'axios';
import Loading from '../../components/loading/loading';
import RetrieveError from '../../components/error/retrieveError';

interface ModalProps {
    closeModal: () => void;
    assetId: number;
}

interface State {
    assetNumber: string;
    title: string;
    description: string;
    reqCompDate: Date;
    compNow: string;
}

interface TypeOptions {
    value: string;
}

interface UrgencyOptions {
    value: string;
}

const CreateJob = (props: ModalProps) => {
    const [loading, setLoading] = useState(true);
    const [noData, setNoData] = useState(false);
    const [error, setError] = useState(false);
    const userId = useSelector((state: RootState) => state.user.value.id);
    const currentProperty = useSelector((state: RootState) => state.currentProperty.value.currentProperty);
    const [typeOptions, setTypeOptions] = useState<TypeOptions[]>([]);
    const [selectedType, setSelectedType] = useState('');
    const [urgencyOptions, setUrgencyOptions] = useState<UrgencyOptions[]>([]);
    const [selectedUrgency, setSelectedUrgency] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [reqCompDate, setReqCompDate] = useState('0000-00-00 00:00:00');
    const [compNow, setCompNow] = useState('No');

    useEffect(() => {
        setLoading(true);
        setError(false);
        setNoData(false);
        getEnums();
    }, []);

    const getEnums = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/enums/create-job`, {
                headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') },
            });
            setTypeOptions(response.data.types);
            setSelectedType(response.data.types[0].value);
            setUrgencyOptions(response.data.urgency);
            setSelectedUrgency(response.data.urgency[0].value);
            setLoading(false);
        } catch (err) {
            setError(true);
            setLoading(false);
        }
    };

    const submitHandler = async (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                'http://localhost:3001/jobs',
                {
                    propertyNumber: currentProperty,
                    assetNumber: props.assetId,
                    type: selectedType,
                    title: title,
                    description: description,
                    urgency: selectedUrgency,
                    reqCompDate: reqCompDate,
                    reporter: userId,
                },
                {
                    headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') },
                }
            );
            if (response.data.created && compNow == 'No') {
                props.closeModal();
            } else if (response.data.created && compNow == 'Yes') {
                console.log('comping');
            }
        } catch (err) {
            alert('There has been an issue creating this Job, please try again.');
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
                <div className="h-full w-full rounded-lg relative border-4 border-blue-200">
                    <h1 className="w-full h-10 flex flex-row justify-center items-center font-bold bg-blue-200">Create New Job</h1>
                    <form className="flex flex-col justify-start px-4 pt-2 overflow-y-auto h-[calc(100%-104px)]">
                        <label htmlFor="type">Job Type</label>
                        <select id="type" className="mb-2 rounded-sm bg-blue-200" onChange={(e) => setSelectedType(e.target.value)}>
                            {typeOptions.map((typeOption) => (
                                <option value={typeOption.value} key={typeOption.value}>
                                    {typeOption.value}
                                </option>
                            ))}
                        </select>

                        <label htmlFor="title">Title</label>
                        <input id="title" type="text" className="mb-2 rounded-sm bg-blue-200" onChange={(e) => setTitle(e.target.value)} />

                        <label htmlFor="description">Job Description</label>
                        <textarea
                            id="description"
                            rows={5}
                            className="mb-2 rounded-sm bg-blue-200 resize-none"
                            onChange={(e) => setDescription(e.target.value)}
                        />

                        <label htmlFor="type">Urgency</label>
                        <select id="type" className="mb-2 rounded-sm bg-blue-200" onChange={(e) => setSelectedUrgency(e.target.value)}>
                            {urgencyOptions.map((urgencyOption) => (
                                <option value={urgencyOption.value} key={urgencyOption.value}>
                                    {urgencyOption.value}
                                </option>
                            ))}
                        </select>

                        <div>Would you like to update and/or complete this Job immediately?</div>
                        <div className="flex flex-row justify-start items-center pl-2 gap-3 py-1">
                            <label htmlFor="no">No</label>
                            <input type="radio" id="no" name="comp_immediately" value="No" checked={compNow == 'No'} onChange={() => setCompNow('No')} />
                        </div>
                        <div className="flex flex-row justify-start items-center pl-2 gap-3 py-1">
                            <label htmlFor="yes">Yes</label>
                            <input type="radio" id="yes" name="comp_immediately" value="Yes" checked={compNow == 'Yes'} onChange={() => setCompNow('Yes')} />
                        </div>

                        <div className="flex flex-row justify-evenly items-center absolute bottom-0 h-16 left-0 w-full bg-blue-200">
                            <button
                                className="rounded-3xl bg-blue-50 hover:bg-blue-600 h-8 px-4  border-2 border-blue-600 w-32"
                                onClick={props.closeModal}
                            >
                                Cancel
                            </button>
                            <button
                                className="rounded-3xl bg-blue-50 hover:bg-blue-600 h-8 px-4  border-2 border-blue-600 w-32"
                                onClick={submitHandler}
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            )}
            ;
        </>
    );
};

/* 
<div className="h-full w-full rounded-lg relative border-4 border-blue-600">
    <h1 className="w-full h-10 flex flex-row justify-center items-center font-bold bg-blue-200 border-b-4 border-blue-600">Title Here</h1>
    <form className="flex flex-col justify-start px-4 pt-2 overflow-y-auto h-[calc(100%-104px)]">

        <label htmlFor="username">Username</label>
        <input id="username" type="text" className="mb-2 rounded-sm bg-blue-200" />

        <div className="flex flex-row justify-evenly items-center absolute bottom-0 h-16 left-0 w-full border-t-4 border-blue-600 bg-blue-200">
            <button className="rounded-3xl bg-blue-50 hover:bg-blue-600 h-8 px-4  border-2 border-blue-600 hover:border-transparent w-32">Cancel</button>
            <button className="rounded-3xl bg-blue-50 hover:bg-blue-600 h-8 px-4  border-2 border-blue-600 hover:border-transparent w-32">Submit</button>
        </div>
    </form>
</div>
 */

export default CreateJob;
