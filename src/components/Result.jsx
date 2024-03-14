import React from 'react';
import { useSelector } from 'react-redux';

const Result = () => {
    const { result } = useSelector((state) => state.result)
    
  return (
    <div className='m-10'>
        { result.data && Object.keys(result.data).map((appId) => (
            <>
                <h1>For Client Id - <b>{appId}</b></h1>
                <table className='m-5 border border-black'>
                    <tr className='text-center'>
                        <th className='px-2 bg-gray-700 text-white'>API Name</th>
                        <th className='px-2 bg-gray-700 text-white'>Slab Price</th>
                        <th className='px-2 bg-gray-700 text-white'>Total Charge</th>
                    </tr>
                    {
                        Object.keys(result.data[appId]).map((api) => (
                            <tr>
                                {
                                    result.data[appId][api]['total'] ? (
                                        <>
                                            <td className='border border-gray-400 px-3'>{api}</td>
                                            <td className='border border-gray-400 text-center'>{result.data[appId][api]['numberOfCustomers']}</td>
                                            <td className='border border-gray-400 text-center'>{result.data[appId][api]['total']}</td>
                                        </>
                                    ) : (
                                        <>
                                            <td className='border border-gray-400 px-3' colSpan={2}>{api}</td>
                                            <td className='border border-gray-400 text-center'>{result.data[appId][api]}</td>
                                        </>
                                    )
                                }
                            </tr>
                        ))
                    }
                </table>
            </>
        ))}
    </div>
  )
}

export default Result