import React, { memo, useRef } from 'react';

type InputFieldProps = {
  job: string;
  setJob: React.Dispatch<React.SetStateAction<string>>;
  handleAdd: (e: React.FormEvent<HTMLFormElement>) => void;
};

const InputField = ({ job, setJob, handleAdd }: InputFieldProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setJob(e.target.value);

  return (
    <form
      className='input'
      onSubmit={(e) => {
        handleAdd(e);
        inputRef.current?.blur();
      }}
    >
      <input
        type='text'
        value={job}
        onChange={handleChange}
        placeholder='Enter a Job'
        className='input__box'
        ref={inputRef}
      />
      <button className='input__submit' type='submit'>
        Go
      </button>
    </form>
  );
};

const MemorizedInputField = memo(InputField);

export default MemorizedInputField;
