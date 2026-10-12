import React from 'react';
import PropTypes from 'prop-types';

const InputField = ({
  id, label, type, value, onChange,
}) => (
  <div className="input-field">
    <label htmlFor={id}>{label}</label>
    <input
      id={id}
      type={type}
      value={value}
      onChange={onChange}
    />
  </div>
);

InputField.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

InputField.defaultProps = {
  type: 'text',
};

export default InputField;
