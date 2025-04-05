import { ActionIcon, Box, Button, Divider, Space, TextInput } from "@mantine/core";
import { Form, Link, useParams } from "@remix-run/react";
import { IconChevronLeft } from "@tabler/icons-react";
import PostUpload from "~/components/Post/Upload";

export default function PostIdUpdate() {
  
  const { boardId, postId } = useParams();
  const post = {
    id: 1,
    title: '게시글 제목',
    content: '게시글 내용',
  }
  return (
    <Box>
      <Form method="post">
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Link to={`/${boardId}/${postId}`}>
            <ActionIcon>
              <IconChevronLeft size={24} />
            </ActionIcon>
          </Link>
          <Space w="xs" />
          <TextInput
            sx={{ width: "100%" }}
            placeholder="제목"
            variant="filled"
            size="xl"
            name="title"
            defaultValue={post.title as string}
          />
        </Box>
        <Divider mt={20} mb={15} />
        <Box>
          <PostUpload defaultValue={post.content} />
        </Box>
        <Space h="xl" />
        <Box sx={{ display: "flex", justifyContent: "end" }}>
          <Button type="submit">수정하기</Button>
        </Box>
        <Divider mt={20} mb="xs" />
      </Form>
    </Box>
  );
}