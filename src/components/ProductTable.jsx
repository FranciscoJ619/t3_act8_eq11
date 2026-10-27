function ProductTable({
  productos,
  onEditar,
  onEliminar,
}) {
  if (productos.length === 0) {
    return <p className="no-products-msg">No se encontraron productos.</p>;
  }

  return (
    <div className="product-table-container">
      <table className="product-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Producto</th>
            <th>Categoría</th>
            <th>Precio</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {productos.map((producto) => (
            <tr key={producto.id}>
              <td className="col-id">{producto.id}</td>

              <td>
                <div className="product-name">
                  <img
                    src={producto.thumbnail}
                    alt={producto.title}
                    className="product-img"
                  />
                  <span className="product-title-text">{producto.title}</span>
                </div>
              </td>

              <td>
                <span className="category-badge">{producto.category}</span>
              </td>
              
              <td className="col-price">${producto.price}</td>

              <td>
                <div className="table-actions">
                  <button
                    type="button"
                    className="btn-edit"
                    onClick={() => onEditar(producto)}
                  >
                    Editar
                  </button>

                  <button
                    type="button"
                    className="btn-delete"
                    onClick={() => onEliminar(producto)}
                  >
                    Eliminar
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductTable;
