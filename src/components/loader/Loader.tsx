import "./Loader.css";
import spinnerImage from "../../assets/spinner.svg";

export default function Loader() {
  return (
    <div id="loading-overlay">
      <img src={spinnerImage} alt="loading spinner" width="100" height="100" />
    </div>
  );
}
