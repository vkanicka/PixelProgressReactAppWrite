/* eslint-disable react/prop-types */
import { useState } from 'react'
import SetFormArray from './SetFormArray'
import Input from './Input'
import Button from './Button'
import { VITE_APPWRITE_DATABASE_ID, VITE_APPWRITE_GOALS_ID, databases } from '../lib/appwrite'
import { ID } from "appwrite"

const BuildForm = ({userId, setCreatingGoal}) => {
    const [name, setName] = useState('')
    const [days, setDays] = useState(null)
    const [steps, setSteps] = useState(null)
    const [weeks, setWeeks] = useState(null)

    const createGoal = async () => {
        try {
        const response = await databases.createDocument(
            VITE_APPWRITE_DATABASE_ID,
            VITE_APPWRITE_GOALS_ID,
            ID.unique(),
            {
                "name": name,
                "days": days,
                "steps": steps,
                "week_start_dates": weeks,
                "user_id": userId
            }
            );
            console.log(response)
            setCreatingGoal(false)
        } catch (error) {
        console.error(error)
        }
    }

    return (
        <div className="mb-96">
            <h1>Build Form</h1>
            <Input type={'name'} placeholder={'Name'} value={name} fx={setName} />
            <SetFormArray fieldName={'Days'} formArray={days} setFormArray={setDays} />
            <SetFormArray fieldName={'Steps'} formArray={steps} setFormArray={setSteps} />
            <SetFormArray fieldName={'Weeks'} formArray={weeks} setFormArray={setWeeks} type={'date'} />
            <Button fx={createGoal} text={'Create Goal'} />
        </div>
    )
}
export default BuildForm;