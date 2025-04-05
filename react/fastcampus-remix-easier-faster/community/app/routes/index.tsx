import { Box, Space } from "@mantine/core";
import PostItem from "~/components/Post/Item";
import SideBar from "~/components/Sidebar";

export default function Index() {
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
        <SideBar boards={[{ path: '/notice', name: '공지사항'}]} />
      </Box>
      <Space w="xl" />
      <Box sx={{ width: '100%' }}>
        {
          ([
            {
              id: 1,
              title: '게시글 1',
              writer: {
                name: '작성자 1'
              },
              created_at: '2021-01-01',
              view: 1, 
              board: { 
                name: '공지사항', path: 'notice'
              },
            },
            {
              id: 1,
              title: '게시글 1',
              writer: {
                name: '작성자 1'
              },
              created_at: '2021-01-01',
              view: 1, 
              board: { 
                name: '공지사항', path: 'notice'
              },
            },
          ]).map((post: any) => (
            <PostItem
              post={post}
              path={post.board.path}
            />
          ))
        }
      </Box>
    </Box>
  )
}
