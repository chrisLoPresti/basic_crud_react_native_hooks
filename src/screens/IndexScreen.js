import React, { useContext, useEffect } from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Text, View, FlatList, TouchableOpacity } from 'react-native';
import { Context } from '../context/BlogContext';
import { Feather } from '@expo/vector-icons';

const IndexScreen = ({ navigation }) => {
  const { state, deleteBlogPost, getBlogPosts } = useContext(Context);

  useEffect(() => {
    getBlogPosts();
    const listener = navigation.addListener('didFocus', () => {
      getBlogPosts();
    });
    return () => {
      listener.remove();
    };
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={state}
        keyExtractor={({ title }) => title}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('Post', { id: item.id })}
          >
            <View style={EStyleSheet.child(styles, 'row', index, state.length)}>
              <Text style={styles.title}>{item.title}</Text>
              <TouchableOpacity onPress={() => deleteBlogPost(item.id)}>
                <Feather style={styles.deleteIcon} name='trash' />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

IndexScreen.navigationOptions = ({ navigation }) => ({
  headerRight: (
    <TouchableOpacity onPress={() => navigation.navigate('Create')}>
      <Feather size={30} name='plus' />
    </TouchableOpacity>
  )
});

const styles = EStyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderTopWidth: 1,
    borderColor: 'gray'
  },
  'row:last-child': {
    borderBottomWidth: 1
  },
  title: {
    fontSize: 18
  },
  deleteIcon: {
    fontSize: 24
  }
});

export default IndexScreen;
