import React from 'react';
import {MessageSquare, Star, MapPin, Eye} from 'lucide-react';
import {StatsCard} from './Stats/StatsCard.tsx';
import {ReviewFilters} from './Reviews/ReviewFilters.tsx';
import {PropertyCard} from './Stats/PropertyCard.tsx';
import {ReviewCard} from './Reviews/ReviewCard.tsx';
import {usePropertyStats} from '../hooks/usePropertyStats.ts';
import type {Filters} from '../hooks/useReviews.ts';
import type {Review} from "../../../interfaces/ReviewsResponse.ts";

interface DashboardViewProps {
    reviews: Review[];
    filteredReviews: Review[];
    selectedReviews: Set<number>;
    filters: Filters;
    properties: string[];
    channels: string[];
    onFiltersChange: (filters: Filters) => void;
    onToggleReviewSelection: (reviewId: number) => void;
    onPropertySelect: (property: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
                                                                reviews,
                                                                filteredReviews,
                                                                selectedReviews,
                                                                filters,
                                                                properties,
                                                                channels,
                                                                onFiltersChange,
                                                                onToggleReviewSelection,
                                                                onPropertySelect,
                                                            }) => {

    console.log(filteredReviews)

    const {getPropertyStats} = usePropertyStats();

    const avgRating = reviews.length > 0
        ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
        : '0.0';

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Reviews Dashboard</h1>
                    <p className="text-gray-600">Monitor and manage guest reviews across all properties</p>
                </div>

                {/* Stats Overview */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <StatsCard
                        icon={MessageSquare}
                        iconColor="text-blue-500"
                        label="Total Reviews"
                        value={reviews.length}
                    />
                    <StatsCard
                        icon={Star}
                        iconColor="text-yellow-500"
                        label="Avg Rating"
                        value={avgRating}
                    />
                    <StatsCard
                        icon={MapPin}
                        iconColor="text-green-500"
                        label="Properties"
                        value={properties.length}
                    />
                    <StatsCard
                        icon={Eye}
                        iconColor="text-purple-500"
                        label="Published"
                        value={selectedReviews.size}
                    />
                </div>

                {/* Filters */}
                <ReviewFilters
                    filters={filters}
                    properties={properties}
                    channels={channels}
                    onFiltersChange={onFiltersChange}
                />

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
                                    <PropertyCard
                                        key={property}
                                        property={property}
                                        avgRating={String(stats.avgRating)} totalReviews={stats.total}
                                        recentReviews={stats.thisMonth}
                                        onClick={() => onPropertySelect(property)}
                                    />
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
                            <ReviewCard
                                key={review.id}
                                review={review}
                                isSelected={review.status === 'published' ? true : false}
                                onToggleSelection={onToggleReviewSelection}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
