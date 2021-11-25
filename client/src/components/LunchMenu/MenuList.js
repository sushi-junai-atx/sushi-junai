import React from "react";
import Container from "../Container";
import Row from "../Row";
import AnchorLink from 'react-anchor-link-smooth-scroll';
import Scrollup from "../ScrollUp/index";
import menu from "../../db/menu.json";
import MenuItems from "./MenuItems";
import RollMenuItems from "../ALaCarteMenu/MenuItems"
import RawFish from "../FoodKey/Rawfish";
import HouseSalad from "../FoodKey/Salad";
import StaffPick from "../FoodKey/StaffPick";
import Popular from "../FoodKey/Popular";
import BackButton from "../BackButton";

function Menu() {
    let alcMenu = menu.filter(item => item.menu === "ayce" || "alc");

    const lunchMenu = menu.filter(item => item.menu === "lunch");
    const combos = lunchMenu.filter(item => item.category === "combo");
    const lunchSpecials = lunchMenu.filter(item => item.category === "Lunch Special");
    const lunchBox = lunchMenu.filter(item => item.category === "Lunch Box");
    const houseSpecial = lunchMenu.filter(item => item.category === "house special");

    const chefsSpecial = alcMenu.filter(item => item.category === "Chef’s Special Rolls");

    return (
        <>
        <Container>
            <div className="menu-container" id="top">
                <Row>
                    <h1 style={{paddingLeft: "3%"}}><BackButton/> Lunch Menu</h1>
                    <hr />
                </Row>
                <Row>
                <div className="section-head"><h2 id="HouseSpecials">House Specials</h2>
                <h5>Sushi Junai 1 exclusives</h5></div>
                    <Container>
                        {
                            houseSpecial.map((item, idx) => {
                                return (
                                    <div className="card menu-card text-center">
                                        <div className="card-body d-flex justify-content-between">
                                            <MenuItems key={idx} name={item.name} price={item.price.toFixed(2)} description={item.description} fish={item.fish} popular={item.popular} staffpick={item.staffpick}>
                                            </MenuItems>
                                        </div>
                                    </div>
                                )
                            })
                        }
                        <AnchorLink href="#chefsSpecials" className="common-btn three">
                            List of Special Rolls
                        </AnchorLink>
                    </Container>
                </Row>
                <Row>
                <div className="section-head"><h2 id="LunchSpecials">Lunch Specials</h2>
                <h5>Served with miso soup</h5></div>
                    <Container>
                        {
                            lunchSpecials.map((item, idx) => {
                                return (
                                    <div className="card menu-card text-center">
                                        <div className="card-body d-flex justify-content-between">
                                            <MenuItems key={idx} name={item.name} price={item.price.toFixed(2)} description={item.description} fish={item.fish} popular={item.popular} staffpick={item.staffpick}>
                                            </MenuItems>
                                        </div>
                                    </div>
                                )
                            })
                        }

                    </Container>
                </Row>
                <Row>
                <div className="section-head"><h2 id="Combos">Combos</h2></div>
                    <Container>
                        {
                            combos.map((item, idx) => {
                                return (
                                    <div className="card menu-card text-center">
                                        <div className="card-body d-flex justify-content-between">
                                            <MenuItems key={idx} name={item.name} price={item.price.toFixed(2)} description={item.description} fish={item.fish} popular={item.popular} staffpick={item.staffpick}>
                                            </MenuItems>
                                        </div>
                                    </div>
                                )
                            })
                        }
                        <AnchorLink href="#chefsSpecials" className="common-btn three">
                            List of Special Rolls
                        </AnchorLink>
                    </Container>
                </Row>
                <Row>
                <div className="section-head"><h2 id="LunchBox">Lunch Box</h2>
                <h5>Served with miso soup, house salad, mixed tempura and rice in a bento box</h5></div>
                    <Container>
                        {
                            lunchBox.map((item, idx) => {
                                return (
                                    <div className="card menu-card text-center">
                                        <div className="card-body d-flex justify-content-between">
                                            <MenuItems key={idx} name={item.name} price={item.price.toFixed(2)} description={item.description} fish={item.fish} popular={item.popular} staffpick={item.staffpick}>
                                            </MenuItems>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </Container>
                </Row>
                <Row>
                    <div className="section-head"><h2><span className="anchor" id="chefsSpecials"></span>Chef's Special Rolls</h2></div>
                    <Container>
                        {
                            chefsSpecial.map((item, idx) => {
                                let oncePerOrder = ""; // Give the heading a class of "red" if the item can only be ordered once
                                if (item.onlyOrderOnce) {
                                    oncePerOrder = "red";
                                }
                                return (
                                    <div className="card menu-card text-center">
                                        <div className="card-body d-flex justify-content-between">
                                            <RollMenuItems key={idx} name={item.name} price={item.price} description={item.description} fish={item.fish} oncePerOrder={oncePerOrder} vegetarian={item.vegetarian} glutenFree={item.glutenFree} spicy={item.spicy} shellfish={item.shellfish} popular={item.popular} staffpick={item.staffpick}>
                                            </RollMenuItems>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </Container>
                </Row>
                <Container>
                    <br/>
                    <Popular />
                    <StaffPick />
                    <hr />
                    <RawFish />
                    <HouseSalad />
                </Container>
                    
                </div>
        </Container>
            <Scrollup />
        </>
    );
}

export default Menu;