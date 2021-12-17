import React from 'react'
import Reviews from './reviews.jsx'
import RatingBreakdown from './ratingBreakdown.jsx'
import ProductBreakdown from './productBreakdown.jsx'
import axios from 'axios'
import API_KEY from './../../../dist/config.js';


class RatingsAndReviews extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      haveData: false,
      product: "59553",
      sort: 'helpful',
      page: 1,
      count: 5,
      reviews: [],
      metadata: []
    }
    this.getReviewData.bind(this)
  }

  componentDidMount() {
    this.getReviewData(59553, 'helpful', 1, 5)
  }

  getReviewData(product, sort, page, count) {
    if (product) {
      this.setState({
        product: product
      })
    } if (sort) {
      this.setState({
        sort: sort
      })
    } if (page) {
      this.setState({
        page: page
      })
    } if (count) {
      this.setState({
        count: count
      })
    }
    let reviews
    let metadata
    let reviewsUrl = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/reviews?sort=${this.state.sort}&product_id=${this.state.product}&page=${this.state.page}&count=${this.state.count}`
    let metadataUrl = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/reviews/meta?&product_id=${this.state.product}`
    let headers = {
      'Authorization': API_KEY
    }
    axios.get(reviewsUrl, {
      headers: headers
    })
    .then(result => {
      console.log('reviews in client', result.data),
      this.setState({
        reviews: result.data
      })
    })
    .catch(error => console.log('error!', error))
      //get metadata
    axios.get(metadataUrl, {
      headers: headers
    })
    .then (result => {
      console.log('metadata', result.data),
      this.setState({
        metadata: result.data,
        haveData: true
      })
    })
    .catch(error => console.log('error!', error))
  }

  render() {
    if (!this.state.haveData) {
      return(<div>
        <p>Loading Reviews</p>
      </div>)
    } else {
    return (
      <div>
        <h3>Ratings and Reviews</h3>
        <Reviews reviews={this.state.reviews}/>
        <RatingBreakdown metadata={this.state.metadata}/>
        <ProductBreakdown metadata={this.state.metadata}/>
      </div>
    )
  }
}
}

export default RatingsAndReviews;