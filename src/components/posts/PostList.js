import React from 'react';
import {FlatList} from 'react-native';

import PostCard from './PostCard';
import EmptyState from '../common/EmptyState';

const PostList = ({
  posts = [],
  currentUserId,
  onLike,
  onComment,
  onEdit,
  onDelete,
  onUserPress,
}) => {
  const renderItem = ({item}) => (
    <PostCard
      post={item}
      currentUserId={currentUserId}
      onLike={onLike}
      onComment={onComment}
      onEdit={onEdit}
      onDelete={onDelete}
      onUserPress={onUserPress}
    />
  );

  return (
    <FlatList
      data={posts}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={
        <EmptyState
          title="No Posts Yet"
          description="Create your first post to get started."
        />
      }
    />
  );
};

export default PostList;