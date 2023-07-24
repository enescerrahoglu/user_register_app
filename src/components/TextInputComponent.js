import React from 'react';
import {TextInput, StyleSheet} from 'react-native';

class TextInputComponent extends React.Component {
  render() {
    const {fontSize, maxLength = 1000, ...restProps} = this.props;
    const styles = StyleSheet.create({
      textInput: {
        backgroundColor: '#e7e9ec',
        borderRadius: 10,
        paddingHorizontal: 10,
        marginTop: 10,
        fontSize: fontSize || 16,
        color: '#000',
      },
    });
    return (
      <TextInput
        style={styles.textInput}
        maxLength={maxLength}
        {...restProps}
      />
    );
  }
}

export default TextInputComponent;
