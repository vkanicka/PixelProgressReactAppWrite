/* eslint-disable react/prop-types */
const Step = ({rep, session, step, fillStep, status}) => {

    return (
      <td
        key={`${rep}-${session}-${step}`}
        id={`${rep}-${session}-${step}`}
        onClick={fillStep}
        className={(status ? 'bg-cyan ' : '') + 'h-10 w-10 m-4 border-2 border-lightblue hover:bg-lightgray cursor-pointer transition-colors duration-300'}
      >
      </td>
    )
}

export default Step;