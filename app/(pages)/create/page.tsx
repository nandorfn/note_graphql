import { NoteEditor } from "@components/organisms";

const page: React.FC = () => {
    return (
        <>
          <NoteEditor isCreate defaultValue={{
            title: '',
            body: '',
          }} />
        </>
    );
};

export default page;