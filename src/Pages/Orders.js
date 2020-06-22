import React, { useEffect, useState } from 'react'
import { auth, db } from '../firebase'
import Price from '../Components/Price'
import Container from '@material-ui/core/Container';
import { withRouter } from "react-router-dom";


const Orders = (props) => {

    const [data, setData] = useState([])

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if (user) {
                console.log(user.email)
                db.collection("orders").where("email", "==", user.email).get()
                    .then(function (querySnapshot) {
                        setLoading(false)
                        console.log(querySnapshot)
                        querySnapshot.forEach(function (doc) {
                            // doc.data() is never undefined for query doc snapshots
                            console.log(doc.id, " => ", doc.data());
                            setData(prevData => prevData.concat(doc.data()))
                        });
                    });
            } else {
                props.history.push('/login')
            }
        })
    }, [])

    return (
        loading ?
            <div style={{ textAlign: 'center' }}>
                <img src="./loadingImg.gif" />
            </div>
            :
            <Container maxWidth="sm">

                <div>
                    {
                        data.map((d, i) => {
                            return (
                                <div key={i} className="singleOrder">
                                    <h2>{d.name} ({d.address})</h2>
                                    <ul className="orderul">
                                        {d.cartProducts.map((cp, i) => (
                                            <div key={i}>
                                                <li><h4>{cp.name}</h4></li>
                                                <li>Base: {cp.base}</li>
                                                <li>Toppings: {cp.toppings.join(', ')}</li>
                                                <li>Quantity: {cp.quantity}</li>
                                            </div>
                                        ))}
                                    </ul>
                                    <h3>Total Amount: <Price>{d.totalPrice}</Price></h3>
                                </div>
                            );
                        })
                    }
                </div>
            </Container>
    );
}

export default withRouter(Orders)