/* eslint-disable react/prop-types */
import { useState } from 'react'
import { VITE_APPWRITE_DATABASE_ID, VITE_APPWRITE_GOALS_ID, databases } from '../lib/appwrite'
import { ID } from "appwrite"
import Button from './Button'
import Input from './Input'
import { Plus } from 'react-feather'

const CreateGoal = ({userId}) => {
    const [name, setName] = useState('')
    const [weeks, setWeeks] = useState([])
    const [days, setDays] = useState([])
    const [steps, setSteps] = useState([])

    const createGoal = async () => {
        try {
        const response = await databases.createDocument(
            VITE_APPWRITE_DATABASE_ID,
            VITE_APPWRITE_GOALS_ID,
            ID.unique(),
            {
                "name": name,
                "days": ["Monday"],
                "steps": ["start"],
                "week_start_dates": ["2023-10-01T09:00:00.000+00:00"],
                "user_id": userId
            }
            // {"name": name, "weeks": weeks, "days": days, "steps": steps, "user_id": userId}
            );
            console.log(response)
        } catch (error) {
        console.error(error)
        }
    }
    return (
        <div>
            <h1>Create New Goal</h1>
            <form className='p-2 my-24 flex flex-col items-center'>
                <div className='flex gap-4 items-center'>
                    <label>Goal Name*</label>
                    <Input type={'name'} placeholder={'Name'} value={name} fx={setName} />
                </div>
                <div className='flex flex-col gap-4 items-center border border-lightgray p-4 rounded-lg'>
                    <label>Week Start Dates</label>
                    <button className='flex gap-1'><Plus/> Add Item</button>
                    <Input type={'datetime-local'} placeholder={'2023-11-12T09:00:00.000+00:00'} value={weeks} fx={setWeeks} />
                </div>
                <div className='flex flex-col gap-4 items-center border border-lightgray p-4 rounded-lg'>
                    <label>Days</label>
                    <button className='flex gap-1'><Plus/> Add Item</button>
                    <Input type={'text'} placeholder={'Monday'} value={days} fx={setDays} />
                </div>
                <div className='flex flex-col gap-4 items-center border border-lightgray p-4 rounded-lg'>
                    <label>Steps</label>
                    <button className='flex gap-1'><Plus/> Add Item</button>
                    <Input type={'text'} placeholder={'Study'} value={steps} fx={setSteps} />
                </div>
                

                <div className='flex flex-col gap-4 my-4'>  
                    <Button fx={createGoal} text={'Create Goal'} />
                </div>
            </form>
        </div>
    )
}
export default CreateGoal