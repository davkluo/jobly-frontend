import React, { useEffect, useState } from "react";
import JobList from "./JobList";
import { useParams } from "react-router-dom";
import JoblyApi from "./helpers/api";
import './CompanyDetailPage.css'
import Col from 'react-bootstrap/Col';

/** Detail page for a company
 *
 * States:
 * -company: Object with data, isLoading
 *    -data: Object with information on company
 *      { handle, name, description, numEmployees, logoUrl, jobs }
 *      where jobs is [{ id, title, salary, equity }, ...]
 *    -isLoading: Boolean for whether company data is loading
 *
 * RoutesList -> CompanyDetailPage -> JobList
 */

function CompanyDetailPage() {
  const [company, setCompany] = useState({
    data: null,
    isLoading: true,
  });

  const { handle } = useParams();

  useEffect(function fetchCompanyOnMount() {
    async function fetchCompany() {
      let companyFromAPI;
      try {
        companyFromAPI = await JoblyApi.getCompany(handle);
      } catch (err) {
        console.error(err);
        companyFromAPI = null;
      }
      setCompany({
        data: companyFromAPI,
        isLoading: false
      })
    }

    fetchCompany();
  }, [handle]);

  if (company.isLoading) return <i>Loading...</i>;
  if (company.data === null) return <i>Company not found...</i>;

  return (
    <div className="CompanyDetailPage">

      <Col xs={11} md={8} xl={6} className="mx-auto">
        <div className='companyInfoHeading bg-dark py-4 px-4 mt-4 mb-3'>
          <h2>{company.data.name}</h2>
          <p>{company.data.description}</p>
        </div>
      </Col>

      <JobList jobs={company.data.jobs} />
    </div>
  );
}

export default CompanyDetailPage;
