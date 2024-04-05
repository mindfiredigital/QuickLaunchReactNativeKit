import React, {FC, useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {PrimaryScreenProps} from 'navigation';
import {WebViewApp, WebViewAppProps} from 'components';

// Types for WebView rendering options
const webViewTypes = {uri: 'uri', html: 'html'};

/**
 * A screen component for rendering web content using WebView.
 */
export const WebViewScreen: FC<PrimaryScreenProps<'webView'>> = ({
  route,
  navigation,
}) => {
  // Extracting parameters from the route
  const {renderType, uriOrHTML, title} = route.params;
  // State to store the source object for WebView
  const [source, setSource] = useState<WebViewAppProps['source']>({});
  // Translation hook
  const {t} = useTranslation();

  // Effect to set screen title and WebView source based on parameters
  useEffect(() => {
    // Set screen title
    navigation.setOptions({title: t(title)});

    // Set WebView source based on renderType
    if (renderType === webViewTypes.html) {
      setSource({html: uriOrHTML});
    } else if (renderType === webViewTypes.uri) {
      setSource({uri: uriOrHTML});
    }
  }, []);

  return (
    <>
      {/* WebView for rendering HTTPS URL/HTML */}
      {<WebViewApp source={source} />}
    </>
  );
};
