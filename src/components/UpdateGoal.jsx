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
    const [weeks, setWeeks] = useState(goalToUpdate?.week_start_dates.map(date=>date.split('T')[0]))

    const updateGoal = async () => {
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
        <div className="mx-auto flex flex-col items-center gap-4">
            <div className='absolute top-0 left-0 m-4 flex gap-2 cursor-pointer' onClick={()=>setUpdatingGoal(false)} >
                <ChevronsLeft size={40} className='text-lightgray' />
                <p className='text-lightgray self-center text-2xl tracking-widest uppercase'>Back</p>
            </div>
            <div className='bg-gray-100 px-12 py-8 my-24 rounded-lg flex flex-col gap-6 max-w-3xl uppercase text-gray-500'>
                <h1 className='tracking-widest text-xl text-gray-700 font-semibold'>Edit</h1>
                <hr className='mb-2'/>
                <div>
                    <label className='tracking-widest text-lg text-gray-600 my-2'>Name</label>
                    <Input type={'name'} placeholder={'Name'} value={name} fx={setName} />
                </div>
                <SetFormArray fieldName={'Days'} formArray={days} setFormArray={setDays} />
                <SetFormArray fieldName={'Steps'} formArray={steps} setFormArray={setSteps} />
                <SetFormArray fieldName={'Week Start Dates'} formArray={weeks} setFormArray={setWeeks} type={'date'} />
                <hr className='my-4'/>
                <Button fx={updateGoal} text={'Update Goal'} />
            </div>
        </div>
    )
}
export default UpdateGoal;