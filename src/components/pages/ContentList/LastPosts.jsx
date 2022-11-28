import React from 'react';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

const LastPosts = ({ posts }) => {
  const getDate = (curentDate) => {
    const date = new Date(curentDate).toLocaleDateString();
    return date;
  };

  return (
    <>
      {posts.length >= 2 ? (
        <section className="px-2 lg:flex lg:space-x-2">
          <Link
            className="w-full lg:w-2/3 bg-purple-300 h-96 mb-4 relative rounded inline-block overflow-hidden"
            to={`/posts/${posts[0]._id}`}
          >
            <div className="absolute left-0 top-0 w-full h-full z-10 bg-gradient-to-b from-black/10 to-black/70 hover:from-black/10 hover:to-black/80"></div>
            <img
              className="absolute left-0 top-0 w-full h-full z-0 object-cover"
              src={`http://localhost:4000${posts[0].imageUrl}`}
              alt="1"
            />
            <div className="p-4 absolute bottom-0 left-0 z-20">
              <h2 className="text-4xl font-semibold text-gray-100 leading-tight">
                {posts[0].title}
              </h2>
              {posts[0].tags.map((tag) => (
                <span
                  key={uuidv4()}
                  className="bg-gradient-to-bl from-blue-600 to-indigo-600 text-white inline-flex items-center justify-center px-4 py-1 mb-2 rounded-md mr-2"
                >
                  {tag}
                </span>
              ))}

              <div className="flex mt-3">
                <img
                  className="h-10 w-10 rounded-full mr-2 object-cover"
                  src={`http://localhost:4000${posts[1].user.avatarUrl}`}
                  alt="author"
                />
                <div>
                  <p className="font-semibold text-gray-200 text-sm">{posts[1].user.fullName}</p>
                  <time className="text-gray-400 text-xs">{getDate(posts[1].createdAt)}</time>
                </div>
              </div>
            </div>
          </Link>
          <Link
            className="w-full lg:w-1/3 bg-indigo-300 h-96 mb-4 relative rounded inline-block overflow-hidden"
            to={`/posts/${posts[1]._id}`}
          >
            <div className="absolute left-0 top-0 w-full h-full z-10 bg-gradient-to-b from-black/10 to-black/70 hover:from-black/10 hover:to-black/80"></div>
            <img
              className="absolute left-0 top-0 w-full h-full z-0 object-cover"
              src={`http://localhost:4000${posts[1].imageUrl}`}
              alt="1"
            />
            <div className="p-4 absolute bottom-0 left-0 z-20">
              <h2 className="text-4xl font-semibold text-gray-100 leading-tight">
                {posts[1].title}
              </h2>
              {posts[1].tags.map((tag) => (
                <span
                  key={uuidv4()}
                  className="bg-gradient-to-bl from-blue-600 to-indigo-600 text-white inline-flex items-center justify-center px-4 py-1 mb-2 rounded-md mr-2"
                >
                  {tag}
                </span>
              ))}
              <div className="flex mt-3">
                <img
                  className="h-10 w-10 rounded-full mr-2 object-cover"
                  src={`http://localhost:4000${posts[1].user.avatarUrl}`}
                  alt="author"
                />
                <div>
                  <p className="font-semibold text-gray-200 text-sm">{posts[1].user.fullName}</p>
                  <time className="text-gray-400 text-xs">{getDate(posts[1].createdAt)}</time>
                </div>
              </div>
            </div>
          </Link>
        </section>
      ) : (
        <h1>Hi</h1>
      )}
    </>
  );
};

export default LastPosts;
