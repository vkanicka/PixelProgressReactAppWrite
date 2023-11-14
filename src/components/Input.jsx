/* eslint-disable react/prop-types */
const Input = ({type, placeholder, value, fx}) => {
    return (
        <input className='bg-grey-100 rounded p-2 m-2 block border border-grey-300' type={type} placeholder={placeholder} value={value} onChange={e => fx(e.target.value)} />
    )
}

export default Input;