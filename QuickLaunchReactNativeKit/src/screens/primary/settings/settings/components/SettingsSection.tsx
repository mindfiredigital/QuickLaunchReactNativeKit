import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {Card, Text} from '../../../../../components';
import {Colors, spacing} from '../../../../../theme';
import {s, vs} from '../../../../../utils';

interface SettingsSectionProps {
  /**
   * title for the setting section
   */
  title?: string;
  /**
   * Children components.
   */
  children?: React.ReactNode;
}

export const SettingsSection: React.FC<SettingsSectionProps> = ({
  title,
  children,
}) => {
  const {colors} = useTheme();
  const styles = makeStyles(colors);
  return (
    <View style={styles.sectionContainer}>
      {/* Section Title */}
      {!!title && (
        <Text size="h3" style={styles.sectionTitle}>
          {title}
        </Text>
      )}
      <Card>
        {/* Settings Items */}
        {children}
      </Card>
    </View>
  );
};

const makeStyles = (colors: Colors) =>
  StyleSheet.create({
    sectionContainer: {
      marginTop: vs(spacing.lg),
    },
    sectionTitle: {
      marginBottom: s(spacing.sm),
    },
  });
