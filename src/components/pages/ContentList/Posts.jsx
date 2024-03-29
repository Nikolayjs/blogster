import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllTags, fetchPosts, fetchTags } from '../../../redux/slices/posts';
import Pagination from '../../UI/Pagination';
import Tags from '../../UI/Tags';
import PostSkeleton from '../../Post/PostSkeleton';
import Post from '../../Post/Post';
import FloatingButton from '../../UI/FloatingButton';
import IconPost from '../../Icons/IconPost';
import paginate from '../../../utils/paginate';
import Button from '../../UI/Button';
import { useContent } from '../../../hooks/useContent';
import TextField from '../../UI/TextField';
import { useNavigate } from 'react-router-dom';
import LastPosts from './LastPosts';

const Posts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = React.useState(1);
  const userData = useSelector((state) => state.auth.data);
  const { posts, tags } = useSelector((state) => state.posts);
  const [filter, setFilter] = React.useState({ sort: '', filter: '', query: '' });
  const sortedAndSearchedContent = useContent(
    posts.items,
    filter.sort,
    filter.filter,
    filter.query
  );
  const pageSize = 10;

  React.useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchTags());
  }, [dispatch]);

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  if (posts.items.length === 0) {
    return (
      <>
        <PostSkeleton />
        <FloatingButton
          link={[{ title: 'Создать статью', url: '/add-post', icon: <IconPost /> }]}
        />
      </>
    );
  }

  const goToTags = () => {
    navigate('/tags/all-tags');
  };
  const count = sortedAndSearchedContent.length;
  const postsCrop = paginate(sortedAndSearchedContent, currentPage, pageSize);
  return (
    <>
      <div className="max-w-screen-xl mx-auto grid grid-rows-layout mt-20">
        <LastPosts posts={posts.items} />
        <main className="lg:flex">
          <>
            <div className="w-full lg:w-2/3">
              <section className="px-2">
                <TextField
                  type="text"
                  label="Поиск"
                  value={filter.query}
                  onChange={(e) => setFilter({ ...filter, query: e.target.value })}
                />
                {postsCrop?.map((post) => {
                  return (
                    <Post
                      key={post._id}
                      _id={post._id}
                      imageUrl={post.imageUrl}
                      description={post.description}
                      title={post.title}
                      content={post.content}
                      user={post.user}
                      createdAt={post.createdAt}
                      isEditable={userData?._id === post.user._id}
                    />
                  );
                })}
                {userData?._id ? (
                  <FloatingButton
                    link={[{ title: 'Создать статью', url: '/add-post', icon: <IconPost /> }]}
                  />
                ) : (
                  ''
                )}
              </section>
              <Pagination
                itemsCount={count}
                pageSize={pageSize}
                changePage={handlePageChange}
                currentPage={currentPage}
              />
            </div>

            <div className="w-ful lg:w-1/3 px-2 md:flex flex-col md:space-x-6 lg:block lg:space-x-0 justify-center align-middle text-center items-center">
              <h5 className="font-bold mt-3 text-lg uppercase dark:text-white text-gray-700 mb-2">
                Последние теги
              </h5>
              <Tags tags={tags.items} filter={filter} handleTag={setFilter} posts={posts} />
              <Button className="md:w-1/2" onClick={goToTags}>
                Показать все теги
              </Button>
            </div>
          </>
        </main>
      </div>
    </>
  );
};

export default Posts;
