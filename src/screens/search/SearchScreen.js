import React, {useState} from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  SafeAreaView,
  View,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';

const SearchScreen = ({navigation}) => {
  const [query, setQuery] = useState('');
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);

  const handleSearch = async () => {
    if (!query.trim()) {
      setUsers([]);
      setPosts([]);
      return;
    }

    const userSnapshot = await firestore()
      .collection('users')
      .where('name', '>=', query)
      .where('name', '<=', query + '\uf8ff')
      .get();

    const postSnapshot = await firestore()
      .collection('posts')
      .where('content', '>=', query)
      .where('content', '<=', query + '\uf8ff')
      .get();

    setUsers(
      userSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })),
    );

    setPosts(
      postSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })),
    );
  };

  const renderUser = ({item}) => (
    <TouchableOpacity
      style={styles.resultCard}
      onPress={() =>
        navigation.navigate('UserProfile', {
          userId: item.id,
        })
      }>
      <Text style={styles.resultTitle}>{item.name}</Text>
      <Text style={styles.resultSubtitle}>{item.email}</Text>
    </TouchableOpacity>
  );

  const renderPost = ({item}) => (
    <View style={styles.resultCard}>
      <Text style={styles.resultTitle}>
        {item.userName || 'Unknown User'}
      </Text>
      <Text style={styles.resultSubtitle}>{item.content}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Search</Text>

      <View style={styles.searchRow}>
        <TextInput
          style={styles.input}
          placeholder="Search users or posts..."
          value={query}
          onChangeText={setQuery}
        />

        <TouchableOpacity
          style={styles.searchButton}
          onPress={handleSearch}>
          <Text style={styles.searchButtonText}>Go</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>Users</Text>
      <FlatList
        data={users}
        keyExtractor={item => item.id}
        renderItem={renderUser}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No users found.</Text>
        }
      />

      <Text style={styles.sectionTitle}>Posts</Text>
      <FlatList
        data={posts}
        keyExtractor={item => item.id}
        renderItem={renderPost}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No posts found.</Text>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
    padding: 16,
  },
  header: {
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 15,
  },
  searchRow: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: '#DDDDDD',
  },
  searchButton: {
    backgroundColor: '#1877F2',
    paddingHorizontal: 18,
    justifyContent: 'center',
    borderRadius: 10,
    marginLeft: 8,
  },
  searchButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginVertical: 10,
  },
  resultCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 14,
    marginBottom: 10,
    elevation: 1,
  },
  resultTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1877F2',
  },
  resultSubtitle: {
    fontSize: 14,
    color: '#444444',
    marginTop: 4,
  },
  emptyText: {
    color: '#888888',
    textAlign: 'center',
    marginVertical: 10,
  },
});

export default SearchScreen;