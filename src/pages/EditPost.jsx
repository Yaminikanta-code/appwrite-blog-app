import React, { useState, useEffect } from "react";
import { PostForm, Container } from "../components";
import { service } from "../appwrite";
import { useParams, useNavigate } from "react-router-dom";

function EditPost() {
  const [post, setPost] = useState([]);
  const { slug } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    if (slug) {
      service.getPost(slug).then((res) => {
        setPost(res);
      });
    } else {
      navigate("/");
    }
  }, [slug, navigate]);
  return post ? (
    <div className="py-8">
      <Container>
        <PostForm post={post} />
      </Container>
    </div>
  ) : null;
}

export default EditPost;
