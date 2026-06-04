import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

const EmptyState = ({
  title = 'No Data Found',
  description = '',
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {title}
      </Text>

      {description ? (
        <Text style={styles.description}>
          {description}
        </Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: 180,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#444444',
    textAlign: 'center',
  },
  description: {
    marginTop: 8,
    fontSize: 14,
    color: '#888888',
    textAlign: 'center',
  },
});

export default EmptyState;