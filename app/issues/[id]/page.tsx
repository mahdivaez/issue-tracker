import prisma from '@/prisma/client';
import { Box, Grid } from '@radix-ui/themes';
import { notFound } from 'next/navigation';
import EditButtonIssue from './EditButtonIssue';
import IssueDetails from './IssueDetails';

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
            <IssueDetails issue={issue}/>
      </Box>

      <Box className="mt-5">
        <EditButtonIssue issueId={issue.id} />
      </Box>
    </Grid>
  );
};

export default IssueDetailsPage;
