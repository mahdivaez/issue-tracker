"use client";
import { Button, Callout, TextField } from '@radix-ui/themes';
import React, { useState } from 'react';
import "easymde/dist/easymde.min.css";
import dynamic from 'next/dynamic';
import { useForm, Controller } from "react-hook-form";
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { createIssueSchema } from '@/app/validationSchema';
import {TypeOf, z} from "zod"
const SimpleMDE = dynamic(() => import("react-simplemde-editor"), { ssr: false });


type IssueForm = z.infer<typeof createIssueSchema> 
// interface IssueForm {
//     title: string;
//     description: string;
// }

const NewIssuePage = () => {
    const router = useRouter();
    const { register, control, handleSubmit ,formState :{errors} } = useForm<IssueForm>({
        resolver : zodResolver(createIssueSchema)
    });
    const [error, setError] = useState("");

    return (
        <div>
            {error && (
    <Callout.Root color='red' className='mb-4 p-5 bg-red-50 rounded-xl max-w-xl'>
        <Callout.Icon>
            {/* You can place an icon here, for example, an error icon */}
        </Callout.Icon>
        <Callout.Text className="text-red-500"> {/* Apply the color class here */}
            {error}
        </Callout.Text>
    </Callout.Root>
)}
        
            <form
                className='max-w-xl space-y-10'
                onSubmit={handleSubmit(async (data) => {
                    try {
                        const response = await axios.post("/api/issues", data);

                        if (response.status === 400) {
                            // If there's a validation error, set the error message
                            const errors = response.data.errors.map((err: any) => err.message).join(", ");
                            setError(errors);
                        } else {
                            router.push("/issues");
                        }
                    } catch (error) {
                        setError("Something went wrong");
                    }
                })}
            >
                <TextField.Root className='border p-2 rounded-xl text-black' placeholder="Title" {...register("title")}>
                </TextField.Root>
                {errors.title && <span className="text-red-600">{errors.title.message}</span>}

                <Controller
                    name="description"
                    control={control}
                    render={({ field }) => (
                        <SimpleMDE
                            {...field}
                            className='border rounded-xl p-3 w-full text-gray-700 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:shadow-sm'
                            placeholder='Enter Description'
                        />
                        
                    )}
                />
                {errors.title && <span className="text-red-600">{errors.title.message}</span>}


                <Button className='w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 transition'>
                    Submit New Issue
                </Button>
            </form>
        </div>
    );
};

export default NewIssuePage;
