import { useEffect, useState } from 'react';
import { account } from './lib/appwrite';


import Button from './components/Button'
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
         <h1 className='text-lg self-center'>{loggedInUser ? `Logged in as ${loggedInUser.name}` : 'Welcome'}</h1>
          <Button fx={logout} text={'Logout'} />
          <Goals loggedInUser={loggedInUser} />
        </div>
     ) : <Entry email={email} setEmail={setEmail} password={password} setPassword={setPassword} name={name} setName={setName} setLoading={setLoading} setLoggedInUser={setLoggedInUser}/>

  ) : <p className="m-2 p-2 text-lg">Loading...</p>;
};

export default App;
