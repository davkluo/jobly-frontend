import React from "react";
import Card from "react-bootstrap/Card";
import { formatSalary, formatEquity } from './helpers/formatting';
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
  return (
    <Card className="JobCard bg-dark mx-auto my-3">
      <Card.Body>
        <Card.Title>{job.title}</Card.Title>
        <hr/>
        {/* <Card.Text>
          {job.companyName}
        </Card.Text> */}
        <Card.Text>
          <small>Salary: {formatSalary(job.salary)}</small>
          <small>Equity: {formatEquity(job.equity)}</small>
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default JobCard;
