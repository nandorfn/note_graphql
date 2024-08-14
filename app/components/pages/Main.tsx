import { Button, Center, Flex, Text } from "@chakra-ui/react";
import LogoutModal from "@components/molecules/LogoutModal";
import { NoteContainer } from "@components/organisms";
import Link from "next/link";

const Main: React.FC = () => {
  return (
    <>
      <Center mt={4}>
        <Flex direction={"row"} alignItems={"center"} w={"4xl"} justifyContent={"space-between"}>
          <Text textAlign={"start"} fontSize={"4xl"}>
            My Notes
          </Text>

          <Flex gap={4}>
            <Link className="link-btn" href={"/create"}>
              Create note
            </Link>
            <LogoutModal />
          </Flex>
        </Flex>
      </Center>
      <NoteContainer />
    </>
  );
};

export default Main;