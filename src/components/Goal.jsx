import Steps from './Steps'

/* eslint-disable react/prop-types */
const Goal = ({ goal, index }) => {
    const formatDate = (date) => {
        const obj = new Date(date)
        const formattedDate = obj.toLocaleDateString("en-US", { month: "long", day: "numeric" })
        return formattedDate
    }
    
    const fillStep = () => {
        console.log('potato')
    }
        
    return (
        <div key={index}>
            <h4 key={index}>{goal.name}</h4>
            <Steps
                sessions={goal?.days}
                steps={goal?.steps}
                reps={goal?.week_start_dates.map(date=>formatDate(date))}
            />
        </div>
    )
}
export default Goal;