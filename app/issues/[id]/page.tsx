import IssueStatusBadge from '@/app/components/IssueStatusBadge';
import prisma from '@/prisma/client';
import { Card, Flex, Heading, Text } from '@radix-ui/themes';
import { notFound } from 'next/navigation';
import ReactMarkDown from "react-markdown";
interface Props {
  params: { id: string };
}

const IssueDetailsPage = async ({ params }: Props) => {
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!issue) notFound();

  return (
    <div className="bg-gray-50 dark:bg-gray-900 p-8 min-h-screen">
      {/* Heading with Tailwind color */}
      <Heading className="text-4xl text-red-400 font-bold">
        {issue.title}
      </Heading>

      <Flex className="mt-4 space-x-4 items-center">
        {/* Badge and date information */}
        <IssueStatusBadge status={issue.status} />
        <Text className="text-gray-600 dark:text-gray-400">
          {new Date(issue.createdAt).toLocaleDateString()}
        </Text>
      </Flex>

      <Card className="mt-6 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg prose">
        <Text className="text-gray-700 dark:text-gray-300">
          <ReactMarkDown>

          {issue.description}
          </ReactMarkDown>

        </Text>
      </Card>
    </div>
  );
};

export default IssueDetailsPage;
