import { v4 as uuid } from "uuid";
import bcyrpt from "bcryptjs";
import { formatDate } from "../utils/authUtils";
/**
 * User Database can be added here.
 * You can add default users of your wish with different attributes
 * Every user will have cart (Quantity of all Products in Cart is set to 1 by default), wishList by default
 * */

export const users = [
  {
    _id: uuid(),
    firstName: "Jowel",
    lastName: "Tisso",
    email: "test@gmail.com",
    password: bcyrpt.hashSync("test123", 5),
    createdAt: formatDate(),
    updatedAt: formatDate(),
    addresses: [
      {
        address: "HN-15, Pukhuripar path, silpukhuri",
        city: "KAMRUP METROPOLITAN",
        landmark: "Near silpukhuri",
        mobile: "1234567890",
        name: "Jowel Tisso",
        pin: "123456",
        state: "ASSAM",
        _id: "369e4da5-b5d0-4d9e-8f7d-0b412d907c14",
      },
    ],
  },
  {
    _id: uuid(),
    firstName: "John",
    lastName: "Doe",
    email: "johndoe@gmail.com",
    password: bcyrpt.hashSync("johnDoe123", 5),
    createdAt: formatDate(),
    updatedAt: formatDate(),
    addresses: [],
  },
  {
    _id: uuid(),
    firstName: "Test",
    lastName: "User",
    email: "testuser@gmail.com",
    password: bcyrpt.hashSync("test1234", 5),
    createdAt: formatDate(),
    updatedAt: formatDate(),
    addresses: [],
  },
];
