import React, { useState } from "react";
import "./App.css";

function App() {
  const [item, setItem] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unitPrice, setUnitPrice] = useState("");
  const [items, setItems] = useState([]);

  const handleAddItem = (ev) => {
    ev.preventDefault();
    if (!item || !quantity || !unitPrice) return;

    const newItem = {
      item,
      quantity: Number(quantity),
      unitPrice: Number(unitPrice),
      total: Number(quantity) * Number(unitPrice),
    };

    setItems([...items, newItem]);
    setItem("");
    setQuantity("");
    setUnitPrice("");
  };

  const handleDelete = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const grandTotal = items.reduce((acc, cur) => acc + cur.total, 0);

  return (
    <div className="container">
      <h1 className="title">🛒 Shopping List</h1>
      <p className="subtitle">Manage your shopping items with ease</p>

      <div className="card form-card">
        <h2>➕ Add New Item</h2>
        <form onSubmit={handleAddItem} className="form">
          <div className="form-group">
            <label>Item Name</label>
            <input
              type="text"
              placeholder="Enter item name"
              value={item}
              onChange={(e) => setItem(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Quantity</label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Unit Price (KES)</label>
            <input
              type="number"
              value={unitPrice}
              onChange={(e) => setUnitPrice(e.target.value)}
            />
          </div>
          <button type="submit" className="add-btn">
            ➕ Add Item
          </button>
        </form>
      </div>

      <div className="card table-card">
        <h2>Shopping Items ({items.length})</h2>
        <table>
          <thead>
            <tr>
              <th>Item</th>
              <th>Quantity</th>
              <th>Unit Price</th>
              <th>Total</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {items.map((el, idx) => (
              <tr key={idx}>
                <td>{el.item}</td>
                <td>{el.quantity}</td>
                <td>KES {el.unitPrice.toFixed(2)}</td>
                <td style={{ color: "green", fontWeight: "bold" }}>
                  KES {el.total.toFixed(2)}
                </td>
                <td>
                  <button
                    onClick={() => handleDelete(idx)}
                    className="delete-btn"
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {items.length > 0 && (
        <div className="card total-card">
          <span>Grand Total:</span>
          <strong className="grand-amount">KES {grandTotal.toFixed(2)}</strong>
        </div>
      )}
    </div>
  );
}

export default App;
