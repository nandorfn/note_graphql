"use client"
import { Card, CardBody, Center, FormControl, FormErrorMessage, Textarea, Flex, IconButton, Button } from "@chakra-ui/react";
import { ArrowBackIcon } from '@chakra-ui/icons';
import { useForm } from "react-hook-form";
import { noteSchema, TNote } from "@utils/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

const NoteEditor: React.FC = () => {
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting }
  } = useForm<TNote>({
    resolver: zodResolver(noteSchema),
  });

  const onSubmit = async (formData: TNote) => {
    console.log(formData);
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
                <Button
                  colorScheme="teal"
                  isLoading={isSubmitting}
                  type="submit"
                  size={"sm"}
                  >
                  Save
                </Button>
                <Button
                  colorScheme="yellow"
                  isLoading={isSubmitting}
                  type="button"
                  size={"sm"}
                >
                  Edit
                </Button>
                <Button
                  colorScheme="red"
                  isLoading={isSubmitting}
                  type="button"
                  size={"sm"}
                  >
                  Delete
                </Button>
              </Flex>
            </Flex>
          </form>
        </CardBody>
      </Card>
    </Center>
  );
};

export default NoteEditor;
