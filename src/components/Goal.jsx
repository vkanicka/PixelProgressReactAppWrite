import Steps from './Steps'

/* eslint-disable react/prop-types */
const Goal = ({ goal, index }) => {

    return (
        <div key={index}>
            <h4 className='text-lightgray uppercase tracking-widest text-xl' key={index}>{goal?.name}</h4>
            <Steps
                goal={goal}
                
            />
        </div>
    )
}
export default Goal;