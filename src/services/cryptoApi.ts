import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const cryptoApiHeaders = {
    'X-RapidAPI-Key': '53e4f28e7amsh052bdf32d8e2072p1d3e2fjsn1a2e332746f7',
    'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'

}

const baseUrl = "https://coinranking1.p.rapidapi.com";

const createRequest = (url:string) => ({url,headers:cryptoApiHeaders})

export const cryptoApi = createApi({
    reducerPath: "cryptoApi",
    baseQuery:fetchBaseQuery({baseUrl}),
    endpoints : (builder) => ({
        getCryptos: builder.query({
            query:(count) => createRequest(`/coins?limit=${count}`)
        }),
        getCryptoDetails: builder.query({
            query:(uuid) => createRequest(`/coin/${uuid}`)
        }),
        getCryptoHistory: builder.query({
            query:({uuid,timePeriod}) => createRequest(`/coin/${uuid}/history?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=${timePeriod}`)
            })

           

    })
})

export const { useGetCryptosQuery,
     useGetCryptoDetailsQuery,
      useGetCryptoHistoryQuery} = cryptoApi




