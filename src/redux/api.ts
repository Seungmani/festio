import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://api.kcisa.kr/openapi/API_CCA_149/request',
		responseHandler: (response) => response.text(), 
  }),
  endpoints: (builder) => ({
    getEventData: builder.query({
      query: ({ apiKey }) => {
        return `?serviceKey=${apiKey}`;
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
					localId: item.getElementsByTagName("LOCAL_ID")[0]?.textContent || '',
					call: item.getElementsByTagName("CONTACT_POINT")[0]?.textContent || '',
					age: item.getElementsByTagName("AUDIENCE")[0]?.textContent || '',
					period: item.getElementsByTagName("PERIOD")[0]?.textContent || '',
					time: item.getElementsByTagName("EVENT_PERIOD")[0]?.textContent || '',
					author: item.getElementsByTagName("AUTHOR")[0]?.textContent || '',
					actor: item.getElementsByTagName("ACTOR")[0]?.textContent || '',
					contact: item.getElementsByTagName("CONTACT_POINT")[0]?.textContent || '',
					charge: item.getElementsByTagName("CHARGE")[0]?.textContent || '',
					numberPages: item.getElementsByTagName("NUMBER_PAGES")[0]?.textContent || '',
					duration: item.getElementsByTagName("DURATION")[0]?.textContent || '',
					subDescription: item.getElementsByTagName("SUB_DESCRIPTION")[0]?.textContent || '',
					spatial: item.getElementsByTagName("SPATIAL_COVERAGE")[0]?.textContent || '',
					site: item.getElementsByTagName("EVENT_SITE")[0]?.textContent || '',
        }));
        return items;
      },
    }),
  }),
});

export const { useGetEventDataQuery } = api;