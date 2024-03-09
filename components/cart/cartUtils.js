export const calculateTotalAmount = (cartData,discount) => {
    let totalAmount = 0;
    let totalItems = 0;

    if (cartData) {
      totalAmount = cartData.reduce(
        (accumulator, item) => accumulator + item.quantity * item.cartItem.price,
        0
      );

      totalItems = cartData.reduce(
        (accumulator, item) => accumulator + item.quantity,
        0
      );
    }

    const shippingCost = totalItems > 3 ? 10 : 5;

    
    const finalTotal = totalAmount + shippingCost - discount;

    return {
      totalAmount,
      shippingCost,
      discount,
      finalTotal,
    };
  };