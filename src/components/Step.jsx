/* eslint-disable react/prop-types */
const Step = ({rep, session, step, fillStep}) => {

    return (
      <td
        key={`${rep}-${session}-${step}`}
        id={`${rep}-${session}-${step}`}
        onClick={fillStep}
        className='h-10 w-10 m-4 border-2 border-cyan-400 hover:bg-cyan-200 transition-opacity'
      >
      </td>
    )
}

export default Step;