import { Fragment } from "react";
import backgroundImage from "../../../assets/meals.jpg";
import HeaderCartButton from "../headerCartButton/headerCartButton";

import styles from "./header.module.css";

const Header = (props) => {
  return (
    <Fragment>
      <header className={styles.header}>
        <h1>BarneslowMeals</h1>
        <HeaderCartButton onClick={props.onShowCart} />
      </header>
      <div className={styles["main-image"]}>
        <img src={backgroundImage} alt="Food laden table" />
      </div>
    </Fragment>
  );
};

export default Header;
