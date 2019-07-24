import React, {Component} from 'react'
import './News.css'
import NewsCard from './NewsCard'

export default class NewsList extends Component {
    render() {
        return (
        <React.Fragment>
            <div className="articleButton">
                <button type="button"
                        className="btn btn-success"
                        onClick={() => {
                            this.props.history.push("/news/new")}
                        }>
                    Add Article
                </button>
            </div>
            <section className="news">
            {
                this.props.news.map(article =>
                    <NewsCard key={article.id} article={article} {...this.props} />)
            }
            </section>
        </React.Fragment>
        )
    }
}