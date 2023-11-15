/* eslint-disable react/prop-types */
import { useState } from 'react'
import SetFormArray from './SetFormArray'
import Input from './Input'
import Button from './Button'
import { VITE_APPWRITE_DATABASE_ID, VITE_APPWRITE_GOALS_ID, databases } from '../lib/appwrite'
import { ChevronsLeft } from 'react-feather'

const UpdateGoal = ({setUpdatingGoal, goalToUpdate}) => {
    const [name, setName] = useState(goalToUpdate?.name)
    const [days, setDays] = useState(goalToUpdate?.days)
    const [steps, setSteps] = useState(goalToUpdate?.steps)
    const [weeks, setWeeks] = useState(goalToUpdate?.week_start_dates.map(date=>date.replace('T00:00:00.000+00:00','')))

    const createGoal = async () => {
        try {
        const response = await databases.updateDocument(
            VITE_APPWRITE_DATABASE_ID,
            VITE_APPWRITE_GOALS_ID,
            goalToUpdate?.$id,
            {
                "name": name,
                "days": days,
                "steps": steps,
                "week_start_dates": weeks,
            }
            );
            console.log(response)
            setUpdatingGoal(false)
        } catch (error) {
        console.error(error)
        }
    }

    return (
        <div className="mb-96">
            <div className='flex gap-2 cursor-pointer' onClick={()=>setUpdatingGoal(false)} >
                <ChevronsLeft className='text-lightgray' />
                <p className='text-lightgray'>Back</p>
            </div>
                <h1>Update Form</h1>
            <Input type={'name'} placeholder={'Name'} value={name} fx={setName} />
            <SetFormArray fieldName={'Days'} formArray={days} setFormArray={setDays} />
            <SetFormArray fieldName={'Steps'} formArray={steps} setFormArray={setSteps} />
            <SetFormArray fieldName={'Weeks'} formArray={weeks} setFormArray={setWeeks} type={'date'} />
            <Button fx={createGoal} text={'Update Goal'} />
        </div>
    )
}
export default UpdateGoal;