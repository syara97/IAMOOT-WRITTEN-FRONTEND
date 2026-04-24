import React from 'react'; 
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'; 


/************
 * CONTEXTS *
 ************/
import { LanguageProvider } from './contexts/LanguageContext';
import { RoleProvider } from './contexts/RoleContext';
import { JudgeIDProvider } from './contexts/JudgeIDContext.jsx'

/*********
 * PAGES *
 *********/
import HomePage from './pages/HomePage';
import Login from './pages/Login'; 
import AdminWrittenCompPage from './pages/AdminWrittenCompPage'; 
import JudgeWrittenCompPage from './pages/JudgeWrittenCompPage.jsx';
import WrittenDetailsPage from './pages/WrittenDetailsPage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';

function App() {

    return (
        <LanguageProvider>
            <RoleProvider>
                <JudgeIDProvider>
                    <Router>
                        <Routes>
                            <Route path='/' element={<HomePage/>}/>
                            <Route path='/login' element={<Login/>}/>
                            <Route path='/writtencomp/admin' element={<AdminWrittenCompPage/>}/>
                            <Route path='/dashboard' element={<DashboardPage/>}/>
                            <Route path='/writtencomp/judge' element={<JudgeWrittenCompPage/>}/>
                            <Route path='/writtencomp/memorandum/:memorandumID' element={<WrittenDetailsPage/>}/>
                        </Routes>
                    </Router>
                </JudgeIDProvider>
            </RoleProvider>
        </LanguageProvider>
    ); 

}

export default App;
