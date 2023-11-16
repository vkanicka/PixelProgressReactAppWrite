import Steps from './Steps'
import { Trash2, Edit as EditIcon, Save } from 'react-feather'
// RefreshCcw as Refresh from react-feather
import { VITE_APPWRITE_DATABASE_ID, VITE_APPWRITE_GOALS_ID, databases } from '../lib/appwrite'
import { useState } from 'react'
/* eslint-disable react/prop-types */
const Goal = ({ goal, index, getGoals, setUpdatingGoal, setGoalToUpdate }) => {
    
    const [newCompleted, setNewCompleted] = useState(goal?.completed_steps)


    const deleteGoal = async (e) => {
        e.preventDefault()
        try {
        const response = await databases.deleteDocument(
            VITE_APPWRITE_DATABASE_ID,
            VITE_APPWRITE_GOALS_ID,
            goal?.$id
            );
            console.log(response)
            getGoals()
        } catch (error) {
        console.error(error)
        }


    }

    const handleEditGoalClick = () => {
        setGoalToUpdate(goal)
        setUpdatingGoal(true)
    }
    // const handleRefreshClick = async () => {
    //     try {
    //     const response = await databases.updateDocument(
    //         VITE_APPWRITE_DATABASE_ID,
    //         VITE_APPWRITE_GOALS_ID,
    //         goal?.$id,
    //         {
    //             "completed_steps" : []
    //         }
    //         );
    //         console.log(response)
    //         getGoals()
    //     } catch (error) {
    //     console.error(error)
    //     }
    // }
    const handleSaveStatusClick = async () => {
        try {
        const response = await databases.updateDocument(
            VITE_APPWRITE_DATABASE_ID,
            VITE_APPWRITE_GOALS_ID,
            goal?.$id,
            {
                "completed_steps": newCompleted,
            }
            );
            console.log(response)
        } catch (error) {
        console.error(error)
        }
    }

    return (
        <div key={index}>
            <div className='flex gap-2'>
                <h4 className='text-lightgray uppercase tracking-widest text-xl' key={index}>{goal?.name}</h4>
                <EditIcon onClick={()=>handleEditGoalClick()} className='text-lightgray cursor-pointer hover:text-my-cyan'/>
                <Save onClick={()=>handleSaveStatusClick()} className='text-lightgray cursor-pointer hover:text-my-cyan'/>
                {/* <Refresh onClick={()=>handleRefreshClick()} className='text-lightgray cursor-pointer hover:text-my-cyan'/> */}
                <Trash2 onClick={deleteGoal} className='text-lightgray hover:cursor-pointer hover:text-my-cyan' />
            </div>
            <Steps
                goal={goal}
                getGoals={getGoals}
                newCompleted={newCompleted}
                setNewCompleted={setNewCompleted}
                
            />
        </div>
    )
}
export default Goal;