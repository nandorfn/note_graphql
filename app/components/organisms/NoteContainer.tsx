"use client";

import { useQuery } from "@apollo/client";
import { Card, CardBody, CardHeader, Center, Grid, Text } from "@chakra-ui/react";
import { NOTE_QUERY } from "@services/query";
import ErrorHandler from "./ErrorHandler";
import { useRouter } from "next/navigation";
import { TNote } from "@utils/types";

const NoteContainer: React.FC = () => {
  const router = useRouter();
  const { data, loading, error } = useQuery(NOTE_QUERY);
  const notes = data?.notes?.data?.notes;

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
        {notes?.length > 0 && notes?.map((note: TNote) => (
          <Card className="card-border" cursor={"pointer"} onClick={() => router.push(note?.id)} key={note.id}>
            <CardHeader>
              <Text noOfLines={2} fontSize="lg" fontWeight="bold">{note.title}</Text>
              <Text fontSize="xs" color="gray.500">
                {note.createdAt}
              </Text>
            </CardHeader>
            <CardBody>
              <Text noOfLines={3}>{note.body}</Text>
            </CardBody>
          </Card>
        ))
        }
      </Grid>
    </>
  );
};

export default NoteContainer;
