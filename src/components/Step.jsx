/* eslint-disable react/prop-types */
const Step = ({rep, session, step, fillStep, status}) => {

    return (
      <td
        key={`${rep}-${session}-${step}`}
        id={`${rep}-${session}-${step}`}
        onClick={fillStep}
        className={(status ? 'bg-cyan-200 ' : '') + 'h-10 w-10 m-4 border-2 border-cyan-400 hover:bg-gray-200 cursor-pointer transition-colors duration-300'}
      >
      </td>
    )
}

export default Step;