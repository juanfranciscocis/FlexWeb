import React from 'react';
import type {LucideIcon} from 'lucide-react';

interface StatsCardProps {
    icon: LucideIcon;
    iconColor: string;
    label: string;
    value: string | number;
}

export const StatsCard: React.FC<StatsCardProps> = ({
                                                        icon: Icon,
                                                        iconColor,
                                                        label,
                                                        value
                                                    }) => (
    <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center">
            <Icon className={`h-8 w-8 ${iconColor}`} />
            <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">{label}</p>
                <p className="text-2xl font-bold text-gray-900">{value}</p>
            </div>
        </div>
    </div>
);
