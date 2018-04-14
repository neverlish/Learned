import Raven from 'raven-js';

const sentry_key = '621df2ccd6154fe7817901257a648306';
const sentry_app = '1189316';
export const sentry_url = `https://${sentry_key}@app.getsentry.com/${sentry_app}`;

export function logException(ex, context) {
  Raven.captureException(ex, {
    extra: context
  });
  /*eslint no-console:0*/
  window && window.console && console.error && console.error(ex);
}
