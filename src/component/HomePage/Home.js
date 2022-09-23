import React, { useEffect, useState } from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [data, setData] = useState([]);
  const [fulldata, setFulldata] = useState([]);
  const [inputval, setInputVal] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [count, setCount] = useState(1);

  const getData = () => {
    setIsLoading(true);
    fetch(
      `https://api.giphy.com/v1/gifs/search?api_key=07MZjZ87W1VqObgJIDX8Ma5nsZ0siIcs&q=${inputval}}`
    )
      .then((res) => res.json())
      .then((data) => setFulldata(data.data))
      .finally(() => {
        setIsLoading(false);
      });
  };
  useEffect(() => {
    setData(fulldata.slice(8 * (count - 1), 8 * count));
  }, [fulldata, count]);

  const truncate = (str) => {
    if (str.length > 20) {
      return str.slice(0, 20) + "...";
    } else {
      return str;
    }
  };
  const HandleKey = (event) => {
    console.log("hambe");
    if (event.key === "Enter") {
      event.preventDefault();
      console.log("inputval>>>>", inputval);
      getData();
    }
  };
  let navigate = useNavigate();
  const MyImg = ({ tt }) => {
    const [isLoaded, setIsLoaded] = useState(false);
    return (
      <>
        {!isLoaded && <div class="loader"></div>}
        <img
          src={tt}
          alt="load"
          onLoad={() => {
            setIsLoaded(true);
          }}
          style={!isLoaded ? { display: "none" } : null}
        />
      </>
    );
  };
  return (
    <>
      <h1 style={{ color: "white", fontFamily: "serif" }}> Home Page</h1>
      <input
        placeholder="Search Anything You Want..."
        style={{ fontSize: "larger", paddingLeft: "10px" }}
        value={inputval}
        onChange={(event) => setInputVal(event.target.value)}
        onKeyDown={HandleKey}
      />
      <button
        style={{ width: "100px", marginLeft: "10px" }}
        onClick={() => getData()}
      >
        Search
      </button>
      <br />
      <br />
      <button
        style={{ marginBottom: "20px" }}
        onClick={() => navigate("/second")}
      >
        Trending Page{" "}
      </button>
      <div>{isLoading ? <div class="loader"></div> : null}</div>
      <div className="main">
        {data.map((e) => {
          return (
            <>
              <div className="card">
                <h3>{truncate(e.title)}</h3>
                <MyImg tt={e.images.original.url} />
              </div>
            </>
          );
        })}
      </div>
      {data.length > 0 && (
        <div className="bottom">
          <button
            style={{ width: "100px" }}
            onClick={() => {
              if (count > 1) {
                setCount(count - 1);
              }
            }}
          >
            previous page
          </button>
          <span
            style={{
              color: "white",
              height: "25px",
              width: "30px",
              display: "inline-block",
              backgroundColor: "grey",
              alignItem: "center",
              borderRadius: "50%",
              margin: "0px 10px 0px 10px",
            }}
          >
            {count}
          </span>
          <button
            style={{ width: "100px" }}
            onClick={() => {
              if (count <= 5) {
                setCount(count + 1);
              }
            }}
          >
            next page
          </button>
        </div>
      )}
    </>
  );
};
export default Home;
