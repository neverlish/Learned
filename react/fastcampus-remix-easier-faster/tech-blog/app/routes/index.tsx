import { ActionIcon, Box, Button, Divider, Title } from "@mantine/core"
import { Link } from "@remix-run/react";
import { IconAlarm } from '@tabler/icons-react';

export default function Index() {
  return (
    <Box sx={{
      padding: '45px',
    }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between'}}>
        <Title>나만의 테크 블로그</Title>
        <Link to='/posts/create'>
          <Button variant="light" color='red'>
            글쓰기
          </Button>
        </Link>
      </Box>
      <Divider mt={20} mb={15} />
      PostList 와 PostItem 컴포넌트가 들어갈 자리입니다.
    </Box>
  );
}
