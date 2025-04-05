import { Box, Button, PasswordInput, Space, Textarea, TextInput } from '@mantine/core';
import { Form } from '@remix-run/react';
import { InputType } from '~/routes/posts/$postId';

export default function CommentUpload() {
  return (
    <Box>
      <Form method='post'>
        <Textarea 
          name='commentContent' 
          placeholder='댓글을 입력하세요.' 
          required
        />
        <Space h='lg' />
        <Box sx={{ display: 'flex', justifyContent: 'end' }}>
          <TextInput
            sx={{ minWidth: '200px' }}
            name='commentWriter'
            placeholder='작성자 이름'
            required
          />
          <Space w='xs' />
          <PasswordInput
            sx={{ minWidth: '200px' }}
            name='commentPassword'
            placeholder='댓글 비밀번호'
            required
          />
          <Space w='xs' />
          <Button
            color='red'
            type='submit'
            name='action'
            value={InputType.CREATE_COMMENT}
          >
            작성하기
          </Button>
        </Box>
      </Form>
    </Box>
  )
}