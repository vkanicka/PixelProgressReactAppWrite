// eslint-disable-next-line react/prop-types
const GetGoalsButton = ({fx, text}) => {
    return (
        <button
                className='p-2 my-2 border border-emerald-200 rounded-lg'
                type="button"
                onClick={fx}
              >
                {text}
      </button>
    )
}

export default GetGoalsButton;