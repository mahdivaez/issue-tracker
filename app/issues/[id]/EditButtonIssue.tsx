import { Pencil2Icon } from '@radix-ui/react-icons';
import { Button, Link } from '@radix-ui/themes';
import React from 'react';

const EditButtonIssue = ({ issueId }: { issueId: number }) => {
  return (
    <Link href={`/issues/${issueId}/edit`}>
      <Button
        className="flex h-12 w-40 items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
      >
        <Pencil2Icon className="w-5 h-5" />
        <span>Edit Issue</span>
      </Button>
    </Link>
  );
};

export default EditButtonIssue;
