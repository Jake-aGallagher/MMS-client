import { useEffect, useState } from 'react';
import ModalBase from '../../../components/modal/modal';
import Loading from '../../../components/loading/loading';
import RetrieveError from '../../../components/error/retrieveError';
import axios from 'axios';
import { SERVER_URL } from '../../../components/routing/addressAPI';
import SortableTable from '../../../components/sortableTable/sortableTable';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

interface Enum {
    id: number;
    enum_type_id: number;
    typeString: string;
    value: string;
    list_priority: number;
    payload: number | null;
    payload_two: string | null;
}

interface EnumType {
    id: number;
    type: string;
}

interface Response {
    data: {
        enums: Enum[];
        enumTypes: EnumType[];
    };
}

const Enums = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [viewModal, setViewModal] = useState(false);
    const [modalType, setModalType] = useState('');
    const [payload, setPayload] = useState<{ id: number; name: string }>({id: 0,name: ''})
    const [enums, setEnums] = useState<Enum[]>([]);
    const [enumTypes, setEnumTypes] = useState<EnumType[]>([]);
    let test = 1;

    const enumsTableConfig = {
        headers: [
            { id: 'id', name: 'ID', type: 'string', search: true, order: true },
            { id: 'value', name: 'Value', type: 'string', search: true, order: true },
            { id: 'typeString', name: 'Type', type: 'string', search: true, order: true },
            { id: 'list_priority', name: 'Order', type: 'string', search: true, order: true },
            { id: 'payload', name: 'Effect 1', type: 'number', search: true, order: true },
            { id: 'payload_two', name: 'Effect 2', type: 'string', search: true, order: true },
            { id: 'edit', name: 'Edit', type: 'edit', search: false, order: false, functionIdPointer: 'id', functionNamePointer: 'value' },
            { id: 'delete', name: 'Delete', type: 'delete', search: false, order: false, functionIdPointer: 'id', functionNamePointer: 'value' },
        ],
        searchable: false,
        selectSearch: true,
        selectSearchType: 'typeString',
        selectSearchOptions: enumTypes,
    };


    useEffect(() => {
        reload();
    }, []);

    const reload = () => {
        setLoading(true);
        setError(false);
        getHandler();
    };

    const getHandler = async () => {
        try {
            const enumsList: Response = await axios.get(`${SERVER_URL}/enums/typesvalues`, {
                headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') },
            });
            setEnums(enumsList.data.enums);
            setEnumTypes(enumsList.data.enumTypes);
            setLoading(false);
        } catch (err) {
            setError(true);
            setLoading(false);
        }
    };

    const addEditEnum = (id: number, name: string) => {
        setPayload({ id, name });
        setModalType('addEditEnum');
        setViewModal(true);
    };

    const deleteEnum = (id: number, name: string) => {
        setPayload({ id, name });
        setModalType('deleteEnum');
        setViewModal(true);
    };

    return (
        <div className="w-full h-full pt-12 overflow-x-auto overflow-y-auto bg-gray-100">
            <div className="fixed top-0 left-52 right-0 z-10 bg-gray-200 h-12 border-b-2 border-gray-300 flex flex-row justify-start items-center">
                <Link href="/settings" className="ml-8 hover:text-blue-600 flex flex-row items-center">
                    <FontAwesomeIcon icon={faArrowLeft} className="mr-1 w-3" />
                    <p>Return to Settings</p>
                </Link>
                <button onClick={(e) => addEditEnum(0, '')} className="ml-8 hover:text-blue-600 flex flex-row items-center">
                    <div className="text-2xl mr-1 pb-1">+</div>
                    Add Enum Value
                </button>
            </div>
            {viewModal ? <ModalBase modalType={modalType} payload={payload} closeModal={() => [setPayload({id: 0, name: ''}), setViewModal(false), reload()]} /> : null}
            {loading ? (
                <Loading />
            ) : test === 0 ? (
                <div>There is no data</div>
            ) : error ? (
                <RetrieveError />
            ) : (
                <SortableTable config={enumsTableConfig} data={enums} editFunction={addEditEnum} deleteFunction={deleteEnum}/>
            )}
        </div>
    );
};

export default Enums;
