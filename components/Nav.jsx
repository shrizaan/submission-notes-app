'use client';

import {
  Box,
  Button,
  ButtonGroup,
  Divider,
  Flex,
  Heading,
  Spacer,
} from '@chakra-ui/react';
import Link from 'next/link';

const Nav = () => {
  return (
    <>
      <Box p="4">
        <nav>
          <Flex minWidth="max-content" alignItems="center" gap="2">
            <Box p="2">
              <Link href="/">
                <Heading size="md">Notes App</Heading>
              </Link>
            </Box>
            <Spacer />
            <ButtonGroup gap="2">
              <Link href="/notes/new">
                <Button colorScheme="blue">Add Note</Button>
              </Link>
            </ButtonGroup>
          </Flex>
        </nav>
      </Box>
      <Divider />
    </>
  );
};

export default Nav;
