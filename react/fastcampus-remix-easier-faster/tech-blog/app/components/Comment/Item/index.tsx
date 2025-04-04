import { ActionIcon, Box, Button, Menu, PasswordInput, Space, Text, Textarea, TextInput } from "@mantine/core";
import { IconDotsVertical, IconPencil, IconTrash } from "@tabler/icons-react";
import { useState } from "react";

export default function CommentItem({ comment }: { comment: any }) {
  const createAtDate = new Date(comment.created_at);
  const [mode, setMode] = useState<'view' | 'edit'>('view');

  return (
    <Box 
    sx={{ 
      padding: '15px 0', 
      borderBottom: '1px solid #eaeaea',
      userSelect: 'element'
    }}>
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <Box>
          <Text>{comment.writer}</Text>
          <Text>{createAtDate.toLocaleDateString()}{" "}{createAtDate.toLocaleTimeString()}</Text>
        </Box>
        <Box>
          <Menu shadow="md" width={200} position="left-start">
            <Menu.Target>
              <ActionIcon>
                <IconDotsVertical />
              </ActionIcon>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Item icon={<IconPencil size={14} />} onClick={() => setMode('edit')}>댓글 수정하기</Menu.Item>
              <Menu.Item color="red" icon={<IconTrash size={14} />}>댓글 삭제하기</Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Box>
      </Box>
      <Space h='md' />
      {mode === 'view' ? (
        <Text>{comment.content}</Text>
      ) : (
        <Box>
          <Textarea name='commentCreate' placeholder="댓글을 입력하세요." />
          <Space h='lg' />
          <Box sx={{ display: 'flex', justifyContent: 'end' }}>
            <Space w='xs' />
            <PasswordInput
              sx={{ minWidth: '200px' }}
              name='commentPassword'
              placeholder="댓글 비밀번호"
            />
            <Space w='xs' />
            <Button variant="default" onClick={() => setMode('view')}>
              취소
            </Button>
            <Space w='xs' />
            <Button color="red" type="submit" name='action'>
              {" "}
              수정하기
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  )
}