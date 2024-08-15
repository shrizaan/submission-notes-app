'use client';

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import {
  Box,
  FormControl,
  FormLabel,
  Button,
  Input,
  Textarea,
  Stack,
} from '@chakra-ui/react';

const AddNotePage = () => {
  const router = useRouter();
  const [title, setTitle] = useState('');

  const handleTitleChange = (e) => setTitle(e.target.value);

  let [content, setContent] = useState('');

  let handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTitle('');
    setContent('');
    try {
      const response = await fetch('/api/notes', {
        method: 'POST',
        body: JSON.stringify({
          title: title,
          body: content,
        }),
      });

      if (response.ok) {
        router.push('/');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = () => {
    router.push('/');
  };

  return (
    <Box
      p={4}
      w={{
        base: '100%',
        md: '50%', 
      }}
      mt="40"
      mx="auto"
    >
      <form onSubmit={handleSubmit}>
        <FormControl isRequired mb={4}>
          <FormLabel>Title</FormLabel>
          <Input
            type="text"
            value={title}
            onChange={handleTitleChange}
            placeholder="Tulis judul catatan..."
          />
        </FormControl>
        <FormControl isRequired mb={8}>
          <FormLabel>Content</FormLabel>
          <Textarea
            value={content}
            onChange={handleContentChange}
            placeholder="Tulis sesuatu..."
            size="sm"
          />
        </FormControl>
        <Stack spacing="8" justify="center" direction="row">
          <Button type="submit" colorScheme="blue">
            Save Changes
          </Button>
          <Button colorScheme="blue" variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default AddNotePage;
