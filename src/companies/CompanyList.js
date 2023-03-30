import React from 'react';
import CompanyCard from './CompanyCard';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

/** List of company cards
 *
 * Props:
 * - companies: Array of company objects
 *    { handle, name, description, numEmployees, logoUrl}
 *
 * CompaniesPage -> CompanyList -> CompanyCard
 */

function CompanyList({ companies }) {
  return (
    <div className='CompanyList'>
      <Container>
        <Row>
          {companies.map(company =>
            <Col xs={10} md={6} xl={4} key={company.handle} className="mx-auto d-flex">
              <CompanyCard
                company={company}
              />
            </Col>
          )}
        </Row>
      </Container>
    </div>
  );
}

export default CompanyList;