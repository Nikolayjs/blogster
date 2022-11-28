import React from 'react';

const TextField = ({
  label,
  inputId,
  value,
  onChange,
  errors,
  helperText,
  type,
  ref,
  style = '',
}) => {
  return (
    <div className="relative z-0 mb-6 w-full group">
      <input
        type={type ? type : 'text'}
        name={inputId}
        id={inputId}
        value={value}
        ref={ref}
        className={
          errors
            ? `block py-2.5 px-0 w-full text-xl text-gray-900 bg-transparent border-0 border-b-2 border-red-300 appearance-none dark:text-white dark:border-red-600 dark:focus:border-red-500 focus:outline-none focus:ring-0 focus:border-red-600 peer`
            : `${style} block py-2.5 px-0 w-full text-xl text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer`
        }
        placeholder=" "
        onChange={onChange}
      />
      {label && (
        <label
          htmlFor={inputId}
          className="peer-focus:font-medium absolute text-md text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          {label}
        </label>
      )}
      {errors ? <p>{helperText}</p> : ''}
    </div>
  );
};

export default TextField;
