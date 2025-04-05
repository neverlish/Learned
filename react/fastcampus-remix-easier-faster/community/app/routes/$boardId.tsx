import { Box, Divider, Space, Text, Title } from "@mantine/core";
import { json, LoaderFunction } from "@remix-run/node";
import { Outlet, useActionData, useLoaderData, useParams } from "@remix-run/react";
import { useEffect, useState } from "react";
import PostItem from "~/components/Post/Item";
import { getBoardByPath, getBoards, TBoard } from "~/models/board.service";
import { getPostByBoardId, TPost } from "~/models/post.service";
import { IActionData } from "./auth";
import { showNotification } from "@mantine/notifications";

interface ILoaderData {
  boards: TBoard[] | null;
  posts?: TPost[];
}


export const loader: LoaderFunction = async ({ params }) => {
  const path = params.boardId as string;
  const boards = await getBoards();

  if (path) {
    const selectedBoard = await getBoardByPath(path);
    if (!selectedBoard.data) return json<ILoaderData>({ boards: boards.data });

    const posts = await getPostByBoardId(selectedBoard.data.id as number);
    return json<ILoaderData>({ boards: boards.data, posts: (posts.data ?? []) as unknown as TPost[] });
  }

  return json<ILoaderData>({ boards: boards.data });
};

export default function BoardId() {
  const { boardId } = useParams();
  const { posts } = useLoaderData<ILoaderData>();
  const actionData = useActionData<IActionData>();
  const [message, setMessage] = useState<TMessage>();

  useEffect(() => {
    console.log(actionData);
    if (actionData) {
      setMessage(actionData.message);
    }
  }, [actionData]);

  useEffect(() => {
    if (message) {
      showNotification({
        title: message.title,
        message: message.message,
        color: message.color,
      });
    }
  }, [message]);
  
  return (
    <Box sx={{
      display: "flex",
      padding: '0 50px',
      paddingTop: '50px',
      width: 'calc(100% - 100px)',
      maxWidth: '1100px',
      margin: '0 auto',
    }}>
      <Box>
        Sidebar 위치
      </Box>
      <Space w="xl" />
      <Box sx={{ width: '100%' }}>
        <Outlet />
        <Text>게시글</Text>
        <Divider mt={20} mb='xs' />
        {
          posts ? 
          posts.map((post: any, i) => (
            <PostItem
              key={i}
              post={post}
              path={boardId as string}
            />
          ))
          : <>
            <Title order={3}>게시글이 없습니다.</Title>
          </>
        }
        <Space h={50} />  
      </Box>
    </Box>
  )
}
