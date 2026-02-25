import React, { createContext, useState, useEffect } from 'react'; 

export const RoleContext = createContext(); 

export const RoleProvider = ({ children }) => {
    const [currentRole, setCurrentRole] = useState(() => {
        return sessionStorage.getItem('currentRole') || ''; 
    }); 

    const assignRole = (newRole) => {
        setCurrentRole(newRole);
        sessionStorage.setItem('currentRole', newRole);
    };

    useEffect(() => {
        const storedRole = sessionStorage.getItem('currentRole');
        if(storedRole){
            setCurrentRole(storedRole); 
        }
    }, []);

    return (
        <RoleContext.Provider value={{ currentRole, assignRole}}>
            {children}
        </RoleContext.Provider>
    );

};