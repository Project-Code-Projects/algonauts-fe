'use client';

import { useState } from 'react';
import { FaThumbsUp, FaComment } from 'react-icons/fa';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const Post = ({ post, toggleCommentsVisibility, visibleComments, addComment }) => {
  const [commentContent, setCommentContent] = useState('');
  const [commentCode, setCommentCode] = useState('');

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    addComment(post.id, { text: commentContent, code: commentCode });
    setCommentContent('');
    setCommentCode('');
  };

  return (
    <div key={post.id} className="mb-8 p-6 bg-white shadow-lg rounded-lg">
      <div className="text-gray-800 text-lg" dangerouslySetInnerHTML={{ __html: post.content }}></div>
      {post.code && (
        <SyntaxHighlighter language="javascript" style={vscDarkPlus} className="mt-4 rounded-lg">
          {post.code}
        </SyntaxHighlighter>
      )}
      <div className="mt-4 flex justify-between items-center">
        <span className="text-gray-600 flex items-center">
          <FaThumbsUp className="mr-2" />
          {post.likes} Likes
        </span>
        <button
          onClick={() => toggleCommentsVisibility(post.id)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg flex items-center focus:outline-none focus:shadow-outline"
        >
          <FaComment className="mr-2" />
          Comments
        </button>
      </div>
      {visibleComments[post.id] && (
        <ul className="mt-4">
          {post.comments.map((comment, idx) => (
            <li key={idx} className="mt-2 text-gray-600 bg-gray-100 p-2 rounded-lg">
              <div dangerouslySetInnerHTML={{ __html: comment.text }}></div>
              {comment.code && (
                <SyntaxHighlighter language="javascript" style={vscDarkPlus} className="mt-2 rounded-lg">
                  {comment.code}
                </SyntaxHighlighter>
              )}
            </li>
          ))}
          <li className="mt-4">
            <form onSubmit={handleCommentSubmit} className="flex flex-col">
              <ReactQuill value={commentContent} onChange={setCommentContent} className="mb-2" />
              <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline">
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
