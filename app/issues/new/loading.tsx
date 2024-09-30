import { Box } from '@radix-ui/themes';
import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'; 

const LoadingIssueNewPage = () => {
  return (
    <Box className='max-w-xl p-4'>
      {/* Skeleton for title or header */}
      <Skeleton height={30} width="60%" />

      {/* Skeleton for a paragraph or content */}
      <Skeleton count={3} height={20} style={{ margin: '10px 0' }} />

      {/* Skeleton for a large content area */}
      <Skeleton height="20rem" />
      
      {/* Skeleton for additional elements, like buttons or tags */}
      <Skeleton height={40} width="30%" style={{ margin: '10px 0' }} />
    </Box>
  );
};

export default LoadingIssueNewPage;
 