/* eslint-disable react/prop-types */
const Goal = ({ goal, index }) => {
    const formatDate = (date) => {
        const obj = new Date(date)
        const formattedDate = obj.toLocaleDateString("en-US", { month: "long", day: "numeric" })
        return formattedDate
    }
    
    console.log(goal)
        
    return (
        <div key={index}>
            <h4 key={index}>{goal.name}</h4>
            <h5>Dates</h5>
            <ul>
                {goal?.week_start_dates?.map((date, dateIndex) => {
                    return (
                        <li key={`week-${dateIndex}`}>{formatDate(date)}</li>
                    )
                })}
            </ul>
            <ul>
                {goal?.days?.map((day, dayIndex) => {
                    return (
                        <li key={`day-${dayIndex}`}>{day}</li>
                    )
                })}
            </ul>
            <ul>
                {goal?.steps?.map((step, stepIndex) => {
                    return (
                        <li key={`step-${stepIndex}`}>{step}</li>
                    )
                })}
            </ul>
        </div>
    )
}
export default Goal;