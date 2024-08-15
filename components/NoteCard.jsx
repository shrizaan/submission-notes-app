'use client';

import {
  Button,
  Card,
  Text,
  Heading,
  CardHeader,
  CardBody,
  CardFooter,
} from '@chakra-ui/react';

import { useRouter } from 'next/navigation';

const NoteCard = ({ notes }) => {
  const router = useRouter();

  const handleDetailClick = (note) => {
    router.push(`/notes/${note.id}`);
  };

  return (
    <>
      {notes.map((note) => (
        <Card key={note.id} height="200px">
          <CardHeader>
            <Heading size="sm">{note.title}</Heading>
          </CardHeader>
          <CardBody>
            <Text>{note.body}</Text>
          </CardBody>
          <CardFooter>
            <Button onClick={() => handleDetailClick(note)}>
              Lihat Catatan
            </Button>
          </CardFooter>
        </Card>
      ))}
    </>
  );
};

export default NoteCard;
