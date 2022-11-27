import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts, fetchTags } from '../../../redux/slices/posts';
import LastPosts from './LastPosts';
import Pagination from '../../UI/Pagination';
import Tags from '../../UI/Tags';
import PostSkeleton from '../../Post/PostSkeleton';
import Post from '../../Post/Post';
import FloatingButton from '../../UI/FloatingButton';
import IconPost from '../../Icons/IconPost';

const Posts = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.data);
  const { posts, tags } = useSelector((state) => state.posts);

  const isPostsLoading = posts.status === 'loading';
  const isTagsLoading = tags.status === 'loading';
  React.useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchTags());
  }, []);

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
  return (
    <>
      <div className="max-w-screen-xl mx-auto grid grid-rows-layout mt-20">
        <LastPosts posts={posts.items} />
        <main className="lg:flex">
          <>
            <div className="w-full lg:w-2/3">
              <section className="px-2">
                {posts.items.map((post) => (
                  <Post
                    key={post._id}
                    _id={post._id}
                    imageUrl={post.imageUrl}
                    description={post.description}
                    title={post.title}
                    content={post.content}
                    user={post.user}
                    createdAt={post.createdAt}
                    isEditable={userData._id === post.user._id}
                  />
                ))}
                <FloatingButton
                  link={[{ title: 'Создать статью', url: '/add-post', icon: <IconPost /> }]}
                />
              </section>
              <Pagination posts={posts.items} />
            </div>
            <div className="w-full lg:w-1/3 px-2 md:flex md:space-x-6 lg:block lg:space-x-0">
              <Tags tags={tags.items} />
            </div>
          </>
        </main>
      </div>
    </>
  );
};

export default Posts;
