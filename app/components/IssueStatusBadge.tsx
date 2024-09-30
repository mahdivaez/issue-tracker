import { Status } from '@prisma/client'
import { Badge } from '@radix-ui/themes'
import React from 'react'

const statusMap: Record<
  Status, 
  { label: string, className: string }
> = {
  OPEN: { label: 'Open', className: 'bg-red-500 text-white' },
  IN_PROGRESS: { label: 'In Progress', className: 'bg-violet-500 text-white' },
  CLOSED: { label: 'Closed', className: 'bg-green-500 text-white' }
};

const IssueStatusBadge = ({ status }: { status: Status }) => {
  return (
    <Badge className={`px-2 py-1 rounded ${statusMap[status].className}`}>
      {statusMap[status].label}
    </Badge>
  )
}

export default IssueStatusBadge
