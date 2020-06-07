<template>
  <div id="root">
    <div id="cart-items" v-for="product in products" :key="product.id">
      <ShoppingCartItem
        :name="product.name"
        :price="product.price"
        @clicked="deleteClick(product.id)"
      ></ShoppingCartItem>
    </div>
    <div id="bottom-information">
      <div id="total-cost">
        <span id="total-title">Total:</span> ${{ totalCost }}
      </div>
      <div id="checkout">
        <router-link class="router-link" :to="{ name: 'checkout' }">
          <button id="checkout-button">Checkout</button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Quicksand|Raleway&display=swap");

#root {
  font-family: "Quicksand", sans-serif;
  color: #00a896;
}

.router-link {
  text-decoration: none;
  color: #ffffff;
}

#cart-items {
  display: flex;
  justify-content: center;
  margin-top: 1%;
}

#bottom-information {
  display: flex;
  flex-direction: row;
  width: 80%;
  margin: 2% auto 2%;
}

#total-cost {
  margin-right: auto;
  margin-top: 1%;
  font-size: 250%;
}

#total-title {
  font-weight: bolder;
}

#checkout {
  margin-left: auto;
}

#checkout-button {
  font-size: 200%;
  font-family: "Quicksand", sans-serif;
  padding: 15px 25px 15px 25px;
  align-self: start;
  background-color: #00a896;
  border: none;
  font-weight: bolder;
  color: #ffffff;
  border-radius: 10px;
  margin-top: 3%;
  cursor: pointer;
}

#checkout-button:hover {
  transform: scale(1.05);
  box-shadow: 0 2px 2px #0000007a;
  transition: 0.3s;
}
</style>

<script>
import ShoppingCartItem from "./StoreComponents/ShoppingCartItem";
import axios from "axios";

export default {
  name: "ShoppingCart",
  components: {
    ShoppingCartItem
  },
  methods: {
    loadProduct: function(id) {
      axios
        .post("http://localhost:8081/product-by-id", {
          id: id
        })
        .then(
          response => {
            this.products.push(response.data);
          },
          error => {
            console.log(error);
          }
        );
    },
    deleteClick: function(index) {
      this.products.splice(index, 1);
      this.cart.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(this.cart));
    }
  },
  watch: {
    products: function() {
      this.totalCost = 0;

      this.products.forEach(x => {
        this.totalCost += x.price;
      });
    }
  },
  mounted() {
    this.cart.forEach(x => {
      this.loadProduct(x);
    });

    console.log(this.calculateCost);
  },
  data() {
    return {
      cart: JSON.parse(localStorage.getItem("cart")),
      name: "",
      price: 0.0,
      quantity: 0,
      image: "",
      products: [],
      totalCost: 0.0
    };
  }
};
</script>
