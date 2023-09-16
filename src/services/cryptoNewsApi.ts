import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const cryptoNewsHeaders =  {
    'X-BingApis-SDK': 'true',
    'X-RapidAPI-Key': '53e4f28e7amsh052bdf32d8e2072p1d3e2fjsn1a2e332746f7',
    'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com'
  }

const baseUrl = "https://bing-news-search1.p.rapidapi.com"  

const createRequest = (url:string) => ({url,headers:cryptoNewsHeaders})

export const cryptoNewsApi = createApi({
    reducerPath: "cryptoNewsApi",
    baseQuery:fetchBaseQuery({baseUrl}),
    endpoints : (builder) => ({
        getCryptoNews: builder.query({
            query:({newsCategory, count}) => createRequest(`/news/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`)
        })
    })
})



export const { useGetCryptoNewsQuery} = cryptoNewsApi