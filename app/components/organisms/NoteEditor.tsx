"use client"
import { Card, CardBody, Center, FormControl, FormErrorMessage, Textarea, Flex, IconButton, Button } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useMutation } from "@apollo/client";
import { ArrowBackIcon } from '@chakra-ui/icons';
import { noteSchema, TNote } from "@utils/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { NOTE_CREATE_MUTATION, NOTE_DELETE_MUTATION, NOTE_UPDATE_MUTATION } from "@services/mutations";
import { NOTE_QUERY } from "@services/query";
import DeleteModal from "@components/molecules/DeleteModal";

interface NoteEditor {
  isCreate: boolean,
  defaultValue: any,
  noteId?: string,
}

const NoteEditor = ({ isCreate, defaultValue, noteId }: NoteEditor) => {
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting, isDirty }
  } = useForm<TNote>({
    resolver: zodResolver(noteSchema),
    defaultValues: defaultValue
  });

  const [createNote, { loading: createLoading }] = useMutation(NOTE_CREATE_MUTATION, {
    refetchQueries: [{ query: NOTE_QUERY }],
    awaitRefetchQueries: true,
  });
  const [deleteNote, { loading: deleteLoading }] = useMutation(NOTE_DELETE_MUTATION, {
    refetchQueries: [{ query: NOTE_QUERY }],
    awaitRefetchQueries: true,
  });
  const [updateNote, { loading: updateLoading }] = useMutation(NOTE_UPDATE_MUTATION, {
    refetchQueries: [{ query: NOTE_QUERY }],
    awaitRefetchQueries: true,
  })

  const onDelete = async () => {
    await deleteNote({
      variables: {
        id: noteId
      }
    })
      .then((res) => {
        if (res?.data?.delete?.success) {
          return router.push("/")
        }
      })
  }

  const onSubmit = async (formData: TNote) => {
    if (isCreate) {
      await createNote({
        variables: {
          title: formData.title,
          body: formData.body
        }
      })
        .then((res) => {
          if (res?.data?.create?.success) {
            return router.push("/")
          }
        })
    } else {
      await updateNote({
        variables: {
          id: noteId,
          title: formData.title,
          body: formData.body
        }
      })
      .then((res) => {
        if (res?.data?.update?.success) {
          return router.push("/")
        }
      })
    }
  };

  return (
    <Center mt={4}>
      <Card variant={"ghost"} w={'2xl'}>
        <CardBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Flex direction={"row"} gap={4}>
              <IconButton
                size={"sm"}
                w={"4rem"}
                aria-label="back"
                onClick={() => router.back()}
                icon={<ArrowBackIcon />}
              />
              <Flex w={"100%"} direction="column" gap={4}>
                <FormControl isInvalid={Boolean(errors.title)}>
                  <Textarea
                    variant={"filled"}
                    id="title"
                    fontSize={"2xl"}
                    fontWeight={500}
                    placeholder="Title..."
                    {...register('title')}
                  />
                  <FormErrorMessage>
                    {errors.title && errors.title.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={Boolean(errors.body)}>
                  <Textarea
                    variant={"filled"}
                    id="body"
                    minH={"85vh"}
                    placeholder="Type note here..."
                    {...register('body')}
                  />
                  <FormErrorMessage>
                    {errors.body && errors.body.message}
                  </FormErrorMessage>
                </FormControl>

              </Flex>
              <Flex direction={"column"} gap={4}>
                {isCreate ? (
                  <Button
                    colorScheme="teal"
                    isLoading={isSubmitting || createLoading}
                    isDisabled={createLoading}
                    type="submit"
                    size={"sm"}
                  >
                    Save
                  </Button>
                ) : (
                  <>
                    <Button
                      colorScheme="yellow"
                      isLoading={updateLoading}
                      isDisabled={ !isDirty || deleteLoading}
                      type="submit"
                      size={"sm"}
                    >
                      Update
                    </Button>
                    <DeleteModal isLoading={deleteLoading} isDisabled={updateLoading || deleteLoading} deleteFn={() => onDelete()}/>
                  </>
                )}
              </Flex>
            </Flex>
          </form>
        </CardBody>
      </Card>
    </Center>
  );
};

export default NoteEditor;
