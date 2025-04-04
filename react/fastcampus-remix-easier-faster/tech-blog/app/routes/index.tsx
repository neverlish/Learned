import { Box, Button, Divider, Title } from "@mantine/core";
import { json, LoaderFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { useState } from "react";
import List from "~/components/List";
import PostItem from "~/components/Post/Item";
import { getPosts, TPost } from "~/models/post.service";

interface ILoaderData {
  posts: Array<TPost>;
}

export const loader: LoaderFunction = async () => {
  const getPostResponse = await getPosts();
  return json<ILoaderData>({
    posts: (getPostResponse.data as Array<TPost>) ?? [],
  });
};

export default function Index() {
  const loaderData = useLoaderData<ILoaderData>();
  const [posts] = useState(loaderData.posts);

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
        {posts.map((post, i) => (
          <PostItem key={i} post={post as TPost} />
        ))}

      </List>
    </Box>
  );
}
