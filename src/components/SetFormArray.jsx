/* eslint-disable react/prop-types */
import { useState } from 'react'
import { X as X, Plus, CheckCircle as Check } from 'react-feather'
const SetFormArray = ({fieldName, formArray, setFormArray, type='text'}) => {
    const [addingValue, setAddingValue] = useState(null)
    const [valueToAdd, setValueToAdd] = useState(null)

    const handleAddValueClick = (e) => {
        e.preventDefault()
        valueToAdd && setFormArray(values => values?.length ? [...values, valueToAdd] : [valueToAdd])
        setAddingValue(null)
    }
    const handleRemoveValueClick = (index) => {
        const tempArray = [...formArray]
        tempArray.splice(index, 1)
        setFormArray(tempArray)

    }
    return (
        <div className='gap-4'>
            <div className='flex gap-2 cursor-pointer'>
                <h1 className='tracking-widest text-lg text-gray-600 my-2'>{fieldName}</h1>
            </div>
            {formArray && (
                <ul className='flex gap-4 flex-wrap'>
                    {formArray?.map((value, index) => {
                        return (
                            <div key={`div-li-${index}`} className='py-2 px-4 items-center inline-flex gap-2 bg-cyan-100  rounded-3xl hover:cursor-pointer hover:bg-cyan-200 border border-t-white border-l-white border-r-cyan-200 border-b-purple-200 bg-gradient-to-t from-purple-100 to-cyan-100 bg-opacity-50'>
                                <li className='' key={`value-li-${index}`}>{value}</li>
                                <X size={20} onClick={() => handleRemoveValueClick(index)} className='text-purple-300 hover:text-purple-400 cursor-pointer' />
                                

                            </div>
                        )

                    })}

                    {addingValue ? (
                        <form className='flex gap-2 border rounded-3xl border-gray-300 p-2' onSubmit={handleAddValueClick}>
                            <input className='py-2 px-4 items-center inline-flex rounded-full hover:cursor-pointer hover:bg-gradient-to-t hover:from-purple-100 hover:border-t-white hover:border-l-white hover:to-cyan-100 border-2 border-t-cyan-200 border-l-cyan-200 border-dashed border-purple-200 bg-none' onChange={(e) => {setValueToAdd(e.target.value)}} type={type}></input>
                            <button type='submit'><Check size={30}  className='self-center text-gray-300 hover:text-lime-300' /></button>
                            <button onClick={()=>setAddingValue(false)}><X size={30}  className='self-center text-gray-300 hover:text-lime-300' /></button>
                            
                        </form>
                    ) :
                     <div className='py-2 px-2 items-center inline-flex rounded-full hover:cursor-pointer hover:bg-gradient-to-t hover:from-purple-100 hover:border-t-white hover:border-l-white hover:to-cyan-100 border-2 border-t-cyan-200 border-l-cyan-200 border-dashed border-purple-200 bg-none'>
                        <Plus size={20} onClick={() => setAddingValue(true)}  className='self-center text-purple-300 ml-24' />
                        </div>
                    }
                </ul>
            )}
        </div>
    )
}
export default SetFormArray;