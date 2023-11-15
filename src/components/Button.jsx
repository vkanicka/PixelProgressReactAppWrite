// eslint-disable-next-line react/prop-types
const GetGoalsButton = ({fx, text}) => {
    return (
        <button
                className='hover:underline border-lightgray border bg-lightblue w-full rounded px-16 py-2'
                type="button"
                onClick={fx}
              >
                {text}
      </button>
    )
}

export default GetGoalsButton;