import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';

const CreatePostButton = ({onPress}) => {
  return (
    <TouchableOpacity
      style={styles.fab}
      activeOpacity={0.85}
      onPress={onPress}>
      <Text style={styles.plusText}>＋</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    right: 22,
    bottom: 35,
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#FF6584',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#FF6584',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.35,
    shadowRadius: 8,
  },
  plusText: {
    color: '#FFFFFF',
    fontSize: 34,
    fontWeight: '800',
    marginTop: -2,
  },
});

export default CreatePostButton;