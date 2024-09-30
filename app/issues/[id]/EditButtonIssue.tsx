import { Pencil2Icon } from '@radix-ui/react-icons'
import { Button, Link } from '@radix-ui/themes'
import React from 'react'

const EditButtonIssue = ({issueId} : {issueId :Number}) => {
  return (
    <Link href={`/issues/${issueId}/edit`}>
   <Button
    className="flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-500 via-teal-400 to-purple-400 
      hover:from-blue-600 hover:via-teal-500 hover:to-purple-500 text-white px-6 py-3 rounded-lg text-lg font-semibold shadow-md 
      hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1"
  >
    <Pencil2Icon className="w-5 h-5" />
    <span>Edit Issue</span>
  </Button>
  )
    </Link>
  )
}

export default EditButtonIssue