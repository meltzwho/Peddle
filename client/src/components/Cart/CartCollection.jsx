import React from 'react';
import PropTypes from 'prop-types';

const CartCollection = ({cartItems}) => (
  <div>lg view</div>
);
  

export default CartCollection;

{/* <div>
        <h3>Shopping Cart</h3>

        <div className="cart">
          <div className="panel panel-default">
            <div className="panel-body">
              {this.state.items.length > 0 && (
                <div className="cart__body">
                  {this.state.items.map(item => (
                    <CartItem on={this.on} key={item.id} {...item} onClick={() => this.removeFromCart(item.id)} />
                  ))}
                </div>
              )}
              {this.state.items.length === 0 && (
                <div className="alert alert-info">Cart is empty</div>
              )}
              <div className="cart__total">Total: 10.00</div>
            </div>
          </div>
        </div>
      </div>
    ); */}