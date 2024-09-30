import { Button } from '@radix-ui/themes'
import Link from 'next/link'
import React from 'react'

const IssueActions = () => {
  return (
    <div className="flex justify-center mb-8">
    <Link href="/issues/new">
        <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full py-3 px-8 shadow-lg transform transition-all duration-200 hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-indigo-400">
            + Create New Issue
        </Button>
    </Link>
</div>
  )
}

export default IssueActions