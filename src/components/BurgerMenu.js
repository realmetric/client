import React, {Component} from 'react'
import {Head, Nav} from './Presentation'
import BurgerButton from './BurgerBtn'
import CloseButton from './CloseBtn'

class BurgerMenu extends Component {
  state = {open: false}

  handleBurgerClick = () => this.setState({open: true})

  handleCloseMenu = () => this.setState({open: false})

  handleCategoryClick = (e) => {
    e.preventDefault()
    const category = e.target.href.match(/(#.*)$/)
    document.querySelector(category[1]).scrollIntoView({
      behavior: 'smooth'
    })
    this.handleCloseMenu()
  }

  render() {
    const {categories} = this.props
    const {open} = this.state

    return (
      <Head>
        <BurgerButton hidden={open} onClick={this.handleBurgerClick} />
        <Nav className={open ? 'active' :''} >
          <CloseButton onClick={this.handleCloseMenu} />
          <ul>{categories.map(cat =>
            <li key={cat}>
              <a href={`#${cat}`} onClick={this.handleCategoryClick}>{cat}</a>
            </li>)}
          </ul>
        </Nav>
      </Head>
    )
  }
}

export default BurgerMenu
