import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import Country from "./components/Country";
import Loading from "./components/Loading";
import Modal from "./components/Modal";

import {
  getCountryThunk,
  selectAllCountries,
  findCountry,
  getCountry,
} from "./features/country/countrySlice";
import useDebounce from "./hooks/useDebounce";

function App() {
  const countries = useSelector(selectAllCountries);
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [bool, setBool] = useState(false);
  const [modal, setModal] = useState(false);
  const dbSearch = useDebounce(search, 200);

  useEffect(() => {
    dispatch(getCountryThunk());
  }, []);
  function handleClick(country) {
    dispatch(getCountry(country));
    setModal(true);
  }

  return (
    <div className="container">
      {modal && <Modal onClick={setModal} />}
      <div className="container-content">
        {bool ? (
          <h2 className="title">Choose your dream country</h2>
        ) : (
          <h2>Write something...</h2>
        )}
        <input
          type="text"
          value={search}
          onFocus={() => setBool(true)}
          onChange={(e) => setSearch(e.target.value)}
        ></input>
        <div onClick={() => setModal(true)} className="items">
          {bool ? (
            countries
              .filter((item) => {
                return item.name.common
                  .toLowerCase()
                  .includes(dbSearch.toLowerCase());
              })
              .map((item) => {
                return (
                  <Country
                    onClick={handleClick}
                    key={item.name.common}
                    country={item}
                  />
                );
              })
              .slice(0, 10)
          ) : (
            <Loading />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
