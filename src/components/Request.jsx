import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRequestMutation } from '../slices/uploadApiSlice';
import { toast } from 'react-toastify';
import { setResult } from '../slices/resultSlice';
import Loader from './Loader';

const Request = () => {
    const codes = JSON.parse(localStorage.getItem('codes'))
    const charge = JSON.parse(localStorage.getItem('charge'))
    const { fileName } = useSelector((state) => state.inputs);

    const [data, { isLoading }] = useRequestMutation();

    const dispatch = useDispatch();

    const submitHandler = async () => {
        console.log(codes)
        console.log(charge)
        const requestData = {
            api: charge,
            statusCode: codes.map((code) => parseInt(code)),
            fileName: fileName
        };

        try {
            console.log(requestData);
            const res = await data(requestData);
            console.log(res);
            dispatch(setResult({...res}))

        } catch (error) {
            toast.error(error.message)
            console.error('Error:', error);
        }
    };

    return (
        <div className='m-10'>
            <button type='button' className='bg-black text-white px-3 py-1' onClick={submitHandler}>Click to Read the File</button>
            {
                isLoading && <Loader />
            }
        </div>
    );
};

export default Request;
