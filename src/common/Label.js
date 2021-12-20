/* @flow strict-local */
import React, { PureComponent } from 'react';
import type { Node } from 'react';
import { FormattedMessage } from 'react-intl';

import type { BoundedDiff } from '../generics';
import RawLabel from './RawLabel';
import type { LocalizableReactText } from '../types';

type Props = $ReadOnly<{|
  ...BoundedDiff<$Exact<React$ElementConfig<typeof RawLabel>>, {| +children: ?Node |}>,
  text: LocalizableReactText,
|}>;

/**
 * A wrapper for `RawLabel` that also translates the text.
 *
 * Use `RawLabel` instead if you don't want the text translated.
 *
 * Unlike `RawLabel`, only accepts a `LocalizableReactText`, as the `text`
 * prop, and doesn't support `children`.
 */
export default class Label extends PureComponent<Props> {
  render(): Node {
    const { text, ...restProps } = this.props;

    const message = typeof text === 'object' ? text.text : text;
    const values = typeof text === 'object' ? text.values : undefined;

    return (
      <RawLabel {...restProps}>
        <FormattedMessage
          id={message}
          // If you see this in dev, it means there's a user-facing string
          // that hasn't been added to
          // static/translations/messages_en.json. Please add it! :)
          defaultMessage={
            process.env.NODE_ENV === 'development'
              ? `UNTRANSLATED—${message}—UNTRANSLATED`
              : message
          }
          values={values}
        />
      </RawLabel>
    );
  }
}
