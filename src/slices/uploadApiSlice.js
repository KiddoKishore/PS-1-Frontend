import { Upload_Url, data_Url } from "../constants";
import { apiSlice } from "./apiSlice";

export const uploadApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        uploadFile: builder.mutation({
            query: (file) => ({
                url: `${Upload_Url}`,
                method: "POST", // Specify the method as 'POST'
                body: file,
            })
        }),
        request: builder.mutation({
            query: (data) => ({
                url: `${data_Url}`,
                method: "POST",
                body: data,
            })
        })
    })
})

export const { useUploadFileMutation, useRequestMutation } = uploadApiSlice;
