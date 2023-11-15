import { useEffect, useState } from 'react'
import { VITE_APPWRITE_DATABASE_ID, VITE_APPWRITE_GOALS_ID, databases } from '../lib/appwrite'
/* eslint-disable react/prop-types */
import Step from "./Step";

const Steps = ({ goal }) => {
    const formatDate = (date) => {
        const obj = new Date(date)
        const formattedDate = obj.toLocaleDateString("en-US", { month: "long", day: "numeric" })
        return formattedDate
    }
    
    const sessions=goal?.days
    const steps=goal?.steps
    const reps = goal?.week_start_dates.map(date => formatDate(date))


    const [uniq, setUniq] = useState(new Set(goal?.completed_steps))
    
    // useEffect(() => {
    //     setUniq(new Set(goal?.completed_steps))
    // }, [])


    const updateStatus = async (document_id, id) => {
        // if id in array, remove, if not add
        const alreadyCompleted = uniq?.has(id)
        console.log(`${id} ${alreadyCompleted ? 'IS' : 'IS NOT'} completed. `)
        let prevArr = goal?.completed_steps ?? []
        let newArray = [...goal?.completed_steps ?? [], id]
        if (!prevArr.length | !alreadyCompleted) { 
            console.log('adding id')
            newArray.push(id)
        } else {
            console.log('removing id')
            newArray = newArray.filter(x=>x!==id)
        }
        try {
            await databases.updateDocument(
                VITE_APPWRITE_DATABASE_ID,
                VITE_APPWRITE_GOALS_ID,
                document_id,
                {"completed_steps": newArray}
            );
            // setUniq(new Set(newArray))
        } catch (error) {
            console.error(error)
        }
       }
    
    return (
      <table className='uppercase border-separate border-spacing-[2px]'>
        {sessions.map(session => {
          return (
            <colgroup
              key={`${session}-group-key`}
              span={steps.length}
            />
          );
        })}

        <tbody>
          <tr>
            <td className="hide" rowSpan="2" key="hiddenCell" />
            {sessions.map((session, i) => {
              return (
                <th
                  key={`${i}-header`}
                  className="text-lightblue font-light tracking-widest text-lg"
                  colSpan={steps.length}
                      scope="colgroup"
                >
                  {session}
                </th>
              );
            })}
          </tr>

          <tr>
            {sessions.map((session, s) => {
              return steps.map((step, i) => {
                return (
                  <th key={`${s}-${i}-header`} className='font-thin text-gray-400 whitespace-nowrap text-xs text-center pr-[10px]' scope="col">
                    {step}
                  </th>
                );
              });
            })}
          </tr>

          {reps.map((rep, r) => {
            return (
              <tr key={`${r}-row`}>
                <th className='font-light text-center text-lightblue tracking-widest pr-8' scope="row" key={`${r}-row-header`}>
                  {rep}
                </th>
                    {sessions.map((session, i) => {
                        return steps.map((step, j) => {
                            const statusId = `W${r}D${i}S${j}`
                            const fillStep = () => {
                                updateStatus(goal?.$id, statusId)
                            }
                    return (
                      <Step
                        key={`${r}-${i}-${j}`}
                        rep={rep}
                        session={session}
                        step={step}
                        status={uniq?.has(statusId)}
                        fillStep={fillStep}
                      />
                    );
                  });
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    );
}
export default Steps;