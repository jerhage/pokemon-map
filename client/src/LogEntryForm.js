import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { postLogEntry } from './API';

const LogEntryForm = ({ entryLocation, onClose }) => {
  const { register, handleSubmit } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      data.latitude = entryLocation.latitude;
      data.longitude = entryLocation.longitude;
      const posted = await postLogEntry(data);
      console.log(posted);
      onClose();
    } catch (error) {
      console.error(error);
      setError(error.mesage);
    }
    setIsLoading(false);
  };
  return (
    <form className="log-entry-form" onSubmit={handleSubmit(onSubmit)}>
      {error ? <h3 className="error-message">{error}</h3> : null}
      <label htmlFor="title"> Title</label>
      <input required name="title" ref={register} />
      <label htmlFor="description"> Description</label>
      <textarea name="description" rows={3} ref={register} />
      <label htmlFor="comments"> Comments</label>
      <textarea name="comments" rows={3} ref={register} />
      <label htmlFor="rating">Rating </label>
      <input name="rating" ref={register} />
      <label htmlFor="visit-date"> Date Visited</label>
      <input required name="visitDate" type="date" ref={register} />
      <button disabled={isLoading}>
        {isLoading ? 'Loading' : 'Create Entry'}
      </button>
    </form>
  );
};

export default LogEntryForm;
