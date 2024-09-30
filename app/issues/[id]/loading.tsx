import { Skeleton } from "@/app/components"
import { Box, Card, Flex, Heading } from '@radix-ui/themes'
const LoadingIssueDetailsPage = () => {
  return (
    <Box className='max-w-xl'>
        <Heading className="text-4xl text-red-400 font-bold">
            <Skeleton/>
      </Heading>

      <Flex className="mt-4 space-x-4 items-center">
        {/* Badge and date information */}
        <Skeleton width='5rem'/>
        <Skeleton width="8rem"/>

      </Flex>

      <Card className="mt-6 p-6 bg-white bg-gray-300 rounded-lg shadow-lg prose">
     <Skeleton count={3  }/> 
      </Card>
    </Box>
  )
}

export default LoadingIssueDetailsPage