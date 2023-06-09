const router = require("express").Router();
const {
  models: { User, Cart, Order, Product, CartProduct },
} = require("../db");
module.exports = router;

// CART GET SINGLE CART'S PRODUCTS
// api/cart/:id
router.get('/:id', async (req, res, next) => {
  try {
    const cart = await CartProduct.findAll({
      // b/c Admin is first user in DB, CartId is one integer greater than userId, which is req.params.id here
      where: {cartId: req.params.id},
      include: { model: Product}
    });
    // console.log("CART SLICE GET", cart)
    res.json(cart)
  } catch (error) {
    next (error)
  }
})

// CUSTOMER POST PRODUCT TO CART /api/cart/:id
router.post('/:id', async (req, res, next) => {
  try {
   const cart = await CartProduct.create(req.body);
   console.log("API CART", cart)
   res.send(cart);
  } catch (error) {
    next(error)
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const cartitem = await CartProduct.findByPk(req.params.id);
    const updatedCartItem = await cartitem.update(req.body)
    res.send(updatedCartItem);
  } catch (error) {
    next(error)
  }
});

router.delete('/:id/', async (req, res, next) => {
  try {
    const cartItem = await CartProduct.findByPk(req.params.id);
    console.log("API REMOVED ITEM ++++>", cartItem)
    const removedItem = await cartItem.destroy()
    res.send(removedItem);
  } catch (error) {
    next(error)
  }
});
