import { ShoppingCart } from './shopping-cart';

export class Order {

  datePlaced: number;
  items: any[];
  netPrice: number;
  user: {
    username: string,
    userId: string
  };

  constructor(userId, userName,
    public shipping: any, carts: ShoppingCart) {

    this.datePlaced = new Date().getTime();

    this.items = carts.items.map(item => {
      return {
        product: {
          title: item.title,
          imageUrl: item.imageUrl,
          price: item.price
        }, 
        quantity: item.quantity,
        price: item.price,
        totalPrice: item.totalPrice
      };
    });

    this.user = {
      userId: userId,
      username: userName
    };
    this.netPrice = carts.totalPrice;


  }
}
