import prisma from '@/prisma/client'
import { notFound } from 'next/navigation'
import React from 'react'



interface Props {
    params : {id : string}
}
const IssueDetailsPage = async({params} : Props) => {
    if (typeof params.id !== 'number') notFound( )
    const issue =await prisma.issue.findUnique({
        where : {id : parseInt(params.id)}
    })
    if(!issue) notFound();
  return (
    <div><p>
            {issue.title}
            {issue.description}
            {issue.status}
            {issue.createdAt.toDateString()}

        </p></div>
  )
}

export default IssueDetailsPage