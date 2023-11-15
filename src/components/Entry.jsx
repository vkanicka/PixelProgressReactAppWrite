import { account, ID } from '../lib/appwrite';
/* eslint-disable react/prop-types */
import Button from './Button'
import Input from './Input'

const Entry = ({ email, setEmail, password, setPassword, name, setName, setLoading, setLoggedInUser }) => {

      const register = async () => {
      await account.create(ID.unique(), email, password, name);
      login(email, password);
    }
  
      const login = async (email, password) => {
        setLoading(true)
        try {
          await account.createEmailSession(email, password);
          let accountDetails = await account.get()
          setLoggedInUser(accountDetails)
        } catch (error) {
          console.error(error)
        }
        setLoading(false)
      }
  
    return (
          <form className='p-2 my-24 flex flex-col items-center'>
           <Input type={'email'} placeholder={'Email'} value={email} fx={setEmail} />
           <Input type={'password'} placeholder={'Password'} value={password} fx={setPassword} />
           <Input type={'name'} placeholder={'Name'} value={name} fx={setName} />

           <div className='flex flex-col gap-4 my-4'>
             <Button fx={async () => login(email, password)} text={'Login'} />
             <Button fx={register} text={'Register'} />
            </div>
          </form>

    )

}

export default Entry;