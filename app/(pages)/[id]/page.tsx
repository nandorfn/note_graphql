"use client"
import { useQuery } from "@apollo/client";
import { Center, Spinner, Text } from "@chakra-ui/react";
import { NoteEditor } from "@components/organisms";
import { GET_NOTE_BY_ID } from "@services/query";
import { usePathname, useRouter } from "next/navigation";

const Page = () => {
    const path = usePathname()?.split("/")[1];
    const router = useRouter();
    const { data, loading, error } = useQuery(GET_NOTE_BY_ID, { variables: { id: path } });
    const note = data?.note?.data?.note

    if (loading) {
        return (
            <Center mt={"40vh"}>
                <Spinner size={"xl"}/>
            </Center>
        )
    }

    return (
        <NoteEditor
            noteId={path}
            isCreate={false} 
            defaultValue={{
                title: note?.title,
                body: note?.body
            }}
        />
    );
};

export default Page;