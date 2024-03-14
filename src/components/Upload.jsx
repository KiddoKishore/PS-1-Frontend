import React, { useState } from "react";
import { toast } from "react-toastify";
import { useUploadFileMutation } from "../slices/uploadApiSlice";
import { useDispatch } from 'react-redux';
import { setFileName,apiUrl, statusCodes } from "../slices/inputSlice";
import Loader from "./Loader";

const Upload = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const dispatch = useDispatch();

  const [uploadFile, { isLoading : loadingUpload}] = useUploadFileMutation();

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async (e) => {
    if (!selectedFile) {
      toast.warn('Please Upload the CSV File')
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const res = await uploadFile(formData)
      console.log(res)
      toast.success(res.data.message);
      dispatch(setFileName(res.data.file))
      dispatch(apiUrl(res.data.api))
      dispatch(statusCodes(res.data.statusCode))
  } catch (error) {
    console.log(error)
      toast.error(error?.data?.message || error.error);
  }
  };

  return (
    <div className="w-96 m-auto mt-5 mb-5">
      <label htmlFor="formFile" className="m-4 inline-block text-black text-xl font-bold">Upload CSV File</label>
      <input
        className="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-black focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary m-4"
        type="file"
        id="formFile"
        accept=".csv"
        onChange={handleFileChange}
      />
      {loadingUpload && <Loader />}
      <button onClick={handleUpload} className=" m-4 px-4 py-1 rounded bg-black hover:dark:bg-neutral-700 text-white">Upload</button>
    </div>
  );
};

export default Upload;
