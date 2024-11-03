// frontend/src/pages/Duty/CreateDuty.test.tsx
import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import CreateDuty from '../../../src/pages/duty/CreateDuty';
import '@testing-library/jest-dom';
import { createDuty } from '../../../src/services/dutyApi';
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
    createDuty: jest.fn()
}));

jest.spyOn(console, 'error').mockImplementation(() => { });

describe('CreateDuty', () => {
    const setError = jest.fn();
    const navigate = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('creates a new duty successfully', async () => {
        (createDuty as jest.Mock).mockResolvedValueOnce({});

        await act(async () => {
            render(
                <GlobalErrorContext.Provider value={{ error: null, setError }}>
                    <MemoryRouter>
                        <CreateDuty />
                    </MemoryRouter>
                </GlobalErrorContext.Provider>
            );
        });

        fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'New Duty' } });
        fireEvent.change(screen.getByLabelText(/title/i), { target: { value: 'New Title' } });
        fireEvent.change(screen.getByLabelText(/description/i), { target: { value: 'New Description' } });
        fireEvent.change(screen.getByLabelText(/status/i), { target: { value: 'to-do' } });

        fireEvent.click(screen.getByRole('button', { name: /save/i }));

        await waitFor(() => {
            expect(createDuty).toHaveBeenCalledWith({
                name: 'New Duty',
                title: 'New Title',
                description: 'New Description',
                status: 'to-do'
            });
        });
    });

    test('handles create duty error', async () => {
        (createDuty as jest.Mock).mockRejectedValueOnce(new Error('Failed to create duty'));

        await act(async () => {
            render(
                <GlobalErrorContext.Provider value={{ error: null, setError }}>
                    <MemoryRouter>
                        <CreateDuty />
                    </MemoryRouter>
                </GlobalErrorContext.Provider>
            );
        });

        fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'New Duty' } });
        fireEvent.change(screen.getByLabelText(/title/i), { target: { value: 'New Title' } });
        fireEvent.change(screen.getByLabelText(/description/i), { target: { value: 'New Description' } });
        fireEvent.change(screen.getByLabelText(/status/i), { target: { value: 'to-do' } });

        fireEvent.click(screen.getByRole('button', { name: /save/i }));

        await waitFor(() => {
            expect(setError).toHaveBeenCalledWith('Failed to create duty');
        });
    });
});