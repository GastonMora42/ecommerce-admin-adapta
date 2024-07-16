import Layout from "@/components/Layout";
import { useEffect, useState } from "react";
import axios from "axios";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get('/api/orders')
      .then(response => {
        setOrders(response.data);
      })
      .catch(error => {
        console.error('Error fetching orders:', error);
      });
  }, []);

  const handleDeleteOrder = (orderId) => {
    const confirmed = window.confirm('¿Estás seguro de que deseas eliminar esta orden?');
    if (confirmed) {
      axios.delete(`/api/orders?orderId=${orderId}`)
        .then(() => {
          setOrders(orders.filter(order => order._id !== orderId));
        })
        .catch(error => {
          console.error('Error deleting order:', error);
        });
    }
  };

  const styles = {
    ordersContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
    },
    order: {
      border: '1px solid #ccc',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
      position: 'relative',
    },
    orderHeader: {
      marginBottom: '20px',
    },
    greenText: {
      color: 'green',
    },
    redText: {
      color: 'red',
    },
    productBox: {
      border: '1px solid #ddd',
      borderRadius: '4px',
      padding: '10px',
      marginBottom: '10px',
      backgroundColor: '#e0f7fa',
    },
    productName: {
      fontWeight: 'bold',
      marginBottom: '5px',
    },
    productDetail: {
      marginBottom: '5px',
    },
    deleteButton: {
      position: 'absolute',
      top: '10px',
      right: '10px',
      backgroundColor: '#ff4d4d',
      color: 'white',
      border: 'none',
      padding: '10px',
      borderRadius: '5px',
      cursor: 'pointer',
    },
  };

  return (
    <Layout>
      <div style={styles.ordersContainer}>
        {orders.map(order => (
          <div key={order._id} style={styles.order}>
            <button 
              style={styles.deleteButton} 
              onClick={() => handleDeleteOrder(order._id)}
            >
              Eliminar Orden
            </button>
            <div style={styles.orderHeader}>
              <h2>Orden #{order._id}</h2>
              <p><strong>Fecha:</strong> {(new Date(order.createdAt)).toLocaleString()}</p>
              <p><strong>Estado de pago:</strong> <span style={order.paid ? styles.greenText : styles.redText}>{order.paid ? 'PAGADO' : 'PENDIENTE'}</span></p>
              <p><strong>Destinatario:</strong> <br />
                {order.name} {order.email}<br />
                {order.city} {order.postalCode} {order.country}<br />
                {order.streetAddress}
              </p>
            </div>
            <div>
              {order.line_items.map((item, index) => (
                <div key={index} style={styles.productBox}>
                  <div style={styles.productName}>{item.price_data?.product_data.name}</div>
                  <div style={styles.productDetail}><strong>Descripción:</strong> {item.title}</div>
                  <div style={styles.productDetail}><strong>Cantidad:</strong> {item.quantity}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
}
