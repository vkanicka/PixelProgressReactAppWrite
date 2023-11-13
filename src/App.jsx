import { useEffect, useState } from 'react';
import { account, ID } from './lib/appwrite';
import { Loading } from '../Loading'

const App = () => {
  const [loading, setLoading] = useState(true)
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('')
  const [password, setPassword] = useState('');

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

  const logout = async () => {
    await account.deleteSession('current');
    setLoggedInUser(null);
  }

  const register = async () => {
    await account.create(ID.unique(), email, password, name);
    login(email, password);
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
    <div className={'m-2 my-2'}>

      {loggedInUser && (
        <h1 className='text-lg self-center'>{loggedInUser ? `Logged in as ${loggedInUser.name}` : 'Welcome'}</h1>
      )}
    

      <form className='p-2 my-2'>
        {!loggedInUser && (
          <div>
          <input className='bg-grey-100 rounded p-2 m-2 block border border-grey-300' type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
          <input className='bg-grey-100 rounded p-2 m-2 block border border-grey-300' type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
          <input className='bg-grey-100 rounded p-2 m-2 block border border-grey-300' type="name" placeholder="Name" value={name} onChange={e => setName(e.target.value)} />

          <div className=''>
            <button className='bg-emerald-100 rounded-lg p-2 m-2 border border-emerald-300' type="button" onClick={async () => login(email, password)}>
              Login
            </button>
            <button
              className='bg-emerald-100 rounded-lg p-2 m-2 border border-emerald-300'
              type="button"
              onClick={register}
            >
              Register
            </button>
            </div>
            </div>
            )}


        {loggedInUser && (
          <button
            className='p-2 my-2 border border-emerald-200 rounded-lg'
            type="button"
            onClick={logout}
          >
            Logout
          </button>
        )}
      </form>
      
    </div>
  ) : <Loading />;
};

export default App;
