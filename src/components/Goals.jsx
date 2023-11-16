import { useEffect, useState } from "react";
import { VITE_APPWRITE_DATABASE_ID, VITE_APPWRITE_GOALS_ID, databases } from '../lib/appwrite'
import { Query } from "appwrite"
import Goal from './Goal'
/* eslint-disable react/prop-types */
const Goals = ({ loggedInUser, setCreatingGoal, setUpdatingGoal, setGoalToUpdate, dashboardText, setDashboardText }) => {

    const [goals, setGoals] = useState(null)
    const [zeroGoals, setZeroGoals] = useState(false)
    const getGoals = async () => {
        try {
        const response = await databases.listDocuments(
            VITE_APPWRITE_DATABASE_ID,
            VITE_APPWRITE_GOALS_ID,
            [
            Query.equal("user_id", [loggedInUser?.$id])
            ]
        );
            if (response?.total === 0) {
                setZeroGoals(true);
                setDashboardText('Create a Goal')

            } else {
                setGoals(response?.documents);
            }
                
        } catch (error) {
        console.error(error)
        }
      }
      useEffect(() => {
            getGoals()
      }, [])
    
    return (
        <div className={zeroGoals ? 'hover:cursor-pointer hover:text-cyan-400' : ''} onClick={zeroGoals ? setCreatingGoal : null}>
            {goals?.length ? goals.map((goal, index) => {
                return (
                    <div className='mt-12' key={index}>
                        <Goal goal={goal} getGoals={getGoals} setUpdatingGoal={setUpdatingGoal} setGoalToUpdate={setGoalToUpdate} />
                    </div>
                    )
            }) : <p className={`m-2 p-2 text-2xl tracking-widest uppercase self-center text-center text-lightgray my-24 ${zeroGoals ? 'hover:text-cyan-400' : ''}`}>{dashboardText}</p>}
        </div>
    )
}
export default Goals;