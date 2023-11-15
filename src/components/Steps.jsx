import { useState, useEffect } from "react";
import { VITE_APPWRITE_DATABASE_ID, VITE_APPWRITE_STATUSES_ID, databases } from '../lib/appwrite'
import { Query } from "appwrite"
/* eslint-disable react/prop-types */
import Step from "./Step";

const Steps = ({ goal, sessions, steps, reps }) => {
    const [statuses, setStatuses] = useState(null)

       const getStatuses = async () => {
        try {
        const response = await databases.listDocuments(
            VITE_APPWRITE_DATABASE_ID,
            VITE_APPWRITE_STATUSES_ID,
            [
            Query.equal("goals", [goal])
            ]
        );
            setStatuses(response.documents);
        } catch (error) {
        console.error(error)
        }
       }
    
    const updateStatus = async (document_id, status) => {
        console.log(updateStatus)
        try {
            const response = await databases.updateDocument(
                VITE_APPWRITE_DATABASE_ID,
                VITE_APPWRITE_STATUSES_ID,
                document_id,
                {"is_completed": !status}
            );
                setStatuses([...statuses, response]);
        } catch (error) {
            console.error(error)
        }
       }
    
      useEffect(() => {
            getStatuses()
      }, [])
    
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
                  className="text-gray-500 font-thin tracking-widest text-lg"
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
                  <th key={`${s}-${i}-header`} className='font-thin text-gray-400 whitespace-nowrap text-xs text-center px-[10px]' scope="col">
                    {step}
                  </th>
                );
              });
            })}
          </tr>

          {reps.map((rep, r) => {
            return (
              <tr key={`${r}-row`}>
                <th className='font-thin text-right text-gray-500 tracking-widest px-8' scope="row" key={`${r}-row-header`}>
                  {rep}
                </th>
                    {sessions.map((session, i) => {
                        return steps.map((step, j) => {
                            const statusId = `W${r}D${i}S${j}`
                            const currentStatus = statuses?.filter(s => s.$id === `W${r}D${i}S${j}`)[0]?.is_completed
                            const fillStep = () => {
                                updateStatus(statusId, currentStatus)
                                console.log(`clicked: ${statusId}`)
                            }
                    return (
                      <Step
                        key={`${r}-${i}-${j}`}
                        rep={rep}
                        session={session}
                        step={step}
                        status={currentStatus}
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