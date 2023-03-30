import Spinner from 'react-bootstrap/Spinner';
import Col from 'react-bootstrap/Col';
import './Loader.css';

function Loader() {
  return (
    <Col
      className="Loader d-flex align-items-center mx-auto py-4 px-4 mt-4 bg-dark"
      xs={11}
      sm={8}
      md={6}
      xl={4}
    >
      <Spinner animation="border" />
      Please wait while the data is loaded...
    </Col>
  );
}

export default Loader;