import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import './MySpace.css'
import funnelIcon from '../../resources/funnel-icon.png'

const MySpace = () => {

    // hooks
    const [tasks, setTasks] = useState([{task: 'add your tasks here', isChecked: true}]);
    const [filter, setFilter] = useState('');
    const [cookies, setCookie] = useCookies();
    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown)
        getMySpaceTasks();

        return () => {
            document.removeEventListener('keydown', handleKeyDown)
        }
    })

    const getMySpaceTasks = async () => {
        const url = process.env.REACT_APP_SERVER_URL.concat('/getMySpace');
        const data = await fetch(url, {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                sessionID: cookies.session,
                key: process.env.REACT_APP_FRONTEND_VERIFICATION_TOKEN,
            })
        }).then(response => { return response.json() })
        if(data.tasks.length > 0) {
            setTasks(data.tasks)
        }
    }

    const updateMySpaceTasks = async (tasks) => {
        const url = process.env.REACT_APP_SERVER_URL.concat('/updateMySpace');
        await fetch(url, {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                sessionID:  cookies.session,
                key:        process.env.REACT_APP_FRONTEND_VERIFICATION_TOKEN,
                tasks:      JSON.stringify(tasks),
            })
        })
    }

    // handlers
    const handleKeyDown = (event) => {
        if(event.key === 'Enter')
            addItem();
    }

    const toggleCheckbox = (event) => {
        let index = parseInt(event.target.id);
        let temp = tasks.splice(0);
        temp[index].isChecked =  !temp[index].isChecked;
        setTasks(temp);
        updateMySpaceTasks(temp)
    }

    const addItem = () => {
        let field = document.getElementById('add-item-field')
        if(!field.value)
            return null;
        let temp = tasks.slice();
        temp.push({task: field.value, isChecked: false});
        setTasks(temp);
        field.value = '';
        updateMySpaceTasks(temp);
    }

    const showHideFilters = () => {
        let filters = document.getElementById('myspace-filters');
        filters.style.display = filters.style.display==='flex'? 'none': 'flex';
    }

    const handleDeleteAll = () => {
        setTasks([])
        updateMySpaceTasks([]);
    }

    const handleDeleteChecked = () => {
        let temp = tasks.filter((item) => {
            if(!item.isChecked)
                return item;
        })
        updateMySpaceTasks(temp)
    }
    
    return(
        <div id='myspace-content'>
            <div id="add-item-area">
                <input type="text" id="add-item-field" placeholder='your personal tasks for the day 🔖' />
                <span id='add-item-button-area'>
                    <button id="add-item-button" onClick={addItem}>⮐</button>
                    <button id="add-item-button" onClick={showHideFilters}><img src={funnelIcon} id='funnel-icon' alt="funnel-icon" /></button>
                </span>
            </div>
            <div id='myspace-filters'>
                <button className='filter-button' 
                    style={{backgroundColor: 'aqua'}} 
                    onClick={() => {setFilter('pending')}}>view pending 👀</button>
                <button 
                    className='filter-button' 
                    style={{backgroundColor: 'mediumspringgreen'}} 
                    onClick={() => {setFilter('completed')}}>view checked 👀</button>
                <button 
                    className='filter-button' 
                    style={{backgroundColor: 'whitesmoke'}} 
                    onClick={() => {setFilter('')}}>view all 👀</button>
                <button 
                    className='filter-button'
                    onClick={ handleDeleteChecked }>delete checked 🗑️</button>
                <button 
                    className='filter-button'
                    onClick={ handleDeleteAll }>delete all 🗑️</button>
            </div>
            <div id="myspace-tasks">
                <Tasks tasks={tasks} toggleCheckbox={toggleCheckbox} filter={filter} />
            </div>  
        </div>
    )
}

export default MySpace;

const Tasks = ({ tasks, toggleCheckbox, filter }) => {

    return(
        <>
            {
                tasks.map((item, index) => {
                    if((filter==='completed')&&(!item.isChecked))
                        return null;
                    if((filter==='pending')&&(item.isChecked))
                        return null;
                    return(
                        <div id='task' key={index} >
                            <input 
                                type='checkbox'
                                id={index} 
                                className='checkbox' 
                                checked={item.isChecked} 
                                onChange={toggleCheckbox}
                            />
                            <span 
                                id={index} 
                                className={item.isChecked? 'checked': ''}
                                onClick={toggleCheckbox}
                            >{item.task}</span>
                        </div>
                    )
                })
            }
        </>
    )
}