import prisma from '@/prisma/client';
import { Box, Flex, Grid } from '@radix-ui/themes';
import { notFound } from 'next/navigation';
import EditButtonIssue from './EditButtonIssue';
import IssueDetails from './IssueDetails';
import DeleteIssueButton from './DeleteIssueButton';

interface Props {
  params: { id: string };
}

const IssueDetailsPage = async ({ params }: Props) => {
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) }, // Assuming id is a number
  });

  if (!issue) notFound();

  return (
    <Grid
      gap="5"
      columns={{ initial: '1', sm: '1', md: '5' }} // Responsive column layout
      className="bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 p-8 min-h-screen" // Light gradient background
    >
      <Box className="md:col-span-4">
        <IssueDetails issue={issue} />
      </Box>

      <Box className="md:col-span-1 mt-2 mb-5 mr-20 flex justify-end"> {/* Adjusted margins */}
        <Flex direction="column" gap="8" align="end"> {/* Sets gap between the buttons */}
         <div className="">
         <EditButtonIssue issueId={issue.id} />
          </div>
        <div className="mt-5">  <DeleteIssueButton issueId={issue.id} /></div>
        </Flex>
      </Box>
    </Grid>
  );
};

export default IssueDetailsPage;
