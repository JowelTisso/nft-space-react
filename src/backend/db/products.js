import { v4 as uuid } from "uuid";

/**
 * Product Database can be added here.
 * You can add products of your wish with different attributes
 * */

export const products = [
  {
    _id: uuid(),
    title: "ApePunks",
    creator: "PixArt",
    price: "1000",
    categoryName: "Collectibles",
    topBid: "1200",
    minBid: "1000",
    rank: "#139",
    img: "",
  },
];
