'use client';

import { useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import Post from './post';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const PostForm = ({ addPost }) => {
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (content) {
      addPost({ content, likes: 0, comments: [] });
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
  const [posts, setPosts] = useState([
    {
      id: 1,
      content: '<p>This is the first post. Welcome to our platform!</p>',
      code: `console.log('Welcome!');`,
      likes: 10,
      comments: [
        { text: '<p>Great post!</p>', code: '' },
        { text: '<p>Very informative.</p>', code: '' },
      ],
    },
    {
      id: 2,
      content: '<p>Hello, world!</p>',
      code: `console.log('Hello, world!');`,
      likes: 20,
      comments: [
        { text: '<p>Nice code!</p>', code: `console.log('Nice!');` },
        { text: '<p>I learned something new.</p>', code: '' },
      ],
    },
  ]);

  const [visibleComments, setVisibleComments] = useState({});

  const toggleCommentsVisibility = (postId) => {
    setVisibleComments(prevState => ({
      ...prevState,
      [postId]: !prevState[postId],
    }));
  };

  const addComment = (postId, comment) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return { ...post, comments: [...post.comments, comment] };
      }
      return post;
    }));
  };

  const addPost = (newPost) => {
    setPosts(prevPosts => [
      ...prevPosts,
      { ...newPost, id: prevPosts.length + 1 }
    ]);
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <PostForm addPost={addPost} />
      {posts.map((post) => (
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
