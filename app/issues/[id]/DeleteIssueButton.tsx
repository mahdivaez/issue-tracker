"use client"
import React, { useState } from 'react';
import * as AlertDialog from '@radix-ui/react-alert-dialog';
import { TrashIcon } from '@radix-ui/react-icons';
import axios from 'axios';
import { Button } from '@radix-ui/themes';

interface Props {
    issueId: number;
}
const AlertDialogDemo = ({ issueId }: Props) => {

    const [error , setError] = useState(false)
    const onDelete = async () => {
        try {
            await axios.delete(`/api/issues/${issueId}`);
            window.location.href = '/issues';
        } catch (error) {
            setError(true)
            console.log(error, "error");
        }
    }

    return (

        <>
        <AlertDialog.Root>
            <AlertDialog.Trigger asChild>
                <button
                    className="flex h-12 w-40 items-center justify-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-md font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                >
                    <TrashIcon className="w-5 h-5" />
                    <span>Delete</span>
                </button>
            </AlertDialog.Trigger>
            <AlertDialog.Portal>
                <AlertDialog.Overlay className="bg-black bg-opacity-50 fixed inset-0" />
                <AlertDialog.Content className="fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[400px] translate-x-[-50%] translate-y-[-50%] rounded-md bg-white p-6 shadow-lg focus:outline-none transition-all">
                    <AlertDialog.Title className="text-gray-900 m-0 text-lg font-medium">
                        Are you sure?
                    </AlertDialog.Title>
                    <AlertDialog.Description className="text-gray-700 mt-4 mb-6 text-sm">
                        This action is permanent and cannot be undone. It will delete your account and all associated data.
                    </AlertDialog.Description>
                    <div className="flex justify-end gap-3">
                        <AlertDialog.Cancel asChild>
                            <button className="text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none inline-flex h-10 items-center justify-center rounded-md px-4 py-2 font-semibold transition-all duration-300">
                                Cancel
                            </button>
                        </AlertDialog.Cancel>
                        <AlertDialog.Action asChild>
                            <button onClick={onDelete} className="text-white bg-red-600 hover:bg-red-700 focus:outline-none inline-flex h-10 items-center justify-center rounded-md px-4 py-2 font-semibold transition-all duration-300">
                                Confirm
                            </button>
                        </AlertDialog.Action>
                    </div>
                </AlertDialog.Content>
            </AlertDialog.Portal>
        </AlertDialog.Root>
        <AlertDialog.Root open={error}>
            <AlertDialog.Content>
                <AlertDialog.Title>Error</AlertDialog.Title>
                <AlertDialog.Description>
                            This Issue can not be deleted !!!!
                </AlertDialog.Description>
                <Button onClick={ () => setError(false)} color="red" variant='soft'>OK</Button>
            </AlertDialog.Content>

        </AlertDialog.Root>
        </>
    )

};


export default AlertDialogDemo;
