import { ActionIcon, Box, Divider, Menu, Space, Title } from "@mantine/core";
import { Link } from "@remix-run/react";
import { IconChevronLeft, IconDotsVertical, IconPencil, IconTrash } from "@tabler/icons-react";

export default function PostId() {
  return (
    <Box sx={{ padding: '45px'}}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Link to='/'>
            <ActionIcon>
              <IconChevronLeft size={24} />
            </ActionIcon>
          </Link>
          <Space w='xs' />
          <Title>글 제목</Title>
        </Box>
        <Menu shadow="md" width={200} position="left-start">
          <Menu.Target>
            <ActionIcon>
              <IconDotsVertical />
            </ActionIcon>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Item icon={<IconPencil size={14} />}>글 수정하기</Menu.Item>
            <Menu.Item color="red" icon={<IconTrash size={14} />}>글 삭제하기</Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Box>
      <Divider mt={20} mb={15} />
      글 내용이 들어갈 자리입니다.
      글 댓글이 들어갈 자리입니다.
    </Box>
  )
}