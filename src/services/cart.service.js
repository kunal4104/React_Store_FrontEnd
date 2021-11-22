const onAdd = (cartItems, setCartItems, product) => {
  const exist = cartItems.find((x) => x._id === product._id);
  if (exist) {
    setCartItems(
      cartItems.map((x) =>
        x._id === product._id
          ? {
              ...exist,
              qty: exist.qty + 1,
              total: (exist.price / parseFloat(100)) * (exist.qty + 1),
            }
          : x
      )
    );
  } else {
    setCartItems([
      ...cartItems,
      { ...product, qty: 1, total: product.price / parseFloat(100) },
    ]);
  }
};

const onRemove = (cartItems, setCartItems, product) => {
  const exist = cartItems.find((x) => x._id === product._id);

  if (exist.qty === 1) {
    setCartItems(cartItems.filter((x) => x._id !== product._id));
  } else {
    setCartItems(
      cartItems.map((x) =>
        x._id === product._id
          ? {
              ...exist,
              qty: exist.qty - 1,
              total: (exist.price / parseFloat(100)) * (exist.qty - 1),
            }
          : x
      )
    );
  }
};

const removeAll = (cartItems, setCartItems, product) => {
  const exists = cartItems.find((x) => x._id === product._id);
  if (exists) {
    setCartItems(cartItems.filter((x) => x._id !== product._id));
  }
};

export default {
  onAdd,
  onRemove,
  removeAll,
};
