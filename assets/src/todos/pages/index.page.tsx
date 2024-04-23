import React, { memo } from "react";
import { usePageContext } from "../../utils/usePageContext";
import Footer from "./components/footer/footer";
import "./index.css";
import Header from "./components/Header/Header";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { HomePage } from "./HomePage";
import { TravelPlannerPage } from "./TravelPlannerPage";
import { FavoritePage } from "./FavoritePage";

interface Todo {
  id: number;
  title: string;
}

const TodosIndexPage = memo(() => {
  let pageContext = usePageContext<{ todos: Todo[] }>();
  let todos = pageContext?.todos;

  return (
    <Router>
      <div>
        <Header />
        <body>
          <Switch>
            <Route path="/" exact component={HomePage} />
            <Route path="/reiseplanlegger" component={TravelPlannerPage} />
            <Route path="/favoritter" component={FavoritePage} />
            <Route path="*" component={HomePage} />
          </Switch>
        </body>
        <footer>
          <Footer />
        </footer>
      </div>
    </Router>
  );
});

export default TodosIndexPage;
