import React, { useState, useEffect } from "react";
import { service } from "../appwrite";
import { PostCard, Container } from "../components";
import { set } from "react-hook-form";

function AllPosts() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    service.getPosts().then((response) => {
      if (response) {
        setPosts(response.documents);
      }
    });
  }, []);
  //console.log(posts);
  return (
    <div className="w-full h-screen py-8">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {posts.map((post) => (
            <PostCard
              key={post.$id}
              $id={post.$id}
              title={post.title}
              featuredImage={post.featuredImage}
              content={post.content}
            />
          ))}
        </div>
      </Container>
    </div>
  );
}

export default AllPosts;
