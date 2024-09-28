import { Button, TextArea, TextField } from '@radix-ui/themes';
import React from 'react';

const NewIssuePage = () => {
  return (
    <div className='max-w-xl space-y-10'>
<TextField.Root className='border p-2 rounded-xl'  placeholder="Title">

</TextField.Root>
<TextArea
        className='border rounded-xl p-3 w-full h-60 text-gray-700 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:shadow-sm'
        placeholder='Enter Description'
      />
     <Button className='w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 transition'>
        Submit New Issue
      </Button>
    </div>
  );
};

export default NewIssuePage;
