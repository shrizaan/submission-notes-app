'use client';

import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Heading,
  Text,
} from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const DetailNotePage = ({ params }) => {
  const [note, setNote] = useState({});
  const [confirmDelete, setConfirmDelete] = useState(false);

  const router = useRouter();
  const { noteId } = params;

  const handleConfirmDeleteClick = () => {
    if (confirmDelete) {
      setConfirmDelete(false);
    } else {
      setConfirmDelete(true);
    }
  };

  const handleDeleteClick = () => {
    fetch(`/api/notes/${noteId}`, {
      method: 'DELETE',
    }).then(() => {
      router.push('/');
    });
  };

  useEffect(() => {
    const getNoteDetails = async () => {
      const response = await fetch(`/api/notes/${noteId}`);
      const data = await response.json();

      setNote({
        title: data.title,
        body: data.body,
        updatedAt: data.created_at || data.updated_at,
      });
    };

    if (noteId) getNoteDetails();
  }, [noteId]);

  const formattedDate = new Date(note.updatedAt).toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <Box id="notes-id-page">
      <Flex
        direction="column"
        mx={{
          base: '4',
          md: '40',
        }}
        mt="32"
      >
        <Heading
          as="h1"
          size={{
            base: 'xl',
            md: '2xl',
          }}
          mb="6"
        >
          {note.title}
        </Heading>
        <Text fontSize="sm" mb="6">
          Diubah pada tanggal: {formattedDate}
        </Text>
        <Text
          as="pre"
          fontSize="lg"
          whiteSpace="pre-wrap"
          wordBreak="break-word"
          fontFamily="inter"
          mb="8"
        >
          {note.body}
        </Text>
        {confirmDelete ? (
          <ButtonGroup gap="2" mt="auto">
            <Link href={`/notes/${noteId}/edit`}>
              <Button colorScheme="blue" onClick={handleDeleteClick}>
                Confirm Delete
              </Button>
            </Link>
            <Button colorScheme="blue" onClick={handleConfirmDeleteClick}>
              Cancel
            </Button>
          </ButtonGroup>
        ) : (
          <ButtonGroup gap="2" mt="auto">
            <Link href={`/notes/${noteId}/edit`}>
              <Button colorScheme="blue">Edit Note</Button>
            </Link>
            <Button colorScheme="blue" onClick={handleConfirmDeleteClick}>
              Delete Note
            </Button>
          </ButtonGroup>
        )}
      </Flex>
    </Box>
  );
};

export default DetailNotePage;
