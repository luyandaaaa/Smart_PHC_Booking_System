import React, { useState } from 'react';
import { Users, Stethoscope, Pill, TrendingUp } from 'lucide-react';
import { colors } from '../constants';

const AnalyticsView = () => {
  const [timeRange, setTimeRange] = useState('month');
  const [activeMetric, setActiveMetric] = useState('patients');
  const [selectedChart, setSelectedChart] = useState('consultations');

  // Mock data for charts
  const analyticsData = {
    patients: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      data: [124, 118, 135, 148, 156, 162, 145, 178, 192, 201, 215, 230],
      change: '+18.5%',
      total: '2,356',
      avg: '196/mo'
    },
    consultations: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      data: [285, 270, 310, 325, 342, 318, 295, 365, 380, 402, 415, 430],
      change: '+14.2%',
      total: '4,037',
      avg: '336/mo'
    },
    prescriptions: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      data: [156, 142, 165, 178, 192, 185, 168, 205, 218, 225, 240, 255],
      change: '+12.8%',
      total: '2,329',
      avg: '194/mo'
    },
    revenue: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      data: [12500, 11800, 14200, 15600, 16500, 15800, 14500, 17800, 18500, 19200, 20500, 21800],
      change: '+15.7%',
      total: '198,800',
      avg: '16,566/mo',
      currency: 'ZAR'
    }
  };

  // Condition distribution data
  const conditionData = {
    labels: ['Hypertension', 'Diabetes', 'Respiratory', 'Musculoskeletal', 'Mental Health', 'Other'],
    data: [32, 24, 18, 12, 8, 6],
    colors: [colors.primary, colors.success, colors.warning, colors.danger, colors.purple50, colors.gray400]
  };

  // Age distribution data
  const ageData = {
    labels: ['0-18', '19-35', '36-50', '51-65', '65+'],
    data: [12, 28, 35, 18, 7],
    colors: [colors.blue50, colors.primary, colors.primaryHover, colors.gray400, colors.gray600]
  };

  // Language distribution data
  const languageData = {
    labels: ['English', 'isiZulu', 'Afrikaans', 'Sesotho', 'Other'],
    data: [42, 28, 15, 10, 5],
    colors: [colors.primary, colors.success, colors.warning, colors.danger, colors.gray400]
  };

  // Chart component
  const Chart = ({ data, isCurrency = false }) => {
    const maxValue = Math.max(...data.data);
    
    return (
      <div style={{ height: 200, display: 'flex', alignItems: 'flex-end', gap: 8 }}>
        {data.data.map((value, index) => (
          <div 
            key={index}
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              height: '100%'
            }}
          >
            <div style={{
              width: '80%',
              height: `${(value / maxValue) * 100}%`,
              background: data.colors ? data.colors[index] : colors.primary,
              borderRadius: 6,
              transition: 'height 0.3s',
              position: 'relative'
            }}>
              <div style={{
                position: 'absolute',
                bottom: '100%',
                left: '50%',
                transform: 'translateX(-50%)',
                background: colors.gray800,
                color: 'white',
                padding: '4px 8px',
                borderRadius: 4,
                fontSize: 10,
                marginBottom: 4,
                opacity: 0,
                transition: 'opacity 0.2s',
                whiteSpace: 'nowrap'
              }}>
                {isCurrency ? `${data.currency} ${value.toLocaleString()}` : value}
              </div>
            </div>
            <div style={{
              marginTop: 8,
              fontSize: 10,
              color: colors.gray500,
              textAlign: 'center'
            }}>
              {data.labels[index]}
            </div>
          </div>
        ))}
      </div>
    );
  };

  // Metric card component
  const MetricCard = ({ title, value, change, icon, isActive, onClick }) => (
    <button
      onClick={onClick}
      style={{
        flex: 1,
        minWidth: 180,
        background: isActive ? colors.blue50 : colors.gray50,
        border: `1px solid ${isActive ? colors.primary : colors.gray200}`,
        borderRadius: 12,
        padding: 16,
        textAlign: 'left',
        cursor: 'pointer',
        transition: 'all 0.2s'
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: 14, color: colors.gray600 }}>{title}</span>
        <div style={{
          width: 32,
          height: 32,
          borderRadius: 8,
          background: isActive ? colors.primary : colors.gray200,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          {React.cloneElement(icon, { size: 16, color: isActive ? 'white' : colors.gray600 })}
        </div>
      </div>
      <div style={{ fontSize: 24, fontWeight: 700, color: colors.gray800, margin: '8px 0' }}>
        {value}
      </div>
      <div style={{ 
        fontSize: 12, 
        color: change.startsWith('+') ? colors.success : colors.danger,
        display: 'flex',
        alignItems: 'center',
        gap: 4
      }}>
        {change}
      </div>
    </button>
  );

  return (
    <div style={{ padding: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h1 style={{ fontSize: 28, fontWeight: 700, color: colors.gray800 }}>Practice Analytics</h1>
        
        <div style={{ display: 'flex', gap: 8 }}>
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            style={{
              padding: '8px 12px',
              borderRadius: 8,
              border: `1px solid ${colors.gray300}`,
              fontSize: 14,
              background: '#fff',
              cursor: 'pointer',
            }}
          >
            <option value="week">Last 7 days</option>
            <option value="month">Last 30 days</option>
            <option value="quarter">Last 90 days</option>
            <option value="year">Last 12 months</option>
          </select>
        </div>
      </div>
      
      {/* Metrics Overview */}
      <div style={{ display: 'flex', gap: 16, marginBottom: 24, flexWrap: 'wrap' }}>
        <MetricCard
          title="Total Patients"
          value={analyticsData.patients.total}
          change={analyticsData.patients.change}
          icon={<Users size={16} />}
          isActive={activeMetric === 'patients'}
          onClick={() => setActiveMetric('patients')}
        />
        <MetricCard
          title="Consultations"
          value={analyticsData.consultations.total}
          change={analyticsData.consultations.change}
          icon={<Stethoscope size={16} />}
          isActive={activeMetric === 'consultations'}
          onClick={() => setActiveMetric('consultations')}
        />
        <MetricCard
          title="Prescriptions"
          value={analyticsData.prescriptions.total}
          change={analyticsData.prescriptions.change}
          icon={<Pill size={16} />}
          isActive={activeMetric === 'prescriptions'}
          onClick={() => setActiveMetric('prescriptions')}
        />
        <MetricCard
          title="Total Revenue"
          value={`${analyticsData.revenue.currency} ${analyticsData.revenue.total}`}
          change={analyticsData.revenue.change}
          icon={<TrendingUp size={16} />}
          isActive={activeMetric === 'revenue'}
          onClick={() => setActiveMetric('revenue')}
        />
      </div>
      
      {/* Main Chart */}
      <div style={{ 
        background: '#fff', 
        borderRadius: 16, 
        padding: 24, 
        border: `1px solid ${colors.gray200}`,
        marginBottom: 24
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 600, color: colors.gray800 }}>
            {activeMetric === 'patients' && 'Patient Growth'}
            {activeMetric === 'consultations' && 'Consultation Volume'}
            {activeMetric === 'prescriptions' && 'Prescriptions Issued'}
            {activeMetric === 'revenue' && 'Practice Revenue'}
          </h2>
          <div style={{ display: 'flex', gap: 8 }}>
            <div style={{ 
              padding: '6px 12px', 
              borderRadius: 8, 
              background: colors.gray100,
              fontSize: 12,
              color: colors.gray600
            }}>
              Avg: {analyticsData[activeMetric].avg}
            </div>
          </div>
        </div>
        
        <Chart data={analyticsData[activeMetric]} isCurrency={activeMetric === 'revenue'} />
      </div>
      
      {/* Secondary Charts */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
        {/* Condition Distribution */}
        <div style={{ 
          background: '#fff', 
          borderRadius: 16, 
          padding: 24, 
          border: `1px solid ${colors.gray200}`
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
            <h2 style={{ fontSize: 18, fontWeight: 600, color: colors.gray800 }}>Condition Distribution</h2>
          </div>
          <Chart data={conditionData} />
          
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 16 }}>
            {conditionData.labels.map((label, index) => (
              <div key={index} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <div style={{ 
                  width: 12, 
                  height: 12, 
                  borderRadius: 4, 
                  background: conditionData.colors[index] 
                }} />
                <span style={{ fontSize: 12, color: colors.gray600 }}>
                  {label} ({conditionData.data[index]}%)
                </span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Age Distribution */}
        <div style={{ 
          background: '#fff', 
          borderRadius: 16, 
          padding: 24, 
          border: `1px solid ${colors.gray200}`
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
            <h2 style={{ fontSize: 18, fontWeight: 600, color: colors.gray800 }}>Age Distribution</h2>
          </div>
          <Chart data={ageData} />
          
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 16 }}>
            {ageData.labels.map((label, index) => (
              <div key={index} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <div style={{ 
                  width: 12, 
                  height: 12, 
                  borderRadius: 4, 
                  background: ageData.colors[index] 
                }} />
                <span style={{ fontSize: 12, color: colors.gray600 }}>
                  {label} ({ageData.data[index]}%)
                </span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Language Distribution */}
        <div style={{ 
          background: '#fff', 
          borderRadius: 16, 
          padding: 24, 
          border: `1px solid ${colors.gray200}`
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
            <h2 style={{ fontSize: 18, fontWeight: 600, color: colors.gray800 }}>Language Distribution</h2>
          </div>
          <Chart data={languageData} />
          
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 16 }}>
            {languageData.labels.map((label, index) => (
              <div key={index} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <div style={{ 
                  width: 12, 
                  height: 12, 
                  borderRadius: 4, 
                  background: languageData.colors[index] 
                }} />
                <span style={{ fontSize: 12, color: colors.gray600 }}>
                  {label} ({languageData.data[index]}%)
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Key Performance Indicators */}
      <div style={{ marginTop: 32 }}>
        <h2 style={{ fontSize: 20, fontWeight: 600, color: colors.gray800, marginBottom: 16 }}>Key Performance Indicators</h2>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', 
          gap: 16 
        }}>
          <div style={{ 
            background: '#fff', 
            borderRadius: 12, 
            padding: 16, 
            border: `1px solid ${colors.gray200}`
          }}>
            <div style={{ fontSize: 14, color: colors.gray600, marginBottom: 8 }}>Avg. Consultation Duration</div>
            <div style={{ fontSize: 24, fontWeight: 700, color: colors.gray800 }}>22 min</div>
            <div style={{ fontSize: 12, color: colors.success }}>+2 min from last month</div>
          </div>
          
          <div style={{ 
            background: '#fff', 
            borderRadius: 12, 
            padding: 16, 
            border: `1px solid ${colors.gray200}`
          }}>
            <div style={{ fontSize: 14, color: colors.gray600, marginBottom: 8 }}>Patient Satisfaction</div>
            <div style={{ fontSize: 24, fontWeight: 700, color: colors.gray800 }}>94%</div>
            <div style={{ fontSize: 12, color: colors.success }}>+3% from last quarter</div>
          </div>
          
          <div style={{ 
            background: '#fff', 
            borderRadius: 12, 
            padding: 16, 
            border: `1px solid ${colors.gray200}`
          }}>
            <div style={{ fontSize: 14, color: colors.gray600, marginBottom: 8 }}>No-Show Rate</div>
            <div style={{ fontSize: 24, fontWeight: 700, color: colors.gray800 }}>8%</div>
            <div style={{ fontSize: 12, color: colors.danger }}>+1% from last month</div>
          </div>
          
          <div style={{ 
            background: '#fff', 
            borderRadius: 12, 
            padding: 16, 
            border: `1px solid ${colors.gray200}`
          }}>
            <div style={{ fontSize: 14, color: colors.gray600, marginBottom: 8 }}>Repeat Patients</div>
            <div style={{ fontSize: 24, fontWeight: 700, color: colors.gray800 }}>68%</div>
            <div style={{ fontSize: 12, color: colors.success }}>+5% from last year</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsView;