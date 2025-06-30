import React from 'react';
import type {Filters} from "../../hooks/useReviews.ts";
import {Filter} from "lucide-react";


interface ReviewFiltersProps {
    filters: Filters;
    properties: string[];
    channels: string[];
    onFiltersChange: (filters: Filters) => void;
}

export const ReviewFilters: React.FC<ReviewFiltersProps> = ({
                                                                filters,
                                                                properties,
                                                                channels,
                                                                onFiltersChange,
                                                            }) => (
    <div className="bg-white rounded-lg shadow p-6 mb-8">
        <div className="flex items-center mb-4">
            <Filter className="h-5 w-5 text-gray-500 mr-2" />
            <h3 className="text-lg font-medium text-gray-900">Filters</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <select
                value={filters.property}
                onChange={(e) => onFiltersChange({ ...filters, property: e.target.value })}
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
                onChange={(e) => onFiltersChange({ ...filters, channel: e.target.value })}
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
                onChange={(e) => onFiltersChange({ ...filters, rating: e.target.value })}
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                <option value="all">All Ratings</option>
                <option value="8">8+ Stars</option>
                <option value="6">6+ Stars</option>
                <option value="4">4+ Stars</option>
            </select>
            <select
                value={filters.dateRange}
                onChange={(e) => onFiltersChange({ ...filters, dateRange: e.target.value })}
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                <option value="all">All time</option>
                <option value="7days">Last 7 days</option>
                <option value="30days">Last 30 days</option>
                <option value="90days">Last 90 days</option>
            </select>
        </div>
    </div>
);
