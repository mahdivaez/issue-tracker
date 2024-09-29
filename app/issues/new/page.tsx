"use client"
import { Button, TextArea, TextField } from '@radix-ui/themes';
import React from 'react';
import "easymde/dist/easymde.min.css";
import dynamic from 'next/dynamic';
import { useState } from 'react';
import { useForm, Controller } from "react-hook-form"
import axios from 'axios';
import { useRouter } from 'next/navigation';
const SimpleMDE = dynamic(() => import("react-simplemde-editor"), { ssr: false });


interface IssueForm {
    title: string;
    description: string;
}

const NewIssuePage = () => {
    const router = useRouter()
    const [value, setValue] = useState("");
    const { register, control , handleSubmit } = useForm<IssueForm>()


    return (
        <form className='max-w-xl space-y-10' onSubmit={handleSubmit(async(data)=>{
            await axios.post("/api/issues", data)
            router.push("/issues")
        })}>
            <TextField.Root className='border p-2 rounded-xl text-black' placeholder="Title" {...register("title")}>

            </TextField.Root>
            <Controller
                name="description"
                control={control}
                render={({ field }) =>
                    <SimpleMDE
                        {...field}
                        className='border rounded-xl p-3 w-full  text-gray-700 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:shadow-sm'
                        placeholder='Enter Description'
                    />}
            />
            <Button className='w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 transition'>
                Submit New Issue
            </Button>
        </form>
    );
};

export default NewIssuePage;
