import styled from "styled-components";
import {  seeFeed_seeFeed_comments } from "../../__generated/seeFeed";
import Comment from "./Comment";

const CommentsContainer = styled.div`
  margin-top: 20px;
`;
const CommentCount = styled.span`
  opacity: 0.7;
  margin: 10px 0px;
  display: block;
  font-weight: 600;
  font-size: 10px;
`;

function Comments({ author, caption, commentNumber, comments }: { author: string, caption: string | null, commentNumber: number | null, comments: (seeFeed_seeFeed_comments | null)[] | null }) {
  return (
    <CommentsContainer>
      <Comment author={author} payload={caption!} />
      <CommentCount>
        {commentNumber === 1 ? "1 comment" : `${commentNumber} comments`}
      </CommentCount>
      {comments?.map((comment) => (
        <Comment
          key={comment!.id}
          author={comment!.user.username}
          payload={comment!.payload}
        />
      ))}
    </CommentsContainer>
  );
}

export default Comments;