import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';

import Header from '../components/header';
import ArticlesTable from '../components/articles_table';
import TableSearch from '../components/table_search';
import TableGroupBy from '../components/table_group_by';
import { addArticle, setDeleteArticle } from './actions';
import { createRandomArticle } from './requests';

import WebSocketConnector from '../utils/sockets/WebSocketConnector';
import ArticleHandler from '../utils/sockets/handlers/ArticleHandler';

const IndexPage = () => {
  const dispatch = useDispatch();

  const handleAddArticle = (event) => {
    event.preventDefault();

    createRandomArticle();
  };

  const openConnection = () => {
    if (process.env.RAILS_ENV == 'production'){
      return new WebSocket(`wss://${(process.env.API_HOST_URL).split('//')[1]}:${process.env.WEBSOCKETS_PORT}/cable`);
    } else {
      return new WebSocket(`ws://${(process.env.API_HOST_URL).split('//')[1]}:${process.env.WEBSOCKETS_PORT}/cable`);
    }
  };

  const websocketConnection = openConnection();
  websocketConnection.onopen = (event) => {
    const subscribtionMsg = {
      "command": "subscribe",
      "identifier": JSON.stringify({ "channel": "ArticleChannel" })
    }
    websocketConnection.send(JSON.stringify(subscribtionMsg));
  }

  websocketConnection.onmessage = (message) => {
    let data = JSON.parse(message.data);
    if (!data.identifier) {
      return
    }
    let identifier = JSON.parse(data.identifier);
    if (identifier.channel == 'ArticleChannel' && data.message) {
      let message = data.message;

      switch(message.method) {
        case 'create':
          console.log('Message create article: ', message.data);
          dispatch(addArticle(message.data.article));
          break;
        case 'delete':
          console.log('Message delete article: ', message.data);
          dispatch(setDeleteArticle(message.data.id));
          break;
      }
    } else {
      return
    }
  }

  return (
    <>
      <Header />
      <Container fluid>
        <div className="input-wrapper">
          <TableSearch/>
        </div>

        <div className="input-wrapper">
          <TableGroupBy/>
        </div>

        <Button className="control-btn" variant="success" onClick={handleAddArticle}>Add random article</Button>

        <div className="input-wrapper">
          <ArticlesTable/>
        </div>
      </Container>
    </>
  );
};

export default IndexPage;
