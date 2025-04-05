import { Badge, Box, Divider, Space, Text } from "@mantine/core";
import { Link } from "@remix-run/react";

export default function PostItem({
  post,
  path,
}: {
  post: any;
  path: string;
}) {
  return (
    <>
      <Link to={`/${path}/${post.id}`} prefetch="intent">
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignContent: "center",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {post.board && (
              <Badge color="blue" mr="md">
                {post.board.name}
              </Badge>
            )}
            <Text>{post.title}</Text>
          </Box>
          <Box sx={{ display: "flex" }}>
            <Text>{post.writer.name}</Text>
            <Space w="md" />
            <Text>{new Date(post.created_at).toLocaleDateString()}</Text>
            <Space w="md" />
            <Text>조회 {post.view}회</Text>
          </Box>
        </Box>
      </Link>
      <Divider my="xs" />
    </>
  );
}