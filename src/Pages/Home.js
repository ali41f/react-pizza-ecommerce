import React, { useState, useEffect } from 'react'
import { auth } from '../firebase'
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { motion } from 'framer-motion';
import { linkVariants, containerVariants } from '../utils/Variants'
import { pizzaData } from '../utils/pizzaData'
import SelectPizza from '../Components/SelectPizza';
import { addProduct } from '../store/Cart/cartActions'
import { connect } from 'react-redux';
import Price from '../Components/Price'
import { withRouter } from "react-router-dom";

const Home = (props) => {

    const [pizza, setPizza] = useState({ src: "", id: 1, base: "", toppings: [], name: "", price: 0, quantity: 1 });

    const [open, setOpen] = React.useState(false);

    const [loading, setLoading] = useState(true);

    const handleClickOpen = (name, price, id, src) => {
        setOpen(true);
        setPizza({ ...pizza, name, price, id, src, quantity: 1 });
    };

    useEffect(() => {
        setLoading(false)
    }, [])

    const handleClose = () => {
        setOpen(false);
    };

    const handleAddToCart = () => {
        props.addProduct(pizza)
        setOpen(false)
    };

    const handleCheckout = () => {
        props.addProduct(pizza)
        setOpen(false)
        props.history.push('/checkout')
    }

    const addBase = (base) => {
        setPizza({ ...pizza, base })
    }

    const setQuantity = (event) => {
        let amount = parseInt(event.target.value)
        if (amount > 0) {
            setPizza({ ...pizza, quantity: amount })
        } else {
            setPizza({ ...pizza, quantity: 1 })
        }
    }

    const addTopping = (topping) => {
        let newToppings;
        if (!pizza.toppings.includes(topping)) {
            newToppings = [...pizza.toppings, topping];
        } else {
            newToppings = pizza.toppings.filter(item => item !== topping);
        }
        setPizza({ ...pizza, toppings: newToppings });
    }

    return (
        loading ?
            <div style={{ textAlign: 'center' }}>
                <img src="./loadingImg.gif" />
            </div>
            :

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
            >

                <Container maxWidth="lg">
                    <SelectPizza
                        handleAddToCart={handleAddToCart}
                        addBase={addBase}
                        pizza={pizza}
                        addTopping={addTopping}
                        setQuantity={setQuantity}
                        handleClose={handleClose}
                        open={open}
                        handleCheckout={handleCheckout}
                    />
                    <div>
                        <Grid container spacing={3}>
                            {
                                pizzaData.map((pizza, i) => (
                                    <Grid key={i} item xs={12} sm={i < 2 ? 6 : 4}>
                                        <div onClick={(name) => handleClickOpen(pizza.name, pizza.price, pizza.id, pizza.src)}>
                                            <div className="pizzaContainer">
                                                <motion.div
                                                    className="pizzaImgCon"
                                                    whileHover={{
                                                        rotate: [360, 0],
                                                        transition: { duration: 15, yoyo: "Infinity", ease: 'easeInOut' },
                                                    }}
                                                >
                                                    <img className="pizzaImg" src={'./pizzapics/' + pizza.src} />
                                                </motion.div>
                                                <div className="pizzaInfo">
                                                    <motion.h2 variants={linkVariants} whileHover="hover">{pizza.name}</motion.h2>
                                                    <span className="pizzaPrice">
                                                        <Price>{pizza.price}</Price>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </Grid>
                                ))
                            }
                        </Grid>
                    </div>
                </Container>
            </motion.div>
    )
}

const mapStateToProps = state => ({
    currency: state.total.currency
});

export default connect(mapStateToProps, { addProduct })(withRouter(Home));
