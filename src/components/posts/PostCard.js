import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';

import LikeAnimation from './LikeAnimation';

const PostCard = ({
  post,
  currentUserId,
  onLike,
  onComment,
  onEdit,
  onDelete,
  onUserPress,
}) => {
  const isOwner = currentUserId === post.userId;
  const isLiked =
    Array.isArray(post.likes) &&
    post.likes.includes(currentUserId);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => onUserPress?.(post)}>
        <Text style={styles.userName}>
          {post.userName || 'Unknown User'}
        </Text>
      </TouchableOpacity>

      <Text style={styles.content}>
        {post.content}
      </Text>

      {post.image ? (
        <Image
          source={{uri: post.image}}
          style={styles.postImage}
          resizeMode="cover"
        />
      ) : null}

      <View style={styles.statsContainer}>
        <Text style={styles.statsText}>
          {post.likes?.length || 0} Likes
        </Text>

        <Text style={styles.statsText}>
          {post.comments?.length || 0} Comments
        </Text>
      </View>

      <View style={styles.actionsContainer}>
        <TouchableOpacity
  style={styles.actionButton}
  onPress={() => onLike?.(post)}>
  <View
    style={{
      flexDirection: 'row',
      alignItems: 'center',
    }}>
    <LikeAnimation liked={isLiked} />

    <Text
      style={[
        styles.actionText,
        isLiked && styles.likedText,
        {marginLeft: 6},
      ]}>
      {isLiked ? 'Unlike' : 'Like'}
    </Text>
  </View>
</TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => onComment?.(post)}>
          <Text style={styles.actionText}>
            Comment
          </Text>
        </TouchableOpacity>

        {isOwner && (
          <>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => onEdit?.(post)}>
              <Text style={styles.actionText}>
                Edit
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => onDelete?.(post)}>
              <Text style={styles.deleteText}>
                Delete
              </Text>
            </TouchableOpacity>
          </>
        )}
      </View>

      {post.createdAt && (
        <Text style={styles.timestamp}>
          {typeof post.createdAt?.toDate === 'function'
            ? post.createdAt
                .toDate()
                .toLocaleString()
            : ''}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 14,
    borderRadius: 12,
    elevation: 2,
  },
  userName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1877F2',
    marginBottom: 8,
  },
  content: {
    fontSize: 15,
    color: '#333333',
    marginBottom: 10,
  },
  postImage: {
    width: '100%',
    height: 220,
    borderRadius: 10,
    marginBottom: 12,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  statsText: {
    fontSize: 13,
    color: '#666666',
  },
  actionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  actionButton: {
    marginRight: 18,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#444444',
  },
  likedText: {
    color: '#1877F2',
  },
  deleteText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#E53935',
  },
  timestamp: {
    marginTop: 10,
    fontSize: 12,
    color: '#999999',
  },
});

export default PostCard;