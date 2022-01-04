import React from 'react'
import Reviews from './reviews.jsx'
import RatingBreakdown from './ratingBreakdown.jsx'
import ProductBreakdown from './productBreakdown.jsx'
import axios from 'axios'
const token = require('../../../dist/config.js');



class RatingsAndReviews extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      haveData: false,
      product: 0,
      sort: 'helpful',
      page: 1,
      count: 5,
      allReviews: [],
      metadata: [],
      filters: [],
      filteredReviews: []
    }
    this.getReviewData.bind(this)
    this.filterReviews.bind(this)
    this.updateFilters.bind(this)
  }

  componentDidMount() {
    let id = this.props.id
    this.setState({
      product: id
    })
    this.getReviewData(id, 'helpful', 1, 100)
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.filters !== prevState.filters) {
      this.filterReviews()
    }
  }

  getReviewData(product, sort, page, count) {
    let reviews
    let metadata
    let reviewsUrl = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/reviews?sort=${sort}&product_id=${product}&page=${page}&count=${count}`
    let metadataUrl = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/reviews/meta?&product_id=${product}`
    let headers = {
      'Authorization': token.TOKEN
    }
    axios.get(reviewsUrl, {
      headers: headers
    })
    .then(result => {
      console.log('result.data', result.data)
      this.setState({
        allReviews: result.data,
        filteredReviews: result.data
      })
    })
    .catch(error => console.log('error!', error))
    axios.get(metadataUrl, {
      headers: headers
    })
    .then (result => {
      this.setState({
        metadata: result.data,
        haveData: true
      })
    })
    .catch(error => console.log('error!', error))
  }



  updateFilters(rating) {
    let currentFilters = this.state.filters
    if (currentFilters.length === 0) {
      currrentFilters.push(rating)
    } else {
      let ratingIndex = currentFilters.indexOf(rating)
      //if current filters contain [input rating]
      if (ratingIndex !== -1) {
        //remove current rating from filters
        currentFilters.splice(ratingIndex, 1)
      } else {
        currentFilters.push(rating)
      }
    } this.setState({
        filters: currentFilters
    })
  }
  //review filtering function that will update state with only the reviews to show
  filterReviews() {
    let filters = this.state.filters
    let allReviews = this.state.allReviews.results
    let filteredReviews = []
    if (filters.length === 0) {
      filteredReviews = allReviews
    } else {
      //iterate through this.state.reviews
        //if the rating is in filters
          //push that review to filteredReviews
      //pass filtered reviews as props
      for (var i = 0; i < allReviews.length; i++) {
        for (var j = 0; j < filters.length; j++) {
          if (allReviews[i].rating === filters[j]) {
            filteredReviews.push(allReviews[i])
          }
        }
      }
    } this.setState({
        filteredReviews: filteredReviews
    })
  }



  render() {
    if (!this.state.haveData) {
      return(<div>
        <p>Loading Reviews</p>
      </div>)
    } else {
    return (
      <div className="ratings-grid-container">
        <Reviews reviews={this.state.filteredReviews}/>
        <div className="ratings-left-sidebar">
          <RatingBreakdown metadata={this.state.metadata} updateFilters={this.updateFilters}/>
          <ProductBreakdown metadata={this.state.metadata}/>
        </div>
      </div>
    )
  }
}
}

export default RatingsAndReviews;