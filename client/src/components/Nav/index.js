import React, { Component } from 'react'
import { Collapse, CardBody, Card } from 'reactstrap';
import { Link } from 'react-router-dom'
import './style.css';
import Image from "./../Image";
const menus = [
    {
        id: 1,
        title: 'Home',
        link: '/home',
        submenu: [
            {
                id: 11,
                title: 'Login',
                link: '/login'
            },
            {
                id: 12,
                title: 'Signup',
                link: '/signup'
            },
            {
                id:13,
                title: 'Logout',
                link: '/logout'
            },
        ]
    },

    {
        id: 2,
        title: 'Reservation',
        link: '/reservation',
    },

{
    id: 3,
        title: 'Online Order',
        link: '/online',
},
{
    id: 4,
        title: 'A La Carte',
        link: '/alacarte',
},
{
    id: 5,
        title: 'All You Can Eat',
        link: '/ayce',
},
{
    id: 6,
        title: 'Lunch Special',
        link: '/lunch',
},
{
    id: 7,
        title: 'Order Summary',
        link: '/ordersummary',
},
{
    id: 8,
        title: 'Favorite',
        link: '/favorite',

}
]


export default class Nav extends Component {

    state = {
        isMenuShow: false,
        isOpen: 0,
    }

    menuHandler = () => {
        this.setState({
            isMenuShow: !this.state.isMenuShow
        })
    }

    setIsOpen = id => () => {
        this.setState({
            isOpen: id === this.state.isOpen ? 0 : id
        })
    }

    render() {

        const { isMenuShow, isOpen } = this.state;

        return (
            <div>
                <div className={`sidebar ${isMenuShow ? 'show' : ''}`}>
                    <ul className="navlist">
                        {menus.map(item => {
                            return (
                                <li key={item.id}>
                                    {item.submenu ? <p onClick={this.setIsOpen(item.id)}>
                                        {item.title}
                                        {item.submenu ? <i className="fa fa-angle-right" aria-hidden="true"></i> : ''}
                                    </p> : <Link to={item.link}>{item.title}</Link>}
                                    {item.submenu ?
                                    <Collapse isOpen={item.id === isOpen}>
                                        <Card>
                                            <CardBody>
                                                <ul>
                                                    {item.submenu.map(submenu => (
                                                        <li key={submenu.id}><Link className="active" to={submenu.link}>{submenu.title}</Link></li>
                                                    ))}
                                                </ul>
                                            </CardBody>
                                        </Card>
                                    </Collapse>
                                    : ''}
                                </li>
                            )
                        })}
                    </ul>

                </div>

                <div className="navbtn" onClick={this.menuHandler}><Image src={"../assets/sushi.png"} alt={"kawaii-sake"} width="100%"/></div>
            </div>
        )
    }
}
