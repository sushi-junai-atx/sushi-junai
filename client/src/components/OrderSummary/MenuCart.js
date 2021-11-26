import React, { useState } from 'react';
import { Link } from "react-router-dom";
import MenuCartItem from './MenuCartItem';
import MenuCartGreyItem from './MenuCartGreyItem';
import Container from "../Container";
import { 
    TabContent, 
    TabPane, 
    Row, 
    Nav, 
    NavItem, 
    NavLink,
    Table } from 'reactstrap';
import Button from "../Button";
import classnames from 'classnames';
import EmptyCart from './EmptyCart';
import TipCalculater from '../TipCalculater';
import Counter from "../Counter";
import './style.css';
import BackButton from '../BackButton';
import VisibleNotification from "../Notification2";
import HeaderTopbar from "../HeaderTopbar";
import Header from "../DineinHeader";
import Tour from "../OrderSummaryTour"

const MenuCart = (props) => {
    const [activeTab, setActiveTab] = useState('1');

    const toggle = tab => {
        if (activeTab !== tab) setActiveTab(tab);
    }

    const { menuCart } = props
    const { totalSavings } = props
    const { pastOrders } = props

    const currentQty = arr => arr.reduce((sum, { quantity }) => sum + quantity, 0);
    const currentQtyTotal = currentQty(menuCart);

    const sumCostTotal = arr => arr.reduce((sum, { price, quantity }) => sum + price * quantity, 0);
    const cartCostTotal = sumCostTotal(menuCart);

    let accumulativeTotal = (parseFloat(totalSavings) + cartCostTotal).toFixed(2)

    const limitedItem = [
    'Screaming "O"',
    'White "O"',
    "Beef",
    "Conch (Makigai)",
    "Tako Wasabi",
    "Sweet Shrimp (Ama Ebi)",
    "Sashimi Special",
    "Mochi Ice Cream"]
    
    const cartItems = menuCart.map(menuCart => menuCart.name);
    let used = cartItems.filter(item => limitedItem.includes(item));

    const appetizers = menuCart.filter(item => item.category === "Appetizer");
    const salads = menuCart.filter(item => item.category === "Salad");
    const soups = menuCart.filter(item => item.category === "Soup/Noodles");
    const rice = menuCart.filter(item => item.category === "Rice");
    const sushi = menuCart.filter(item => item.category === "Sushi");
    const classicRolls = menuCart.filter(item => item.category === "Classic Roll/Hand Roll");
    const chefsSpecial = menuCart.filter(item => item.category === "Chef’s Special Rolls");
    const tempuraRolls = menuCart.filter(item => item.category === "Tempura Rolls");
    const bakedRolls = menuCart.filter(item => item.category === "Baked Rolls");
    const desserts = menuCart.filter(item => item.category === "Desserts");

    function nextRound () => {
        props.getTotal(isNaN(accumulativeTotal) ? cartCostTotal : accumulativeTotal)
        props.savePastCart(menuCart)
        props.clearCart()
    }

    const pastApps = pastOrders.filter(item => item.category === "Appetizer");
    const pastSalads = pastOrders.filter(item => item.category === "Salad");
    const pastSoups = pastOrders.filter(item => item.category === "Soup/Noodles");
    const pastRice = pastOrders.filter(item => item.category === "Rice");
    const pastSushi = pastOrders.filter(item => item.category === "Sushi");
    const pastClassicRolls = pastOrders.filter(item => item.category === "Classic Roll/Hand Roll");
    const pastChefsSpecial = pastOrders.filter(item => item.category === "Chef’s Special Rolls");
    const pastTempuraRolls = pastOrders.filter(item => item.category === "Tempura Rolls");
    const pastBakedRolls = pastOrders.filter(item => item.category === "Baked Rolls");
    const pastDesserts = pastOrders.filter(item => item.category === "Desserts");

    return (
        <>
            <HeaderTopbar style ={{zIndex: "9999"}}/>
            <Header/>
            <Counter/>
            <Container>
                <div className="menu-container">
                    <Row className="title-bar">
                        <h3 className="cartHeading"><BackButton />Sushi Tracker ({currentQtyTotal})</h3>
                        <Button btn="float-right btn btn1 five">Tutorial</Button>
                    </Row>
                    <Nav tabs>
                        <NavItem>
                            <NavLink
                                className={classnames({ active: activeTab === '1' })}
                                onClick={() => { toggle('1'); }}
                            >
                                current rounds
                            </NavLink>
                        </NavItem>
                        <NavItem className="eight">
                            <NavLink
                                className={classnames({ active: activeTab === '2' })}
                                onClick={() => { toggle('2'); }}
                            >
                                past rounds
                            </NavLink>
                        </NavItem>
                    </Nav>
                    <TabContent activeTab={activeTab}>
                        <TabPane className="six" tabId="1">
                            <Table bordered striped>
                                <thead>
                                    <tr>
                                        <th>Item</th>
                                        <th>Quantity</th>
                                        <th>Price</th>
                                    </tr>
                                </thead>
                                {!menuCart.length ? <EmptyCart /> : ""}
                                <h4>{appetizers.length > 0 ? "Appetizers" : ""}</h4>
                                <tbody className="mainFont">
                                    {appetizers.map((item, idx) => <MenuCartItem key={idx} item={item} incrementItem={props.incrementItem} decrementItem={props.decrementItem} removeItem={props.removeItem} onetime={used.includes(item.name)} />)}
                                </tbody>
                                <h4>{salads.length > 0 ? "Salads" : ""}</h4>
                                <tbody className="mainFont">
                                    {salads.map((item, idx) => <MenuCartItem key={idx} item={item} incrementItem={props.incrementItem} decrementItem={props.decrementItem} removeItem={props.removeItem} />)}
                                </tbody>
                                <h4>{soups.length > 0 ? "Soups/Noodles" : ""}</h4>
                                <tbody className="mainFont">
                                    {soups.map((item, idx) => <MenuCartItem key={idx} item={item} incrementItem={props.incrementItem} decrementItem={props.decrementItem} removeItem={props.removeItem} />)}
                                </tbody>
                                <h4>{rice.length > 0 ? "Rice" : ""}</h4>
                                <tbody className="mainFont">
                                    {rice.map((item, idx) => <MenuCartItem key={idx} item={item} incrementItem={props.incrementItem} decrementItem={props.decrementItem} removeItem={props.removeItem} />)}
                                </tbody>
                                <h4>{sushi.length > 0 ? "Sushi (Nigiri)" : ""}</h4>
                                <tbody className="mainFont">
                                    {sushi.map((item, idx) => <MenuCartItem key={idx} item={item} incrementItem={props.incrementItem} decrementItem={props.decrementItem} removeItem={props.removeItem} onetime={used.includes(item.name)} />)}
                                </tbody>
                                <h4>{classicRolls.length || chefsSpecial.length || tempuraRolls.length || bakedRolls.length > 0 ? "Rolls" : ""}</h4>
                                <tbody className="mainFont">
                                    {classicRolls.map((item, idx) => <MenuCartItem key={idx} item={item} incrementItem={props.incrementItem} decrementItem={props.decrementItem} removeItem={props.removeItem} />)}
                                    {chefsSpecial.map((item, idx) => <MenuCartItem key={idx} item={item} incrementItem={props.incrementItem} decrementItem={props.decrementItem} removeItem={props.removeItem} onetime={used.includes(item.name)} />)}
                                    {tempuraRolls.map((item, idx) => <MenuCartItem key={idx} item={item} incrementItem={props.incrementItem} decrementItem={props.decrementItem} removeItem={props.removeItem} />)}
                                    {bakedRolls.map((item, idx) => <MenuCartItem key={idx} item={item} incrementItem={props.incrementItem} decrementItem={props.decrementItem} removeItem={props.removeItem} />)}
                                </tbody>
                                <h4>{desserts.length > 0 ? "Desserts" : ""}</h4>
                                <tbody className="mainFont">
                                    {desserts.map((item, idx) => <MenuCartItem key={idx} item={item} incrementItem={props.incrementItem} decrementItem={props.decrementItem} removeItem={props.removeItem} onetime={used.includes(item.name)} />)}
                                </tbody>
                                {/* TODO: Fix NEXT ROUND button */}
                                {!menuCart.length ? "" : <Button id="seven" btn="btn btn1" onClick={() => nextRound()} style={{display:"inline-block"}}>Next Round </Button> }
                                <VisibleNotification/>
                            </Table>
                        </TabPane>
                        <TabPane tabId="2">
                            <Table bordered striped>
                                <thead>
                                    <tr>
                                        <th>Item</th>
                                        <th>Quantity</th>
                                        <th>Price</th>
                                    </tr>
                                </thead>
                                <h4>{pastApps.length > 0 ? "Appetizers" : ""}</h4>
                                <tbody className="mainFont">
                                    {pastApps.map((item, idx) => <MenuCartGreyItem key={idx} item={item} incrementItem={props.incrementItem} decrementItem={props.decrementItem} removeItem={props.removeItem} onetime={used.includes(item.name)} />)}
                                </tbody>
                                <h4>{pastSalads.length > 0 ? "Salads" : ""}</h4>
                                <tbody className="mainFont">
                                    {pastSalads.map((item, idx) => <MenuCartGreyItem key={idx} item={item} incrementItem={props.incrementItem} decrementItem={props.decrementItem} removeItem={props.removeItem} />)}
                                </tbody>
                                <h4>{pastSoups.length > 0 ? "Soups/Noodles" : ""}</h4>
                                <tbody className="mainFont">
                                    {pastSoups.map((item, idx) => <MenuCartGreyItem key={idx} item={item} incrementItem={props.incrementItem} decrementItem={props.decrementItem} removeItem={props.removeItem} />)}
                                </tbody>
                                <h4>{pastRice.length > 0 ? "Rice" : ""}</h4>
                                <tbody className="mainFont">
                                    {pastRice.map((item, idx) => <MenuCartGreyItem key={idx} item={item} incrementItem={props.incrementItem} decrementItem={props.decrementItem} removeItem={props.removeItem} />)}
                                </tbody>
                                <h4>{pastSushi.length > 0 ? "Sushi (Nigiri)" : ""}</h4>
                                <tbody className="mainFont">
                                    {pastSushi.map((item, idx) => <MenuCartGreyItem key={idx} item={item} incrementItem={props.incrementItem} decrementItem={props.decrementItem} removeItem={props.removeItem} onetime={used.includes(item.name)} />)}
                                </tbody>
                                <h4>{pastClassicRolls.length || pastChefsSpecial.length || pastTempuraRolls.length || pastBakedRolls.length > 0 ? "Rolls" : ""}</h4>
                                <tbody className="mainFont">
                                    {pastClassicRolls.map((item, idx) => <MenuCartGreyItem key={idx} item={item} incrementItem={props.incrementItem} decrementItem={props.decrementItem} removeItem={props.removeItem} />)}
                                    {pastChefsSpecial.map((item, idx) => <MenuCartGreyItem key={idx} item={item} incrementItem={props.incrementItem} decrementItem={props.decrementItem} removeItem={props.removeItem} onetime={used.includes(item.name)} />)}
                                    {pastTempuraRolls.map((item, idx) => <MenuCartGreyItem key={idx} item={item} incrementItem={props.incrementItem} decrementItem={props.decrementItem} removeItem={props.removeItem} />)}
                                    {pastBakedRolls.map((item, idx) => <MenuCartGreyItem key={idx} item={item} incrementItem={props.incrementItem} decrementItem={props.decrementItem} removeItem={props.removeItem} />)}
                                </tbody>
                                <h4>{pastDesserts.length > 0 ? "Desserts" : ""}</h4>
                                <tbody className="mainFont">
                                    {pastDesserts.map((item, idx) => <MenuCartGreyItem key={idx} item={item} incrementItem={props.incrementItem} decrementItem={props.decrementItem} removeItem={props.removeItem} onetime={used.includes(item.name)} />)}
                                </tbody>
                            </Table>
                        </TabPane>
                    </TabContent>
                    <div className="row buttons">
                        <Link
                            to="/ayce" className="active">
                                <Button className="nine" btn="btn btn1" style={{display:"inline-block"}}><h5>BACK TO MENU</h5></Button>
                        </Link> 
                    </div>
                    <div className="row right">
                        <div className="col-3 offset-6 mainFont">
                            Round Total:
                        </div>
                        <div className="col-3 mainFont">
                            $ {cartCostTotal.toFixed(2)}
                        </div>
                    </div>
                    <div className="row right">
                        <div className="col-3 offset-6 mainFont">
                            All Rounds Total:
                        </div>
                        <div className="col-3 mainFont">
                            $ {isNaN(accumulativeTotal) ? cartCostTotal.toFixed(2) : accumulativeTotal}
                        </div>
                    </div>
                    <div className="row buttons right">
                        <TipCalculater total={isNaN(accumulativeTotal) ? cartCostTotal.toFixed(2) : accumulativeTotal} />
                    </div>
                </div>
            </Container>
            <Tour />
        </>
    );
};

export default MenuCart;
