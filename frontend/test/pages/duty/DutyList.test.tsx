// frontend/src/pages/Duty/DutyList.test.tsx
import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import DutyList from '../../../src/pages/duty/DutyList';
import '@testing-library/jest-dom';
import { getDuties } from '../../../src/services/dutyApi';
import { GlobalErrorContext } from '../../../src/contexts/GlobalErrorContext';

Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // deprecated
        removeListener: jest.fn(), // deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
    })),
});

jest.mock('../../../src/services/dutyApi', () => ({
    getDuties: jest.fn(),
    deleteDuty: jest.fn()
}));

jest.spyOn(console, 'error').mockImplementation(() => { });

const mockDuties = [
    { id: 1, name: 'Duty 1', title: 'Title 1', description: 'Description 1', status: 'to-do' },
    { id: 2, name: 'Duty 2', title: 'Title 2', description: 'Description 2', status: 'in-progress' }
];

describe('Duties', () => {
    const setError = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('fetches and displays duties', async () => {
        (getDuties as jest.Mock).mockResolvedValueOnce({ data: { data: mockDuties } });

        await act(async () => {
            render(
                <GlobalErrorContext.Provider value={{ error: null, setError }}>
                    <MemoryRouter>
                        <DutyList />
                    </MemoryRouter>
                </GlobalErrorContext.Provider>
            );
        });

        await waitFor(() => {
            expect(screen.getByText('Duty 1')).toBeInTheDocument();
            expect(screen.getByText('Duty 2')).toBeInTheDocument();
        });
    });

    test('handles fetch duties error', async () => {
        (getDuties as jest.Mock).mockRejectedValueOnce(new Error('Failed to fetch duties'));

        await act(async () => {
            render(
                <GlobalErrorContext.Provider value={{ error: null, setError }}>
                    <MemoryRouter>
                        <DutyList />
                    </MemoryRouter>
                </GlobalErrorContext.Provider>
            );
        });

        await waitFor(() => {
            expect(setError).toHaveBeenCalledWith('Failed to fetch duties');
        });
    });
});