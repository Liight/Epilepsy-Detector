import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Button } from 'react-native';
import Torch from 'react-native-torch';
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isTesting: false,
      backgroundColor: '#e3e3e3'
    };
    this._handlePressStartTest = this._handlePressStartTest.bind(this)
    this._handleStartEpilepsyTest = this._handleStartEpilepsyTest.bind(this)
  }

  _handlePressStartTest = () => {
    // Starts the test
    this.setState({ isTesting: true });
    this._handleStartEpilepsyTest();
  }

  async _handleStartEpilepsyTest () {
    // Check if the test starting conditions are valid
    // Start Test Cycle
    for (let i = 0; i < 50; i++) {
      await Torch.switchState(true);
      this.setState({ backgroundColor: 'black' }, () => {
        setTimeout(() => this.setState({ backgroundColor: 'black' }), 0)
      });
      await Torch.switchState(false);
      this.setState({ backgroundColor: 'white' }, () => {
        setTimeout(() => this.setState({ backgroundColor: 'white' }), 0)
      });
    }

    // Stop Test after Test Cycle
    Torch.switchState(false); // Ensure torch is switched off
    this.setState({ isTesting: false }); // Ensure state is correct
    this.setState({ backgroundColor: '#e3e3e3' }); // reset styles
  }

  render() {

    // Initial Settings
    Torch.switchState(false);

    const styles = StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: this.state.backgroundColor,
      },
      welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
      },
      instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
      },
    });

    const button = !this.state.isTesting ? <Button
      onPress={this._handlePressStartTest.bind(this)}
      title={this.state.isTesting ? "Stop the Test" : "Start the Test"}
    /> : null;

    const text = !this.state.isTesting ? <Text style={styles.welcome}>
      Epilepsy Detector
        </Text>
      : <Text style={styles.welcome}>
        Detecting ...
        </Text>

    return (
      <View style={styles.container}>
        {text}
        {button}
      </View>
    );
  }
}

