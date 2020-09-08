/* @flow strict-local */
import React, { PureComponent } from 'react';
import { View, TextInput } from 'react-native';

import Input from './Input';
import type { Props as InputProps } from './Input';
import styles, { createStyleSheet, BRAND_COLOR } from '../styles';
import { Icon } from './Icons';

const componentStyles = createStyleSheet({
  clearButtonIcon: {
    color: BRAND_COLOR,
    paddingRight: 16,
  },
});

type Props = $ReadOnly<$Diff<InputProps, { textInputRef: mixed, value: mixed }>>;

type State = {|
  canBeCleared: boolean,
  text: string,
|};

/**
 * A component wrapping Input and providing an 'X' button
 * to clear the entered text.
 *
 * All props are passed through to `Input`.  See `Input` for descriptions.
 */
export default class InputWithClearButton extends PureComponent<Props, State> {
  state = {
    canBeCleared: false,
    text: '',
  };
  // TextInput's definition changes across the RN v0.61 -> v0.62
  // upgrade; we'll handle that change after the upgrade.
  // $FlowFixMe
  textInputRef = React.createRef<TextInput>();

  handleChangeText = (text: string) => {
    this.setState({
      canBeCleared: text.length > 0,
      text,
    });
    if (this.props.onChangeText) {
      this.props.onChangeText(text);
    }
  };

  handleClear = () => {
    this.handleChangeText('');
    if (this.textInputRef.current) {
      this.textInputRef.current.clear();
    }
  };

  render() {
    const { canBeCleared, text } = this.state;

    return (
      <View style={styles.row}>
        <Input
          {...this.props}
          textInputRef={this.textInputRef}
          onChangeText={this.handleChangeText}
          value={text}
        />
        {canBeCleared && (
          <Icon
            name="x"
            size={24}
            onPress={this.handleClear}
            style={componentStyles.clearButtonIcon}
          />
        )}
      </View>
    );
  }
}
