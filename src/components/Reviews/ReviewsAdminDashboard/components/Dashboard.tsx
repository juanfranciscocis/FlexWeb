import React, { useState, useEffect, useMemo } from 'react';
        import { Star, Filter, Eye, EyeOff, Calendar, MapPin, TrendingUp, Users, MessageSquare } from 'lucide-react';
        import { getReviews } from '../../services/reviews.service.ts';
        import type { Review, ReviewsResponse } from '../../interfaces/ReviewsResponse';

        type Filters = {
          property: string;
          channel: string;
          rating: string;
          dateRange: string;
        };

        const Dashboard = () => {
          const [reviews, setReviews] = useState<Review[]>([]);
          const [loading, setLoading] = useState<boolean>(true);
          const [selectedReviews, setSelectedReviews] = useState<Set<number>>(new Set());
          const [filters, setFilters] = useState<Filters>({
            property: 'all',
            channel: 'all',
            rating: 'all',
            dateRange: '30days',
          });
          const [currentView, setCurrentView] = useState<'dashboard' | 'property'>('dashboard');
          const [selectedProperty, setSelectedProperty] = useState<string | null>(null);

          useEffect(() => {
            fetchReviews();
          }, []);

          const fetchReviews = async () => {
            try {
              setLoading(true);
              const response: ReviewsResponse = await getReviews();
              console.log('Fetched reviews:', response);
              if (response.status === 'success') {
                setReviews(response.reviews);
                // Auto-select high-rated reviews for display
                const highRatedReviews = response.reviews
                  .filter((review) => review.rating >= 8)
                  .map((review) => review.id);
                setSelectedReviews(new Set(highRatedReviews));
              }
            } catch (error) {
              console.error('Error fetching reviews:', error);
            } finally {
              setLoading(false);
            }
          };

          const filteredReviews = useMemo(() => {
            return reviews.filter((review) => {
              if (filters.property !== 'all' && review.listingName !== filters.property) return false;
              if (filters.channel !== 'all' && review.channel !== filters.channel) return false;
              if (filters.rating !== 'all') {
                const ratingThreshold = parseInt(filters.rating);
                if (review.rating < ratingThreshold) return false;
              }
              return true;
            });
          }, [reviews, filters]);

          const properties = [...new Set(reviews.map((review) => review.listingName))];
          const channels = [...new Set(reviews.map((review) => review.channel))];

          const getPropertyStats = (propertyName: string | null) => {
            const propertyReviews = reviews.filter((r) => r.listingName === propertyName);
            const avgRating =
              propertyReviews.length > 0
                ? propertyReviews.reduce((sum, r) => sum + r.rating, 0) / propertyReviews.length
                : 0;
            const totalReviews = propertyReviews.length;
            const recentReviews = propertyReviews.filter(
              (r) => new Date(r.submittedAt) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
            ).length;

            return { avgRating: avgRating.toFixed(1), totalReviews, recentReviews };
          };

          const toggleReviewSelection = (reviewId: number) => {
            const newSelected = new Set(selectedReviews);
            if (newSelected.has(reviewId)) {
              newSelected.delete(reviewId);
            } else {
              newSelected.add(reviewId);
            }
            setSelectedReviews(newSelected);
          };

          const renderStars = (rating: number) => {
            return (
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-4 h-4 ${
                      star <= Math.floor(rating / 2) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
            );
          };

          const DashboardView = () => (
            <div className="min-h-screen bg-gray-50 p-6">
              <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">Reviews Dashboard</h1>
                  <p className="text-gray-600">Monitor and manage guest reviews across all properties</p>
                </div>

                {/* Stats Overview */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                  <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center">
                      <MessageSquare className="h-8 w-8 text-blue-500" />
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">Total Reviews</p>
                        <p className="text-2xl font-bold text-gray-900">{reviews.length}</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center">
                      <Star className="h-8 w-8 text-yellow-500" />
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">Avg Rating</p>
                        <p className="text-2xl font-bold text-gray-900">
                          {reviews.length > 0
                            ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
                            : '0.0'}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center">
                      <MapPin className="h-8 w-8 text-green-500" />
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">Properties</p>
                        <p className="text-2xl font-bold text-gray-900">{properties.length}</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center">
                      <Eye className="h-8 w-8 text-purple-500" />
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">Published</p>
                        <p className="text-2xl font-bold text-gray-900">{selectedReviews.size}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Filters */}
                <div className="bg-white rounded-lg shadow p-6 mb-8">
                  <div className="flex items-center mb-4">
                    <Filter className="h-5 w-5 text-gray-500 mr-2" />
                    <h3 className="text-lg font-medium text-gray-900">Filters</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <select
                      value={filters.property}
                      onChange={(e) => setFilters((prev) => ({ ...prev, property: e.target.value }))}
                      className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="all">All Properties</option>
                      {properties.map((property) => (
                        <option key={property} value={property}>
                          {property}
                        </option>
                      ))}
                    </select>
                    <select
                      value={filters.channel}
                      onChange={(e) => setFilters((prev) => ({ ...prev, channel: e.target.value }))}
                      className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="all">All Channels</option>
                      {channels.map((channel) => (
                        <option key={channel} value={channel}>
                          {channel}
                        </option>
                      ))}
                    </select>
                    <select
                      value={filters.rating}
                      onChange={(e) => setFilters((prev) => ({ ...prev, rating: e.target.value }))}
                      className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="all">All Ratings</option>
                      <option value="8">8+ Stars</option>
                      <option value="6">6+ Stars</option>
                      <option value="4">4+ Stars</option>
                    </select>
                    <select
                      value={filters.dateRange}
                      onChange={(e) => setFilters((prev) => ({ ...prev, dateRange: e.target.value }))}
                      className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="7days">Last 7 days</option>
                      <option value="30days">Last 30 days</option>
                      <option value="90days">Last 90 days</option>
                      <option value="all">All time</option>
                    </select>
                  </div>
                </div>

                {/* Property Performance */}
                <div className="bg-white rounded-lg shadow mb-8">
                  <div className="p-6 border-b">
                    <h3 className="text-lg font-medium text-gray-900">Property Performance</h3>
                  </div>
                  <div className="p-6">
                    <div className="grid gap-4">
                      {properties.map((property) => {
                        const stats = getPropertyStats(property);
                        return (
                          <div
                            key={property}
                            className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 cursor-pointer"
                            onClick={() => {
                              setSelectedProperty(property);
                              setCurrentView('property');
                            }}
                          >
                            <div className="flex-1">
                              <h4 className="font-medium text-gray-900">{property}</h4>
                              <div className="flex items-center mt-1">
                                {renderStars(Number(stats.avgRating) * 2)}
                                <span className="ml-2 text-sm text-gray-600">{stats.avgRating}/10</span>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-sm text-gray-600">{stats.totalReviews} total reviews</p>
                              <p className="text-sm text-green-600">{stats.recentReviews} this month</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Reviews List */}
                <div className="bg-white rounded-lg shadow">
                  <div className="p-6 border-b">
                    <h3 className="text-lg font-medium text-gray-900">Recent Reviews</h3>
                  </div>
                  <div className="divide-y">
                    {filteredReviews.map((review) => (
                      <div key={review.id} className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center mb-2">
                              <h4 className="font-medium text-gray-900 mr-3">{review.guestName}</h4>
                              {renderStars(review.rating * 2)}
                              <span className="ml-2 text-sm text-gray-600">{review.rating}/10</span>
                              <span className="ml-4 px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">
                                {review.channel}
                              </span>
                            </div>
                            <p className="text-gray-600 mb-2">{review.listingName}</p>
                            <p className="text-gray-800 mb-3">{review.publicReview}</p>
                            <p className="text-xs text-gray-500">
                              {new Date(review.submittedAt).toLocaleDateString()}
                            </p>
                          </div>
                          <button
                            onClick={() => toggleReviewSelection(review.id)}
                            className={`ml-4 p-2 rounded-full ${
                              selectedReviews.has(review.id)
                                ? 'bg-green-100 text-green-600'
                                : 'bg-gray-100 text-gray-400'
                            }`}
                          >
                            {selectedReviews.has(review.id) ? (
                              <Eye className="h-5 w-5" />
                            ) : (
                              <EyeOff className="h-5 w-5" />
                            )}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );

          const PropertyView = () => (
            <div className="min-h-screen bg-gray-50">
              {/* Property Header */}
              <div className="bg-white shadow">
                <div className="max-w-7xl mx-auto px-6 py-8">
                  <button
                    onClick={() => setCurrentView('dashboard')}
                    className="text-blue-600 hover:text-blue-800 mb-4 flex items-center"
                  >
                    ← Back to Dashboard
                  </button>
                  <h1 className="text-3xl font-bold text-gray-900 mb-4">{selectedProperty}</h1>
                  <div className="flex items-center space-x-6">
                    <div className="flex items-center">
                      {renderStars(Number(getPropertyStats(selectedProperty).avgRating) * 2)}
                      <span className="ml-2 text-lg font-medium">
                        {getPropertyStats(selectedProperty).avgRating}/10
                      </span>
                    </div>
                    <span className="text-gray-600">
                      {getPropertyStats(selectedProperty).totalReviews} reviews
                    </span>
                  </div>
                </div>
              </div>

              {/* Reviews Section */}
              <div className="max-w-7xl mx-auto px-6 py-8">
                <div className="bg-white rounded-lg shadow">
                  <div className="p-6 border-b">
                    <h2 className="text-2xl font-bold text-gray-900">Guest Reviews</h2>
                    <p className="text-gray-600 mt-1">What our guests are saying</p>
                  </div>
                  <div className="p-6">
                    <div className="grid gap-6">
                      {reviews
                        .filter(
                          (review) =>
                            review.listingName === selectedProperty && selectedReviews.has(review.id)
                        )
                        .map((review) => (
                          <div key={review.id} className="border-l-4 border-blue-500 pl-6 py-4">
                            <div className="flex items-center mb-3">
                              <div className="flex items-center">
                                {renderStars(review.rating * 2)}
                                <span className="ml-2 font-medium text-gray-900">{review.rating}/10</span>
                              </div>
                              <span className="ml-4 text-gray-600">•</span>
                              <span className="ml-4 text-gray-600">{review.guestName}</span>
                              <span className="ml-4 text-gray-600">•</span>
                              <span className="ml-4 text-sm text-gray-500">
                                {new Date(review.submittedAt).toLocaleDateString()}
                              </span>
                            </div>
                            <p className="text-gray-800 leading-relaxed">{review.publicReview}</p>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );

          if (loading) {
            return (
              <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                  <p className="mt-4 text-gray-600">Loading reviews...</p>
                </div>
              </div>
            );
          }

          return currentView === 'dashboard' ? <DashboardView /> : <PropertyView />;
        };

        export default Dashboard;
