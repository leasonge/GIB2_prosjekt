import React from "react";
import "./footer.css";
import { FaFacebookSquare, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-text">
        <h3 className="h3-footer">Veien til sporet</h3>
        <p className="p-footer">
          Trondheim arrangerer ski-VM og vi vil gjøre det enklere å ta seg til
          og fra Granåsen.
        </p>
      </div>
      <div className="socialmedia">
        <a
          href="https://www.instagram.com/trondheim2025/?hl=nb"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span>
            <FaInstagram />
          </span>
        </a>
        <a
          href="https://www.facebook.com/trondheim2025/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span>
            <FaFacebookSquare />
          </span>
        </a>
        <a
          href="https://www.linkedin.com/company/trondheim2025/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span>
            <FaLinkedin />
          </span>
        </a>
      </div>
    </div>
  );
};

export default Footer;

// import React from "react";
// import './footer.css';
// import { FaFacebookSquare, FaInstagram, FaLinkedin } from "react-icons/fa"

// const Footer = () => {
//   return (
//     <div className="footer">
//       <div className="sb_footer-section_padding">
//         <div className="sb__footer-links">
//           <div className="sb__footer-links_div">
//             <h4>Kundeservice</h4>
//             <a href="/employer">
//               <p>Kontakt oss</p>
//             </a>
//           </div>
//           <div className="sb__footer-links_div">
//             <h4>Om Veien til Sporet</h4>
//             <a href="/resource">
//               <p>Om oss</p>
//             </a>
//             <a href="/resource">
//               <p>Karriere</p>
//             </a>
//             <a href="/resource">
//               <p>Media og presse</p>
//             </a>
//           </div>
//           <div className="sb__footer-links_div">
//             <h4>Vilkår og personvern</h4>
//             <a href="/employer">
//               <p>Informasjonskapsler</p>
//             </a>
//             <a href="/employer">
//               <p>Personvern</p>
//             </a>
//             <a href="/employer">
//               <p>Vilkår</p>
//             </a>
//           </div>
//           <div className="sb__footer-links_div_1">
//             <a href="/about">
//               <p>Nettstedskart</p>
//             </a>
//             <a href="press">
//               <p>Tilgjengelighetserklæring </p>
//             </a>
//           </div>
//           <div className="sb__footer-links_div">
//             <div className="socialmedia">
//               <a href="https://www.instagram.com/trondheim2025/?hl=nb" target="_blank" rel="noopener noreferrer">
//                 <span><FaInstagram /></span>
//               </a>
//               <a href="https://www.facebook.com/trondheim2025/" target="_blank" rel="noopener noreferrer">
//                 <span><FaFacebookSquare /></span>
//               </a>
//               <a href="https://www.linkedin.com/company/trondheim2025/" target="_blank" rel="noopener noreferrer">
//                 <span><FaLinkedin /></span>
//               </a>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Footer;
