import './styles.css';

const ItemListContainer = ({ greeting, handleIncrease }) => {
        
  return (
    <div className="list-container">{ greeting }</div>
  )
}

export default ItemListContainer