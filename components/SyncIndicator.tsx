import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {sync} from '../data/sync';

const primaryColor = '#FB8C00';
const SyncIndicator = () => {
  const [syncState, setSyncState] = useState<string>('Syncing data...');

  useEffect(() => {
    sync()
      .then(() => setSyncState(''))
      .catch(e => {
        console.log(e);

        setSyncState('Sync failed!');
      });
  });

  if (!syncState) {
    return null;
  }

  return (
    <View style={syncStyles.container}>
      <Text style={syncStyles.text}>{syncState}</Text>
    </View>
  );
};

export default SyncIndicator;

const syncStyles = StyleSheet.create({
  container: {
    paddingVertical: 5,
    alignItems: 'center',
    backgroundColor: primaryColor,
  },
  text: {
    color: '#FFFFFF',
  },
});
