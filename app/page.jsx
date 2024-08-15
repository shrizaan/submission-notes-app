'use client';
import { useEffect, useState } from 'react';

import { SimpleGrid } from '@chakra-ui/react';

import NoteCard from '@/components/NoteCard';

export default function Home() {
  const [notes, setNotes] = useState([]);

  const fetchPost = async () => {
    const res = await fetch(`/api/notes`);
    const data = await res.json();
    setNotes(data);
  };

  useEffect(() => {
    fetchPost();
  }, []);

  return (
    <SimpleGrid
      columns={{
        base: 1,
        md: 2,
        lg: 3,
      }}
      spacing="40px"
      mx={5}
      mt={5}
    >
      {notes.length > 0 ? <NoteCard notes={notes} /> : <p>Tidak ada catatan</p>}
    </SimpleGrid>
  );
}
