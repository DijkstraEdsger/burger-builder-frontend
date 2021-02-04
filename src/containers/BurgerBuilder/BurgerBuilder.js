import React, { Component } from "react";

import Aux from "../../hoc/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      meat: 0,
      cheese: 0,
    },
    totalPrice: 4,
  };

  addIngredientHandler = (type) => {
    const ingr = { ...this.state.ingredients };
    ingr[type]++;
    const price = this.state.totalPrice + INGREDIENT_PRICES[type];
    this.setState({ ingredients: ingr, totalPrice: price });
  };

  removeIngredientHandler = (type) => {
    if (this.state.ingredients[type] <= 0) {
      return;
    }
    const ingr = { ...this.state.ingredients };
    ingr[type]--;
    const price = this.state.totalPrice - INGREDIENT_PRICES[type];
    this.setState({ ingredients: ingr, totalPrice: price });
  };

  render() {
    const disabledInfo = { ...this.state.ingredients };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    return (
      <Aux>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          ingredientAdded={(type) => this.addIngredientHandler(type)}
          ingredientRemoved={(type) => this.removeIngredientHandler(type)}
          disabled={disabledInfo}
          price={this.state.totalPrice}
        />
      </Aux>
    );
  }
}

export default BurgerBuilder;
