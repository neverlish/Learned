import { Box, Button, Space, Textarea } from "@mantine/core";
import { Form } from "@remix-run/react";

export default function CommentUpload() {
  return (
    <Box>
      <Form method="post">
        <Textarea name="commentContent" placeholder="댓글을 입력하세요." />
        <Space h="lg" />
        <Box sx={{ display: "flex", justifyContent: "end" }}>
          <Button type="submit" name="action">
            작성하기
          </Button>
        </Box>
      </Form>
    </Box>
  );
}