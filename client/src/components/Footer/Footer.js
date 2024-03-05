import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./Footer.css";

const Footer = () => {
  return (
    <div id="footer" >

      <Row className="left">
        <Col sm={7} >
          <p className="footer-header turquoise-text">A To Zion Web Design, LLC</p>
          <p>
            <span className="turquoise-text">A To Zion Web Design, LLC</span> is a boutique web development and design
            company. From business cards to simple websites to complex custom web applications, we
            got you! With over 15 years of experience developing custom, high-traffic web applications- we have got you covered. We look forward to
            working with you!
          </p>
          <p>
            Check us out-{" "}
            <a href="http://www.atozionwebdesign.com" style={{textDecoration:"none"}}>
              A To Zion Web Design, LLC
            </a>
          </p>
          <p className="footer-subheader">Stay in touch</p>
          <p>
            <i className="bi bi-facebook sm-icon"> </i>
            <i className="bi bi-instagram sm-icon"></i>
            <i className="bi bi-twitter-x sm-icon"></i>
            <i className="bi bi-pinterest sm-icon"></i>
            <i className="bi bi-youtube sm-icon"></i>
          </p>
        </Col>
        <Col sm={1}>
        </Col>
        <Col sm={2}>
        <p className="footer-subheader">Services</p>
        <ul>
            <li>Custom Website Design & Development</li>
            <li>eCommerce Website Development</li>
            <li>Email Marketing</li>
            <li>Graphic Design & Branding</li>
            <li>Mobile Application Development</li>
            <li>Portfolio Showcase</li>
            <li>UI / UX Design</li>
            <li>...and so much more!</li>
          </ul>
        </Col>
        <Col sm={2}>
          <p className="footer-subheader">Site Links</p>
          <ul>
            <li>Login</li>
            <li>Signup</li>
            <li>How To Play</li>
          </ul>
        </Col>
      </Row>

      <div id="copyrightDiv">
      <p className="no-margin">Web app designed, developed & maintained by <span className="turquoise-text ">Ashley Stith- CEO / Lead Developer of A To Zion Web Design, LLC</span>.</p>
        <p id="copyright">
          <i className="bi bi-c-circle"></i> 2024 A To Zion Web Design, LLC |
          All Rights Reserved
        </p>
      </div>
    </div>
  );
};

export default Footer;
