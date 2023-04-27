export const sendEvent = ({ event = 'event', action = '<button_click>', type, value, currency }) => {
  const settings = { '<action>': action };
  if (value) settings['<value>'] = value;
  if (currency) settings['<currency>'] = currency;
  gtag(event, type, settings);
};
