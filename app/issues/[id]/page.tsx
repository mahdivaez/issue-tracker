import IssueStatusBadge from '@/app/components/IssueStatusBadge';
import prisma from '@/prisma/client';
import { Box, Button, Card, Flex, Grid, Heading, Text } from '@radix-ui/themes';
import { notFound } from 'next/navigation';
import ReactMarkdown from "react-markdown";
import { Pencil2Icon } from '@radix-ui/react-icons';
import Link from 'next/link';

interface Props {
  params: { id: string };
}

const IssueDetailsPage = async ({ params }: Props) => {
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) }, // Assuming id is a string (UUID)
  });

  if (!issue) notFound();

  return (
    <Grid
      gap="5"
      columns={{ initial: "1", md: "2" }}
      className="bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 p-8 min-h-screen" // Light gradient background
    >
      <Box>
        <Heading className="text-4xl bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-400 font-bold"> 
          {/* Gradient text for heading */}
          {issue.title}
        </Heading>

        <Flex className="mt-4 space-x-4 items-center">
          <IssueStatusBadge status={issue.status} />
          <Text className="text-gray-500 dark:text-gray-600">
            {new Date(issue.createdAt).toLocaleDateString()}
          </Text>
        </Flex>

        <Card className="mt-6 p-6 bg-white/80 dark:bg-gray-50/90 rounded-lg shadow-lg prose"> 
          {/* Slight transparency in card background */}
          <ReactMarkdown>{issue.description}</ReactMarkdown>
        </Card>
      </Box>

      <Box className="mt-5">
        <Link href={`/issues/${issue.id}/edit`}>
          <Button
            className="flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-500 via-teal-400 to-purple-400 
              hover:from-blue-600 hover:via-teal-500 hover:to-purple-500 text-white px-6 py-3 rounded-lg text-lg font-semibold shadow-md 
              hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1"
          >
            <Pencil2Icon className="w-5 h-5" />
            <span>Edit Issue</span>
          </Button>
        </Link>
      </Box>
    </Grid>
  );
};

export default IssueDetailsPage;
