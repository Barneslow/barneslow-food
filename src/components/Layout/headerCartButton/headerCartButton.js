import { useContext, useEffect, useState } from "react";
import CartContext from "../../../store/cart-context/cart-context";

import CartIcon from "../../Cart/CartIcon/CartIcon";

import styles from "./headerCartButton.module.css";

const HeaderCartButton = (props) => {
  const [btnHighLight, setBtnHighLight] = useState(false);
  const cartContext = useContext(CartContext);

  const numberOfCartItems = cartContext.items.reduce((acc, item) => {
    return acc + item.amount;
  }, 0);

  const btnClasses = `${styles.button} ${btnHighLight ? styles.bump : ""}`;
  const { items } = cartContext;

  useEffect(() => {
    if (cartContext.items.length === 0) return;

    setBtnHighLight(true);

    const timer = setTimeout(() => {
      setBtnHighLight(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [items]);

  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={styles.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={styles.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
