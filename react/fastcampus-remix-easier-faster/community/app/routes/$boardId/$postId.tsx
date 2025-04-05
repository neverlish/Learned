import { ActionIcon, Box, Button, Divider, Menu, Modal, Space, Text, Title } from "@mantine/core";
import { Link, useFetcher, useParams } from "@remix-run/react";
import { IconChevronLeft, IconDotsVertical, IconPencil, IconTrash } from "@tabler/icons-react";
import { useState } from "react";
import PostView from "~/components/Post/Viewer";

export default function PostId() {
  const fetcher = useFetcher();
  const { boardId } = useParams();
  const [deleteModalOpened, setDeleteModalOpened] = useState(false);

  const post = {
    id: 1,
    title: '게시글 제목',
    writer: {
      name: '작성자 이름',
      user_id: 1,
    },
    created_at: '2021-01-01',
    view: 1,
    content: '게시글 내용',
  }

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Link to={`/${boardId}`}>
          <ActionIcon>
            <IconChevronLeft size={24} />
          </ActionIcon>
        </Link>
        <Space w="xs" />
        <Title>{post.title}</Title>
      </Box>

        <>
          <Menu shadow="md" width={200} position="left-start">
            <Menu.Target>
              <ActionIcon>
                <IconDotsVertical />
              </ActionIcon>
            </Menu.Target>

            <Menu.Dropdown>
              <Link to={`/${boardId}/${post.id}/update`}>
                <Menu.Item icon={<IconPencil size={14} />}>
                  글 수정하기
                </Menu.Item>
              </Link>
              <Menu.Item
                color="red"
                icon={<IconTrash size={14} />}
                onClick={() => {
                  setDeleteModalOpened(true);
                }}
              >
                글 삭제하기
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
          <Modal
            opened={deleteModalOpened}
            onClose={() => setDeleteModalOpened(false)}
            title="글 삭제"
          >
            <Text align="center">정말 글을 삭제하시겠습니까?</Text>
            <Space h="lg" />
            <Space h="lg" />
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Button
                variant="default"
                onClick={() => setDeleteModalOpened(false)}
              >
                취소
              </Button>
              <Space w="md" />
              <fetcher.Form method="post">
                <Button
                  color="red"
                  type="submit"
                  name="action"
                >
                  삭제
                </Button>
              </fetcher.Form>
            </Box>
          </Modal>
        </>
      </Box>
      <Divider mt={20} mb={15} />
      <Box sx={{ display: "flex" }}>
        <Text>{post.writer.name}</Text>
        <Space w="md" />
        <Text>{new Date(post.created_at).toLocaleDateString()}</Text>
        <Space w="md" />
        <Text>조회 {post.view}회</Text>
      </Box>
      <Box>
        <PostView content={post.content ?? "글이 없습니다."} />
      </Box>
    </Box>
  );
}