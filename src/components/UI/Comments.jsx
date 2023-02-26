import React from 'react';
import axios from '../../axios';
import { useDispatch, useSelector } from 'react-redux';
import { fetchComments, fetchRemoveComment } from '../../redux/slices/comments';

const Comments = ({ id }) => {
  const { comments } = useSelector((state) => state.comments);
  const userData = useSelector((state) => state.auth.data);
  const [content, setContent] = React.useState('');
  const [, setIsLoading] = React.useState(false);
  const [isEditing, setIsEditing] = React.useState(false);
  const [commentId, setCommentId] = React.useState('');
  const getDate = (curentDate) => {
    const date = new Date(curentDate).toLocaleDateString();
    return date;
  };

  const dispatch = useDispatch();
  React.useState(() => {
    dispatch(fetchComments(id));
  }, [dispatch]);

  const onSubmit = async () => {
    try {
      setIsLoading(true);
      const fields = {
        content,
      };
      isEditing
        ? await axios.patch(`/posts/${id}/comments/${commentId}`, fields)
        : await axios.post(`/posts/${id}/comments`, fields);
      setContent('');
      setIsEditing(false);
    } catch (err) {
      console.warn(err);
      alert('Ошибка');
    }
  };
  const handleEdit = (commentContent, commentId) => {
    setCommentId(commentId);
    setContent(commentContent);
    setIsEditing(true);
  };

  const handleDelete = (commentId) => {
    dispatch(fetchRemoveComment(commentId));
  };

  const handleReply = (userName) => {
    setContent(`${userName}, `);
  };
  return (
    <section className="py-8 lg:py-16">
      <div className="max-w-2xl mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
            Комментарии ({comments.items.length})
          </h2>
        </div>
        <form className="mb-6">
          <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-stone-800 dark:border-neutral-700">
            <label htmlFor="comment" className="sr-only">
              Ваш комментарий
            </label>
            <textarea
              onChange={(e) => setContent(e.target.value)}
              value={content}
              id="comment"
              rows="6"
              className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-stone-800"
              placeholder="Напиши комментарий"
              required
            ></textarea>
          </div>
          <button
            onClick={onSubmit}
            type="button"
            className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
          >
            Оставить комментарий
          </button>
        </form>
        {comments.items.map((comment) => (
          <article
            className="p-6 text-base bg-white dark:bg-zinc-900 border-b-2 border-slate-300"
            key={comment._id}
          >
            <footer className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
                  <img
                    className="mr-2 w-6 h-6 rounded-full"
                    src={`http://localhost:4000${comment.user.avatarUrl}`}
                    alt="Michael Gough"
                  />
                  {comment.user.fullName}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <time dateTime="2022-02-08" title="February 8th, 2022">
                    {getDate(comment.createdAt)}
                  </time>
                </p>
              </div>
            </footer>

            <p className="text-gray-500 dark:text-gray-400">{comment.content}</p>

            <div className="flex items-center mt-4 space-x-4">
              <button
                onClick={() => handleReply(comment.user.fullName)}
                type="button"
                className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400"
              >
                <svg
                  aria-hidden="true"
                  className="mr-1 w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  ></path>
                </svg>
                Ответить
              </button>
              {userData._id === comment.user._id ? (
                <>
                  <button
                    onClick={() => handleDelete(comment._id, comment.user._id)}
                    type="button"
                    className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400"
                  >
                    Удалить
                  </button>
                  <button
                    onClick={() => handleEdit(comment.content, comment._id)}
                    type="button"
                    className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400"
                  >
                    Редактировать
                  </button>
                </>
              ) : (
                ''
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Comments;
