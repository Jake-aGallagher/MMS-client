import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { RootState } from '../../store/store';
import { useSelector } from 'react-redux';
import ModalBase from '../../modal/modal';
import { SERVER_URL } from '../../routing/addressAPI';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import FormHeader from '../../forms/formHeader';
import GeneralFormSubmit from '../../forms/generalFormSubmit';
import GeneralFormInput from '../../forms/generalFormInput';
import FormContainer from '../../forms/formContainer';
import GeneralForm from '../../forms/generalForm';
import FormTextCenter from '../../forms/formTextCenter';
import LoadingNoDataError from '../../loading/loadingNoDataError';

interface ModalProps {
    closeModal: () => void;
    jobId: number;
}

interface StatusOptions {
    id: string;
    value: string;
}

interface User {
    id: number;
    username: string;
    first_name: string;
    last_name: string;
    user_group_id: number;
}

interface SparesSelected {
    id: number;
    part_no: string;
    name: string;
    quantity: number;
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
    const [sparesSelected, setSparesSelected] = useState<SparesSelected[]>([]);
    const [time, setTime] = useState(0);
    const [completed, setCompleted] = useState(0);
    const [loggedTimeId, setLoggedTimeId] = useState(0);
    const [loggedTimeNum, setLoggedTimeNum] = useState(0);
    const [loggedTimeDetails, setLoggedTimeDetails] = useState<LoggedTime[]>([]);
    const [viewModal, setViewModal] = useState(false);
    const [files, setFiles] = useState<Blob[]>([]);
    const [defaultValues, setDefaultValues] = useState({
        status: 0,
        description: '',
        notes: '',
        completed: 0,
    });

    const formValidation = yup.object().shape({
        status: yup.number().required(),
        description: yup.string().max(1000),
        notes: yup.string().max(1000),
        completed: yup.number().required(),
    });

    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(formValidation),
        defaultValues: useMemo(() => {
            return defaultValues;
        }, [defaultValues]),
    });

    const statusWatch = watch(['status']);

    useEffect(() => {
        setLoading(true);
        setError(false);
        setNoData(false);
        getJobUpdate();
    }, []);

    useEffect(() => {
        reset(defaultValues);
    }, [defaultValues]);

    let idToSearch = 0;
    if (params.asPath.split('/')[2] === undefined) {
        idToSearch = props.jobId;
    } else {
        idToSearch = parseInt(params.asPath.split('/')[2]);
    }

    const getJobUpdate = async () => {
        try {
            const response = await axios.get(`${SERVER_URL}/jobs/update/${currentProperty}/${idToSearch}`, {
                headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') },
            });
            if (response.data.jobDetails === 0) {
                setNoData(true);
            } else {
                setStatusOptions(response.data.statusOptions);
                setUsers(response.data.users);
                if (response.data.usedSpares) {
                    setSparesSelected(response.data.usedSpares);
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
                setCompleted(data.completed);
                setDefaultValues({
                    status: data.status,
                    description: data.description ? data.description : '',
                    notes: data.notes ? data.notes : '',
                    completed: 0,
                });
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
            quantity: number;
        }[]
    ) => {
        setSparesSelected(spares);
    };

    const addFile = (file: Blob) => {
        if (files && files.length > 0) {
            setFiles((prev) => [...prev, file]);
        } else {
            setFiles([file]);
        }
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

    const handleRegistration = async (data: any) => {
        if ((statusWatch[0] == 19 || statusWatch[0] == 20) && completed !== 1) {
            if (confirm('You are about to Complete this Job, once completed the only editable section will be the Notes, are you sure you want to continue') === true) {
                submitFull(true, data);
            }
        } else if (completed !== 1) {
            submitFull(false, data);
        } else {
            submitNotes(data);
        }
    };

    const submitFull = async (complete: boolean, data: any) => {
        const formData = new FormData();
        if (files.length > 0) {
            files.forEach((file) => formData.append('files', file));
        }
        formData.append(
            'data',
            JSON.stringify({
                id: id,
                status: data.status,
                description: data.description,
                notes: data.notes,
                logged_time: time,
                logged_time_details: loggedTimeDetails,
                complete,
                sparesUsed: sparesSelected,
                propertyId: currentProperty,
            })
        );
        const response = await axios.put(`${SERVER_URL}/jobs/update`, formData, {
            headers: { Authorisation: 'Bearer ' + localStorage.getItem('token'), 'Content-Type': 'multipart/form-data' },
        });
        if (response.data.created) {
            props.closeModal();
        } else {
            alert('There has been an issue updating this Job, please try again.');
        }
    };

    const submitNotes = async (data: any) => {
        const response = await axios.put(
            `${SERVER_URL}/jobs/notes`,
            {
                id: id,
                notes: data.notes,
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
            <LoadingNoDataError loading={loading} error={error} noData={noData}>
                <>
                    {viewModal ? (
                        <ModalBase modalType="SparesSelector" payload={{ sparesSelected, type: 'used' }} fullSize={true} passbackDeatails={addSparesHandler} closeModal={() => setViewModal(false)} />
                    ) : null}
                    <FormContainer>
                        <FormHeader label={'Update Job'} />
                        <GeneralForm handleSubmit={handleSubmit} handleRegistration={handleRegistration}>
                            {completed !== 1 ? (
                                <>
                                    <GeneralFormInput
                                        register={register}
                                        label="Current Status"
                                        type="select"
                                        formName="status"
                                        errors={errors}
                                        required={true}
                                        optionNameString="value"
                                        selectOptions={statusOptions}
                                    />
                                    <GeneralFormInput register={register} label="Description" type="textarea" formName="description" errors={errors} rows={5} />
                                </>
                            ) : null}
                            <GeneralFormInput register={register} label="Notes" type="textarea" formName="notes" errors={errors} rows={5} />

                            {completed !== 1 ? (
                                <>
                                    <label htmlFor="fileAttachment">Attach Files</label>
                                    <input type="file" name="fileAttachment" id="fileAttachment" onChange={(e) => (e.target.files ? addFile(e.target.files[0]) : null)} />
                                    <button className="rounded-3xl bg-blue-50 hover:bg-blue-600 h-8 my-2 border-2 border-blue-600" onClick={(e) => [e.preventDefault(), setViewModal(true)]}>
                                        Log Spares Used
                                    </button>
                                    <div>
                                        {sparesSelected.map((spare) => (
                                            <div key={spare.id} className={`flex flex-row border-2 border-blue-600 rounded-md my-4 w-fit px-2 ${spare.quantity < 1 ? 'hidden' : ''}`}>
                                                <div className="mr-4">{spare.part_no}</div>
                                                <div className="mr-4">{spare.name}</div>
                                                <div>Quantity Used: {spare.quantity}</div>
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
                                            onChange={(e) => setLoggedTimeNum(e.target.value ? parseInt(e.target.value) : 0)}
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
                                    <FormTextCenter label={"Note: A job must be set to 'Attended - Found no Issues' or 'Attended - Fixed' in order to complete the job"} />
                                </>
                            ) : null}
                            <GeneralFormSubmit closeModal={props.closeModal} submitLabel={(statusWatch[0] == 19 || statusWatch[0] == 20) && completed !== 1 ? 'Complete' : 'Update'} />
                        </GeneralForm>
                    </FormContainer>
                </>
            </LoadingNoDataError>
        </>
    );
};

export default UpdateJob;
