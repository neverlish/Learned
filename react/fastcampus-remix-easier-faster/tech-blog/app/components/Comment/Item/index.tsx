import { ActionIcon, Box, Button, Center, Menu, Modal, PasswordInput, Space, Text, Textarea, TextInput } from "@mantine/core";
import { Form, useFetcher } from "@remix-run/react";
import { IconDotsVertical, IconPencil, IconTrash } from "@tabler/icons-react";
import { useState } from "react";
import { TComment } from "~/models/comment.service";
import { InputType } from "~/routes/posts/$postId";

interface ICommentItem {
  comment: TComment;
  isUpload?: boolean;
}

export default function CommentItem({ comment, isUpload }: ICommentItem) {
  const fetcher = useFetcher();
  const createAtDate = new Date(comment.created_at ?? "");
  const [mode, setMode] = useState<'view' | 'edit'>('view');

  const [deleteModalOpened, setDeleteModalOpened] = useState(false);

  return (
    <Box 
    sx={{ 
      padding: '15px 0', 
      borderBottom: '1px solid #eaeaea',
      userSelect: 'element',
      opacity: fetcher.state !== "idle" || isUpload ? 0.5 : 1,
      color: fetcher.data && fetcher.data.error ? "red" : "inherit",
    }}>
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <Box>
          <Text>{comment.writer}</Text>
          <Text>{createAtDate.toLocaleDateString()}{" "}{createAtDate.toLocaleTimeString()}</Text>
        </Box>
        <Box>
          <Menu shadow="md" width={200} position="left-start">
            <Menu.Target>
              <ActionIcon>
                <IconDotsVertical />
              </ActionIcon>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Item icon={<IconPencil size={14} />} onClick={() => setMode('edit')}>댓글 수정하기</Menu.Item>
              <Menu.Item color="red" icon={<IconTrash size={14} />} onClick={() => setDeleteModalOpened(true)}>댓글 삭제하기</Menu.Item>
            </Menu.Dropdown>
          </Menu>
          <Modal
            opened={deleteModalOpened}
            onClose={() => setDeleteModalOpened(false)}
            title="댓글 삭제"
          >
            <Text align="center">
              댓글을 삭제하기 위해서는 비밀번호를 입력해 주세요
              <br />
              또는 작성자 비밀번호를 입력해주세요.
            </Text>
            <Space h="lg" />
            <fetcher.Form
              method="post"
              onSubmit={() => setDeleteModalOpened(false)}
            >
              <input type="hidden" name="commentId" value={comment.id} />
              <Center>
                <PasswordInput
                  sx={{ minWidth: "200px" }}
                  name="commentPassword"
                  placeholder="관리자 또는 작성자 비밀번호"
                  required
                />
              </Center>
              <Space h="lg" />
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Button
                  variant="default"
                  onClick={() => setDeleteModalOpened(false)}
                >
                  취소
                </Button>
                <Space w="md" />
                <Button
                  color="red"
                  type="submit"
                  name="action"
                  value={InputType.DELETE_COMMENT}
                >
                  삭제
                </Button>
              </Box>
            </fetcher.Form>
          </Modal>
        </Box>
      </Box>
      <Space h='md' />
      {mode === 'view' ? (
        <Text>{comment.content}</Text>
      ) : (
        <Box>
          <fetcher.Form method="post" onSubmit={() => setMode('view')}>
            <input type="hidden" name="commentId" value={comment.id} />
            <Textarea 
              name='commentContent' 
              placeholder="댓글을 입력하세요." 
              defaultValue={comment.content ?? ""} 
              required
            />
            <Space h='lg' />
            <Box sx={{ display: 'flex', justifyContent: 'end' }}>
              <Space w='xs' />
              <PasswordInput
                sx={{ minWidth: '200px' }}
                name='commentPassword'
                placeholder="댓글 비밀번호"
                required
              />
              <Space w='xs' />
              <Button variant="default" onClick={() => setMode('view')}>
                취소
              </Button>
              <Space w='xs' />
              <Button color="red" type="submit" name='action' value={InputType.UPDATE_COMMENT}>
                {" "}
                수정하기
              </Button>
            </Box>
          </fetcher.Form>
        </Box>
      )}
    </Box>
  )
}