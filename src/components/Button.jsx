// eslint-disable-next-line react/prop-types
const GetGoalsButton = ({fx, text}) => {
    return (
        <button
                className='hover:bg-lime-300 uppercase tracking-widest border-lime-300 border-t-lime-100 border-l-lime-100 border bg-lime-200 w-full rounded px-16 py-2'
                type="button"
                onClick={fx}
              >
                {text}
      </button>
    )
}

export default GetGoalsButton;