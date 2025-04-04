import { ActionIcon, Box, Button, Center, Divider, Menu, Modal, PasswordInput, Space, Text, Title } from "@mantine/core";
import { ActionFunction, json, LoaderFunction, redirect } from "@remix-run/node";
import { Form, Link, useActionData, useLoaderData } from "@remix-run/react";
import { IconChevronLeft, IconDotsVertical, IconPencil, IconTrash } from "@tabler/icons-react";
import CommentItem from "~/components/Comment/Item";
import CommentUpload from "~/components/Comment/Upload";
import List from "~/components/List";
import PostView from "~/components/Post/Viewer";
import { deletePost, getPost, TPost } from "~/models/post.service";
import qs from "qs";
import { useEffect, useState } from "react";
import { showNotification } from "@mantine/notifications";
import { createComment, deleteComment, getCommentPassword, TComment, updateComment } from "~/models/comment.service";
interface ILoaderData {
  post: TPost;
}

export enum InputType {
  DELETE_POST = "0",
  CREATE_COMMENT = "1",
  UPDATE_COMMENT = "2",
  DELETE_COMMENT = "3",
}

type InputData = {
  action: InputType;
  id?: number;
  password: string;
  commentId?: string;
  commentContent?: string;
  commentWriter?: string;
  commentPassword?: string;
};

interface IActionData {
  message: TMessage;
}


export const loader: LoaderFunction = async ({ request, params }) => {
  const postId = params.postId as string;
  const getPostResponse = await getPost(parseInt(postId));
  if (getPostResponse.data !== null) {
    return json<ILoaderData>({ post: getPostResponse.data });
  } else {
    return redirect(`/`);
  }
};

export const action: ActionFunction = async ({ request, params }) => {
  const postId = params.postId as string;
  const data = qs.parse(await request.text()) as unknown as InputData;

  await new Promise((resolve) => setTimeout(resolve, 3000));

  switch (data.action) {
		// 글 삭제 액션
    case InputType.DELETE_POST: {
			// 전송한 비밀번호 관리자 비밀번호와 다를 경우
      if (data.password !== process.env.ADMIN_PASSWORD) {
        return json<IActionData>({
          message: {
            title: "삭제 실패",
            message: "비밀번호가 일치하지 않습니다.",
            color: "red",
          },
        });
      }
      if (data.id) {
        const post = await deletePost(data.id);
        return redirect(`/`);
      }
    }
    case InputType.CREATE_COMMENT: {
      if (data.commentContent && data.commentWriter && data.commentPassword) {
        const comment = await createComment(
          parseInt(postId),
          data.commentWriter,
          data.commentContent,
          data.commentPassword
        );
        return redirect(`/posts/${postId}`);
      }
	  }
    case InputType.UPDATE_COMMENT: {
      if (data.commentId && data.commentContent) {
        const comment = await getCommentPassword(parseInt(data.commentId));
        if (data.commentPassword !== comment.data?.password) {
          return json<IActionData>({
            message: {
              title: "수정 실패",
              message: "비밀번호가 일치하지 않습니다.",
              color: "red",
            },
          });
        } else {
          const comment = await updateComment(
            parseInt(data.commentId),
            data.commentContent
          );
          return redirect(`/posts/${postId}`);
        }
      }
    }
    case InputType.DELETE_COMMENT: {
      if (data.commentId) {
        const comment = await getCommentPassword(parseInt(data.commentId));
        if (
          data.commentPassword !== comment.data?.password &&
          data.commentPassword !== process.env.ADMIN_PASSWORD
        ) {
          return json<IActionData>({
            message: {
              title: "삭제 실패",
              message: "비밀번호가 일치하지 않습니다.",
              color: "red",
            },
          });
        } else {
          const comment = await deleteComment(parseInt(data.commentId));
          return redirect(`/posts/${postId}`);
        }
      }
    }
  }

  return json<IActionData>({
    message: {
      title: "처리 실패",
      message: "알 수 없는 오류가 발생했습니다.",
      color: "red",
    },
  });
};


export default function PostId() {
  const loaderData = useLoaderData<ILoaderData>();
  const actionData = useActionData<IActionData>();
  const navigation = useNavigation();

  const [post, setPost] = useState(loaderData.post);
  const [deleteModalOpened, setDeleteModalOpened] = useState(false);

  const [message, setMessage] = useState<IActionData>();

  useEffect(() => {
    if (actionData) {
      setMessage(actionData);
    }
  }, [actionData]);

  useEffect(() => {
    if (message) {
      showNotification({
        title: message.message.title,
        message: message.message.message,
        color: message.message.color,
      });
    }
  }, [message]);

  useEffect(() => {
    setPost(loaderData.post);
  }, [loaderData.post]);

  return (
    <Box sx={{ padding: '45px'}}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Link to='/'>
            <ActionIcon>
              <IconChevronLeft size={24} />
            </ActionIcon>
          </Link>
          <Space w='xs' />
          <Title>{post.title}</Title>
        </Box>
        <Menu shadow="md" width={200} position="left-start">
          <Menu.Target>
            <ActionIcon>
              <IconDotsVertical />
            </ActionIcon>
          </Menu.Target>
          <Menu.Dropdown>
            <Link to={`/posts/${post.id}/update`}>
              <Menu.Item icon={<IconPencil size={14} />}>글 수정하기</Menu.Item>
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
          <Text align="center">
            글을 삭제하기 위해서는 비밀번호를 입력해 주세요
          </Text>
          <Space h="lg" />
          <Form method="post">
            <input type="hidden" name="id" value={post.id} />
            <Center>
              <PasswordInput
                sx={{ minWidth: "200px" }}
                name="password"
                placeholder="관리자 비밀번호"
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
                value={InputType.DELETE_POST}
              >
                삭제
              </Button>
            </Box>
          </Form>
        </Modal>
      </Box>
      <Divider mt={20} mb={15} />
      <PostView content={post.content ?? '글이 없습니다.'} />
      <Divider mt={20} mb={20} />
      <Box>
        <Text>댓글 {(post.comment as TComment[]).length}개</Text>
        <Space h="lg" />
        <CommentUpload />
        <List>
          {(post.comment as TComment[]).map((comment: TComment, i: number) => {
            return <CommentItem key={i} comment={comment} />;
          })}
          {navigation.state === "submitting" &&
            navigation.formData.get("action") === InputType.CREATE_COMMENT && (
              <>
                <CommentItem
                  isUpload
                  comment={{
                    id: 0,
                    writer: navigation.formData.get("commentWriter") as string,
                    content: navigation.formData.get(
                      "commentContent"
                    ) as string,
                    created_at: new Date().toISOString(),
                    post_id: 0,
                  }}
                />
              </>
            )}
        </List>
      </Box>
    </Box>
  )
}