import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import JobView from '../../../pages/jobs/[jobId].tsx';
import { useJobDetails } from '../../../components/jobs/details/useJobDetails.ts';

import { vi } from 'vitest';

vi.mock('next/router', () => ({
    useRouter: () => ({
        asPath: '/jobs/1',
    }),
}));

vi.mock('../../../components/jobs/details/useJobDetails');

describe('<JobView /> component', () => {
    it('renders loading state', () => {
        (useJobDetails as jest.Mock).mockReturnValueOnce({
            jobDetails: {},
            timeDetails: [],
            sparesDetails: [],
            loading: true,
            noData: false,
            error: false,
            reload: vi.fn(),
        });

        render(<JobView />);
        expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    it('renders error state', () => {
        (useJobDetails as jest.Mock).mockReturnValueOnce({
            jobDetails: {},
            timeDetails: [],
            sparesDetails: [],
            loading: false,
            noData: false,
            error: true,
            reload: vi.fn(),
        });

        render(<JobView />);
        expect(screen.getByText('There has been an error whilst trying to retrieve your data')).toBeInTheDocument();
    });

    it('renders no data state', () => {
        (useJobDetails as jest.Mock).mockReturnValueOnce({
            jobDetails: {},
            timeDetails: [],
            sparesDetails: [],
            loading: false,
            noData: true,
            error: false,
            reload: vi.fn(),
        });

        render(<JobView />);
        expect(screen.getByText('There has been an issue getting the Data')).toBeInTheDocument();
    });

    it('renders job details', () => {
        (useJobDetails as jest.Mock).mockReturnValueOnce({
            jobDetails: {
                asset_name: 'Corrugator',
                comp_date: null,
                completed: 0,
                created: '27/04/23',
                description: 'Replace worn belt with new',
                id: 1,
                logged_time: null,
                notes: null,
                facility_name: 'Cardboard Co.',
                reported_by: 'Jake Gallagher',
                required_comp_date: '27/04/23',
                status: 'Un-attended',
                title: 'Replace belt',
                type: 'Mechanical',
                urgency: 'Breakdown - Attend by end of shift',
            },
            timeDetails: [],
            sparesDetails: [],
            loading: false,
            noData: false,
            error: false,
            reload: vi.fn(),
        });

        render(<JobView />);
        expect(screen.getByText('Corrugator')).toBeInTheDocument();
        expect(screen.getAllByText('27/04/23')[0]).toBeInTheDocument();
    });
});
