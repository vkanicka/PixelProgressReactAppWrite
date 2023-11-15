import Steps from './Steps'
import { Trash2, Edit as EditIcon } from 'react-feather'
import { VITE_APPWRITE_DATABASE_ID, VITE_APPWRITE_GOALS_ID, databases } from '../lib/appwrite'
/* eslint-disable react/prop-types */
const Goal = ({ goal, index, getGoals, setUpdatingGoal, setGoalToUpdate}) => {

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
        console.log(`handleEditGoalClick`)
        setGoalToUpdate(goal)
        setUpdatingGoal(true)
    }

    return (
        <div key={index}>
            <div className='flex gap-2'>
                <h4 className='text-lightgray uppercase tracking-widest text-xl' key={index}>{goal?.name}</h4>
                <EditIcon onClick={()=>handleEditGoalClick()} className='text-lightgray cursor-pointer hover:text-cyan'/>
                <Trash2 onClick={deleteGoal} className='text-lightgray hover:cursor-pointer hover:text-cyan'/>
            </div>
            <Steps
                goal={goal}
                
            />
        </div>
    )
}
export default Goal;