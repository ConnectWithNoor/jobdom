import React, { useCallback, useState } from 'react';
import './App.css';
import './components/style.css';
import InputField from './components/InputField';
import { JobType } from './model';
import JobList from './components/JobList';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';

function App(): React.ReactElement {
  const [job, setJob] = useState('');
  const [jobs, setJobs] = useState<JobType[]>([]);
  const [completedJobs, setCompletedJobs] = useState<JobType[]>([]);

  const handleAdd = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (!job.trim()) return;

      const newJob: JobType = {
        job,
        id: jobs.length + 1,
        isCompleted: false,
      };

      setJobs((prev) => [...prev, newJob]);
      setJob('');
    },
    [job, jobs.length]
  );

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) return;

    if (source.droppableId === destination.droppableId) {
      if (source.index === destination.index) return;
    }

    let add;
    let activeJobs = jobs;
    let _completedJobs = completedJobs;

    if (source.droppableId === 'ActiveJobs') {
      add = activeJobs[source.index];
      activeJobs.splice(source.index, 1);
    } else {
      add = _completedJobs[source.index];
      _completedJobs.splice(source.index, 1);
    }

    if (destination.droppableId === 'ActiveJobs') {
      activeJobs.splice(destination.index, 0, add);
    } else {
      _completedJobs.splice(destination.index, 0, add);
    }

    setCompletedJobs(_completedJobs);
    setJobs(activeJobs);
  };

  return (
    <div className='App'>
      <DragDropContext onDragEnd={onDragEnd}>
        <span className='heading'>Jobdom</span>

        <InputField job={job} setJob={setJob} handleAdd={handleAdd} />
        <JobList
          jobs={jobs}
          setJobs={setJobs}
          completedJobs={completedJobs}
          setCompletedJobs={setCompletedJobs}
        />
      </DragDropContext>
    </div>
  );
}

export default App;
