import React from 'react';

const InputField = () => {
  return (
    <form className='input'>
      <input type='text' placeholder='Enter a Job' className='input__box' />
      <button className='input__submit' type='submit'>
        Go
      </button>
    </form>
  );
};

export default InputField;
