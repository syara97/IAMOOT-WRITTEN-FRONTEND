import React, {createContext, useState, useEffect} from 'react'; 

/* React Context is a way to store items throughout a React application without having to pass it to each particular element. 
 * For example, instead of passing the language to each of the different componenets, you are simply storing it in the LanguageContext. */
export const LanguageContext = createContext(); 

export const LanguageProvider = ({ children }) => {

    const [currentLanguage, setLanguage] = useState(() => {
        return sessionStorage.getItem('currentLanguage') || 'EN';
    }); 
    
    const changeLanguage = (someLanguage) => {
        setLanguage(someLanguage); 
        sessionStorage.setItem('currentLanguage', someLanguage); 
    };

    const resetLanguage = () => {
        sessionStorage.removeItem('currentLanguage'); 
    };

    useEffect(() => {
        const savedLanguage = sessionStorage.getItem('currentLanguage');
        if (savedLanguage){
            setLanguage(savedLanguage); 
        }
    }, []);

    return (
        <LanguageContext.Provider value={{currentLanguage, changeLanguage, resetLanguage}}>
            {children}
        </LanguageContext.Provider>
    );

};