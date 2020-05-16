import React from "react";
import FeedItem from "./FeedItem";

interface Props {}

const Feed: React.FC<Props> = () => {
  return (
    <div className="p-2 rounded shadow-lg bg-white space-y-4">
      <FeedItem />
      <hr />
      <FeedItem />
      <hr />
      <FeedItem />
      <hr />
      <FeedItem />
      <hr />
      <FeedItem />
      <hr />
      <FeedItem />
      <hr />
    </div>
  );
};

export default Feed;
