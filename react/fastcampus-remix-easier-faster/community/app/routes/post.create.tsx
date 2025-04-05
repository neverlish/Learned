import { ActionIcon, Box, Button, Divider, Select, Space, TextInput, Title } from "@mantine/core";
import { json, LoaderFunction } from "@remix-run/node";
import { Form, Link } from "@remix-run/react";
import { IconChevronLeft } from "@tabler/icons-react";
import { authenticate } from "~/auth.server";
import PostUpload from "~/components/Post/Upload";

export const loader: LoaderFunction = async ({ request }) => {
  await authenticate(request); // Access Token 을 발급할 수 없으면 /auth/sign-in 으로 리다이렉트됨
  return {};
};

export default function PostCreate() {

  return (
    <Box
      sx={{
        padding: "0 50px",
        paddingTop: "50px",
        width: "calc(100% - 100px)",
        maxWidth: "1100px",
        margin: "0 auto",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Link to="/">
          <ActionIcon>
            <IconChevronLeft size={24} />
          </ActionIcon>
        </Link>
        <Space w="xs" />
        <Title>글 작성</Title>
      </Box>
      <Divider mt={20} mb={20} />
      <Form method="post">
        <Box sx={{ display: "flex" }}>
          <Select
            name="board_id"
            size="xl"
            placeholder="게시판"
            data={[{
              value: '1',
              label: '공지사항'
            }, {
              value: '2',
              label: '자유게시판'
            }]}
          />
          <Space w="md" />
          <TextInput
            sx={{ width: "100%" }}
            placeholder="제목"
            variant="filled"
            size="xl"
            name="title"
          />
        </Box>
        <Space h="xl" />
        <PostUpload />
        <Space h="xl" />
        <Box sx={{ display: "flex", justifyContent: "end" }}>
          <Button type="submit">작성하기</Button>
        </Box>
      </Form>
    </Box>
  );
}