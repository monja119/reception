import React, {useEffect, useState} from "react";
import talys_image from "../assets/images/talys.png";
import '../../css/navigation.css';
import { Navbar, Nav } from 'rsuite';
import UserIcon from '@rsuite/icons/legacy/User';
import { navigationsSettings } from "../data/navigations.js";

export default function NavigationBar () {
    const [currentPath, setCurrentPath] = useState(window.location.pathname);
    useEffect(() => {
        if(currentPath === "/") {
            setCurrentPath('/users');
        }
    }, [currentPath]);

    return(
        <>
            <Navbar
                className={""}
            >
                <Navbar.Brand href="/" className={" d-flex flex-rox justify-content-center align-item-center"}>
                    <img
                        src={talys_image}
                        alt="Talys"
                        className={"img-fluid h-100"}
                    />
                </Navbar.Brand>
                {
                    navigationsSettings.list.map((nav, index) => {
                        return (
                            <Nav key={index}>
                                {
                                    !nav.children ?
                                        <Nav.Item
                                            href={nav.path}
                                            active={currentPath === nav.path}
                                        >
                                            {nav.title}
                                        </Nav.Item>
                                        :
                                        nav.children.length && (
                                            <Nav.Menu title={nav.title}>
                                                {
                                                    nav.children.map((child, index) => {
                                                        return (
                                                            <Nav.Item key={index} href={child.path}>{child.title}</Nav.Item>
                                                        )
                                                    })
                                                }
                                            </Nav.Menu>
                                        )
                                }
                            </Nav>
                        )
                    })
                }
                <Nav pullRight>
                    <Nav.Item
                        icon={<UserIcon/>}
                        href={"/logout"}
                    >
                        Se Déconnecter
                    </Nav.Item>
                </Nav>
            </Navbar>
        </>
    )
}
