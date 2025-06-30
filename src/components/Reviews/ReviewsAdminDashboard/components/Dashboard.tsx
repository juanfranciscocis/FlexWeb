import React, { useState } from 'react';
import {PropertyView} from "./components/PropertyView/PropertyView.tsx";
import {DashboardView} from "./components/DashboardView.tsx";
import {LoadingSpinner} from "../../../LoadingSpinner.tsx";
import { useReviews } from './hooks/useReviews.ts';

const Dashboard = () => {
  const {
    reviews,
    loading,
    selectedReviews,
    filters,
    filteredReviews,
    properties,
    channels,
    setFilters,
    toggleReviewSelection,
  } = useReviews();

  const [currentView, setCurrentView] = useState<'dashboard' | 'property'>('dashboard');
  const [selectedProperty, setSelectedProperty] = useState<string | null>(null);

  const handlePropertySelect = (property: string) => {
    setSelectedProperty(property);
    setCurrentView('property');
  };

  const handleBackToDashboard = () => {
    setCurrentView('dashboard');
    setSelectedProperty(null);
  };

  if (loading) return <LoadingSpinner />;

  return currentView === 'dashboard' ? (
      <DashboardView
          reviews={reviews}
          filteredReviews={filteredReviews}
          selectedReviews={selectedReviews}
          filters={filters}
          properties={properties}
          channels={channels}
          onFiltersChange={setFilters}
          onToggleReviewSelection={toggleReviewSelection}
          onPropertySelect={handlePropertySelect}
      />
  ) : (
      <PropertyView
          selectedProperty={selectedProperty!}
          reviews={reviews}
          selectedReviews={selectedReviews}
          onBackToDashboard={handleBackToDashboard}
      />
  );
};

export default Dashboard;
