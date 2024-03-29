import React, { useEffect, useState } from 'react';
import SearchForm from '../common/SearchForm';
import JobList from './JobList';
import JoblyApi from '../helpers/api';
import Loader from '../common/Loader';

/** All jobs page
 *
 * State:
 * - jobs: Object consisting of data, isLoading
 *    -data: Array of job objects
 *      { id, title, salary, equity, companyHandle, companyName }
 *    -isLoading: Boolean for whether the jobs data is loading
 *
 * RoutesList -> JobsPage -> { SearchForm, JobList }
 */

function JobsPage() {
  const [jobs, setJobs] = useState({
    data: null,
    isLoading: true
  });

  useEffect(function fetchJobsOnMount() {
    fetchJobs()
  }, []);

  async function fetchJobs(searchTerm) {
    let jobsFromAPI;
    try{
      jobsFromAPI = await JoblyApi.getJobs(searchTerm);
    } catch (err) {
      console.error(err);
      jobsFromAPI = null;
    }
    setJobs({
      data: jobsFromAPI ? [...jobsFromAPI] : null,
      isLoading: false
    });
  }

  if (jobs.isLoading) return <Loader />;
  if (jobs.data === null) return <i>Error retrieving Jobs...</i>

  return (
    <div className='JobsPage'>
      <SearchForm search={fetchJobs} message="Search for a job"/>
      <JobList jobs={jobs.data} showTooltip={true} enableLink={true}/>
    </div>
  );
}

export default JobsPage