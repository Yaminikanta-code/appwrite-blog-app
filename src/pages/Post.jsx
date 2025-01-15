import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { service as appwriteService, fileService } from "../appwrite";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);

  const isAuthor =
    post && userData ? post.userId === userData.userData.$id : false;
  console.log(isAuthor);

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) setPost(post);
        else navigate("/");
      });
    } else navigate("/");
  }, [slug, navigate]);

  const deletePost = () => {
    appwriteService.deletePost(post.$id).then((status) => {
      if (status) {
        appwriteService.deleteFile(post.featuredImage);
        navigate("/");
      }
    });
  };

  return post ? (
    <div className="py-8 bg-white">
      {isAuthor && (
        <div className="text-right">
          <Link to={`/edit-post/${post.$id}`}>
            <i className="fa fa-edit p-4 text-xl md:text-2xl text-green-700 cursor-pointer"></i>
          </Link>
          <i
            className="fa fa-trash p-4 text-xl md:text-2xl text-red-500 cursor-pointer"
            onClick={deletePost}
          ></i>
        </div>
      )}
      <Container>
        <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
          <img
            src={fileService.getFilePreview(post.featuredImage)}
            alt={post.title}
            className="rounded-xl w-[50%]"
          />
        </div>
        <div className="w-full mb-6">
          <h1 className="text-2xl font-bold">{post.title}</h1>
        </div>
        <div className="browser-css">{parse(post.content)}</div>
      </Container>
    </div>
  ) : null;
}
