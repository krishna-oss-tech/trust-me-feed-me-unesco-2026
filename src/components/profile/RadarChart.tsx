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

  return (
    <div className="w-full h-72 sm:h-80 flex items-center justify-center">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="75%" data={data}>
          <PolarGrid stroke="rgba(255, 255, 255, 0.1)" strokeDasharray="3 3" />
          <PolarAngleAxis
            dataKey="subject"
            tick={{ fill: '#94A3B8', fontSize: 11, fontFamily: 'monospace', fontWeight: 600 }}
          />
          <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: '#64748B', fontSize: 10 }} />
          <Radar
            name="Information Behaviour"
            dataKey="value"
            stroke="#00F0FF"
            fill="#00F0FF"
            fillOpacity={0.22}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};
