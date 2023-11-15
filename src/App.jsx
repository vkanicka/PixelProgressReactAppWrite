import { useEffect, useState } from 'react';
import { account } from './lib/appwrite';
import { LogOut } from 'react-feather'
import Entry from './components/Entry'
import Goals from './components/Goals'

const App = () => {
  const [loading, setLoading] = useState(true)
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('')
  const [password, setPassword] = useState('');

  const logout = async () => {
    await account.deleteSession('current');
    setLoggedInUser(null);
  }

  const checkUserStatus = async () => {
    try {
      let accountDetails = await account.get()
      setLoggedInUser(accountDetails);
    } catch (error) {
      console.error(error)
    }
    setLoading(false)
  }

  useEffect(() => {
    checkUserStatus()
  }, [])

 return !loading ? (
     loggedInUser ? (
     <div className='flex flex-col items-center'>
       <div className='absolute flex justify-end gap-8 w-full items-center mr-12'>
         <h1 className='text-lg text-lightgray'>Logged in as {loggedInUser.name}</h1>
         <LogOut className='cursor-pointer text-white bg-lightgray p-1 rounded-full' onClick={logout} />
       </div>
          <Goals loggedInUser={loggedInUser} />
        </div>
     ) : <Entry email={email} setEmail={setEmail} password={password} setPassword={setPassword} name={name} setName={setName} setLoading={setLoading} setLoggedInUser={setLoggedInUser}/>

  ) : <p className="m-2 p-2 text-2xl tracking-widest uppercase self-center text-center text-lightgray my-24">Loading...</p>;
};

export default App;
