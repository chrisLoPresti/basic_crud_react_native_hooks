import BlogReducer from '../reducers/BlogReducer';
import createDataContext from './createDataContext';
import jsonServer from '../api/jsonServer';

const getBlogPosts = dispatch => async () => {
  const response = await jsonServer.get('/blogPosts');
  dispatch({ type: 'get_blogposts', payload: response.data });
};

const addBlogPost = () => async (title, content, callback) => {
  try {
    await jsonServer.post('/blogPosts', { title, content });
    if (callback) {
      callback();
    }
  } catch (err) {
    console.log(err);
  }
};

const deleteBlogPost = dispatch => async id => {
  try {
    await jsonServer.delete(`/blogPosts/${id}`);
    dispatch({ type: 'delete_blogpost', payload: id });
  } catch (err) {
    console.log(err);
  }
};

const saveBlogPost = dispatch => async (title, content, id, callback) => {
  try {
    await jsonServer.put(`/blogPosts/${id}`, { title, content });
    dispatch({ type: 'save_blogpost', payload: { title, content, id } });
    if (callback()) {
      callback();
    }
  } catch (err) {
    console.log(err);
  }
};

export const { Context, Provider } = createDataContext(
  BlogReducer,
  { addBlogPost, deleteBlogPost, saveBlogPost, getBlogPosts },
  []
);
