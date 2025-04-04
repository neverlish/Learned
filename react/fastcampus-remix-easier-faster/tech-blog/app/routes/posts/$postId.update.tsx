import { ActionIcon, Box, Button, Divider, PasswordInput, Space, TextInput, Title } from "@mantine/core";
import { Link } from "@remix-run/react";
import { IconChevronLeft } from "@tabler/icons-react";
import PostUpload from "~/components/Post/Upload";

export default function PostUpdate() {
  return (
    <Box sx={{ padding: '45px'}}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Link to='/'>
          <ActionIcon>
            <IconChevronLeft size={24} />
          </ActionIcon>
        </Link>
        <Space w='xs' />
        <Title>글 수정</Title>
      </Box>
      <Divider mt={20} mb={20} />
      <TextInput placeholder="제목" variant="filled" size='xl' />
      <Space h='xl' />
      <PostUpload />
      <Box sx={{ display: 'flex', justifyContent: 'end'}} >
        <PasswordInput
          sx={{minWidth: '200px'}}
          placeholder="관리자 비밀번호"
        />
        <Space w='xs' />
        <Button color='red'>
          수정하기
        </Button>
      </Box>
    </Box>
  )
}