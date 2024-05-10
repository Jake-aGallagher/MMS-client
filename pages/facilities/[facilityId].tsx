import { useState } from 'react';
import { useRouter } from 'next/router';
import ModalBase from '../../components/modal/modal';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faPencil, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import DetailsBox from '../../components/detailsBox/detailsBox';
import { useFacilityDetails } from '../../components/facilities/details/useFacilityDetails';
import LoadingNoDataError from '../../components/loading/loadingNoDataError';
import DataTable from '../../components/dataTable/dataTable';
import FullPage from '../../components/page/fullPage';
import Toolbar from '../../components/page/toolbar';
import FacilityDetailsDefaultCharts from '../../components/charts/defaults/facilityDetailsDefaultCharts';
import { RootState } from '../../components/store/store';
import { useSelector } from 'react-redux';
import AttachedFilesBox from '../../components/attachedFilesBox/attachedFilesBox';
import { DetailsConfig } from '../../commonTypes/DetailsConfig';
import { addToDetailsConfig } from '../../components/settings/customFields/addToDetailsConfig';

const FacilityView = () => {
    const permissions = useSelector((state: RootState) => state.permissions.value.permissions);
    const isAdmin = useSelector((state: RootState) => state.user.value.isAdmin);
    const clientId = useSelector((state: RootState) => state.user.value.client);
    const router = useRouter();
    if (!permissions.facilities?.view && !isAdmin) {
        router.push('/');
    }

    const facilityNumber = router.asPath.split('/')[2];
    const { facilityDetails, customFields, assignedUsers, recentJobs, incompleteJobs, raised6M, sparesUsed6M, mostUsed6M, sparesCost6M, loading, noData, error, reload } = useFacilityDetails(facilityNumber);
    const [viewModal, setViewModal] = useState(false);
    const [modalType, setModalType] = useState('');

    let facilityDetailsConfig: DetailsConfig = {
        id: facilityDetails?.id,
        fields: [
            { label: 'ID', value: facilityDetails?.id },
            { label: 'Name', value: facilityDetails?.name },
            { label: 'Address', value: facilityDetails?.address },
            { label: 'City', value: facilityDetails?.city },
            { label: 'County', value: facilityDetails?.county },
            { label: 'Postcode', value: facilityDetails?.postcode },
        ],
    };
    facilityDetailsConfig = addToDetailsConfig(clientId, facilityDetailsConfig, customFields);

    const userTableConfig = {
        headers: [
            { id: 'username', name: 'Username', type: 'string', search: true, order: true },
            { id: 'first_name', name: 'First Name', type: 'string', search: true, order: true },
            { id: 'last_name', name: 'Last name', type: 'string', search: true, order: true },
            { id: 'user_group_name', name: 'User Group', type: 'string', search: true, order: true },
        ],
        title: 'Assigned Users',
        searchable: false,
    };

    const recentJobTableConfig = {
        headers: [
            { id: 'id', name: 'ID', type: 'link', search: true, order: true },
            { id: 'asset_name', name: 'Asset', type: 'string', search: true, order: true },
            { id: 'type', name: 'Type', type: 'string', search: true, order: true },
            { id: 'created', name: 'Created', type: 'date', search: true, order: true },
            { id: 'completed', name: 'Completed', type: 'tick', search: true, order: true },
        ],
        title: `5 Most recent Maintenance Tasks for ${facilityDetails?.name}`,
        searchable: false,
        linkColPrefix: '/jobs/',
    };

    return (
        <FullPage>
            <Toolbar>
                <Link href="/facilities" className="tLink">
                    <FontAwesomeIcon icon={faArrowLeft} className="mr-1 w-3" />
                    <p>Return to all Facilities</p>
                </Link>
                {permissions.facilities?.manage || isAdmin ? (
                    <>
                        <button className="tLink" onClick={() => [setViewModal(true), setModalType('addEditFacility')]}>
                            <FontAwesomeIcon icon={faPencil} className="mr-1 w-3" />
                            Edit Facility
                        </button>
                        <button className="tLink" onClick={() => [setViewModal(true), setModalType('assignUsers')]}>
                            <FontAwesomeIcon icon={faUserPlus} className="mr-1 w-3" />
                            Assign Users
                        </button>
                    </>
                ) : null}
            </Toolbar>
            {viewModal ? <ModalBase modalType={modalType} payload={parseInt(facilityNumber)} closeModal={() => [setViewModal(false), reload()]} /> : null}
            <LoadingNoDataError loading={loading} error={error} noData={noData}>
                <div className="flex flex-col">
                    <div className="flex flex-col xl:flex-row">
                        <DetailsBox data={facilityDetailsConfig} />
                        <div className="flex flex-col w-full">
                            <div className="w-full xl:pl-8">
                                <AttachedFilesBox model="facility" id={parseInt(facilityNumber)} />
                            </div>
                            <FacilityDetailsDefaultCharts
                                facilityDetailsName={facilityDetails?.name}
                                incompleteJobs={incompleteJobs}
                                raised6M={raised6M}
                                sparesUsed6M={sparesUsed6M}
                                mostUsed6M={mostUsed6M}
                                sparesCost6M={sparesCost6M}
                            />
                        </div>
                    </div>
                    {assignedUsers.length > 0 ? (
                        <div className="mt-4 pb-4">
                            <DataTable config={userTableConfig} data={assignedUsers} />
                        </div>
                    ) : null}
                    {recentJobs.length > 0 ? (
                        <div className="mt-4 pb-4">
                            <DataTable config={recentJobTableConfig} data={recentJobs} />
                        </div>
                    ) : null}
                </div>
            </LoadingNoDataError>
        </FullPage>
    );
};

export default FacilityView;
