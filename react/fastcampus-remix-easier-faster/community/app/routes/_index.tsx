import { Box, Space } from "@mantine/core";
import { json, LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import PostItem from "~/components/Post/Item";
import SideBar from "~/components/Sidebar";
import { getBoards, TBoard } from "~/models/board.service";
import { getPosts, TPost } from "~/models/post.service";

export interface ILoaderData {
  boards: TBoard[] | null;
  posts: TPost[] | null;
}

export const loader: LoaderFunction = async ({ request }) => {
  const boards = await getBoards();
  const recentPost = await getPosts();
  return json<ILoaderData>({
    boards: boards.data,
    posts: recentPost.data as TPost[],
  });
};

export default function Index() {
  const { boards, posts } = useLoaderData<ILoaderData>();


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
        <SideBar boards={boards ?? []} />
      </Box>
      <Space w="xl" />
      <Box sx={{ width: '100%' }}>
        {
          posts ? 
          posts.map((post: any, i) => (
            <PostItem
              key={i}
              post={post}
              path={post.board.path}
            />
          )) 
          : null
        }
      </Box>
    </Box>
  )
}
