"use client";

import { useState, useEffect } from "react";
import { FaThumbsUp, FaComment } from "react-icons/fa";
import dynamic from "next/dynamic";
import hljs from "highlight.js";
import "highlight.js/styles/github.css";
import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const Post = ({
  post,
  toggleCommentsVisibility,
  visibleComments,
  addComment,
  currentUserId,
  likeAction,
}: any) => {
  const [commentContent, setCommentContent] = useState("");

  useEffect(() => {
    document.querySelectorAll("pre code").forEach((block) => {
      // @ts-ignore
      hljs.highlightElement(block);
    });
  }, [post.content, post.comments]);

  const handleCommentSubmit = (e: any) => {
    e.preventDefault();
    addComment(post.id, { content: commentContent });
    setCommentContent("");
  };

  const hasLiked = post.likes?.some(
    (like: any) => like.userId === currentUserId
  );

  return (
    <div key={post.id} className="mb-8 p-6 bg-white shadow-lg rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <div className="text-gray-700 font-bold">{post.authorId?.name}</div>
        <span className="text-gray-500 text-sm">
          {new Date(post.createdAt).toLocaleDateString()}
        </span>
      </div>
      <div
        className="text-gray-800 text-lg ql-editor"
        dangerouslySetInnerHTML={{ __html: post.content }}
      ></div>
      <div className="mt-4 flex justify-between items-center">
        <span className="text-gray-600 flex items-center">
          <button
            className={`mr-2 ${hasLiked ? "text-blue-500" : "text-gray-500"}`}
            // disabled={hasLiked}
          >
            <div className="flex">
              <FaThumbsUp
                className="mr-2"
                onClick={() => {
                  likeAction(post.id);
                }}
              />
              {post.likes?.length} Likes
            </div>
          </button>
        </span>
        <button
          onClick={() => toggleCommentsVisibility(post.id)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg flex items-center focus:outline-none focus:shadow-outline"
        >
          <FaComment className="mr-2" />
          Comments ({post.comments.length})
        </button>
      </div>
      {visibleComments[post.id] && (
        <ul className="mt-4">
          {post.comments.map((comment: any, idx: any) => (
            <li key={idx} className="border-b border-gray-300 py-2">
              <div className="text-gray-700 font-semibold">
                {comment.userId?.name}
              </div>
              <div
                className="text-gray-600"
                dangerouslySetInnerHTML={{ __html: comment.content }}
              ></div>
            </li>
          ))}
          <li>
            <form onSubmit={handleCommentSubmit} className="mt-4">
              <ReactQuill
                value={commentContent}
                onChange={setCommentContent}
                theme="snow"
              />
              <button
                type="submit"
                className="mt-4 w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline"
              >
                Post
              </button>
            </form>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Post;
