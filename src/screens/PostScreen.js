import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Context } from '../context/BlogContext';
import { FontAwesome } from '@expo/vector-icons';

const PostScreen = ({ navigation }) => {
  const { state } = useContext(Context);
  const id = navigation.getParam('id');

  const blogPost = state.find(post => post.id === id);

  return (
    <View>
      <Text style={styles.title}>Title</Text>
      <Text style={styles.blogPostText}>{blogPost.title}</Text>
      <Text style={styles.title}>Content</Text>
      <Text style={styles.blogPostText}>{blogPost.content}</Text>
    </View>
  );
};

PostScreen.navigationOptions = ({ navigation }) => {
  return {
    headerRight: (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('Edit', { id: navigation.getParam('id') })
        }
      >
        <FontAwesome size={30} name='pencil' />
      </TouchableOpacity>
    )
  };
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 10
  },
  blogPostText: {
    fontSize: 20,
    margin: 10
  }
});

export default PostScreen;
