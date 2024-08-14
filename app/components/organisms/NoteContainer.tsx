"use client";

import { useQuery } from "@apollo/client";
import { Card, CardBody, CardHeader, Center, Flex, Grid, Text } from "@chakra-ui/react";
import { NOTE_QUERY } from "@services/query";
import ErrorHandler from "./ErrorHandler";

const NoteContainer: React.FC = () => {
  const { data, loading, error } = useQuery(NOTE_QUERY);

  // Menyesuaikan akses data
  const notes = data?.notes?.data?.notes;
  console.log(notes);

  return (
    <>
      <Center>
        <ErrorHandler
          data={notes}
          loading={loading}
          error={error} />
      </Center>
      <Grid
        templateColumns="repeat(auto-fill, minmax(250px, 1fr))"
        gap={4}
        w="full"
        mx={"auto"}
        maxW={"4xl"}
        p={4}
      >
        {notes?.length > 0 && notes?.map((note: any) => (
          <Card key={note.id}>
            <CardHeader>
              <Text fontSize="lg" fontWeight="bold">{note.title}</Text>
            </CardHeader>
            <CardBody>
              <Text>{note.body}</Text>
              <Text fontSize="sm" color="gray.500">
                {`Created at: ${note.createdAt}`}
              </Text>
            </CardBody>
          </Card>
        ))
        }
      </Grid>
    </>
  );
};

export default NoteContainer;
