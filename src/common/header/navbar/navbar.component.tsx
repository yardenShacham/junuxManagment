import * as React from "react";
import {Link} from 'react-router-dom';

export const Navbar = (props: any) => {
    let brandsHtml = props.brands.map((brand: any, i: any) => {
        return brand.dropdown ?
            <div key={i} className="navbar-brand dropdown">
                <div className="dropdown-toggle"
                     data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                    <a href="#">{brand.dropdownName}</a>
                    <span className="caret"></span>
                </div>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
                    {brand.dropdown.map((drop: any, j: any) =>
                        <li key={j}><Link to={drop.linkTo}>{drop.label}</Link></li>
                    )}
                </ul>
            </div> :
            brand.linkTo ?
                <div key={i} className="navbar-brand">
                    <Link to={brand.linkTo}>{brand.label}</Link>
                </div> :
                <div key={i} className="navbar-brand">
                    {brand.label}
                </div>
    });
    return (
        <nav className="navbar-default">
            <div className="container-fluid">
                <div className="row">
                    <div className="navbar-header">
                        {brandsHtml}
                    </div>
                    <div className="navbar-brand" style={{float: 'right'}}>
                        {props.userDetails}
                    </div>
                </div>
            </div>
        </nav>);
}