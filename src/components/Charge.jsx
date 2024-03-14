import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setChargeAmount } from '../slices/chargeSlice';
import { FiEdit } from "react-icons/fi";
import { GrClose, GrAdd } from "react-icons/gr";
import { MdOutlineDelete } from "react-icons/md";

const Charge = () => {
    const { api } = useSelector((state) => state.inputs); 
    const { charge } = useSelector((state) => state.chargeAmount);
    const [edit, setEdit] = useState(true);
    
    const dispatch = useDispatch();

    // Initialize state object to store rows for each API
    const initialRowsState = api.reduce((acc, apiItem) => {
        acc[apiItem] = Object.keys(charge[apiItem]).map(key => ({
            numberOfCustomer: key,
            chargeAmount: charge[apiItem][key]
        }));
        return acc;
    }, {});

    const [rows, setRows] = useState(initialRowsState);

    const handleSubmit = () => {
        const newObj = {};
        api.forEach((apiItem) => {
            newObj[apiItem] = {};
            rows[apiItem].forEach((row) => {
                newObj[apiItem][row.numberOfCustomer] = parseFloat(row.chargeAmount);
            });
        });
        setEdit(true);
        dispatch(setChargeAmount(newObj));
    };

    // Function to add a new row for a specific API
    const addNewRow = (apiItem) => {
        setRows((prevRows) => ({
            ...prevRows,
            [apiItem]: [
                ...prevRows[apiItem],
                { numberOfCustomer: '', chargeAmount: '' }
            ]
        }));
    };

    // Function to remove a row
    const removeRow = (apiItem, rowIndex) => {
        setRows((prevRows) => ({
            ...prevRows,
            [apiItem]: prevRows[apiItem].filter((_, index) => index !== rowIndex)
        }));
    };

    return (
        <div className='w-[60%] m-auto backdrop-blur bg-black/25 p-5 grid'>
            <button onClick={() => setEdit(!edit)} className='justify-self-end'>
                {edit ? <FiEdit size={24}/> : <GrClose size={24}/>}
            </button>
            {edit ? (
                Object.keys(charge).map((api) => (
                    <div key={api} className='w-[90%] m-auto'>
                        <h1 className='m-5'>API URL - <span><b>{api}</b></span></h1>
                        <table className=' border border-black w-[60%] m-auto'>
                            <thead>
                                <tr className='text-center'>
                                    <th className='px-2 bg-gray-700 text-white px-10'>Price Slab</th>
                                    <th className='px-2 bg-gray-700 text-white px-10'>Charge Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Object.keys(charge[api]).map((key) => (
                                    <tr key={key}>
                                        <td className='border border-gray-400 px-3'>{key}</td>
                                        <td className='border border-gray-400 px-3'>{charge[api][key]}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ))
            ) : (
                <div className='w-[60%] m-auto'>
                    {api.map((apiItem, index) => (
                        <div key={index}>
                            <form key={index} className='my-5'>
                                <div className='flex justify-between my-3'>
                                    <h1 className='font-bold'>{apiItem}</h1>
                                    <button
                                        type='button'
                                        className='bg-black text-white rounded px-3 py-1 hover:bg-gray-600 flex self-center'
                                        onClick={() => addNewRow(apiItem)}
                                    >
                                        Add Slab <GrAdd className='self-center mx-1' size={18}/>
                                    </button>
                                </div>
                                {rows[apiItem].map((row, rowIndex) => (
                                    <div key={rowIndex} className='flex gap-5 my-2'>
                                        <input
                                            type='number'
                                            placeholder='Enter Price Slab'
                                            className='bg-black text-white px-3 py-1'
                                            value={row.numberOfCustomer}
                                            onChange={(e) => {
                                                const newRows = { ...rows };
                                                newRows[apiItem][rowIndex].numberOfCustomer = e.target.value;
                                                setRows(newRows);
                                            }}
                                        />
                                        <input
                                            type='number'
                                            placeholder='Enter Charge Amount'
                                            className='bg-black text-white px-3 py-1'
                                            value={row.chargeAmount}
                                            onChange={(e) => {
                                                const newRows = { ...rows };
                                                newRows[apiItem][rowIndex].chargeAmount = e.target.value;
                                                setRows(newRows);
                                            }}
                                        />
                                        <button
                                            type='button'
                                            className='bg-red-500 text-white rounded px-3 py-1 hover:bg-red-600'
                                            onClick={() => removeRow(apiItem, rowIndex)}
                                        >
                                            <MdOutlineDelete />
                                        </button>
                                    </div>
                                ))}
                            </form>
                        </div>
                    ))}
                    <button
                        type='button'
                        className='bg-black text-white rounded px-3 py-1 hover:bg-gray-600'
                        onClick={handleSubmit}
                    >
                        Submit
                    </button>
                </div>
            )}
        </div>
    );
};

export default Charge;
