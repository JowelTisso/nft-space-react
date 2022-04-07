import { Response } from "miragejs";
import { formatDate, requiresAuth } from "../utils/authUtils";

/**
 * All the routes related to Address are present here.
 * These are private routes.
 * Client needs to add "authorization" header with JWT token in it to access it.
 * */

/**
 * This handler handles getting items to user's addresses.
 * send GET Request at /api/user/addresses
 * */
export const getAddressItemsHandler = function (schema, request) {
  const userId = requiresAuth.call(this, request);
  if (!userId) {
    new Response(
      404,
      {},
      {
        errors: ["The email you entered is not Registered. Not Found error"],
      }
    );
  }
  const userAddress = schema.users.findBy({ _id: userId }).addresses;
  return new Response(200, {}, { addresses: userAddress });
};

/**
 * This handler handles adding items to user's addresses.
 * send POST Request at /api/user/addresses
 * body contains {address}
 * */

export const addItemToAddressHandler = function (schema, request) {
  const userId = requiresAuth.call(this, request);
  try {
    if (!userId) {
      new Response(
        404,
        {},
        {
          errors: ["The email you entered is not Registered. Not Found error"],
        }
      );
    }
    const userAddress = schema.users.findBy({ _id: userId }).addresses;
    const { address } = JSON.parse(request.requestBody);
    userAddress.push({
      ...address,
      createdAt: formatDate(),
      updatedAt: formatDate(),
    });
    this.db.users.update({ _id: userId }, { addresses: userAddress });
    return new Response(201, {}, { addresses: userAddress });
  } catch (error) {
    return new Response(
      500,
      {},
      {
        error,
      }
    );
  }
};

/**
 * This handler handles removing items to user's addresses.
 * send DELETE Request at /api/user/addresses/:addressId
 * */

export const removeItemFromAddressHandler = function (schema, request) {
  const userId = requiresAuth.call(this, request);
  try {
    if (!userId) {
      new Response(
        404,
        {},
        {
          errors: ["The email you entered is not Registered. Not Found error"],
        }
      );
    }
    let userAddress = schema.users.findBy({ _id: userId }).addresses;
    const addressId = request.params.addressId;
    userAddress = userAddress.filter((item) => item._id !== addressId);
    this.db.users.update({ _id: userId }, { addresses: userAddress });
    return new Response(200, {}, { addresses: userAddress });
  } catch (error) {
    return new Response(
      500,
      {},
      {
        error,
      }
    );
  }
};

/**
 * This handler handles adding items to user's addresses.
 * send POST Request at /api/user/addresses/:addressId
 * body contains {address}
 * */

export const updateAddressItemHandler = function (schema, request) {
  const addressId = request.params.addressId;
  const userId = requiresAuth.call(this, request);
  try {
    if (!userId) {
      new Response(
        404,
        {},
        {
          errors: ["The email you entered is not Registered. Not Found error"],
        }
      );
    }
    const userAddress = schema.users.findBy({ _id: userId }).addresses;
    const { address } = JSON.parse(request.requestBody);
    userAddress.forEach((item) => {
      if (item._id === addressId) {
        (item.name = address.name),
          (item.mobile = address.mobile),
          (item.address = address.address),
          (item.pin = address.pin),
          (item.city = address.city),
          (item.state = address.state),
          (item.landmark = address.landmark),
          (item.updatedAt = formatDate());
      }
    });
    this.db.users.update({ _id: userId }, { addresses: userAddress });
    return new Response(200, {}, { addresses: userAddress });
  } catch (error) {
    return new Response(
      500,
      {},
      {
        error,
      }
    );
  }
};
