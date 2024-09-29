import React from 'react';
import { Button, Table } from "@radix-ui/themes";
import Link from 'next/link';
import prisma from '@/prisma/client';

const IssuePage = async () => {
    const issues = await prisma.issue.findMany();

    return (
        <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
            {/* Button Section */}
            <div className="flex justify-center mb-8">
                <Link href="/issues/new">
                    <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full py-3 px-8 shadow-lg transform transition-all duration-200 hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-indigo-400">
                        + Create New Issue
                    </Button>

                </Link>
            </div>

            {/* Table Section */}
            <div className="bg-white shadow overflow-hidden rounded-lg">
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

                    <Table.Body className="bg-white divide-y divide-gray-200">
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
                                        {issue.title}
                                    </Table.Cell>
                                    <Table.Cell className="px-6 py-4 text-sm text-gray-600 w-1/3">
                                        {issue.status || "Pending"}
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
