import React from 'react';
import { Button, Table } from "@radix-ui/themes";
import Link from 'next/link';
import prisma from '@/prisma/client';
import IssueStatusBadge from '../components/IssueStatusBadge';
import delay from 'delay'
import IssueActions from './IssueActions';
const IssuePage = async () => {
    const issues = await prisma.issue.findMany();
    await delay(2000)

    console.log(issues); // Check what issues are fetched

    return (
        <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
            {/* Button Section */}
        
            <IssueActions/>
            {/* Table Section */}
            <div className="shadow rounded-lg">
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
                                <Table.Row key={issue.id} className="hover:bg-gray-50 transition ease-in-out duration-150">
                                    <Table.Cell className="px-6 py-4 text-sm font-medium text-gray-900 w-1/3">
                                        <Link href={`/issues/${issue.id}`}>
                                        {issue.title}
                                        </Link>
                                        <div className='block md:hidden'>
                                            <IssueStatusBadge status={issue.status}/>
                                        </div>
                                    </Table.Cell>
                                    <Table.Cell className="px-6 py-4 text-sm  text-gray-600 w-1/3">
                                        <IssueStatusBadge status={issue.status}/>
                                    </Table.Cell>
                                    <Table.Cell className="px-6 py-4 text-sm text-gray-600 w-1/3">
                                        {new Date(issue.createdAt).toLocaleDateString()}
                                    </Table.Cell>
                                </Table.Row>
                            ))
                        )}
                    </Table.Body>
                </Table.Root>
            </div>
        </div>
    );
}

export default IssuePage;
