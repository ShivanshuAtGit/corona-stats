import { useState, useRef } from "react";
import axios from "axios";
import CountUp from "react-countup";
import SemiCircleBar from "./components/SemiCircleBar";
import getCountryCodeOrName, { getSuggestionList } from "./helper";
import "./App.css";

let clear;

function App() {
  const initialStats = {
    totalConfirmedCases: 0,
    newlyConfirmedCases: 0,
    totalDeaths: 0,
    newDeaths: 0,
    totalRecoveredCases: 0,
    newlyRecoveredCases: 0,
  };
  const [inputVal, setInputVal] = useState("");
  const [suggestion, setSuggestion] = useState([]);
  const [stats, setStats] = useState(initialStats);
  const inputRef = useRef();

  const fetchData = async (countryCode) => {
    let options = {
      method: "GET",
      url: `https://coronavirus-smartable.p.rapidapi.com/stats/v1/${countryCode}/`,
      headers: {
        "x-rapidapi-host": "coronavirus-smartable.p.rapidapi.com",
        "x-rapidapi-key": "17cc6aafbcmsh79344338a7141f2p1c4c21jsn7b53c9041fcc",
      },
    };
    try {
      await axios.request(options).then((res) => setStats(res.data.stats));
    } catch (e) {
      console.error(e);
    }
    return null;
  };

  const handleChange = (e) => {
    setInputVal(e.target.value);
    clearTimeout(clear);
    clear = setTimeout(() => {
      const list = getSuggestionList(e.target.value);
      setSuggestion(list);
    }, 50);
  };

  const handleSubmit = (e) => {
    if (inputVal) {
      e.preventDefault();
      const countryCode = getCountryCodeOrName(inputVal);
      if (countryCode) {
        fetchData(countryCode);
      } else {
        alert("Country Name is wrong :( ");
      }
      setSuggestion([]);
      setStats(initialStats);
    }
  };

  const selectValue = (val) => {
    setInputVal(val);
    setSuggestion([val]);
    inputRef.current.focus();
  };

  const getPercentage = (newVal, totalVal) => {
    if (totalVal)
      return parseFloat(parseInt(newVal) / parseInt(totalVal)) * 100;
    return 0;
  };

  return (
    <main className="App">
      <section className="section">
        <h2>Country Corona Stats</h2>
        <form>
          <div className="input-wrapper">
            <input
              required
              ref={inputRef}
              className="country-input"
              name="country"
              placeholder="Country Name"
              onChange={handleChange}
              value={inputVal}
              autoComplete="off"
            />
            <button className="search-button" onClick={handleSubmit}>
              Go
            </button>
            {suggestion.length && inputVal.length ? (
              <ul className="suggestion-list">
                {suggestion.map((list) => (
                  <li key={list} onClick={() => selectValue(list)}>
                    {list}
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </form>
        <div className="card-wrapper confirmed">
          <div className="outer-cover-card">
            <div className="card">
              <div className="card-total">
                <h3>
                  <CountUp
                    start={0}
                    end={stats.totalConfirmedCases}
                    duration={1}
                    useGrouping={true}
                  />
                </h3>
                <p>Total</p>
              </div>
              <div className="card-new">
                <h4>
                  <CountUp
                    start={0}
                    end={stats.newlyConfirmedCases}
                    duration={1}
                    useGrouping={true}
                  />
                </h4>
                <p>New</p>
              </div>
            </div>
            <h3>Confirmed cases</h3>
          </div>

          <div className="outer-cover-card death">
            <div className="card">
              <div className="card-total">
                <h3>
                  <CountUp
                    start={0}
                    end={stats.totalDeaths}
                    duration={1}
                    useGrouping={true}
                  />
                </h3>
                <p>Total</p>
              </div>
              <div className="card-new">
                <h4>
                  <CountUp
                    start={0}
                    end={stats.newDeaths}
                    duration={1}
                    useGrouping={true}
                  />
                </h4>
                <p>New</p>
              </div>
            </div>
            <h3>Deaths</h3>
          </div>

          <div className="outer-cover-card recovered">
            <div className="card">
              <div className="card-total">
                <h3>
                  <CountUp
                    start={0}
                    end={stats.totalRecoveredCases}
                    duration={1}
                    useGrouping={true}
                  />
                </h3>
                <p>Total</p>
              </div>
              <div className="card-new">
                <h4>
                  <CountUp
                    start={0}
                    end={stats.newlyRecoveredCases}
                    duration={1}
                    useGrouping={true}
                  />
                </h4>
                <p>New</p>
              </div>
            </div>
            <h3>Recovered cases</h3>
          </div>
        </div>

        <SemiCircleBar
          smallCounter={getPercentage(stats.newDeaths, stats.totalDeaths)}
          bigCounter={getPercentage(
            stats.newlyConfirmedCases,
            stats.totalConfirmedCases
          )}
          smallerCounter={getPercentage(
            stats.newlyRecoveredCases,
            stats.totalRecoveredCases
          )}
        />
      </section>
    </main>
  );
}

export default App;
