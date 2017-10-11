import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Home extends Component {
  constructor() {
    super();
    this.state = {}
  }

  componentWillReceiveProps(nextProps) {
    console.log('>>>>>>>>>receiving Props:');
    console.log('>>>This Props:', this.props);
    console.log('>>>Next Props:', nextProps);
    
  }

  render() {
    console.log('********** HOME - this.props: ', this.props)
    const categories = this.props.categories;
    const products = this.props.products;

    /*********************************************/
    // create the Categories List - Sidebar
    const renderCategories = categories.map(category => {
        return (<Link to={ `/category/${ category.id }` } key={ category.id }><div
          className="col-sm-12">
          <h6>{ category.name }</h6></div></Link>)
      })
    /*********************************************/
    // create the Products List - Main Section
    const renderProducts = products.map(product => {
      if (product.inventory) {
        /*************************************/
        // accounting for varied image inputs:
        let image;
        if (product.imgUrls[0].slice(0, 7) === 'http://') {
          image = product.imgUrls[0]
        } else {
          image = `../assets/images/${ product.imgUrls[0] }.png`;
          if (image.slice(-8) === '.png.png') image = image.slice(0, -4);
        }
        /*************************************/
        // formating the price:
        const price = '$' + product.price.toString();
        /*************************************/
        return (<Link to={ `/category/${ product.id }` } key={ product.id }>
            <div className="col-sm-6 border">
              <div className="col-sm-6">
                <img src={ image } className="responsive-image" />
              </div>
              <div className="col-sm-6">
                <h6>{ product.title }</h6>     
                <h6><strong>Quantity Available:</strong> { product.inventory }</h6>
                <h6><strong>Price: </strong>{ price }</h6>
              </div>
            </div>
          </Link>)
      }
    })
    /*********************************************/
    return (
      <div>
        <div className="row">
          <div className="col-sm-12 marginbelow">
            <h6>Select a category (below) or enter search term (above)</h6>
          </div>
          <div className="col-sm-2 panel panel-default">
            <div className="col-sm-12 marginbelow panel-heading colWidth100">
              <h6 className="center">CATEGORIES</h6>
            </div>
            <div className="col-sm-12 marginbelow">
              { renderCategories }
            </div>
          </div>
          <div className="col-sm-10 panel panel-default">
            <div className="col-sm-12 marginbelow panel-heading colWidth100">
              <h6 className="center">PRODUCTS</h6>
            </div>
            <div className="col-sm-12 marginbelow">
              { renderProducts }
            </div>
          </div>

        </div>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return state;
}

export default connect(mapStateToProps)(Home);
