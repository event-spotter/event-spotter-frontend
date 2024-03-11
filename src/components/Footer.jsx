import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";


function Footer() {
  return (
    <div className="flex bg-sky-900 fixed bottom-0 w-full">
      <div className="w-screen m-5 flex justify-center items-center gap-14 ">
      <div className="flex gap-4">
        <p className="text-sm text-white">
            Senay Asikoglu
          </p>
          <a href="https://www.linkedin.com/in/senayasikoglu/">
            <FaLinkedin style={{ color: "#eab308", fontSize: "20px"}}  />
          </a> 
          <a href="https://github.com/senayasikoglu">
            <FaGithub style={{ color: "#eab308", fontSize: "20px"}}  />
          </a>
        </div>
        <div className="flex gap-4">
        <p className="text-sm text-white">
            Melanie Schiffner
          </p>
          <a href="https://www.linkedin.com/in/melanie-schiffner-525b8aa2/">
            <FaLinkedin style={{ color: "#eab308", fontSize: "20px"}}  />
          </a> 
          <a href="https://github.com/MelSchiffner">
            <FaGithub style={{ color: "#eab308", fontSize: "20px"}}  />
          </a>
        </div>
      </div>
    </div>
  );
}

export default Footer;
