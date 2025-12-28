import React from 'react'
import { useApp } from '../../context/AppContext'

export default function AdminOrders() {
    const { orders, updateOrderStatus } = useApp()

    return (
        <div>
            <h1 className="text-3xl font-bold text-white mb-8">Order Management</h1>

            <div className="bg-gray-800 rounded-2xl border border-gray-700 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-gray-400">
                        <thead className="bg-gray-700/50 text-gray-300 uppercase text-xs">
                            <tr>
                                <th className="px-6 py-4">Order ID</th>
                                <th className="px-6 py-4">Customer</th>
                                <th className="px-6 py-4">Items</th>
                                <th className="px-6 py-4">Total</th>
                                <th className="px-6 py-4">Date</th>
                                <th className="px-6 py-4">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-700">
                            {orders.map((order) => (
                                <tr key={order.id} className="hover:bg-gray-700/30 transition-colors">
                                    <td className="px-6 py-4">#{order.id}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            {order.customer?.avatar && (
                                                <img src={order.customer.avatar} alt="Avatar" className="w-8 h-8 rounded-full" />
                                            )}
                                            <div>
                                                <div className="text-white font-medium">{order.customer?.name || 'Guest'}</div>
                                                <div className="text-xs">{order.customer?.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm">
                                            {order.items.map(item => (
                                                <div key={item.id} className="truncate w-48">
                                                    {item.quantity}x {item.name}
                                                </div>
                                            ))}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-white font-bold">${order.total.toFixed(2)}</td>
                                    <td className="px-6 py-4">{new Date(order.date).toLocaleDateString()}</td>
                                    <td className="px-6 py-4">
                                        <select
                                            value={order.status}
                                            onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                                            className={`bg-transparent border border-gray-600 rounded-lg py-1 px-3 text-sm focus:outline-none focus:border-blue-500 ${order.status === 'Processing' ? 'text-blue-400' :
                                                    order.status === 'Shipped' ? 'text-yellow-400' :
                                                        'text-green-400'
                                                }`}
                                        >
                                            <option value="Processing">Processing</option>
                                            <option value="Shipped">Shipped</option>
                                            <option value="Delivered">Delivered</option>
                                        </select>
                                    </td>
                                </tr>
                            ))}
                            {orders.length === 0 && (
                                <tr>
                                    <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
                                        No orders found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
