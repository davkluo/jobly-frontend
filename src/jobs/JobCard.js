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
 * - job: Object with job information
 *    { id, title, salary, equity, companyName }
 * - showTooltip: boolean to display tooltip
 * - enableLink: boolean to enable link to company page
 *
 * JobList -> JobCard
 */

function JobCard({ job, showTooltip, enableLink }) {
  const { hasAppliedToJob, applyToJob } = useContext(userContext);
  const hasApplied = hasAppliedToJob(job.id);

  return (
    <Card className="JobCard bg-dark mx-auto my-3">
      <OverlayTrigger
        placement="bottom"
        overlay={
          showTooltip ?
          <Tooltip>Go to company page.</Tooltip> :
          <></>
        }
      >
        <Link
          to={`/companies/${job.companyHandle}`}
          style={{
            textDecoration: 'none',
            pointerEvents: enableLink ? '' : 'none',
          }}
        >
          <Card.Body>
            <Card.Title>{job.title}</Card.Title>
            <hr />
            <Card.Text>
              <small>Salary: {formatSalary(job.salary)}</small>
              <small>Equity: {formatEquity(job.equity)}</small>
              <Button
                className="applyButton btn-link"
                onClick={(e) => {
                  e.preventDefault();
                  applyToJob(job.id);
                }}
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
