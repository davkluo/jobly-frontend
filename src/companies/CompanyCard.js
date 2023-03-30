import React from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import "./CompanyCard.css";

/** Card displaying company information
 *
 * Props:
 * - company: Object with information on company
 *    { handle, name, description, numEmployees, logoUrl, jobs }
 *
 * CompanyList -> CompanyCard
 */

function CompanyCard({ company }) {
  return (
    <Card className="CompanyCard bg-dark mx-auto my-3">
      <Link to={`${company.handle}`} style={{ textDecoration: 'none' }}>
        <Card.Body className="CardBody">
          {company.logoUrl
            ? <Card.Img
                className="mb-4"
                variant="top"
                src={company.logoUrl}
                alt={`Company logo image for ${company.name}`}
              />
            : <Card.Img
              className="mb-4"
              variant="top"
              src="/logos/logo1.png"
              alt="Default company logo image"
              />
          }
          <Card.Title >{company.name}</Card.Title>
          <hr />
          <Card.Text>
            <small>
              {company.description}
            </small>
          </Card.Text>
        </Card.Body>
      </Link>
    </Card>
  );
}

export default CompanyCard;
