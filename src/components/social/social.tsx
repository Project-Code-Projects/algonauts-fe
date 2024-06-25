'use client';

import { useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import Post from './post';
import { useGetPostQuery, useCreatePostMutation } from '@/redux/api/postApi';
import { getUserInfo } from '@/services/auth.service';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const PostForm = ({ addPost }) => {
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (content) {
      addPost({ content });
      setContent('');
    }
  };

  const modules = useMemo(() => ({
    toolbar: [
      ['link'],
      [{ 'code-block': true }],
      ['clean'],
    ],
  }), []);

  return (
    <form onSubmit={handleSubmit} className="mb-8 p-4 border border-gray-300 rounded-lg bg-white shadow-md">
      <ReactQuill value={content} onChange={setContent} modules={modules} />
      <button type="submit" className="mt-4 w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline">
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
  const [visibleComments, setVisibleComments] = useState({});

  if (postError) {
    return <div>Error...</div>;
  }

  if (postLoading) {
    return <div>Loading...</div>;
  }

  const toggleCommentsVisibility = (postId) => {
    setVisibleComments(prevState => ({
      ...prevState,
      [postId]: !prevState[postId],
    }));
  };

  const addComment = (postId, comment) => {
    // Add your comment creation logic here
  };

  const addPost = async (newPost) => {
    console.log('newPost: ', newPost);
    try {
      await createPost({...newPost, authorId: userInfo?._id}).unwrap();
    } catch (error) {
      console.error('Failed to create post: ', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <PostForm addPost={addPost} />
      {posts?.data.map((post) => (
        <Post
          key={post.id}
          post={post}
          toggleCommentsVisibility={toggleCommentsVisibility}
          visibleComments={visibleComments}
          addComment={addComment}
        />
      ))}
    </div>
  );
};

export default Social;
