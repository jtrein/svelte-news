const path = require("path");
const express = require("express");
const fetch = require("node-fetch");

const server = express();
const NEWS_API_KEY = process.env.NEWS_API_KEY;
const baseNewsURL = 'https://newsapi.org/v2';

function handleNoAPIKey(res) {
  res.status(400);
  res.send({
    errorMessage: 'Oops! We do not see your News API key.',
    errorStatus: 400,
    errorType: 'MISSING_REQ_DATA'
  });
}

function handleInvalidCountryParam(res) {
  res.status(400);
  res.send({
    errorMessage: 'Oops! Please provide an ISO 2-letter country code.',
    errorStatus: 400,
    errorType: 'MISSING_REQ_DATA'
  });
}

server.get("/latest/:country", async function(req, res) {
  const {country} = req.params;

  if (!NEWS_API_KEY) {
    handleNoAPIKey(res);
    return;
  }

  if (!country || country.length !== 2) {
    handleInvalidCountryParam(res);
    return;
  }

  const {search} = req.query;
  const userQuery = search ? `&q=${search}&qInTitle${search}` : '';
  const sort = 'publishedAt, relevancy';
  const URL = `${baseNewsURL}/top-headlines?country=${country}${userQuery}&sortBy=${sort}&language=en&apiKey=${NEWS_API_KEY}`; 
  
  try {
    const response = await fetch(URL);
    const {articles} = await response.json();

    res.send(articles || []);
  } catch (error) {
    if (error) {
      console.log('Log: Some 500 server error');

      res.status(500);
      res.send({
        error,
        errorMessage: 'Oops! Something went wrong on the server.',
        errorStatus: 500,
        errorType: 'INTERNAL_SERVER_ERROR'
      });
    }
  }
});

const port = 3000;
server.listen(port, () => console.log(`Listening on port ${port}`));
