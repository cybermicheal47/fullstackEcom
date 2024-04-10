import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "@/apiUrls";

const baseQuery = fetchBaseQuery({ mainUrl: BASE_URL });

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ["Product", "Order", "User"], //types of data fetching from our Api
  endpoints: (builder) => ({}),
});
