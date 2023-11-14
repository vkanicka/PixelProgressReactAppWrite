import { useEffect, useState } from 'react';
import { account, databases } from './lib/appwrite';
import { Query } from "appwrite";
import { VITE_APPWRITE_DATABASE_ID, VITE_APPWRITE_GOALS_ID, } from './lib/appwrite'

import Button from './components/Button'
import Entry from './components/Entry'
import Goals from './components/Goals'

const App = () => {
  const [loading, setLoading] = useState(true)
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('')
  const [password, setPassword] = useState('');
  const [goals, setGoals] = useState(null)



  const logout = async () => {
    await account.deleteSession('current');
    setLoggedInUser(null);
    setGoals(null)
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

  const getGoals = async () => {
    try {
      const response = await databases.listDocuments(
        VITE_APPWRITE_DATABASE_ID,
        VITE_APPWRITE_GOALS_ID,
        [
          Query.equal("user_id", [loggedInUser?.$id])
        ]
      );
      setGoals(response.documents);
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    checkUserStatus()
  }, [])

 return !loading ? (
    <div className={'m-2 my-2'}>
     {loggedInUser ? (
       <div>
         <h1 className='text-lg self-center'>{loggedInUser ? `Logged in as ${loggedInUser.name}` : 'Welcome'}</h1>
          <Button fx={logout} text={'Logout'} />
          <Button fx={getGoals} text={'Get Goals'} />
          {goals?.length && (
             <Goals goals={goals} />
          )}
        </div>
     ) : <Entry email={email} setEmail={setEmail} password={password} setPassword={setPassword} name={name} setName={setName} setLoading={setLoading} setLoggedInUser={setLoggedInUser}/>}

    </div>
  ) : <p className="m-2 p-2 text-lg">Loading...</p>;
};

export default App;
