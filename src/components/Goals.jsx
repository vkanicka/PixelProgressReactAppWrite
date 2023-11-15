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
            <h3>Goals</h3>
            {goals?.length ? goals.map((goal, index) => {
                return (
                    <div key={index}>
                        <Goal goal={goal}/>
                    </div>
                    )
            }) : <p>No goals yet. Create a Goal.</p>}
        </div>
    )
}
export default Goals;