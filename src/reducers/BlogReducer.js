const blogReducer = (state, { type, payload }) => {
  switch (type) {
    case 'get_blogposts': {
      return payload;
    }
    case 'delete_blogpost': {
      return state.filter(({ id }) => id !== payload);
    }
    case 'save_blogpost': {
      const { id } = payload;
      const stateCopy = [...state];
      const index = stateCopy.findIndex(post => post.id === id);
      stateCopy[index] = payload;

      return [...stateCopy];
    }
    default: {
      return state;
    }
  }
};

export default blogReducer;
