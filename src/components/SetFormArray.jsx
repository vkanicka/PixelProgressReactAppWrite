/* eslint-disable react/prop-types */
import { useState } from 'react'
import { X } from 'react-feather'
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
        <div>
            <h1>Set {fieldName}</h1>
            {formArray && (
                <div>
                    <h3>{fieldName} List</h3>
                    <ul>
                        {formArray?.map((value, index) => {
                            return (
                                <li className='flex' key={`value-li-${index}`}>{'- ' + value} <X onClick={()=>handleRemoveValueClick(index)} className='text-red-400 cursor-pointer'/></li>
                            )

                        })}
                    </ul>
                </div>
                
            )}
            <h2 className='cursor-pointer hover:underline' onClick={() => setAddingValue(true)}>+ Add Value</h2>
            {addingValue && (
                <form onSubmit={handleAddValueClick}>
                    <input onChange={(e) => {setValueToAdd(e.target.value)}} type={type} placeholder={fieldName.replace(/s|S\b/,'')}></input>
                    <button type='submit'>Submit</button>
                </form>
            )}
        </div>
    )
}
export default SetFormArray;