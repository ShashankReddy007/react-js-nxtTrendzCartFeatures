import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  //   TODO: Add your code for remove all cart items, increment cart item quantity, decrement cart item quantity, remove cart item

  addCartItem = product => {
    console.log(product)
    const {cartList} = this.state
    const sameItem = cartList.find(item => item.id === product.id)
    if (sameItem === undefined) {
      this.setState(prevState => ({cartList: [...prevState.cartList, product]}))
    } else {
      const newItem = {
        availability: sameItem.availability,
        brand: sameItem.brand,
        description: sameItem.description,
        id: sameItem.id,
        imageUrl: sameItem.imageUrl,
        price: sameItem.price,
        quantity: sameItem.quantity + product.quantity,
        rating: sameItem.rating,
        title: sameItem.title,
        totalReviews: sameItem.totalReviews,
      }
      const newList = cartList.filter(item => item.id !== newItem.id)
      console.log(newList)

      this.setState({
        cartList: [...newList, newItem],
      })
    }

    //   TODO: Update the code here to implement addCartItem
  }

  removeCartItem = id => {
    const {cartList} = this.state
    const filteredList = cartList.filter(item => item.id !== id)
    this.setState({cartList: filteredList})
  }

  incrementCartItemQuantity = id => {
    const {cartList} = this.state
    const sameItem = cartList.find(item => item.id === id)

    const newItem = {
      availability: sameItem.availability,
      brand: sameItem.brand,
      description: sameItem.description,
      id: sameItem.id,
      imageUrl: sameItem.imageUrl,
      price: sameItem.price,
      quantity: sameItem.quantity + 1,
      rating: sameItem.rating,
      title: sameItem.title,
      totalReviews: sameItem.totalReviews,
    }
    const newList = cartList.filter(item => item.id !== newItem.id)
    console.log(newList)

    this.setState({
      cartList: [...newList, newItem],
    })
  }

  decrementCartItemQuantity = id => {
    const {cartList} = this.state
    const sameItem = cartList.find(item => item.id === id)

    const newItem = {
      availability: sameItem.availability,
      brand: sameItem.brand,
      description: sameItem.description,
      id: sameItem.id,
      imageUrl: sameItem.imageUrl,
      price: sameItem.price,
      quantity: sameItem.quantity - 1,
      rating: sameItem.rating,
      title: sameItem.title,
      totalReviews: sameItem.totalReviews,
    }
    const newList = cartList.filter(item => item.id !== newItem.id)
    console.log(newList)
    const filteredList = cartList.filter(item => item.id !== id)
    if (newItem.quantity < 1) {
      this.setState({cartList: filteredList})
    } else {
      this.setState({
        cartList: [...newList, newItem],
      })

      // this.setState(prevState => ({
      //   cartList: prevState.cartList.find(item => item.id === id).quantity - 1,
      // }))
    }
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
          removeAllCartItems: this.removeAllCartItems,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
