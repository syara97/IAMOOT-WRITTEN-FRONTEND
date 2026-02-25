import React, { createContext, useState, useEffect } from 'react'; 

export const JudgeIDContext = createContext(); 

export const JudgeIDProvider = ({ children }) => {
    const [judgeID, setJudgeID] = useState(() => {
        return sessionStorage.getItem('judgeID') || ''; 
    });

    const assignJudgeID = (newID) => { 
        setJudgeID(newID); 
        sessionStorage.setItem('judgeID', newID); 
    }

    useEffect(() => {
        const storedID = sessionStorage.getItem('judgeID'); 
        if (storedID){
            setJudgeID(storedID); 
        }
    })

    return (
        <JudgeIDContext.Provider value={{ judgeID, assignJudgeID }}>
            {children}
        </JudgeIDContext.Provider>
    )
}