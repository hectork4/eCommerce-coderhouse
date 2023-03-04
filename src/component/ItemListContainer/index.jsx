import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useFirebase } from '../../hooks/useFirebase.js';
import Error404 from '../Error404/index.jsx';
import Item from './Item.jsx';
import './styles.css';

const ItemListContainer = () => {
  const { id } = useParams()
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const { filterItems, getItems } = useFirebase();

/*debido a los cambios en las consignas, se agregó items al firebase y se cambia el consumo de la API manejado hasta ahora
  const getArticles = async() => {
    const url = `https://api.reverb.com/api/${ id ? `/categories/${id}` : 'listings' }?limit=10&per_page=24`;
    await fetch(url)
    .then(res=>res.json())
    .then(setArticles)
  }
*/
  useEffect( () => {
    setLoading(true)
    id ? filterItems(id, setLoading).then(setArticles) : getItems().then(setArticles);
  }, [id])

  if (!articles.length && !loading) return <Error404 />
  if (!articles.length && loading) return <p>Loading...</p>

  return (
    <div className="row items-container">
      {articles?.length && articles.map((article) => {
        return <Item key={article.id} article={article} />
      }
      )}
    </div>
  )
}

export default ItemListContainer