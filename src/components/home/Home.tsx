import React from "react";
import { useItemContext } from "../../context/RootContext";
import { useNavigate } from "react-router-dom";
import "./Home.scss";

const Home = () => {
  const { favouriteItems, removeFavouriteItem } = useItemContext();
  const navigate = useNavigate();
  return (
    <>
      <div className="header">
        <button onClick={() => navigate("/list")}>Show List</button>
      </div>
      <h1>My Faviourites List</h1>
      {favouriteItems.length === 0 && <p>No Favourite Items</p>}
      {favouriteItems.map((item, index) => {
        return (
          <div className="item-container" key={index}>
            <p className="item-id">{item.id} -</p>
            <p className="item-title">{item?.title}</p>
            <img
              className="item-image"
              src={item?.url}
              alt={item?.title}
              style={{ width: "30px", height: "30px" }}
            />
            <button onClick={() => removeFavouriteItem(item.id)}>
              Remove From Favourites
            </button>
          </div>
        );
      })}
    </>
  );
};

export default Home;
