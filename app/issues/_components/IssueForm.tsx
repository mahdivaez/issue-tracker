"use client";
import { Button, Callout, TextField } from '@radix-ui/themes';
import React, { useState } from 'react';
import "easymde/dist/easymde.min.css";
import dynamic from 'next/dynamic';
import { useForm, Controller } from "react-hook-form";
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { issueSchema } from '@/app/validationSchema';
import { z } from "zod";
import ErrorMessage from '@/app/components/ErrorMessage';
import Spinner from '@/app/components/Spinner';
import { Issue } from '@prisma/client';

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), { ssr: false });
type IssueFormData = z.infer<typeof issueSchema>

interface Props {
    issue?: Issue;
}

const IssueForm = ({ issue }: Props) => {
    const router = useRouter();
    const { register, control, handleSubmit, formState: { errors } } = useForm<IssueFormData>({
        resolver: zodResolver(issueSchema),
    });
    const [error, setError] = useState("");
    const [isSubmitting, setSubmitting] = useState(false);

    const onSubmit = handleSubmit(async (data) => {
        try {
            setSubmitting(true);
            let response;
            if (issue) {
                response = await axios.patch(`/api/issues/${issue.id}`, data);
            } else {
                response = await axios.post("/api/issues", data);
            }

            if (response.status === 400) {
                const errors = response.data.errors.map((err: any) => err.message).join(", ");
                setError(errors);
            } else {
                router.push("/issues");
                router.refresh();
            }
        } catch (error) {
            setSubmitting(false);
            setError("Something went wrong");
        }
    });

    return (
        <div>
            {error && (
                <Callout.Root color='red' className='mb-4 p-5 bg-red-50 rounded-xl max-w-xl'>
                    <Callout.Icon />
                    <Callout.Text className="text-red-500">
                        {error}
                    </Callout.Text>
                </Callout.Root>
            )}

            <form className='max-w-xl space-y-10' onSubmit={onSubmit}>
                <TextField.Root 
                    defaultValue={issue?.title} 
                    className='border p-2 rounded-xl text-black' 
                    placeholder="Title" 
                    {...register("title")} 
                />
                {<ErrorMessage>{errors.title?.message}</ErrorMessage>}

                <Controller
                    defaultValue={issue?.description || ""}
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
                {<ErrorMessage>{errors.description?.message}</ErrorMessage>}

                <Button 
                    disabled={isSubmitting} 
                    className='w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 transition'>
                    {issue ? "Update Issue" : "Submit New Issue"} 
                    {isSubmitting && <Spinner />}
                </Button>
            </form>
        </div>
    );
};

export default IssueForm;
