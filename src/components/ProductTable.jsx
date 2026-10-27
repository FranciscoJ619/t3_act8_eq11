
function ProductTable({
  productos,
  onEditar,
  onEliminar,
}) {
  if (productos.length === 0) {
    return <p>No se encontraron productos.</p>;
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
              <td>{producto.id}</td>

              <td>
                <div className="product-name">
                  <img
                    src={producto.thumbnail}
                    alt=""
                    width="45"
                    height="45"
                  />
                  <span>{producto.title}</span>
                </div>
              </td>

              <td>{producto.category}</td>
              <td>${producto.price}</td>

              <td>
                <button
                  type="button"
                  onClick={() => onEditar(producto)}
                >
                  Editar
                </button>

                <button
                  type="button"
                  onClick={() => onEliminar(producto)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductTable;
