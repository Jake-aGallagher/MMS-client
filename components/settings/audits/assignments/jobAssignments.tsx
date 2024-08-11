import { useSelector } from 'react-redux';
import DataTable from '../../../dataTable/dataTable';
import { DataTableConfig } from '../../../dataTable/types/configType';
import LoadingNoDataError from '../../../loading/loadingNoDataError';
import { useAuditAssignments } from './useAuditAssignments';
import { RootState } from '../../../store/store';

const JobAssignments = () => {
    const permissions = useSelector((state: RootState) => state.permissions.value.permissions);
    const isAdmin = useSelector((state: RootState) => state.user.value.isAdmin);
    const { assignments, loading, error, reload } = useAuditAssignments('job');

    const auditAssinmentTableConfig: DataTableConfig = {
        headers: [
            { id: 'subtype_title', name: 'Type', type: 'string', search: true, order: true },
            { id: 'assignment_title', name: 'Audit', type: 'string', search: true, order: true },
        ],
        searchable: true,
        linkColPrefix: '/settings/audit/assignments/job/',
        modalType: 'auditAssignmentsJobs',
        deleteUrl: 'audit/assignments',
        idPointer: 'id',
        namePointer: 'subtype_title',
        reload: reload,
    };

    if (permissions.audits?.manage || isAdmin) {
        auditAssinmentTableConfig.headers.push({ id: 'tools', name: 'Tools', type: 'tools', search: false, order: false, functions: ['edit', 'delete'] });
    }

    return (
        <LoadingNoDataError loading={loading} error={error}>
                <DataTable config={auditAssinmentTableConfig} data={assignments} />
            </LoadingNoDataError>
    );
};

export default JobAssignments;
