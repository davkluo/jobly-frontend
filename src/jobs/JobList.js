import React from 'react';
import JobCard from './JobCard';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

/** List of job cards
 *
 * Props:
 * - jobs: Array of job objects
 *    { id, title, salary, equity, companyHandle, companyName }
 * - showTooltip: boolean to display tooltip
 * - enableLink: boolean to enable link to company page
 *
 * JobsPage, CompanyDetailPage -> JobList -> JobCard
 */

function JobList({ jobs, showTooltip, enableLink }) {
  return (
    <div className='JobList'>
      <Container>
        <Row>
            {jobs.map(job =>
              <Col xs={10} md={6} xl={4} key={job.id} className='mx-auto d-flex'>
                <JobCard
                  job={job}
                  showTooltip={showTooltip}
                  enableLink={enableLink}
                />
              </Col>
            )}
        </Row>
      </Container>
    </div>
  );
}

export default JobList;