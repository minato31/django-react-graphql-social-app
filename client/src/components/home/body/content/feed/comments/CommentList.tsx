import React, { useEffect } from "react";
import {
  OnNewCommentDocument,
  useCommentsQuery,
} from "../../../../../../graphql/generated";
import CommentListItem from "./CommentListItem";

interface Props {
  postId: string;
}

const CommentList: React.FC<Props> = ({ postId }) => {
  const { data, loading, error, subscribeToMore } = useCommentsQuery({
    variables: { postId },
  });

  useEffect(() => {
    const unsubscribeToLess = subscribeToMore({
      document: OnNewCommentDocument,
      variables: { postId },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData) {
          return prev;
        }
        return {
          ...prev,
          comments: [
            (subscriptionData.data as any).onNewComment,
            ...prev!.comments!,
          ],
        };
      },
    });

    return function unsubscribe() {
      if (unsubscribeToLess) {
        unsubscribeToLess();
      }
    };
  }, [subscribeToMore, postId]);

  if (error) {
    console.error(error.message);
    return <h1>Error</h1>;
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div
      className="w-full my-4 rounded overflow-y-auto"
      style={{ maxHeight: "300px", backgroundColor: "#edf2f7" }}
    >
      {data?.comments?.map((comment) => (
        <CommentListItem key={comment?.id} comment={comment as any} />
      ))}
    </div>
  );
};

export default CommentList;
