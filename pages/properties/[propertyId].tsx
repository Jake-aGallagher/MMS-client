import { useState } from 'react';
import { useRouter } from 'next/router';
import ModalBase from '../../components/modal/modal';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faPencil, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import DetailsBox from '../../components/detailsBox/detailsBox';
import { usePropertyDetails } from '../../components/properties/details/usePropertyDetails';
import LoadingNoDataError from '../../components/loading/loadingNoDataError';
import DataTable from '../../components/dataTable/dataTable';
import FullPage from '../../components/page/fullPage';
import Toolbar from '../../components/page/toolbar';
import BarChart from '../../components/charts/barChart';

const PropertyView = () => {
    const params = useRouter();
    const propertyNumber = params.asPath.split('/')[2];
    const { propertyDetails, assignedUsers, recentJobs, incompleteJobs, loading, noData, error, reload } = usePropertyDetails(propertyNumber);
    const [viewModal, setViewModal] = useState(false);
    const [modalType, setModalType] = useState('');

    const propertyDetailsConfig = {
        id: propertyDetails?.id,
        fields: [
            { label: 'ID Number', value: propertyDetails?.id },
            { label: 'Name', value: propertyDetails?.name },
            { label: 'Type', value: propertyDetails?.type },
            { label: 'Address', value: propertyDetails?.address },
            { label: 'City', value: propertyDetails?.city },
            { label: 'County', value: propertyDetails?.county },
            { label: 'Postcode', value: propertyDetails?.postcode },
        ],
    };

    const userTableConfig = {
        headers: [
            { id: 'username', name: 'Username', type: 'string', search: true, order: true },
            { id: 'first_name', name: 'First Name', type: 'string', search: true, order: true },
            { id: 'last_name', name: 'Last name', type: 'string', search: true, order: true },
            { id: 'user_group_name', name: 'User Group', type: 'string', search: true, order: true },
        ],
        searchable: false,
    };

    const recentJobTableConfig = {
        headers: [
            { id: 'id', name: 'Job Number', type: 'link', search: true, order: true },
            { id: 'asset_name', name: 'Asset', type: 'string', search: true, order: true },
            { id: 'type', name: 'Type', type: 'string', search: true, order: true },
            { id: 'created', name: 'Created', type: 'date', search: true, order: true },
            { id: 'completed', name: 'Completed', type: 'tick', search: true, order: true },
        ],
        searchable: false,
        linkColPrefix: '/jobs/',
    };

    const data = {
        labels: incompleteJobs.map((data) => data.type),
        datasets: [
            {
                label: 'Count',
                data: incompleteJobs.map((data) => data.count),
                backgroundColor: ['#fcd34d', '#ef4444'],
                borderColor: 'black',
                borderWidth: 1,
            },
        ],
    };

    return (
        <>
            <FullPage>
                <Toolbar>
                    <Link href="/properties" className="tLink">
                        <FontAwesomeIcon icon={faArrowLeft} className="mr-1 w-3" />
                        <p>Return to all Properties</p>
                    </Link>
                    <button className="tLink" onClick={() => [setViewModal(true), setModalType('addEditProperty')]}>
                        <FontAwesomeIcon icon={faPencil} className="mr-1 w-3" />
                        Edit Property
                    </button>
                    <button className="tLink" onClick={() => [setViewModal(true), setModalType('assignUsers')]}>
                        <FontAwesomeIcon icon={faUserPlus} className="mr-1 w-3" />
                        Assign Users
                    </button>
                </Toolbar>
                {viewModal ? <ModalBase modalType={modalType} payload={parseInt(propertyNumber)} closeModal={() => [setViewModal(false), reload()]} /> : null}
                <LoadingNoDataError loading={loading} error={error} noData={noData}>
                    <div className="flex flex-col">
                        <div className="flex flex-col xl:flex-row">
                            <DetailsBox data={propertyDetailsConfig} />
                            <div className="pl-0 xl:pl-4 w-full ml-auto">
                                <BarChart data={data} chartTitle={`Incomplete & Overdue Jobs for ${propertyDetails?.name}`} />
                            </div>
                        </div>
                        {assignedUsers.length > 0 ? (
                            <>
                                <div className="mt-4 mb-1 ml-10">Assigned Users</div>
                                <DataTable config={userTableConfig} data={assignedUsers} />
                            </>
                        ) : null}
                        {recentJobs.length > 0 ? (
                            <>
                                <div className="mt-4 mb-1 ml-10">5 Most recent jobs of {propertyDetails?.name}:</div>
                                <DataTable config={recentJobTableConfig} data={recentJobs} />
                            </>
                        ) : null}
                    </div>
                </LoadingNoDataError>
            </FullPage>
        </>
    );
};

export default PropertyView;
