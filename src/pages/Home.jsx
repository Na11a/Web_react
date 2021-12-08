import { React, useState, useEffect } from "react";
import { getPizzas } from "../features/catchData";
import { Spin } from "antd";
import { Card, List, Button } from "antd";
const { Meta } = Card;

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [pizzas, setPizzas] = useState([]);
  const startLoad = 4;
  const nextLoad = 4;
  const [newLoad, setNewLoad] = useState(0);
  useEffect(() => {
    getPizzas().then((data) => {
      setPizzas(data.slice(0, startLoad));
      setIsLoading(false);
    });
  }, []);
  useEffect(() => {
    getPizzas().then((data) => {
      setPizzas(pizzas.concat(data.slice(newLoad, newLoad + nextLoad)));
      setIsLoading(false);
    });
  }, [newLoad]);
  const LoadMoreSelect = () => {
    setIsLoading(true);
    setNewLoad(newLoad + nextLoad);
  };
  return (
    <div className="content__items">
      <List
        itemLayout="horizontal"
        className="demo-loadmore-list"
        grid={{
          gutter: 120,
        }}
        dataSource={pizzas}
        renderItem={(item) => (
          <List.Item>
            <Card
              hoverable
              style={{ width: 240 }}
              cover={<img alt={item.name} src={item.imageUrl} />}
            >
              <Meta title={item.name} description={item.price} />
            </Card>
          </List.Item>
        )}
      />
      ,
      <Button type="primary" size="large" onClick={() => LoadMoreSelect()}>
        Load More
      </Button>
      <Spin size="large" spinning={isLoading}></Spin>
    </div>
  );
};

export default Home;
