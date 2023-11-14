/* eslint-disable react/prop-types */
const Goals = ({ goals }) => {
    return (
        <div>
            <h3>Goals</h3>
            {goals.map((goal, index) => {
            return (
                <h4 key={index}>{goal.name}</h4>
            )
            })}
        </div>
    )
}
export default Goals;