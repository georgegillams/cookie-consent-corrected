const formValueChanged = (object, attributeName, event, action) => {
  const newValue = JSON.parse(JSON.stringify(object));
  newValue[attributeName] =
    event.target.value === 'on' ? event.target.checked : event.target.value;
  action(newValue);
};

export { formValueChanged };
export default {
  formValueChanged,
};
