import React, { useContext } from 'react';
import { Context } from '../context/BlogContext';
import BlogPostForm from '../components/BlogPostForm';

const EditScreen = ({ navigation }) => {
  const { state, saveBlogPost } = useContext(Context);
  const id = navigation.getParam('id');

  const blogPost = state.find(
    blogPost => blogPost.id === navigation.getParam('id')
  );

  const onSubmit = (title, content) => {
    saveBlogPost(title, content, id, () => navigation.pop());
  };

  return <BlogPostForm initialValues={blogPost} onSubmit={onSubmit} />;
};

export default EditScreen;
