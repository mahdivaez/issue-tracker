import React from 'react';
import { Button, Table } from "@radix-ui/themes";
import Link from 'next/link';
import prisma from '@/prisma/client';

const IssuePage = async () => {
    const issues = await prisma.issue.findMany();

    return (
        <div className="max-w-7xl mx-auto p-5">
            {/* Button Section */}
            <div className='mb-6'>
                <Link href={"/issues/new"}>
                    <Button 
                        variant="surface"
                        className="bg-red-500 text-white rounded-lg py-2 px-4 transition duration-300 ease-in-out hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300"
                    >
                        New Issue
                    </Button>
                </Link>
            </div>

            {/* Table Section */}
            <div className="overflow-x-auto">
                <Table.Root className="min-w-full bg-surface shadow-md rounded-lg overflow-hidden">
                    <Table.Header>
                        <Table.Row className="bg-gray-200 text-gray-800"> {/* Adjusted for better contrast */}
                            <Table.ColumnHeaderCell className="py-3 px-4 text-left w-1/2">
                                Issue
                            </Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell className="hidden md:table-cell py-3 px-4 text-left w-1/4">
                                Status
                            </Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell className="hidden md:table-cell py-3 px-4 text-left w-1/4">
                                Created
                            </Table.ColumnHeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {issues.length === 0 ? (
                            <Table.Row>
                                <Table.Cell colSpan={3} className="text-center py-4 text-gray-600">
                                    No issues found.
                                </Table.Cell>
                            </Table.Row>
                        ) : (
                            issues.map(issue => (
                                <Table.Row key={issue.id} className="hover:bg-gray-100 transition duration-200">
                                    <Table.Cell className="py-3 px-4 border-b text-gray-800">
                                        {issue.title}
                                        <div className="block  md:hidden ">{issue.status}</div>
                                    </Table.Cell>
                                    <Table.Cell  className="hidden md:table-cell py-3 px-4 border-b text-gray-800">
                                        {issue.status || "Pending"} {/* Default value for status */}
                                    </Table.Cell>
                                    <Table.Cell className="hidden md:table-cell py-3 px-4 border-b text-gray-800">
                                        {issue.createdAt.toDateString()}
                                    </Table.Cell>
                                </Table.Row>
                            ))
                        )}
                    </Table.Body>
                </Table.Root>
            </div>
        </div>
    )
}

export default IssuePage;
