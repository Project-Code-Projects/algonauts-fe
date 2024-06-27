"use client";

import { useState, useMemo } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import Post from "./post";
import { useGetPostQuery, useCreatePostMutation } from "@/redux/api/postApi";
import { useCreateCommentMutation } from "@/redux/api/commentApi";
import { getUserInfo } from "@/services/auth.service";
import { useLikePostActionMutation } from "@/redux/api/likeApi";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

// @ts-ignore
const PostForm = ({ addPost }) => {
  const [content, setContent] = useState("");

  // @ts-ignore

  const handleSubmit = (e) => {
    e.preventDefault();
    if (content) {
      addPost({ content });
      setContent("");
    }
  };

  const modules = useMemo(
    () => ({
      toolbar: [["link"], [{ "code-block": true }], ["clean"]],
    }),
    []
  );

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-8 p-4 border border-gray-300 rounded-lg bg-white shadow-md"
    >
      <ReactQuill
        value={content}
        theme="snow"
        onChange={setContent}
        modules={modules}
      />
      <button
        type="submit"
        className="mt-4 w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline"
      >
        Post
      </button>
    </form>
  );
};

const Social = () => {
  const {
    data: posts,
    isLoading: postLoading,
    isError: postError,
  } = useGetPostQuery({});

  const userInfo = getUserInfo();
  const [createPost] = useCreatePostMutation();
  const [likePost] = useLikePostActionMutation();
  const [createComment] = useCreateCommentMutation();
  const [visibleComments, setVisibleComments] = useState({});

  if (postError) {
    return <div>Error...</div>;
  }

  if (postLoading) {
    return <div>Loading...</div>;
  }
  // @ts-ignore

  const toggleCommentsVisibility = (postId) => {
    setVisibleComments((prevState) => ({
      ...prevState,
      // @ts-ignore

      [postId]: !prevState[postId],
    }));
  };
  // @ts-ignore

  const addComment = async (postId, comment) => {
    try {
      const newComment = await createComment({
        postId,
        ...comment,
        userId: userInfo?._id,
      }).unwrap();
    } catch (error) {
      console.error("Failed to create comment: ", error);
    }
  };

  // @ts-ignore

  const addPost = async (newPost) => {
    console.log("newPost: ", newPost);
    try {
      await createPost({ ...newPost, authorId: userInfo?._id }).unwrap();
    } catch (error) {
      console.error("Failed to create post: ", error);
    }
  };

  // @ts-ignore
  const likeAction = async (postId) => {
    try {
      // @ts-ignore

      console.log(postId);
      const likeData = {
        postId,
        userId: userInfo?._id,
      };

      await likePost({ post_id:postId, data:likeData }).unwrap();

    } catch (error: any) {
      console.error("Failed to like post: ", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <PostForm addPost={addPost} />

      {posts?.data.map((post: any) => (
        <Post
          key={post.id}
          post={post}
          toggleCommentsVisibility={toggleCommentsVisibility}
          visibleComments={visibleComments}
          addComment={addComment}
          likeAction={likeAction}
          currentUserId={userInfo?._id}
        />
      ))}
    </div>
  );
};

export default Social;
