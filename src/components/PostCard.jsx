import React from "react";
import { fileService } from "../appwrite";
import { Link } from "react-router-dom";

function PostCard({ $id, title, featuredImage, content }) {
  return (
    <Link to={`/post/${$id}`}>
      <div id="webcrumbs">
        <div className="w-[400px] bg-white shadow-lg rounded-lg">
          <div className="relative w-full h-[200px]">
            <img
              src={fileService.getFilePreview(featuredImage)}
              alt="Blog Cover"
              className="w-full h-full object-cover rounded-t-lg"
            />
          </div>
          <div className="p-6">
            <h1 className="text-2xl font-title text-neutral-950 mb-4">
              {title}
            </h1>
            <p className="text-neutral-800">
              {content.length > 100
                ? content.substring(0, 100) + "..."
                : content}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default PostCard;
