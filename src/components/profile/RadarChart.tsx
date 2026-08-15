import React from 'react';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { BehaviourMetrics } from '../../types';

interface RadarChartProps {
  metrics: BehaviourMetrics;
}

export const ProfileRadarChart: React.FC<RadarChartProps> = ({ metrics }) => {
  const data = [
    { subject: 'Fast Trust', value: metrics.fastTrust, fullMark: 100 },
    { subject: 'Verify Habit', value: metrics.verificationHabit, fullMark: 100 },
    { subject: 'Emotion Bias', value: metrics.emotionInfluence, fullMark: 100 },
    { subject: 'Social Proof', value: metrics.socialProofInfluence, fullMark: 100 },
    { subject: 'AI Trust', value: metrics.aiTrust, fullMark: 100 },
    { subject: 'Source Check', value: metrics.sourceChecking, fullMark: 100 },
  ];

  // "Ideal" comparison polygon — high verify, high source checking, low fast trust
  const idealData = [
    { subject: 'Fast Trust', value: 20, fullMark: 100 },
    { subject: 'Verify Habit', value: 85, fullMark: 100 },
    { subject: 'Emotion Bias', value: 15, fullMark: 100 },
    { subject: 'Social Proof', value: 20, fullMark: 100 },
    { subject: 'AI Trust', value: 40, fullMark: 100 },
    { subject: 'Source Check', value: 90, fullMark: 100 },
  ];

  return (
    <div className="w-full h-72 sm:h-80 flex items-center justify-center">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="75%" data={data}>
          <PolarGrid stroke="rgba(255, 255, 255, 0.06)" strokeDasharray="3 3" />
          <PolarAngleAxis
            dataKey="subject"
            tick={{ fill: '#94A3B8', fontSize: 10, fontFamily: "'Space Grotesk', monospace", fontWeight: 600 }}
          />
          <PolarRadiusAxis
            angle={30}
            domain={[0, 100]}
            tick={{ fill: '#475569', fontSize: 9 }}
            axisLine={false}
          />
          {/* Ideal baseline — ghost polygon */}
          <Radar
            name="Ideal Baseline"
            dataKey="value"
            data={idealData}
            stroke="rgba(56, 189, 248, 0.2)"
            fill="none"
            strokeDasharray="4 4"
            strokeWidth={1}
          />
          {/* User's actual data */}
          <Radar
            name="Your Profile"
            dataKey="value"
            stroke="#38BDF8"
            fill="#38BDF8"
            fillOpacity={0.15}
            strokeWidth={2}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};
