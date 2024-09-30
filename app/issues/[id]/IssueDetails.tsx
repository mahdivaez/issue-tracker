import { IssueStatusBadge } from '@/app/components'
import { Issue } from '@prisma/client'
import { Card, Flex, Heading, Text } from '@radix-ui/themes'
import ReactMarkdown from 'react-markdown'

const IssueDetails = ({issue} : {issue : Issue}) => {
  return (
    <div>
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
    </div>
  )
}

export default IssueDetails