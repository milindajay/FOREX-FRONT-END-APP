import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="footer">
            <Container fluid>
                <Row>
                    <Col md={6}>
                        {new Date().getFullYear()} &copy; &nbsp; <Link to="https://forexcellencenet.com/">Forexcellence Information Technology Services</Link>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;
