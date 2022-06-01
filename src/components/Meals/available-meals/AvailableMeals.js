import { useEffect, useState } from "react";

import Card from "../../UI/Card/Card";
import MealsItem from "../meals-item/MealsItem";
import styles from "./availableMeals.module.css";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState();

  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch(
        "https://barneslow-foods-default-rtdb.europe-west1.firebasedatabase.app/meals.json"
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const data = await response.json();

      const mealsArray = [];

      for (const key in data) {
        mealsArray.push({
          id: key,
          name: data[key].name,
          description: data[key].description,
          price: data[key].price,
        });
      }

      setMeals(mealsArray);
      setIsLoading(false);
    };

    fetchMeals().catch((error) => {
      setIsLoading(false);
      setIsError(error.message);
    });
  }, []);

  if (isLoading) {
    return (
      <section className={styles["meals-loading"]}>
        <p>Loading</p>
      </section>
    );
  }

  if (isError) {
    return (
      <section className={styles["meals-error"]}>
        <p>{isError}</p>
      </section>
    );
  }

  const mealsList = meals.map((meal) => (
    <MealsItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={styles.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
