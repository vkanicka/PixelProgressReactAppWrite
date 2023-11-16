import { useState } from 'react'
/* eslint-disable react/prop-types */
const Step = ({ statusId, goal, newCompleted, setNewCompleted }) => {
  const previousStatus = new Set(goal?.completed_steps).has(statusId)
  const [currentStatus, setCurrentStatus] = useState(previousStatus)
  
  const updateStatus = () => {
    let tempArray = newCompleted
    setCurrentStatus(!currentStatus)
    if (!previousStatus) {
      tempArray.push(statusId)
    } else {
      tempArray = tempArray.filter(x=>x!==statusId)
    }
    setNewCompleted(tempArray)

  }


    return (
      <td
        key={statusId}
        onClick={()=>updateStatus()}
        className={(currentStatus ? 'bg-my-cyan ' : '') + 'h-10 w-10 m-4 border-4 border-lightblue hover:bg-lightgray cursor-pointer transition-colors duration-300'}
      >
      </td>
    )
}

export default Step;