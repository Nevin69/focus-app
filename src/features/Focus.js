import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';

import { colors } from '../utils/colors';
import { RoundedButton } from '../components/RoundedButton';
import { spacing } from "../utils/sizes"


export const Focus = (props) => {
  const [subject, setSubject] = useState('');

  const submitHandler = () => {
    props.addSubject(subject);
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          onChangeText={setSubject}
          style={styles.text}
          label="What would you like to focus on?"
        />
        <RoundedButton title="+" size={50} onPress={submitHandler} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
  },
  
  inputContainer: {
    padding: spacing.lg,
    alignItems: 'center',
    flexDirection: 'row',
  },
  text: {
    fontSize: 13,
    flex: 1,
    color: colors.white,
    paddingHorizontal: 20,
    marginRight: 5,
  },
});
