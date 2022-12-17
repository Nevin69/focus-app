import React, { useState } from 'react';
import { View, StyleSheet, Text, Vibration } from 'react-native';
import { Countdown } from '../components/Countdown';
import { RoundedButton } from '../components/RoundedButton';
import { spacing } from '../utils/sizes';
import { colors } from '../utils/colors';
import { ProgressBar } from 'react-native-paper';
import { Timing } from "./Timing"
import { useKeepAwake } from 'expo-keep-awake';

 const ONE_SECOND_IN_MS = 1000;

  const PATTERN = [
    1 * ONE_SECOND_IN_MS,
    1 * ONE_SECOND_IN_MS,
    1 * ONE_SECOND_IN_MS,
    1 * ONE_SECOND_IN_MS,
    1 * ONE_SECOND_IN_MS,
  ];



export const Timer = (props) => {
  useKeepAwake();
  const [isStarted, setIsStarted] = useState(false);
  const [progress , setProgress] = useState(1);
  const [minutes, setMinutes] = useState(0.1)

  const onEnd = (reset) => {
    // Vibration.vibrate(PATTERN);
    setIsStarted(false);
    setProgress(1);
    reset();
    props.onTimerEnd(props.focusSubject)
  }

  return (
    <View style={styles.container}>
      <View style={styles.countdown}>
        <Countdown
          minutes={minutes}
          isPaused={!isStarted}
          onEnd={onEnd}
          onProgress={(progress) => { setProgress(progress)}}
        />
        <View style={{ paddingTop: spacing.xxl }}>
          <Text style={styles.title}>Focusing on</Text>
          <Text style={styles.task}>{props.focusSubject}</Text>
        </View>
      </View>
      <View style={{ paddingTop: spacing.sm }}>
        <ProgressBar
          progress={progress}
          style={{ height: spacing.sm }}
          color={colors.lightGreen}
        />
      </View>

      <View style={styles.timingWrapper}>
        <Timing onChangeTime={setMinutes}/>
      </View>

      <View style={styles.buttonWrapper}>
        {!isStarted ? (
          <RoundedButton
            title="start"
            onPress={() => {
              setIsStarted(true);
            }}
          />
        ) : (
          <RoundedButton
            title="pause"
            onPress={() => {
              setIsStarted(false);
            }}
          />
        )}
      </View>
      <View style={styles.resetWrapper}>
        <RoundedButton size={50} title="-" onPress={props.clearSubject}/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  countdown: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonWrapper: {
    flex: 0.3,
    flexDirection: 'row',
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timingWrapper: {
    flex: 0.1,
    paddingTop: spacing.xxl,
    flexDirection: 'row'
  },
  title: {
    color: colors.white,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  task: {
    color: colors.white,
    textAlign: 'center',
  },
  resetWrapper: {
    flexDirection: 'row',
    justifyContent: 'center'
  }
});
