import { Box, Space } from "@mantine/core";
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
        게시글 리스트 위치
      </Box>
    </Box>
  )
}
