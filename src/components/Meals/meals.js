import { Fragment } from "react";
import MealsSummary from "./meals-summary/mealsSummary";
import AvailableMeals from "./available-meals/AvailableMeals";

const Meals = () => {
  return (
    <Fragment>
      <MealsSummary />
      <AvailableMeals />
    </Fragment>
  );
};

export default Meals;
