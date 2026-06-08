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
        <View style={styles.userRow}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {post.userName?.charAt(0)?.toUpperCase() || 'U'}
            </Text>
          </View>

          <View>
            <Text style={styles.userName}>
              {post.userName || 'Unknown User'}
            </Text>
            <Text style={styles.timeText}>Just now</Text>
          </View>
        </View>
      </TouchableOpacity>

      <Text style={styles.content}>{post.content}</Text>

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
          <View style={styles.likeRow}>
            <LikeAnimation liked={isLiked} />
            <Text
              style={[
                styles.actionText,
                isLiked && styles.likedText,
              ]}>
              {isLiked ? 'Unlike' : 'Like'}
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => onComment?.(post)}>
          <Text style={styles.actionText}>Comment</Text>
        </TouchableOpacity>

        {isOwner && (
          <>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => onEdit?.(post)}>
              <Text style={styles.actionText}>Edit</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => onDelete?.(post)}>
              <Text style={styles.deleteText}>Delete</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginVertical: 10,
    padding: 16,
    borderRadius: 18,
    elevation: 3,
  },
  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#6C63FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '800',
  },
  userName: {
    fontSize: 16,
    fontWeight: '800',
    color: '#1F2937',
  },
  timeText: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 2,
  },
  content: {
    fontSize: 15,
    color: '#374151',
    lineHeight: 22,
    marginBottom: 12,
  },
  postImage: {
    width: '100%',
    height: 220,
    borderRadius: 14,
    marginBottom: 14,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#EEF0F7',
  },
  statsText: {
    fontSize: 13,
    color: '#6B7280',
    fontWeight: '600',
  },
  actionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingTop: 6,
  },
  actionButton: {
    marginRight: 18,
    marginTop: 6,
  },
  likeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#4B5563',
    marginLeft: 6,
  },
  likedText: {
    color: '#FF6584',
  },
  deleteText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#EF4444',
  },
});

export default PostCard;