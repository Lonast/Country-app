import { useSelector } from "react-redux";
import { selectAllCountries } from "../features/country/countrySlice";

export default function Country(props) {
  return (
    <div onClick={() => props.onClick(props.country)} className="items-content">
      <p>{props.country.name.common}</p>
      <img src={props.country.flags.png} alt="flag" />
    </div>
  );
}
