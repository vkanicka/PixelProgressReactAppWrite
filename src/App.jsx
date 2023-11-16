import { useEffect, useState } from 'react';
import { account } from './lib/appwrite';
import { LogOut } from 'react-feather'
import Entry from './components/Entry'
import Goals from './components/Goals'
import { PlusCircle } from 'react-feather';
import BuildForm from './components/BuildForm';
import UpdateGoal from './components/UpdateGoal';

const App = () => {
  const [loading, setLoading] = useState(true)
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('')
  const [password, setPassword] = useState('');
  const [creatingGoal, setCreatingGoal] = useState(true) // change back to false
  const [updatingGoal, setUpdatingGoal] = useState(false) // change back to false
  const [goalToUpdate, setGoalToUpdate] = useState(false)
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
     creatingGoal ? <BuildForm userId={loggedInUser?.$id} setCreatingGoal={setCreatingGoal} /> : updatingGoal ? <UpdateGoal setUpdatingGoal={setUpdatingGoal} goalToUpdate={goalToUpdate} /> :
     <div className='flex flex-col items-center'>
       <div className='absolute top-0 right-0 m-4 gap-4 flex flex-col'>
           <h1 className='text-lg text-lightgray'>Logged in as {loggedInUser.name}</h1>
         <div className='cursor-pointer hover:underline flex gap-4' onClick={logout}>
          <LogOut className='cursor-pointer text-white bg-lightgray p-1 rounded-full'  /> 
           <h1 className='text-lg text-lightgray'>Logout</h1>
           </div>
         <div className='flex gap-4 cursor-pointer hover:underline' onClick={()=>setCreatingGoal(true)}>
            <PlusCircle className='text-lightgray' />
            <h1 className='text-lg text-lightgray'>{creatingGoal ? 'Creating Goal' : 'Create New Goal'}</h1>
         </div>
       </div>
          <Goals loggedInUser={loggedInUser} setUpdatingGoal={setUpdatingGoal} setGoalToUpdate={setGoalToUpdate}  />
        </div>
     ) : <Entry email={email} setEmail={setEmail} password={password} setPassword={setPassword} name={name} setName={setName} setLoading={setLoading} setLoggedInUser={setLoggedInUser}/>

  ) : <p className="m-2 p-2 text-2xl tracking-widest uppercase self-center text-center text-lightgray my-24">Loading...</p>;
};

export default App;
