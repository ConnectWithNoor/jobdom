import React, { memo } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { JobType } from '../model';
import SingleJob from './SingleJob';

type JobListProps = {
  jobs: JobType[];
  setJobs: React.Dispatch<React.SetStateAction<JobType[]>>;
  completedJobs: JobType[];
  setCompletedJobs: React.Dispatch<React.SetStateAction<JobType[]>>;
};

function JobList({
  jobs,
  setJobs,
  completedJobs,
  setCompletedJobs,
}: JobListProps) {
  return (
    <div className='container'>
      <Droppable droppableId='ActiveJobs'>
        {(provided, snapshot) => (
          <div
            className={`todos ${snapshot.isDraggingOver ? 'dragactive' : ''}`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span className='todos__heading'>Active Jobs</span>

            {jobs.map((job, index) => (
              <SingleJob
                key={job.id}
                index={index}
                job={job}
                jobs={jobs}
                setJobs={setJobs}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      <Droppable droppableId='CompletedJobs'>
        {(provided, snapshot) => (
          <div
            className={`todos remove ${
              snapshot.isDraggingOver ? 'dragcomplete' : ''
            }`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span className='todos__heading'>Completed Jobs</span>

            {completedJobs.map((job, index) => (
              <SingleJob
                key={job.id}
                job={job}
                jobs={completedJobs}
                setJobs={setCompletedJobs}
                index={index}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}

const MemoizedJobList = memo(JobList);

export default MemoizedJobList;
