import React, { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import RelatedProductsSlider from '../Components/RelatedProductsSlider'
import Nav from '../Components/Nav'
import { useApp } from '../context/AppContext'

export default function ProductDetail() {
    const { id } = useParams()
    const navigate = useNavigate()
    const productId = parseInt(id)
    const product = products.find(p => p.id === productId)

    const {
        products,
        addToCart,
        toggleFavorite,
        isFavorite,
        isAuthenticated,
        addReview,
        getProductReviews,
        getProductAverageRating
    } = useApp()

    const [selectedImage, setSelectedImage] = useState(0)
    const [quantity, setQuantity] = useState(1)

    // Review state
    const [rating, setRating] = useState(5)
    const [comment, setComment] = useState('')

    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Product Not Found</h2>
                    <Link to="/" className="text-blue-500 hover:text-blue-600">
                        Return to Home
                    </Link>
                </div>
            </div>
        )
    }

    const productImages = product.images || [product.image]
    const relatedProducts = products.filter(p => p.category === product.category && p.id !== product.id)

    // Reviews data
    const reviews = getProductReviews(productId)
    const avgRating = reviews.length > 0 ? getProductAverageRating(productId) : product.rating || 0
    const reviewCount = reviews.length > 0 ? reviews.length : 0

    const handleAddToCart = () => {
        addToCart(product, quantity)
    }

    const handleToggleFavorite = () => {
        toggleFavorite(product)
    }

    const handleSubmitReview = (e) => {
        e.preventDefault()
        if (!isAuthenticated) {
            navigate('/login')
            return
        }

        addReview(productId, { rating, comment })
        setComment('')
        setRating(5)
    }

    return (
        <div className="min-h-screen bg-white">
            {/* Navigation */}
            <Nav />

            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Breadcrumb */}
                <nav className="flex items-center gap-2 text-sm text-gray-600 mb-8">
                    <Link to="/" className="hover:text-blue-500 transition-colors">Home</Link>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    <span className="text-gray-400">{product.category}</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    <span className="text-gray-900 font-medium">{product.name}</span>
                </nav>

                {/* Product Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
                    {/* Image Gallery */}
                    <div className="space-y-4">
                        {/* Main Image */}
                        <div className="relative aspect-square bg-gray-100 rounded-2xl overflow-hidden group">
                            <img
                                src={productImages[selectedImage]}
                                alt={product.name}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            {product.discount && (
                                <div className="absolute top-4 right-4 bg-gradient-to-br from-red-500 to-pink-500 text-white px-4 py-2 rounded-full text-lg font-bold shadow-lg">
                                    -{product.discount}% OFF
                                </div>
                            )}
                        </div>

                        {/* Thumbnail Gallery */}
                        {productImages.length > 1 && (
                            <div className="grid grid-cols-4 gap-4">
                                {productImages.map((img, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setSelectedImage(index)}
                                        className={`aspect-square bg-gray-100 rounded-lg overflow-hidden border-2 transition-all duration-300 ${selectedImage === index
                                            ? 'border-blue-500 scale-95'
                                            : 'border-transparent hover:border-gray-300'
                                            }`}
                                    >
                                        <img src={img} alt={`${product.name} ${index + 1}`} className="w-full h-full object-cover" />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Product Info */}
                    <div className="space-y-6">
                        {/* Category Badge */}
                        <div className="inline-block">
                            <span className="px-4 py-1 bg-blue-100 text-blue-600 text-sm font-semibold rounded-full">
                                {product.category}
                            </span>
                        </div>

                        {/* Product Name */}
                        <h1 className="text-4xl font-bold text-gray-900">{product.name}</h1>

                        {/* Rating */}
                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-1">
                                {[...Array(5)].map((_, i) => (
                                    <svg
                                        key={i}
                                        className={`w-5 h-5 ${i < Math.floor(avgRating) ? 'text-yellow-400' : 'text-gray-300'}`}
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ))}
                            </div>
                            <span className="text-gray-600">({avgRating.toFixed(1)} out of 5) • {reviewCount} reviews</span>
                        </div>

                        {/* Price */}
                        <div className="flex items-baseline gap-4">
                            <span className="text-5xl font-bold text-gray-900">${product.price}</span>
                            {product.originalPrice && (
                                <span className="text-2xl text-gray-400 line-through">${product.originalPrice}</span>
                            )}
                        </div>

                        {/* Stock Status */}
                        <div className="flex items-center gap-2">
                            <div className={`w-3 h-3 rounded-full ${product.inStock ? 'bg-green-500' : 'bg-red-500'}`}></div>
                            <span className={`font-medium ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
                                {product.inStock ? 'In Stock' : 'Out of Stock'}
                            </span>
                        </div>

                        {/* Description */}
                        <p className="text-lg text-gray-600 leading-relaxed">{product.description}</p>

                        {/* Quantity Selector */}
                        <div className="flex items-center gap-4">
                            <span className="text-gray-700 font-medium">Quantity:</span>
                            <div className="flex items-center border-2 border-gray-300 rounded-lg">
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="px-4 py-2 hover:bg-gray-100 transition-colors"
                                >
                                    -
                                </button>
                                <span className="px-6 py-2 font-semibold">{quantity}</span>
                                <button
                                    onClick={() => setQuantity(quantity + 1)}
                                    className="px-4 py-2 hover:bg-gray-100 transition-colors"
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-4 pt-4">
                            <button
                                onClick={handleAddToCart}
                                disabled={!product.inStock}
                                className={`flex-1 py-4 rounded-xl font-bold text-lg transition-all duration-300 ${product.inStock
                                    ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 hover:shadow-xl hover:scale-105'
                                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                    }`}
                            >
                                Add to Cart
                            </button>
                            <button
                                onClick={handleToggleFavorite}
                                className={`px-6 py-4 border-2 rounded-xl transition-all duration-300 ${isFavorite(product.id)
                                    ? 'border-red-500 text-red-500 bg-red-50'
                                    : 'border-gray-300 hover:border-blue-500 hover:text-blue-500'
                                    }`}
                            >
                                <svg className={`w-6 h-6 ${isFavorite(product.id) ? 'fill-current' : 'fill-none'}`} stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                            </button>
                        </div>

                        {/* Specifications */}
                        {product.specs && (
                            <div className="mt-8 border-t pt-8">
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">Specifications</h3>
                                <div className="grid grid-cols-1 gap-3">
                                    {Object.entries(product.specs).map(([key, value]) => (
                                        <div key={key} className="flex items-center justify-between py-3 border-b border-gray-200">
                                            <span className="text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}:</span>
                                            <span className="font-semibold text-gray-900">{value}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Reviews Section */}
                        <div className="mt-8 border-t pt-8">
                            <h3 className="text-2xl font-bold text-gray-900 mb-6">Customer Reviews</h3>

                            {/* Add Review Form */}
                            <div className="bg-gray-50 rounded-xl p-6 mb-8">
                                <h4 className="text-lg font-bold mb-4">Write a Review</h4>
                                {isAuthenticated ? (
                                    <form onSubmit={handleSubmitReview}>
                                        <div className="mb-4">
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                                            <div className="flex gap-2">
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <button
                                                        key={star}
                                                        type="button"
                                                        onClick={() => setRating(star)}
                                                        className="focus:outline-none"
                                                    >
                                                        <svg
                                                            className={`w-8 h-8 ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
                                                            fill="currentColor"
                                                            viewBox="0 0 20 20"
                                                        >
                                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                        </svg>
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Review</label>
                                            <textarea
                                                value={comment}
                                                onChange={(e) => setComment(e.target.value)}
                                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
                                                rows="3"
                                                placeholder="Share your thoughts about this product..."
                                                required
                                            ></textarea>
                                        </div>
                                        <button
                                            type="submit"
                                            className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                                        >
                                            Submit Review
                                        </button>
                                    </form>
                                ) : (
                                    <div className="text-center py-4">
                                        <p className="text-gray-600 mb-4">Please log in to write a review</p>
                                        <Link
                                            to="/login"
                                            className="inline-block bg-white border-2 border-blue-500 text-blue-500 px-6 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors"
                                        >
                                            Log In
                                        </Link>
                                    </div>
                                )}
                            </div>

                            {/* Reviews List */}
                            <div className="space-y-6">
                                {reviews.length === 0 ? (
                                    <p className="text-gray-500 text-center py-4">No reviews yet. Be the first to review!</p>
                                ) : (
                                    reviews.map(review => (
                                        <div key={review.id} className="border-b border-gray-100 pb-6 last:border-0 last:pb-0">
                                            <div className="flex items-center gap-4 mb-2">
                                                <img
                                                    src={review.userAvatar}
                                                    alt={review.userName}
                                                    className="w-10 h-10 rounded-full"
                                                />
                                                <div>
                                                    <h5 className="font-bold text-gray-900">{review.userName}</h5>
                                                    <div className="flex items-center text-xs text-gray-500 gap-2">
                                                        <div className="flex text-yellow-400">
                                                            {[...Array(5)].map((_, i) => (
                                                                <svg
                                                                    key={i}
                                                                    className={`w-3 h-3 ${i < review.rating ? 'fill-current' : 'text-gray-300 fill-current'}`}
                                                                    viewBox="0 0 20 20"
                                                                >
                                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                                </svg>
                                                            ))}
                                                        </div>
                                                        <span>•</span>
                                                        <span>{new Date(review.date).toLocaleDateString()}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <p className="text-gray-600">{review.comment}</p>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Related Products */}
                {relatedProducts.length > 0 && (
                    <RelatedProductsSlider products={relatedProducts} currentProductId={product.id} />
                )}
            </div>
        </div>
    )
}
