import { ActionIcon, Box, Button, Menu, Modal, Space, Text, Textarea } from "@mantine/core";
import { useFetcher } from "@remix-run/react";
import { IconDotsVertical, IconPencil, IconTrash } from "@tabler/icons-react";
import { useState } from "react";
import { InputType } from "~/routes/$boardId/$postId";

interface ICommentItem {
  comment: any;
  is_owner: boolean;
}

export default function CommentItem({ comment, is_owner }: ICommentItem) {
  const fetcher = useFetcher();

  const createdAtDate = new Date(comment.created_at ?? "");

  const [deleteModalOpened, setDeleteModalOpened] = useState(false);
  const [mode, setMode] = useState<"view" | "edit">("view");

  return (
    <Box
      sx={{
        padding: "15px 0",
        borderBottom: "1px solid #eaeaea",
        userSelect: "element",
      }}
    >
      <Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box>
            <Text>{comment.writer.name}</Text>
            <Text>
              {createdAtDate.toLocaleDateString()}{" "}
              {createdAtDate.toLocaleTimeString()}
            </Text>
          </Box>
          {is_owner && (
            <Box>
              <Menu shadow="md" width={200} position="left-start">
                <Menu.Target>
                  <ActionIcon>
                    <IconDotsVertical />
                  </ActionIcon>
                </Menu.Target>

                <Menu.Dropdown>
                  <Menu.Item
                    icon={<IconPencil size={14} />}
                    onClick={() => {
                      setMode("edit");
                    }}
                  >
                    댓글 수정하기
                  </Menu.Item>
                  <Menu.Item
                    color="red"
                    icon={<IconTrash size={14} />}
                    onClick={() => {
                      setDeleteModalOpened(true);
                    }}
                  >
                    댓글 삭제하기
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
              <Modal
                opened={deleteModalOpened}
                onClose={() => setDeleteModalOpened(false)}
                title="댓글 삭제"
              >
                <Text align="center">댓글을 삭제하시겠습니까?</Text>
                <Space h="lg" />
                <fetcher.Form
                  method="post"
                  onSubmit={() => setDeleteModalOpened(false)}
                >
                  <input type="hidden" name="commentId" value={comment.id} />
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
          )}
        </Box>
        <Space h="md" />
        {mode === "view" ? (
          <Text>{comment.content}</Text>
        ) : ( // 댓글 수정 모드
          <Box>
            <fetcher.Form
              method="post"
              onSubmit={() => {
                setMode("view");
              }}
            >
              <input type="hidden" name="commentId" value={comment.id} />
              <Textarea
                name="commentContent"
                placeholder="댓글을 입력하세요."
                defaultValue={comment.content ?? ""}
              />
              <Space h="lg" />
              <Box sx={{ display: "flex", justifyContent: "end" }}>
                <Button variant="default" onClick={() => setMode("view")}>
                  취소
                </Button>
                <Space w="xs" />
                <Button
                  color="red"
                  type="submit"
                  name="action"
                  value={InputType.UPDATE_COMMENT}
                >
                  수정하기
                </Button>
              </Box>
            </fetcher.Form>
          </Box>
        )}
      </Box>
    </Box>
  );
}