import { Box, Space, Text, Title } from "@mantine/core";

export default function PostItem({ post }: { post: any }) {
  const createAtDate = new Date(post.createdAt);
  return (
    <Box sx={{
      padding: '15px 0',
      borderBottom: '1px solid #eaeaea',
      userSelect: 'element'
    }}>
      <Title order={3}>{post.title}</Title>
      <Space h='xs' />
      <Text lineClamp={3}>{post.content}</Text>
      <Space h='xs' />
      <Box sx={{display: 'flex'}}>
        <Text size='xs' color='gray'>
          <>댓글 {post.commentCount}개</>
        </Text>
        <Space w='xs' />
        <Text size='xs' color='gray'>
          {createAtDate.toLocaleDateString()}{" "}{createAtDate.toLocaleTimeString()}
        </Text>
      </Box>
    </Box>
  )
}