import React, { useEffect, useState } from "react";
import "./Second.css";
import { useNavigate } from "react-router-dom";

const Second = () => {
  const [mydata, setMyData] = useState([]);
  const [fullmydata, setFullMyData] = useState([]);
  const [count, setCount] = useState(1);
  const [isload, setIsLoad] = useState(false);
  useEffect(() => {
    setIsLoad(true);
    fetch(
      "https://api.giphy.com/v1/gifs/trending?api_key=07MZjZ87W1VqObgJIDX8Ma5nsZ0siIcs"
    )
      .then((res) => res.json())
      .then((data) => setFullMyData(data.data))
      .finally(() => {
        setIsLoad(false);
      });
  }, []);
  useEffect(() => {
    setMyData(fullmydata.slice((count - 1) * 8, count * 8));
  }, [fullmydata, count]);
  const Truncate = (str) => {
    if (str.length > 20) {
      return str.slice(0, 20) + "...";
    } else {
      return str;
    }
  };
  const Myimage = ({ add }) => {
    const [load, setLoad] = useState(false);
    return (
      <>
        {!load && <div class="loader"></div>}
        <img
          src={add}
          alt="load"
          onLoad={() => {
            setLoad(true);
          }}
          style={!load ? { display: "none" } : null}
        />
      </>
    );
  };
  let Navigate = useNavigate();
  return (
    <>
      <h1 style={{ color: "white", fontFamily: "serif" }}>Trending Page</h1>
      <button
        onClick={() => {
          Navigate("/");
        }}
      >
        Home Page
      </button>
      <div className="load">{isload ? <div class="loader"></div> : null}</div>
      <div className="contain">
        {mydata.map((el) => {
          return (
            <>
              <div className="card1">
                <h3 style={{ color: "white" }}>{Truncate(el.title)}</h3>
                <Myimage add={el.images.original.url} />
              </div>
            </>
          );
        })}
      </div>
      {mydata.length > 0 && (
        <div className="bottom1">
          <button
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
export default Second;
