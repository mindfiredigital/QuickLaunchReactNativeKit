import React, {forwardRef, useImperativeHandle, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {spacing} from 'src/theme';
import {s, vs} from 'src/utils';
import {Text} from 'components';

/**
 * Display password hint text on click of left icon
 */
export const PasswordHint = forwardRef((props, ref) => {
  const {t} = useTranslation();
  const [isPasswordHintVisible, setIsPasswordHintVisible] = useState(false);

  const hintTextStyle = {
    marginLeft: s(spacing.xxxs),
    marginTop: vs(spacing.xxs),
  };

  useImperativeHandle(ref, () => ({
    toggle: () => {
      setIsPasswordHintVisible(!isPasswordHintVisible);
    },
  }));

  if (isPasswordHintVisible) {
    return (
      <Text size="body1" style={hintTextStyle}>
        {t('login.passwordHint')}
      </Text>
    );
  }

  return <></>;
});
