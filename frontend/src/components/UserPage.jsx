import { useState, useEffect } from 'react';

const UserPage = () => {
    const [username, setUsername] = useState('');
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        // Fetch username and orders data from API
        fetch('/api/user')
            .then(response => response.json())
            .then(data => {
                setUsername(data.username);
                setOrders(data.orders);
            })
            .catch(error => console.error(error));
    }, []);

    return (
        <div>
            <h1>{username} Orders</h1>
            <ul>
                {orders.map(order => (
                    <li key={order.id}>
                        <p>Order ID: {order.id}</p>
                        <p>Order Date: {order.date}</p>
                        <p>Order Total: {order.total}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserPage;
