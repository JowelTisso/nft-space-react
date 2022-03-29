import { v4 as uuid } from "uuid";

/**
 * Category Database can be added here.
 * You can add category of your wish with different attributes
 * */

export const categories = [
  {
    _id: uuid(),
    categoryName: "Art",
    description: "Art",
    img: "https://user-images.githubusercontent.com/52632590/158344469-40902937-7c86-4db0-8718-ffdaa5648045.png",
  },
  {
    _id: uuid(),
    categoryName: "Collectibles",
    description: "Collectibles",
    img: "https://user-images.githubusercontent.com/52632590/158344628-e3c3e348-e2a0-4a49-aa6e-073cc249cb13.png",
  },
  {
    _id: uuid(),
    categoryName: "Wearable",
    description: "Music",
    img: "https://user-images.githubusercontent.com/52632590/158345040-d279e25b-6fb4-4729-b4f4-1e28bb0d3d01.jpg",
  },
  {
    _id: uuid(),
    categoryName: "Equipment",
    description: "Photography",
    img: "https://user-images.githubusercontent.com/52632590/158345311-99114d30-f3b6-426c-b770-ad773e8fd8e7.png",
  },
  {
    _id: uuid(),
    categoryName: "Entities",
    description: "Sports",
    img: "https://user-images.githubusercontent.com/52632590/158345411-17604753-74ec-4d0b-a0fc-19f1f4ed5290.jpg",
  },
];
