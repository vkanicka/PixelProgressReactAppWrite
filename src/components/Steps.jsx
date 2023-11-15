// import { useState } from 'react'
// import { VITE_APPWRITE_DATABASE_ID, VITE_APPWRITE_GOALS_ID, databases } from '../lib/appwrite'
/* eslint-disable react/prop-types */
import Step from "./Step";

const Steps = ({ goal, newCompleted, setNewCompleted }) => {
    const formatDate = (date) => {
        const obj = new Date(date)
        const formattedDate = obj.toLocaleDateString("en-US", { month: "long", day: "numeric" })
        return formattedDate
    }
    
    const sessions=goal?.days
    const steps=goal?.steps
    const reps = goal?.week_start_dates.map(date => formatDate(date))
    
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
                          const statusId=`W${r}D${i}S${j}`
                          return (
                            <Step
                              key={statusId}
                              statusId={statusId}
                              goal={goal}
                              newCompleted={newCompleted}
                              setNewCompleted={setNewCompleted}
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