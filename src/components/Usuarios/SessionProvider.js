import React, { useState, useEffect } from 'react';
import { SessionContext } from './Login';

export const SessionProvider = ({ children }) => {
    const [session, setSession] = useState(null);




    

    return (
        <SessionContext.Provider value={{ session, setSession }}>
            {children}
        </SessionContext.Provider>
    );
};
