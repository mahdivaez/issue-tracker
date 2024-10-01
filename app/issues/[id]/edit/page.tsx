import React from 'react';
import prisma from '@/prisma/client';
import { notFound } from 'next/navigation';
import dynamic from 'next/dynamic';
import IssueFormSkeleton from '../../_components/IssueFormSkeleton';

// Dynamically import the IssueForm with a loading skeleton
const IssueForm = dynamic(() => import('../../_components/IssueForm'), {
    ssr: false,
    loading: () => <IssueFormSkeleton />, // Show skeleton while loading
});

interface Props {
    params: { id: string }
}

const EditIssuePage = async ({ params }: Props) => {
    const issue = await prisma.issue.findUnique({
        where: { id: parseInt(params.id) }
    });

    if (!issue) return notFound(); // Handle case when issue is not found

    return (
        <div>
            {/* Render the IssueForm with the fetched issue */}
            <IssueForm issue={issue} />
        </div>
    );
}

export default EditIssuePage;
