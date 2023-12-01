import React, {FC} from 'react';
import {View, Text, TouchableHighlight,StyleSheet} from 'react-native';

const primaryColor ='#FB8C00'
const Header: FC<{onOpenCreator: () => void}> = ({onOpenCreator}) => {
  return (
    <>
      <View style={headerStyles.container}>
        <Text style={headerStyles.headerTitle}>Weightress</Text>
        <TouchableHighlight
          style={headerStyles.addButton}
          onPress={() => onOpenCreator()}>
          <Text>+ Add</Text>
        </TouchableHighlight>
      </View>
    </>
  );
};

export default Header;

const headerStyles = StyleSheet.create({
    container: {
        alignItems: 'center',
        paddingVertical: 20,
        flexDirection: 'row',
        paddingHorizontal: 15,
        justifyContent: 'space-between',
      },
      addButton: {
        borderColor: primaryColor,
        paddingHorizontal: 20,
        paddingVertical: 8,
        borderRadius: 3,
        borderWidth: 1,
      },
      headerTitle: {
        fontSize: 25,
        fontWeight: 'bold',
        borderLeftWidth: 3,
        paddingLeft: 10,
        borderLeftColor: primaryColor,
      },
})