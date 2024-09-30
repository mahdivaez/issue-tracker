import { Skeleton } from "@/app/components"
import { Table } from '@radix-ui/themes'

import IssueActions from './IssueActions'
const LoadingIssuePage  = () => {
    const issues  =  [1,2,3,4,5]
  return (
    <div>
<IssueActions/> 
    <Table.Root className="min-w-full table-auto">
    <Table.Header className="bg-gray-100 ">
        <Table.Row>
            <Table.ColumnHeaderCell className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/2">
                Issue Title
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/2">
                Status
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="px-2 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/4">
                Date Created
            </Table.ColumnHeaderCell>
        </Table.Row>
    </Table.Header>

    <Table.Body className=" divide-y divide-gray-200">
        {issues.length === 0 ? (
            <Table.Row>
                <Table.Cell colSpan={3} className="text-center py-6 text-gray-600">
                    No issues found.
                </Table.Cell>
            </Table.Row>
        ) : (
            issues.map((issue) => (
                <Table.Row key={issues.length} className="hover:bg-gray-50 transition ease-in-out duration-150">
                    <Table.Cell className="px-6 py-4 text-sm font-medium text-gray-900 w-1/3">
                      <Skeleton/>
                        <div className='block md:hidden'>
                        <Skeleton/>

                        </div>
                    </Table.Cell>
                    <Table.Cell className="px-6 py-4 text-sm text-gray-600 w-1/3">
                      <Skeleton/>
                    </Table.Cell>
                    <Table.Cell className="px-6 py-4 text-sm text-gray-600 w-1/3">
                    <Skeleton/>

                    </Table.Cell>
                </Table.Row>
            ))
        )}
    </Table.Body>
</Table.Root>
</div>

  )
}

export default LoadingIssuePage
