import React from 'react';
import { 
  Activity, 
  Users, 
  Clock, 
  TrendingUp, 
  Download,
  Filter,
  ChevronDown,
  ChevronUp,
  MoreHorizontal
} from 'lucide-react';

const colors = {
  primary: '#3b82f6',
  primaryHover: '#2563eb',
  secondary: '#f3f4f6',
  danger: '#ef4444',
  dangerHover: '#dc2626',
  success: '#10b981',
  warning: '#f59e0b',
  gray50: '#f9fafb',
  gray100: '#f3f4f6',
  gray200: '#e5e7eb',
  gray300: '#d1d5db',
  gray400: '#9ca3af',
  gray500: '#6b7280',
  gray600: '#4b5563',
  gray700: '#374151',
  gray800: '#1f2937',
  gray900: '#111827',
  blue50: '#eff6ff',
  green50: '#ecfdf5',
  purple50: '#f5f3ff',
  red50: '#fef2f2',
  yellow50: '#fffbeb',
};

const AnalyticsView = () => {
  // Updated mock data with complete values
  const patientStats = {
    totalPatients: 1248,
    newThisMonth: 84,
    activePatients: 932,
    inactivePatients: 316,
    growthRate: 12.5,
  };

  const consultationStats = {
    totalConsultations: 5683,
    monthlyAverage: 236,
    videoCalls: 3245,
    inPerson: 2438,
    avgDuration: '22 min',
  };

  const conditionStats = [
    { name: 'Hypertension', value: 42, color: colors.primary },
    { name: 'Diabetes', value: 28, color: colors.success },
    { name: 'Respiratory', value: 15, color: colors.warning },
    { name: 'Mental Health', value: 8, color: colors.purple50 },
    { name: 'Other', value: 7, color: colors.gray400 },
  ];

  const monthlyData = [
    { month: 'Jan', patients: 65, consultations: 198 },
    { month: 'Feb', patients: 59, consultations: 187 },
    { month: 'Mar', patients: 72, consultations: 215 },
    { month: 'Apr', patients: 68, consultations: 203 },
    { month: 'May', patients: 84, consultations: 236 },
    { month: 'Jun', patients: 76, consultations: 224 },
    { month: 'Jul', patients: 81, consultations: 245 },
    { month: 'Aug', patients: 79, consultations: 231 },
    { month: 'Sep', patients: 88, consultations: 256 },
    { month: 'Oct', patients: 92, consultations: 268 },
    { month: 'Nov', patients: 85, consultations: 248 },
    { month: 'Dec', patients: 78, consultations: 239 },
  ].slice(-6); // Show last 6 months

  const ageDistribution = [
    { range: '0-18', value: 156, color: colors.blue50 },
    { range: '19-30', value: 287, color: colors.primary },
    { range: '31-45', value: 399, color: colors.success },
    { range: '46-60', value: 262, color: colors.warning },
    { range: '60+', value: 144, color: colors.purple50 },
  ];

  const genderDistribution = [
    { gender: 'Female', value: 58, color: colors.primary },
    { gender: 'Male', value: 39, color: colors.success },
    { gender: 'Other', value: 3, color: colors.purple50 },
  ];

  const consultationTypes = [
    { name: 'Video Consultations', value: 3245, color: colors.primary },
    { name: 'In-Person Visits', value: 2438, color: colors.success },
  ];

  const StatCard = ({ title, value, change, icon, bgColor, trend }) => (
    <div style={{
      background: bgColor || colors.gray50,
      borderRadius: 12,
      padding: 20,
      border: `1px solid ${colors.gray200}`,
      transition: 'all 0.2s',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
        <span style={{ fontSize: 14, color: colors.gray600, fontWeight: 500 }}>{title}</span>
        <div style={{
          width: 36,
          height: 36,
          borderRadius: 8,
          background: colors.white,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: colors.primary,
        }}>
          {icon}
        </div>
      </div>
      <div style={{ fontSize: 24, fontWeight: 700, color: colors.gray800, marginBottom: 4 }}>
        {value}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        <span style={{ 
          fontSize: 12, 
          color: trend === 'up' ? colors.success : colors.danger,
          display: 'flex',
          alignItems: 'center'
        }}>
          {trend === 'up' ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          {change}
        </span>
      </div>
    </div>
  );

  const BarChart = ({ data, title, height = 200 }) => {
    const maxValue = Math.max(...data.map(item => item.value));
    
    return (
      <div style={{
        background: colors.white,
        borderRadius: 12,
        padding: 16,
        border: `1px solid ${colors.gray200}`,
      }}>
        <h3 style={{ fontSize: 16, fontWeight: 600, color: colors.gray800, marginBottom: 16 }}>
          {title}
        </h3>
        <div style={{ 
          display: 'flex', 
          alignItems: 'flex-end', 
          gap: 8, 
          height,
          paddingTop: 16
        }}>
          {data.map((item, index) => (
            <div key={index} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{
                width: '80%',
                height: `${(item.value / maxValue) * 100}%`,
                background: item.color || colors.primary,
                borderRadius: 6,
                transition: 'height 0.3s ease',
              }} />
              <div style={{ 
                fontSize: 12, 
                color: colors.gray600, 
                marginTop: 8,
                textAlign: 'center'
              }}>
                {item.range || item.month}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const PieChartLegend = ({ data }) => (
    <div style={{ marginTop: 16 }}>
      {data.map((item, index) => (
        <div key={index} style={{ 
          display: 'flex', 
          alignItems: 'center', 
          marginBottom: 8,
          fontSize: 12
        }}>
          <div style={{
            width: 12,
            height: 12,
            borderRadius: '50%',
            background: item.color,
            marginRight: 8
          }} />
          <span style={{ color: colors.gray700, flex: 1 }}>{item.name || item.gender}</span>
          <span style={{ color: colors.gray600, fontWeight: 500 }}>{item.value}%</span>
        </div>
      ))}
    </div>
  );

  const TimeRangeFilter = () => (
    <div style={{
      display: 'flex',
      gap: 8,
      marginBottom: 24
    }}>
      {['Today', 'Week', 'Month', 'Quarter', 'Year', 'Custom'].map((range) => (
        <button
          key={range}
          style={{
            padding: '8px 12px',
            borderRadius: 8,
            border: `1px solid ${colors.gray300}`,
            background: range === 'Month' ? colors.primary : colors.white,
            color: range === 'Month' ? colors.white : colors.gray700,
            fontSize: 12,
            fontWeight: 500,
            cursor: 'pointer',
          }}
        >
          {range}
        </button>
      ))}
    </div>
  );

  return (
    <div style={{
      minHeight: '100vh',
      background: '#f9fafb',
      display: 'flex',
      flexDirection: 'row',
    }}>
      {/* Sidebar could go here if needed for navigation */}
      <div
        style={{
          flex: 1,
          padding: '2rem 2.5vw',
          maxWidth: 1200,
          margin: '0 auto',
          width: '100%',
          background: '#fff',
          borderRadius: 18,
          boxShadow: '0 1px 2px 0 rgba(0,0,0,0.05)',
          transition: 'box-shadow 0.2s, transform 0.2s',
          position: 'relative',
        }}
      >
        {/* Header section with blue background, rounded, shadow, border */}
        <div style={{
          background: '#e0f2fe',
          borderRadius: 32,
          padding: '2rem',
          marginBottom: '2rem',
          color: '#1e293b',
          position: 'relative',
          overflow: 'visible',
          boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
          border: '1.5px solid #d1d5db'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', margin: 0, marginBottom: '0.5rem' }}>
                Practice Analytics
              </h1>
              <p style={{ fontSize: '1.1rem', opacity: 0.9, margin: 0, marginBottom: '1.5rem' }}>
                Visualize your practice's performance and patient trends
              </p>
            </div>
            <div style={{ display: 'flex', gap: 12 }}>
              <button style={{
                padding: '12px 20px',
                borderRadius: 12,
                border: 'none',
                background: '#3b82f6',
                color: 'white',
                fontSize: 15,
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                transition: 'background 0.2s'
              }}>
                <Filter size={18} />
                Filters
              </button>
              <button style={{
                padding: '12px 20px',
                borderRadius: 12,
                border: 'none',
                background: '#f3e8ff',
                color: '#3b82f6',
                fontSize: 15,
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                transition: 'background 0.2s'
              }}>
                <Download size={18} />
                Export
              </button>
            </div>
          </div>
        </div>

        {/* Overview Stats - single row, horizontally scrollable on small screens */}
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          gap: 24,
          marginBottom: 32,
          overflowX: 'auto',
          WebkitOverflowScrolling: 'touch',
          paddingBottom: 8,
        }}>
          <StatCard
            title="Total Patients"
            value={patientStats.totalPatients}
            change={`+${patientStats.growthRate}%`}
            icon={<Users size={18} />}
            trend="up"
            bgColor="#fff"
          />
          <StatCard
            title="New This Month"
            value={patientStats.newThisMonth}
            change="+8 from last month"
            icon={<TrendingUp size={18} />}
            trend="up"
            bgColor="#e0f2fe"
          />
          <StatCard
            title="Active Patients"
            value={patientStats.activePatients}
            change={`${Math.round((patientStats.activePatients / patientStats.totalPatients) * 100)}% of total`}
            icon={<Activity size={18} />}
            bgColor="#fff"
          />
          <StatCard
            title="Avg Consultations"
            value={consultationStats.monthlyAverage}
            change={`${consultationStats.avgDuration} avg duration`}
            icon={<Clock size={18} />}
            bgColor="#ecfdf5"
          />
        </div>

        {/* Secondary Charts */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 32
        }}>
          <div style={{
            background: '#fff',
            borderRadius: 16,
            padding: 32,
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
            border: '1px solid #e5e7eb',
          }}>
            <h3 style={{ fontSize: 20, fontWeight: 700, color: '#1e293b', marginBottom: 24 }}>
              Common Conditions
            </h3>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{
                width: 180,
                height: 180,
                borderRadius: '50%',
                background: `conic-gradient(
                  ${conditionStats[0].color} 0% ${conditionStats[0].value}%,
                  ${conditionStats[1].color} 0% ${conditionStats[0].value + conditionStats[1].value}%,
                  ${conditionStats[2].color} 0% ${conditionStats[0].value + conditionStats[1].value + conditionStats[2].value}%,
                  ${conditionStats[3].color} 0% ${conditionStats[0].value + conditionStats[1].value + conditionStats[2].value + conditionStats[3].value}%,
                  ${conditionStats[4].color} 0% 100%
                )`
              }} />
            </div>
            <PieChartLegend data={conditionStats} />
          </div>

          <div style={{
            background: '#fff',
            borderRadius: 16,
            padding: 32,
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
            border: '1px solid #e5e7eb',
          }}>
            <h3 style={{ fontSize: 20, fontWeight: 700, color: '#1e293b', marginBottom: 24 }}>
              Gender Distribution
            </h3>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{
                width: 180,
                height: 180,
                borderRadius: '50%',
                background: `conic-gradient(
                  ${genderDistribution[0].color} 0% ${genderDistribution[0].value}%,
                  ${genderDistribution[1].color} 0% ${genderDistribution[0].value + genderDistribution[1].value}%,
                  ${genderDistribution[2].color} 0% 100%
                )`
              }} />
            </div>
            <PieChartLegend data={genderDistribution} />
          </div>

          <div style={{
            background: '#fff',
            borderRadius: 16,
            padding: 32,
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
            border: '1px solid #e5e7eb',
          }}>
            <h3 style={{ fontSize: 20, fontWeight: 700, color: '#1e293b', marginBottom: 24 }}>
              Consultation Types
            </h3>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 16,
              marginTop: 24
            }}>
              {consultationTypes.map((type, index) => (
                <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
                  <div style={{
                    width: 12,
                    height: 12,
                    borderRadius: '50%',
                    background: type.color,
                    marginRight: 12
                  }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: 15, color: '#1e293b' }}>{type.name}</span>
                      <span style={{ fontSize: 15, fontWeight: 700, color: '#1e293b' }}>
                        {type.value}
                      </span>
                    </div>
                    <div style={{
                      height: 10,
                      background: '#e5e7eb',
                      borderRadius: 5,
                      marginTop: 6,
                      overflow: 'hidden'
                    }}>
                      <div style={{
                        width: `${(type.value / consultationStats.totalConsultations) * 100}%`,
                        height: '100%',
                        background: type.color,
                        borderRadius: 5
                      }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsView;