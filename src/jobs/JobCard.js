import { useContext } from 'react';
import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { Link } from 'react-router-dom';
import userContext from '../auth/userContext';
import { formatSalary, formatEquity } from '../helpers/formatting';
import './JobCard.css';

/** Card with job information
 *
 * Props:
 * -job: Object with job information
 *    { id, title, salary, equity, companyName }
 *
 * JobList -> JobCard
 */

function JobCard({ job }) {
  const { hasAppliedToJob, applyToJob } = useContext(userContext);
  const hasApplied = hasAppliedToJob(job.id);

  return (
    <Card className="JobCard bg-dark mx-auto my-3">
      <OverlayTrigger
        placement="bottom"
        overlay={
          <Tooltip>
            Go to company page.
          </Tooltip>
        }
      >
        <Link to={`/companies/${job.companyHandle}`} style={{ textDecoration: 'none' }}>
          <Card.Body>
            <Card.Title>{job.title}</Card.Title>
            <hr />
            <Card.Text>
              <small>Salary: {formatSalary(job.salary)}</small>
              <small>Equity: {formatEquity(job.equity)}</small>
              <Button
                className="applyButton btn-link"
                onClick={() => applyToJob(job.id)}
                disabled={hasApplied}
              >
                {hasApplied ? "Applied!" : "Apply"}
              </Button>
            </Card.Text>
          </Card.Body>
        </Link>
      </OverlayTrigger>
    </Card>
  );
}

export default JobCard;
