// frontend/src/pages/Duty/EditDuty.test.tsx
import React from 'react';
import { render, screen, act, waitFor, getAllByTestId } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import EditDuty from '../../../src/pages/duty/EditDuty';
import '@testing-library/jest-dom';
import { getDutyById, updateDuty } from '../../../src/services/dutyApi';
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
    getDutyById: jest.fn(),
    updateDuty: jest.fn()
}));

jest.spyOn(console, 'error').mockImplementation(() => { });

const mockDuty = {
    id: 1,
    name: 'Duty 1',
    title: 'Title 1',
    description: 'Description 1',
    status: 'to-do'
};

describe('EditDuty', () => {
    const setError = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders duty form with fetched data', async () => {
        (getDutyById as jest.Mock).mockResolvedValueOnce({ data: { data: mockDuty } });

        await act(async () => {
            render(
                <GlobalErrorContext.Provider value={{ error: null, setError }}>
                    <MemoryRouter initialEntries={['/duties/edit/1']}>
                        <Routes>
                            <Route path="/duties/edit/:id" element={<EditDuty />} />
                        </Routes>
                    </MemoryRouter>
                </GlobalErrorContext.Provider>
            );
        });

        await waitFor(() => {
            expect(screen.getByLabelText(/name/i)).toHaveValue(mockDuty.name);
            expect(screen.getByLabelText(/title/i)).toHaveValue(mockDuty.title);
            expect(screen.getByLabelText(/description/i)).toHaveValue(mockDuty.description);
            // expect(screen.getByLabelText(/status/i)).toHaveValue(mockDuty.status);
        });
    });

    test('handles fetch duty error', async () => {
        // Mock console.error to suppress error messages during the test
        (getDutyById as jest.Mock).mockRejectedValueOnce(new Error('Failed to fetch duty'));

        await act(async () => {
            render(
                <GlobalErrorContext.Provider value={{ error: null, setError }}>
                    <MemoryRouter initialEntries={['/duties/edit/1']}>
                        <Routes>
                            <Route path="/duties/edit/:id" element={<EditDuty />} />
                        </Routes>
                    </MemoryRouter>
                </GlobalErrorContext.Provider>
            );
        });

        await waitFor(() => {
            expect(setError).toHaveBeenCalledWith('Failed to fetch duty');
        });
    });

    test('handles update duty error', async () => {
        (getDutyById as jest.Mock).mockResolvedValueOnce({ data: { data: mockDuty } });
        (updateDuty as jest.Mock).mockRejectedValueOnce(new Error('Failed to update duty'));

        await act(async () => {
            render(
                <GlobalErrorContext.Provider value={{ error: null, setError }}>
                    <MemoryRouter initialEntries={['/duties/edit/1']}>
                        <Routes>
                            <Route path="/duties/edit/:id" element={<EditDuty />} />
                        </Routes>
                    </MemoryRouter>
                </GlobalErrorContext.Provider>
            );
        });

        await waitFor(() => {
            expect(screen.getByLabelText(/name/i)).toHaveValue(mockDuty.name);
        });

        const submitButton = screen.getByRole('button', { name: /save/i });
        await act(async () => {
            submitButton.click();
        });

        await waitFor(() => {
            expect(setError).toHaveBeenCalledWith('Failed to update duty');
        });
    });
});