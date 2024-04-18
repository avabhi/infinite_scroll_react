import React, { createContext, useState, useContext } from "react";

type TItem = {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
};

type TItemContext = {
  favouriteItems: TItem[];
  addFavouriteItem: (item: TItem) => void;
  removeFavouriteItem: (id: number) => void;
};

const ItemContext = createContext<TItemContext | undefined>(undefined);

export const ItemProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [favouriteItems, setFavouriteItems] = useState<TItem[]>([]);

  const addFavouriteItem = (item: TItem) => {
    setFavouriteItems((prevItems) => [...prevItems, item]);
  };
  const removeFavouriteItem = (id: number) => {
    setFavouriteItems((prevItems) =>
      prevItems.filter((item) => item.id !== id)
    );
  };

  return (
    <ItemContext.Provider
      value={{
        favouriteItems,
        addFavouriteItem,
        removeFavouriteItem,
      }}
    >
      {children}
    </ItemContext.Provider>
  );
};

export const useItemContext = () => {
  const context = useContext(ItemContext);
  if (!context) {
    throw new Error("useItemContext must be used within a ItemProvider");
  }
  return context;
};
