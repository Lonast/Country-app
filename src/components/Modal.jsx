import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useSelector } from "react-redux";
import { selectOneCountries } from "../features/country/countrySlice";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect } from "react";
import { useState } from "react";
const icon = L.icon({
  iconUrl: "./mark.png",
  iconSize: [25, 25],
});

export default function Modal(props) {
  const country = useSelector(selectOneCountries);
  const position = [country.latlng[0], country.latlng[1]];
  const [test, setTest] = useState("");
  useEffect(() => {
    const dom = document.querySelector("svg");
    dom.innerHTML = "";
    setTest("aaa");
    console.log("aaa");
  }, [test]);
  return (
    <div className="modal-back">
      <div className="modal-body">
        <button onClick={() => props.onClick(false)}>╳</button>
        <div className="info-card">
          <h2
            style={{
              fontSize: "2.1rem",
              textAlign: "center",
              marginBottom: "15px",
            }}
          >
            {country.name.common}
          </h2>
          <div className="modal-window">
            <div className="info">
              <h3>Capital:</h3>
              <p>{country.capital}</p>
              <h3>Population:</h3>
              <p>{country.population}</p>
              <h3>Region:</h3>
              <p>{country.region}</p>
              <h3>Timezones:</h3>
              <p>{country.timezones}</p>
              <h3>Continent:</h3>
              <p>{country.continents}</p>
              <h3>Google Maps link:</h3>
              <a target="_blank" href={country.maps.googleMaps}>
                Visit
              </a>
            </div>
            <img src={country.flags.png} alt="" />
          </div>
          <div className="map-container">
            <MapContainer
              className="map"
              center={position}
              zoom={4}
              scrollWheelZoom={false}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={position} icon={icon}>
                <Popup>
                  A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
              </Marker>
            </MapContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
