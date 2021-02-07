import React, { Component } from "react";

import Aux from "../../hoc/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import LoaderSpinner from "../../components/UI/LoaderSpinner/LoaderSpinner";

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false,
  };

  componentDidMount() {
    axios
      .get(
        "https://react-my-burger-a029c-default-rtdb.firebaseio.com/ingredients.json"
      )
      .then((response) => {
        this.setState({ ingredients: response.data });
      });
  }

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: "Humberto",
        address: {
          street: "any",
          zipCode: 80100,
          country: "Somewhere",
        },
        email: "email@gmail.com",
      },
      deliveryMethod: "kjl",
    };

    this.setState({ loading: true });
    axios
      .post("/orders.json", order)
      .then((response) => {
        this.setState({ loading: false, purchasing: false });
        console.log(response);
      })
      .catch((error) => {
        this.setState({ loading: false, purchasing: false });
        console.log(error);
      });
  };

  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients)
      .map((igKey) => {
        return ingredients[igKey];
      })
      .reduce((sum, curr) => sum + curr, 0);

    this.setState({ purchasable: sum > 0 });
  }

  addIngredientHandler = (type) => {
    const ingr = { ...this.state.ingredients };
    ingr[type]++;
    const price = this.state.totalPrice + INGREDIENT_PRICES[type];
    this.setState({ ingredients: ingr, totalPrice: price });
    this.updatePurchaseState(ingr);
  };

  removeIngredientHandler = (type) => {
    if (this.state.ingredients[type] <= 0) {
      return;
    }
    const ingr = { ...this.state.ingredients };
    ingr[type]--;
    const price = this.state.totalPrice - INGREDIENT_PRICES[type];
    this.setState({ ingredients: ingr, totalPrice: price });
    this.updatePurchaseState(ingr);
  };

  render() {
    const disabledInfo = { ...this.state.ingredients };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = null;

    let burger = <LoaderSpinner />;
    if (this.state.ingredients) {
      burger = (
        <Aux>
          <Burger ingredients={this.state.ingredients} />
          <BuildControls
            ingredientAdded={(type) => this.addIngredientHandler(type)}
            ingredientRemoved={(type) => this.removeIngredientHandler(type)}
            disabled={disabledInfo}
            price={this.state.totalPrice}
            purchasable={this.state.purchasable}
            ordered={this.purchaseHandler}
          />
        </Aux>
      );
      orderSummary = (
        <OrderSummary
          ingredients={this.state.ingredients}
          purchaseCancelled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler}
          price={this.state.totalPrice}
        />
      );
    }
    
    if (this.state.loading) {
      orderSummary = <LoaderSpinner />;
    }

    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          closedModal={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

export default BurgerBuilder;
