import safeCompare from 'safe-compare';

export function find(values, id, matchOn = 'id') {
  let existingValue = null;
  let existingValueIndex = -1;
  for (let it = 0; it < values.length; it += 1) {
    const valueToMatch = values[it][matchOn] || 'UNDEFINED_VALUE';
    const idToMatch = id || 'UNDEFINED_ID';
    if (safeCompare(valueToMatch, idToMatch)) {
      existingValue = values[it];
      existingValueIndex = it;
    }
  }

  return { existingValue, existingValueIndex };
}

export function emailFingerprint(emailAddress) {
  const emailSplit = emailAddress.split('@');
  let user = emailSplit[0].split('.').join('');
  user = user.split('+')[0];
  const emailDomain = emailSplit[1];

  return `${user}@${emailDomain}`;
}
