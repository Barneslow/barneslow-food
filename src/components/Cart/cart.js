import Modal from "../UI/Modal/Modal";

import { Fragment, useContext, useState } from "react";

import CartContext from "../../store/cart-context/cart-context";
import CartItem from "./cartItem/cartItem";
import styles from "./cart.module.css";
import Checkout from "./checkout/checkout";

const Cart = (props) => {
  const [isOrdering, setIsOrdering] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);

  const cartContext = useContext(CartContext);

  const totalAmount = `$${cartContext.totalAmount.toFixed(2)}`;
  const hasItems = cartContext.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartContext.removeItem(id);
  };

  const cartItemToAdd = (item) => {
    cartContext.addItem({ ...item, amount: 1 });
  };

  const onOrderHandler = () => {
    setIsOrdering(true);
  };

  const submitOrderHandler = async (userData) => {
    setIsSubmitting(true);
    await fetch(
      "https://barneslow-foods-default-rtdb.europe-west1.firebasedatabase.app/orders.json",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: userData,
          orderedItems: cartContext.items,
        }),
      }
    );
    setIsSubmitting(false);
    setDidSubmit(true);
    cartContext.clearCart();
  };

  const cartItems = (
    <ul className={styles["cart-items"]}>
      {cartContext.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemToAdd.bind(null, item)}
        />
      ))}
    </ul>
  );

  const modalActions = (
    <div className={styles.actions}>
      <button className={styles["button"]} onClick={props.onClose}>
        Close
      </button>
      {hasItems && (
        <button className={styles.button} onClick={onOrderHandler}>
          Order
        </button>
      )}
    </div>
  );

  const cartModalContent = (
    <Fragment>
      {cartItems}
      <div className={styles.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isOrdering && (
        <Checkout onConfirm={submitOrderHandler} onCancel={props.onClose} />
      )}
      {!isOrdering && modalActions}
    </Fragment>
  );

  const isSubittingModalContent = <p>Sending Order data...</p>;

  const setDidSubmitModalContent = (
    <Fragment>
      <p>Order sent successfully!</p>
      <div className={styles.actions}>
        <button className={styles.button} onClick={props.onClose}>
          Close
        </button>
      </div>
    </Fragment>
  );

  return (
    <Modal onClose={props.onClose}>
      {!isSubmitting && !didSubmit && cartModalContent}
      {isSubmitting && isSubittingModalContent}
      {!isSubmitting && didSubmit && setDidSubmitModalContent}
    </Modal>
  );
};

export default Cart;
