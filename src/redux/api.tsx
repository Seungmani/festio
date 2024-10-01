import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://api.kcisa.kr/openapi/API_CCA_149/request',
		responseHandler: (response) => response.text(), 
  }),
  endpoints: (builder) => ({
    getEventData: builder.query({
      query: ({ apiKey, pageNo = 1, numOfRows = 5 }) => {
        return `?serviceKey=${apiKey}&numOfRows=${numOfRows}&pageNo=${pageNo}`;
      },
      transformResponse: (response) => {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(response, "text/xml");
        const items = Array.from(xmlDoc.getElementsByTagName("item")).map((item) => ({
          title: item.getElementsByTagName("TITLE")[0]?.textContent || '',
          description: item.getElementsByTagName("DESCRIPTION")[0]?.textContent || '',
          imageUrl: item.getElementsByTagName("IMAGE_OBJECT")[0]?.textContent || '',
          link: item.getElementsByTagName("URL")[0]?.textContent || '',
          genre: item.getElementsByTagName("GENRE")[0]?.textContent || '',
        }));

        return {items};
      },
    }),
  }),
});

export const { useGetEventDataQuery } = api;
