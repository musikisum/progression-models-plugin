import { Form, Input } from 'antd';
import { useTranslation } from 'react-i18next';
import React, { useEffect, useState } from 'react';
import Logger from '@educandu/educandu/common/logger.js';
import Markdown from '@educandu/educandu/components/markdown.js';
import HttpClient from '@educandu/educandu/api-clients/http-client.js';
import { handleApiError } from '@educandu/educandu/ui/error-helper.js';
import { useService } from '@educandu/educandu/components/container-context.js';
import { useDateFormat } from '@educandu/educandu/components/locale-context.js';
import { sectionDisplayProps } from '@educandu/educandu/ui/default-prop-types.js';

const POLL_INTERVAL_IN_MS = 5000;

const logger = new Logger(import.meta.url);

export default function ServerTimeDisplay({ content, input, canModifyInput, onInputChanged }) {
  const { formatDate } = useDateFormat();
  const httpClient = useService(HttpClient);
  const [serverTime, setServerTime] = useState(null);
  const { t } = useTranslation('educandu/educandu-plugin-example');

  const handleCurrentValueChange = event => {
    onInputChanged({ value: event.target.value });
  };

  useEffect(() => {
    let nextTimeout = null;

    const getUpdate = async () => {
      try {
        const response = await httpClient.get(
          '/api/v1/plugin/educandu/educandu-plugin-example/time',
          { responseType: 'json' }
        );

        setServerTime(response.data.time);
        nextTimeout = setTimeout(getUpdate, POLL_INTERVAL_IN_MS);
      } catch (error) {
        handleApiError({ error, logger, t });
      }
    };

    nextTimeout = setTimeout(getUpdate, 0);

    return () => {
      if (nextTimeout) {
        clearTimeout(nextTimeout);
      }
    };
  }, [httpClient, t]);

  return (
    <div className="EP_Educandu_Example_Display">
      <div className={`u-horizontally-centered u-width-${content.width}`}>
        <Markdown renderAnchors>
          {content.text}
        </Markdown>
        <Form layout="vertical">
          <Form.Item label={t('label')}>
            <Input
              value={input.data?.value || ''}
              maxLength={100}
              disabled={!canModifyInput}
              readOnly={!canModifyInput}
              onChange={handleCurrentValueChange}
              />
          </Form.Item>
        </Form>
        {!!serverTime && (
          <div className="EP_Educandu_Example_Display-time">
            {t('currentServerTime')}: {formatDate(serverTime)}
          </div>
        )}
      </div>
    </div>
  );
}

ServerTimeDisplay.propTypes = {
  ...sectionDisplayProps
};
