"use client"
import { Button } from '@radix-ui/themes';
import React from 'react';

interface Props {
  issueId: number; // Use 'number' here instead of 'String'
}

const DeleteIssueButton = ({ issueId }: Props) => {
  const handleDelete = async () => {
    try {
      await fetch(`/api/issues/${issueId}`, {
        method: 'DELETE',
      });
      // Handle success (e.g., redirect, reload issues, etc.)
    } catch (error) {
      console.error("Error deleting issue:", error);
      // Handle error
    }
  };

  return (
    <Button className="px-6 py-2 mt-5 h-15 w-100 text-white font-semibold rounded-lg bg-red-600 hover:bg-red-700 transition-colors duration-300 ease-in-out"
    color="red" onClick={handleDelete}>
      Delete Issue
    </Button>
  );
};

export default DeleteIssueButton;
