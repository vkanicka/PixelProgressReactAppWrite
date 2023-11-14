/* eslint-disable react/prop-types */
import Step from "./Step";

const Steps = ({ sessions, steps, reps }) => {
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
                  className="text-gray-300"
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
                  <th key={`${s}-${i}-header`} className='text-gray-400 whitespace-nowrap text-xs text-center px-[10px]' scope="col">
                    {step}
                  </th>
                );
              });
            })}
          </tr>

          {reps.map((rep, r) => {
            return (
              <tr key={`${r}-row`}>
                <th className='text-gray-300' scope="row" key={`${r}-row-header`}>
                  {rep}
                </th>
                    {sessions.map((session, i) => {
                        return steps.map((step, j) => {
                            const fillStep = () => {
                                console.log(`clicked: W${r}D${i}S${j}`)
                            }
                    return (
                      <Step
                        key={`${r}-${i}-${j}`}
                        rep={rep}
                        session={session}
                        step={step}
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