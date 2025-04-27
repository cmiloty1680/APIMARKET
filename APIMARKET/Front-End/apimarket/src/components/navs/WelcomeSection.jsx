"use client"
import StatsCards from "../admin/StatsCards";
import ProductionAnalytics from "../admin/ProductionAnalytics";
import AlertsSection from "../admin/AlertsSection";
import ProgressCards from "../admin/ProgressCards";

function WelcomeSection() {
  return (
    <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-8 min-h-screen overflow-auto">
      <div className="max-w-7xl mx-auto">
        <StatsCards />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <ProductionAnalytics />
          <AlertsSection />
        </div>
        <ProgressCards />
      </div>
    </div>
  )
}

export default WelcomeSection;
