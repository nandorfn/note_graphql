import { Center, Flex, Text } from "@chakra-ui/react";
import { NoteContainer } from "@components/organisms";
import Link from "next/link";

const Main: React.FC = () => {
  return (
    <>
      <Center mt={4}>
          <Flex direction={"row"} alignItems={"center"} w={"xl"} justifyContent={"space-between"}>
            <Text textAlign={"start"} fontSize={"4xl"}>
              My Notes
            </Text>
            <Link className="link-btn" href={"/create"}>
              Create note
            </Link>
          </Flex>
      </Center>
      <NoteContainer />
    </>
  );
};

export default Main;