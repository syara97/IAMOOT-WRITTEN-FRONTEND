import React, { useContext, useEffect, useState } from 'react'; 
import { useNavigate } from 'react-router-dom'; 
import { Button, Table } from 'react-bootstrap'; 

import { LanguageContext } from '../contexts/LanguageContext';
import { RoleContext } from "../contexts/RoleContext";

const AdminWrittenCompPage = () => { 

    const { resetLanguage } = useContext(LanguageContext);
    const { currentRole, assignRole } = useContext(RoleContext); 
    const performNavigation = useNavigate(); 

    const [selectedCategory, setSelectedCategory] = useState(null);

    const handleSignOut = () => {
        resetLanguage(); 
        assignRole(''); 
        performNavigation('/');
    };

    /*********************************
     * CHECKS THAT THE ROLE IS ADMIN *
     *********************************/
    useEffect(() => {
        if (currentRole !== 'Admin'){
            handleSignOut(); 
        }
    }, [currentRole]);

    const handleCategorySelection = (someCategory) => {
        setSelectedCategory(someCategory); 
    }

    const renderContent = () => { 
        if (!selectedCategory){
            return null; 
        }
        
        return <div>
            <h2>{selectedCategory}</h2>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Ranking</th>
                        <th>School</th>
                        <th>Team ID</th>
                        <th>Memorandum Score for State</th>
                        <th>Memorandum Score for Victim</th>
                        <th>Average Memorandum Score</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>American University</td>
                        <td>202</td>
                        <td>9.0</td>
                        <td>8.0</td>
                        <td>8.5</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>University of West Florida</td>
                        <td>850</td>
                        <td>7.5</td>
                        <td>8.0</td>
                        <td>7.75</td>
                    </tr>
                </tbody>
            </Table>
        </div>
    }
    
    return <div className='d-grid gap-2'>
        <h1>Admin Written Competition</h1>
        <Button variant='primary' onClick={() => {handleCategorySelection('All Memorandums')}}>Show All Memorandums</Button>
        <Button variant='primary' onClick={() => {handleCategorySelection('English Memorandums')}}>English Memorandums</Button>
        <Button variant='primary' onClick={() => {handleCategorySelection('Spanish Memorandums')}}>Spanish Memorandums</Button>
        <Button variant='primary' onClick={() => {handleCategorySelection('Portuguese Memorandums')}}>Portuguese Memorandums</Button>
        <Button variant='primary' onClick={() => {handleCategorySelection('State Memorandums')}}>State Memorandums</Button>
        <Button variant='primary' onClick={() => {handleCategorySelection('Victim Memorandums')}}>Victim Memorandums</Button>
        {renderContent()}
        <Button variant='danger' onClick={handleSignOut}>Sign Out</Button>
    </div>

        
};

export default AdminWrittenCompPage; 