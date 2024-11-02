import React, { createContext, useState, PropsWithChildren, ReactNode } from 'react';

interface GlobalErrorContextProps {
    error: string | null;
    setError: (error: string | null) => void;
}

export const GlobalErrorContext = createContext<GlobalErrorContextProps>({
    error: null,
    setError: () => { },
});

export const GlobalErrorProvider: React.FC<{ children: ReactNode }> = ({ children } : PropsWithChildren<{}>) => {
    const [error, setError] = useState<string | null>(null);

    return (
        <GlobalErrorContext.Provider value= {{ error, setError }}>
            { children }
        </GlobalErrorContext.Provider>
    );
};