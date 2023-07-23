import React from 'react';
import {TouchableOpacity, Text, View, StyleSheet} from 'react-native';

class ButtonComponent extends React.Component {
  render() {
    const {title, onPress, backgroundColor, ...restProps} = this.props;
    const styles = StyleSheet.create({
      button: {
        borderRadius: 10,
        backgroundColor: backgroundColor || '#0079ff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        marginTop: 10,
      },
      title: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
      },
    });

    return (
      <TouchableOpacity activeOpacity={0.5} onPress={onPress}>
        <View style={styles.button} {...restProps}>
          <Text style={styles.title}>{title}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

export default ButtonComponent;
