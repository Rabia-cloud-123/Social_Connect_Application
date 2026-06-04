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
      activeOpacity={0.8}
      onPress={onPress}>
      <Text style={styles.plusText}>+</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 25,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#1877F2',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  plusText: {
    color: '#FFFFFF',
    fontSize: 30,
    fontWeight: '700',
    marginTop: -2,
  },
});

export default CreatePostButton;