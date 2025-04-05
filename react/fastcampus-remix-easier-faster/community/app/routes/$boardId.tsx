import { Box, Space } from "@mantine/core";
import { Outlet } from "@remix-run/react";

export default function BoardId() {
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
        <Box sx={{ width: '100%' }}>
          게시글 리스트 위치
        </Box>
      </Box>
    </Box>
  )
}
