"use client";
import React, { useState } from "react";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { TrashIcon } from "@radix-ui/react-icons";
import axios from "axios";
import { Button, Spinner } from "@radix-ui/themes";

interface Props {
  issueId: number;
}

const AlertDialogDemo = ({ issueId }: Props) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState(false);

  const onDelete = async () => {
    try {
      setIsDeleting(true); // Start spinner
      await axios.delete(`/api/issues/${issueId}`);
      window.location.href = "/issues"; // Redirect after successful deletion
    } catch (error) {
      setIsDeleting(false); // Stop spinner in case of error
      setError(true); // Display error alert
      console.log(error, "error");
    }
  };

  return (
    <>
      <AlertDialog.Root>
        <AlertDialog.Trigger asChild>
          <button
            disabled={isDeleting} // Disable during deletion
            className={`flex h-12 w-40 items-center justify-center space-x-2 text-white px-6 py-2 rounded-md font-semibold shadow-lg hover:shadow-xl transition-all duration-300 ${
              isDeleting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-red-600 hover:bg-red-700"
            }`}
          >
            <TrashIcon className="w-5 h-5" />
            <span>Delete</span>
            {isDeleting && (
              <Spinner
                className="ml-2" // Ensure spinner spacing // Spinner color
                size="1" // Spinner size
                 // Faster spinner

              />
            )}
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
                <button
                  disabled={isDeleting} // Disable during deletion
                  className={`text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none inline-flex h-10 items-center justify-center rounded-md px-4 py-2 font-semibold transition-all duration-300 ${
                    isDeleting ? "cursor-not-allowed opacity-50" : ""
                  }`}
                >
                  Cancel
                </button>
              </AlertDialog.Cancel>
              <AlertDialog.Action asChild>
                <button
                  onClick={onDelete}
                  disabled={isDeleting} // Disable during deletion
                  className={`text-white bg-red-600 hover:bg-red-700 focus:outline-none inline-flex h-10 items-center justify-center rounded-md px-4 py-2 font-semibold transition-all duration-300 ${
                    isDeleting ? "cursor-not-allowed opacity-50" : ""
                  }`}
                >
                  {isDeleting ? (
                    <>
                      <Spinner size="1" />
                      <span className="ml-2">Deleting...</span>
                    </>
                  ) : (
                    "Confirm"
                  )}
                </button>
              </AlertDialog.Action>
            </div>
          </AlertDialog.Content>
        </AlertDialog.Portal>
      </AlertDialog.Root>

      {/* Error Handling Alert */}
      {error && (
        <AlertDialog.Root open={error}>
          <AlertDialog.Portal>
            <AlertDialog.Overlay className="bg-black bg-opacity-50 fixed inset-0" />
            <AlertDialog.Content className="fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[400px] translate-x-[-50%] translate-y-[-50%] rounded-md bg-white p-6 shadow-lg focus:outline-none transition-all">
              <AlertDialog.Title className="text-red-600 m-0 text-lg font-medium">
                Error
              </AlertDialog.Title>
              <AlertDialog.Description className="text-gray-700 mt-4 mb-6 text-sm">
                This issue cannot be deleted!
              </AlertDialog.Description>
              <Button
                onClick={() => setError(false)}
                className="bg-red-600 text-white hover:bg-red-700 focus:outline-none px-4 py-2 rounded-md"
              >
                OK
              </Button>
            </AlertDialog.Content>
          </AlertDialog.Portal>
        </AlertDialog.Root>
      )}
    </>
  );
};

export default AlertDialogDemo;
