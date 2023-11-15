import { useEffect, useState } from "react";
import { VITE_APPWRITE_DATABASE_ID, VITE_APPWRITE_GOALS_ID, databases } from '../lib/appwrite'
import { Query } from "appwrite"
import Goal from './Goal'
/* eslint-disable react/prop-types */
const Goals = ({ loggedInUser }) => {

    const [goals, setGoals] = useState(null)

    const getGoals = async () => {
        try {
        const response = await databases.listDocuments(
            VITE_APPWRITE_DATABASE_ID,
            VITE_APPWRITE_GOALS_ID,
            [
            Query.equal("user_id", [loggedInUser?.$id])
            ]
        );
            setGoals(response.documents);
        } catch (error) {
        console.error(error)
        }
      }
      useEffect(() => {
            getGoals()
        }, [])
    
    return (
        <div>
            {goals?.length ? goals.map((goal, index) => {
                return (
                    <div className='mt-12' key={index}>
                        <Goal goal={goal} getGoals={getGoals} />
                    </div>
                    )
            }) : <p className="m-2 p-2 text-2xl tracking-widest uppercase self-center text-center text-lightgray my-24">Loading...</p>}
        </div>
    )
}
export default Goals;