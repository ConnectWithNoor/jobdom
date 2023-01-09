import React, { memo, useCallback, useRef, useState, useEffect } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import { MdDone } from 'react-icons/md';
import { JobType } from '../model';

type SingleJobType = {
  job: JobType;
  jobs: JobType[];
  setJobs: React.Dispatch<React.SetStateAction<JobType[]>>;
  index: number;
};

function SingleJob({ job, jobs, setJobs, index }: SingleJobType) {
  const [edit, setEdit] = useState(false);
  const [editJobText, setJobText] = useState(job.job);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);

  const handleDone = useCallback(
    (id: number) => {
      const jobsMutated = jobs.map((_job) => {
        if (_job.id === id) {
          return {
            ..._job,
            isCompleted: !_job.isCompleted,
          };
        } else {
          return _job;
        }
      });

      setJobs(jobsMutated);
    },
    [jobs, setJobs]
  );

  const handleDelete = (id: number) => {
    const filteredJobs = jobs.filter((job) => job.id !== id);

    setJobs(filteredJobs);
  };

  const handleEdit = (e: React.FormEvent<HTMLFormElement>, id: number) => {
    e.preventDefault();

    setJobs(
      jobs.map((job) => (job.id === id ? { ...job, job: editJobText } : job))
    );
    setEdit(false);
  };

  return (
    <Draggable draggableId={job.id.toString()} index={index}>
      {(provided, snapshot) => (
        <form
          className={`todos__single ${snapshot.isDragging ? 'drag' : ''}`}
          onSubmit={(e) => handleEdit(e, job.id)}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          {edit ? (
            <input
              className='todos__single--text'
              value={editJobText}
              ref={inputRef}
              onChange={(e) => setJobText(e.target.value)}
            />
          ) : job.isCompleted ? (
            <s className='todos__single--text'>{job.job}</s>
          ) : (
            <span className='todos__single--text'>{job.job}</span>
          )}

          <span
            className='icon'
            onClick={() =>
              !edit && !job.isCompleted && setEdit((prev) => !prev)
            }
          >
            <AiFillEdit />
          </span>
          <div>
            <span className='icon'>
              <AiFillDelete onClick={() => handleDelete(job.id)} />
            </span>
            <span className='icon' onClick={() => handleDone(job.id)}>
              <MdDone />
            </span>
          </div>
        </form>
      )}
    </Draggable>
  );
}

const MemorizedSingleJob = memo(SingleJob);

export default MemorizedSingleJob;
