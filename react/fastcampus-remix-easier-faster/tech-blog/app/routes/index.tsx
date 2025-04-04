import { Box, Button, Divider, Title } from "@mantine/core";
import { Link } from "@remix-run/react";
import List from "~/components/List";
import PostItem from "~/components/Post/Item";

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
      <List>
        <PostItem 
          post={{
            title: '안녕하세요.',
            content: '안녕하세요.',
            commentCount: 2,
            createdAt: '2023-01-01',
          }} 
        />
        <PostItem 
          post={{
            title: '안녕하세요.',
            content: '안녕하세요.',
            commentCount: 2,
            createdAt: '2023-01-01',
          }} 
        />
        <PostItem 
          post={{
            title: '안녕하세요.',
            content: '안녕하세요. 안녕하세요. 안녕하세요. 안녕하세요. 안녕하세요. 안녕하세요. 안녕하세요. 안녕하세요. 안녕하세요. 안녕하세요. 안녕하세요. 안녕하세요. 안녕하세요. 안녕하세요. 안녕하세요. 안녕하세요. 안녕하세요. 안녕하세요. 안녕하세요. 안녕하세요. 안녕하세요. 안녕하세요. 안녕하세요. 안녕하세요. 안녕하세요. 안녕하세요. 안녕하세요. 안녕하세요. 안녕하세요. 안녕하세요. 안녕하세요. 안녕하세요. 안녕하세요. 안녕하세요. 안녕하세요. 안녕하세요. 안녕하세요. 안녕하세요. 안녕하세요. 안녕하세요. 안녕하세요. 안녕하세요. 안녕하세요. 안녕하세요. 안녕하세요. 안녕하세요. 안녕하세요. 안녕하세요. 안녕하세요. 안녕하세요. 안녕하세요. 안녕하세요. 안녕하세요. 안녕하세요. ',
            commentCount: 2,
            createdAt: '2023-01-01',
          }} 
        />

      </List>
    </Box>
  );
}
