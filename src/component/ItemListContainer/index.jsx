import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Item from './Item.jsx';
import './styles.css';

const ItemListContainer = ({addItems}) => {
  const { id } = useParams()
  const [articles, setArticles] = useState([]);


  const getArticles = async() => {
    const url = `https://api.reverb.com/api/${ id ? `/categories/${id}` : 'listings' }?limit=10&per_page=24`;
    await fetch(url)
    .then(res=>res.json())
    .then(setArticles)
  }

  useEffect( () => {
    getArticles();
  }, [id])

  return (
    <div className="row items-container">
      {articles?.listings?.length && articles.listings.map((article) => {
        return <Item key={article.id} article={article} addItems={addItems} />
      }
      )}
    </div>
  )
}

export default ItemListContainer