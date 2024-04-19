import { useState, useEffect } from "react";
import { ScrollRestoration, useLocation, useNavigate } from "react-router-dom";

import "./List.scss";
import { useItemContext } from "../../context/RootContext";
import Home from "../home/Home";

type TItem = {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
};

function InfiniteScrollList() {
  const [listItems, setItems] = useState<TItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const { favouriteItems, removeFavouriteItem, addFavouriteItem } =
    useItemContext();
  const location = useLocation();

  useEffect(() => {
    // Function to fetch more data from an API
    const fetchData = async () => {
      console.log("fetching data number", page);
      setLoading(true);
      try {
        console.log("fetching data", page);
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/albums/1/photos?limit=10&page=${page}`
        );
        const newData = await response.json();
        console.log("newData", newData.length);
        //@ts-ignore
        setItems((prevItems) => {
          return [...prevItems, ...newData];
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [page]);
  console.log("listItems", listItems);

  // Function to handle scroll events
  const handleScroll = () => {
    const scrollTop = document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.offsetHeight;

    if (scrollTop + windowHeight >= documentHeight - 100 && !loading) {
      // Trigger fetch more data when user scrolls to bottom
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const alreadyFavourite = (id: number) => {
    console.log(
      "favouriteItems",
      favouriteItems.some((item) => item.id === id)
    );
    return favouriteItems.some((item) => item.id === id);
  };

  return (
    <>
      <ScrollRestoration />
      {location.pathname === "/list" ? (
        <div className="container">
          <div className="bt">
            <button onClick={() => navigate("/")}>Back To Dashboard</button>
          </div>
          <div className="items">
            {listItems.map((item, index) => (
              //@ts-ignore
              <div className="item-container" key={index}>
                <p className="item-id">{item.id} -</p>
                <p className="item-title">{item?.title}</p>
                <img
                  className="item-image"
                  src={item?.url}
                  alt={item?.title}
                  style={{ width: "30px", height: "30px" }}
                />
                {!alreadyFavourite(item.id) ? (
                  <button onClick={() => addFavouriteItem(item)}>
                    Add To Favourites
                  </button>
                ) : (
                  <button onClick={() => removeFavouriteItem(item.id)}>
                    Remove From Favourites
                  </button>
                )}
              </div>
            ))}
          </div>
          {loading && <p>Loading...</p>}
        </div>
      ) : (
        <div className="home">
          <Home />
        </div>
      )}
    </>
  );
}

export default InfiniteScrollList;
