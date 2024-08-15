'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import {
  Box,
  FormControl,
  FormLabel,
  Button,
  Input,
  Textarea,
  Stack,
} from '@chakra-ui/react';

const EditNotePage = ({ params }) => {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { noteId } = params;

  const handleTitleChange = (e) => setTitle(e.target.value);

  let handleContentChange = (e) => {
    let inputValue = e.target.value;
    setContent(inputValue);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch(`/api/notes/${noteId}`, {
        method: 'PUT',
        body: JSON.stringify({
          title: title,
          body: content,
        }),
      }).then(() => {
        router.push(`/notes/${noteId}`);
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const getNoteDetails = async () => {
      const response = await fetch(`/api/notes/${noteId}`);
      const data = await response.json();

      setTitle(data.title);
      setContent(data.body);
    };

    if (noteId) getNoteDetails();
  }, [noteId]);

  const handleCancel = () => {
    router.push(`/notes/${noteId}`);
  };

  return (
    <Box p={4} w="50%" mt="40" mx="auto">
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

export default EditNotePage;
