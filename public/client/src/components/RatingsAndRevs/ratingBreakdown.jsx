import React from 'react'
import IndividualRatingBreakdown from './individualRatingBreakdown.jsx'
import Stars from './stars.jsx'

class RatingBreakdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  componentDidMount() {
    // console.log('this.props.metadata', this.props.metadata)
  }

  render() {
    let ratings
    if (this.props.metadata?.ratings) {
      ratings = this.props.metadata.ratings
    }
    let totalRatings = 10
    let avgRating = 2.5
    let numFiveStars = 2
    let numFourStars = 2
    let numThreeStars = 2
    let numTwoStars = 2
    let numOneStar = 2
    if (ratings) {
      totalRatings = JSON.parse(ratings[1]) + JSON.parse(ratings[2]) + JSON.parse(ratings[3]) + JSON.parse(ratings[4]) + JSON.parse(ratings[5])
      avgRating = ((Math.round(((JSON.parse(ratings[1]) + 2 * JSON.parse(ratings[2]) + 3 * JSON.parse(ratings[3]) + 4 * JSON.parse(ratings[4]) + 5 * JSON.parse(ratings[5])) / totalRatings )*10))/10).toFixed(1)
      numFiveStars = Math.floor(JSON.parse(ratings[5])/totalRatings*100)
      numFourStars = Math.floor(JSON.parse(ratings[4])/totalRatings*100)
      numThreeStars = Math.floor(JSON.parse(ratings[3])/totalRatings*100)
      numTwoStars = Math.floor(JSON.parse(ratings[2])/totalRatings*100)
      numOneStar = Math.floor(JSON.parse(ratings[1])/totalRatings*100)
    }
    return (
      <div className="rating-breakdown">
        <h3>Ratings and Reviews</h3>
        <Stars average={avgRating} size={25}/>
        <p>{avgRating} Stars, {totalRatings} Ratings</p>
        <IndividualRatingBreakdown numStars={5} percent={numFiveStars} ratings={ratings[5]} updateFilters={this.props.updateFilters}/>
        <IndividualRatingBreakdown numStars={4} percent={numFourStars} ratings={ratings[4]} updateFilters={this.props.updateFilters}/>
        <IndividualRatingBreakdown numStars={3} percent={numThreeStars} ratings={ratings[3]} updateFilters={this.props.updateFilters}/>
        <IndividualRatingBreakdown numStars={2} percent={numTwoStars} ratings={ratings[2]} updateFilters={this.props.updateFilters}/>
        <IndividualRatingBreakdown numStars={1} percent={numOneStar} ratings={ratings[1]} updateFilters={this.props.updateFilters}/>
      </div>
    )
  }
}

export default RatingBreakdown