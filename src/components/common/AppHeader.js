import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

const AppHeader = ({
  title,
  showBack = false,
  onBackPress,
  rightComponent,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        {showBack ? (
          <TouchableOpacity
            onPress={onBackPress}
            style={styles.backButton}>
            <Text style={styles.backText}>←</Text>
          </TouchableOpacity>
        ) : null}

        <Text style={styles.title}>
          {title}
        </Text>
      </View>

      <View>
        {rightComponent}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 60,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 12,
  },
  backText: {
    fontSize: 22,
    fontWeight: '600',
    color: '#222222',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#222222',
  },
});

export default AppHeader;