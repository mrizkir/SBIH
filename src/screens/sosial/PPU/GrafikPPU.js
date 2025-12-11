import { View, Text, Dimensions, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useMemo, useState, useEffect } from 'react'
import { LineChart } from "react-native-chart-kit";
import { stateDataPersentasePendudukUsia } from '../../../state/dataPPU';
import { color } from '../../../constants/Helper';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import { baseURL } from '../../../constants/General';
import { useMutation } from 'react-query';

const GrafikPPU = (props) => {
  const {dataPersentasePendudukUsia, setDataPersentasePendudukUsia} = stateDataPersentasePendudukUsia()

  const [expanded, setExpanded] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('4'); // Default: SMA/MA/SMK

  // API call with POST method
  const { mutate: fetchData, isLoading } = useMutation(
    async () => {
      const response = await axios.post(`${baseURL}/sosial/ppu`, {
        pendidikan: selectedCategory
      });
      return response.data.result;
    },
    {
      onError: (error) => {
        console.error("Error fetching PPU data:", error);
      },
      onSuccess: (data) => {
        setDataPersentasePendudukUsia(data);
      }
    }
  );

  // Fetch data on component mount and when category changes
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory]);

  // Sort data by year in ascending order for chart
  const sortedData = useMemo(() => {
    if (!dataPersentasePendudukUsia || dataPersentasePendudukUsia.length === 0) return [];
    return [...dataPersentasePendudukUsia].sort((a, b) => parseInt(a.tahun) - parseInt(b.tahun));
  }, [dataPersentasePendudukUsia]);

  // Get latest 5 records for chart display
  const chartData = useMemo(() => {
    if (sortedData.length === 0) return { labels: [], laki: [], perempuan: [] };
    
    // Take last 5 records (latest years)
    const latest5Records = sortedData.slice(-5);
    
    // Filter valid data
    const validData = latest5Records.filter(item => {
      const laki = parseFloat(item.laki);
      const perempuan = parseFloat(item.perempuan);
      return !isNaN(laki) && !isNaN(perempuan) && 
             laki >= 0 && perempuan >= 0;
    });
    
    const labels = validData.map(item => String(item.tahun));
    const laki = validData.map(item => parseFloat(item.laki));
    const perempuan = validData.map(item => parseFloat(item.perempuan));
    
    // Add dummy data (0 and 100) to force Y-axis range 0-100
    // Use first and last labels to make dummy points overlap with real data points
    const firstLabel = labels.length > 0 ? labels[0] : '';
    const lastLabel = labels.length > 0 ? labels[labels.length - 1] : '';
    
    return {
      labels: labels.length > 0 ? [firstLabel, ...labels, lastLabel] : labels,
      laki: laki.length > 0 ? [0, ...laki, 100] : laki,
      perempuan: perempuan.length > 0 ? [0, ...perempuan, 100] : perempuan
    };
  }, [sortedData]);

  const chartLabels = chartData.labels;
  const dataLaki = chartData.laki;
  const dataPerempuan = chartData.perempuan;

  // Statistik dari data chart (hanya laki-laki dan perempuan, tanpa total)
  const avgLaki = dataLaki.length > 0 ? (dataLaki.reduce((a, b) => a + b, 0) / dataLaki.length).toFixed(2) : '0';
  const avgPerempuan = dataPerempuan.length > 0 ? (dataPerempuan.reduce((a, b) => a + b, 0) / dataPerempuan.length).toFixed(2) : '0';
  const maxLaki = dataLaki.length > 0 ? Math.max(...dataLaki) : 0;
  const maxPerempuan = dataPerempuan.length > 0 ? Math.max(...dataPerempuan) : 0;
  const minLaki = dataLaki.length > 0 ? Math.min(...dataLaki) : 0;
  const minPerempuan = dataPerempuan.length > 0 ? Math.min(...dataPerempuan) : 0;

  // Gap Gender
  const genderGap = Math.abs(parseFloat(avgLaki) - parseFloat(avgPerempuan)).toFixed(2);

  // Fixed Y-Axis interval: 0, 10, 20, 30, ..., 100
  const yAxisInterval = 10; // Fixed interval of 10
  const yAxisSegments = 10; // 10 segments (0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100)

  const getCategoryColor = (categoryCode) => {
    const colors = {
      '1': '#e53935',
      '2': '#f57c00',
      '3': '#fbc02d',
      '4': '#1976d2',
      '5': '#1976d2',
      '6': '#7b1fa2',
      '7': '#c2185b',
    };
    return colors[String(categoryCode)] || '#1976d2';
  };

  const handleFilterChange = (categoryCode, title) => {
    setSelectedCategory(categoryCode);
    setExpanded(false);
  };

  const filterOptions = [
    { code: '1', title: 'Tidak/belum tamat SD', subtitle: 'Pendidikan dasar belum selesai', icon: 'school-outline' },
    { code: '2', title: 'SD/MI', subtitle: 'Sekolah Dasar / Madrasah Ibtidaiyah', icon: 'school' },
    { code: '3', title: 'SMP/MTs', subtitle: 'Sekolah Menengah Pertama / Madrasah Tsanawiyah', icon: 'book' },
    { code: '4', title: 'SMA/MA/SMK', subtitle: 'Sekolah Menengah Atas / Kejuruan', icon: 'library' },
    { code: '5', title: 'D1/D2/D3', subtitle: 'Diploma 1, 2, atau 3', icon: 'document-text' },
    { code: '6', title: 'D4/S1', subtitle: 'Diploma 4 / Sarjana', icon: 'ribbon' },
    { code: '7', title: 'S2/S3', subtitle: 'Magister / Doktor', icon: 'trophy' },
  ];

  const selectedFilter = filterOptions.find(opt => opt.code === selectedCategory) || filterOptions.find(opt => opt.code === '4');

  // Handle case when no data is available
  if (!dataPersentasePendudukUsia || dataPersentasePendudukUsia.length === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <Icon name="analytics" size={32} color="#1976d2" />
            <View style={styles.headerTextContainer}>
              <Text style={styles.headerTitle}>{props.route.params.title}</Text>
              <View style={styles.sourceContainer}>
                <Icon name="document-text-outline" size={16} color="#666" />
                <Text style={styles.sourceText}>Sumber: <Text style={styles.sourceBPS}>BPS</Text></Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.noDataContainer}>
          <Icon name="alert-circle-outline" size={64} color="#ccc" />
          <Text style={styles.noDataText}>Data tidak tersedia</Text>
          <Text style={styles.noDataSubText}>Silakan refresh untuk memuat data</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Icon name="analytics" size={32} color="#1976d2" />
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerTitle}>{props.route.params.title}</Text>
            <View style={styles.sourceContainer}>
              <Icon name="document-text-outline" size={16} color="#666" />
              <Text style={styles.sourceText}>Sumber: <Text style={styles.sourceBPS}>BPS</Text></Text>
            </View>
          </View>
        </View>
      </View>

      {/* Loading Indicator */}
      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#1976d2" />
          <Text style={styles.loadingText}>Memuat data...</Text>
        </View>
      )}

      {/* Filter Accordion */}
      <View style={styles.filterContainer}>
        <TouchableOpacity 
          style={styles.filterButton}
          onPress={() => setExpanded(!expanded)}
        >
          <View style={styles.filterButtonContent}>
            <Icon name="filter" size={20} color="#1976d2" />
            <Text style={styles.filterButtonText}>
              Filter: <Text style={styles.filterButtonValue}>{selectedFilter.title}</Text>
            </Text>
          </View>
          <Icon 
            name={expanded ? "chevron-up" : "chevron-down"} 
            size={20} 
            color="#1976d2" 
          />
        </TouchableOpacity>

        {expanded && (
          <ScrollView 
            style={styles.filterOptions}
            nestedScrollEnabled={true}
            showsVerticalScrollIndicator={true}
          >
            {filterOptions.map((option, index) => {
              const isSelected = option.code === selectedCategory;
              const optionColor = option.code ? getCategoryColor(option.code) : '#1976d2';
              return (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.filterOption,
                    isSelected && styles.filterOptionSelected
                  ]}
                  onPress={() => handleFilterChange(option.code, option.title)}
                >
                  <Icon 
                    name={option.icon} 
                    size={24} 
                    color={isSelected ? optionColor : '#666'} 
                  />
                  <View style={styles.filterOptionContent}>
                    <Text style={[
                      styles.filterOptionTitle,
                      isSelected && { color: optionColor }
                    ]}>
                      {option.title}
                    </Text>
                    <Text style={styles.filterOptionSubtitle}>{option.subtitle}</Text>
                  </View>
                  {isSelected && (
                    <Icon name="checkmark-circle" size={20} color={optionColor} />
                  )}
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        )}
      </View>

      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Period Info */}
        <View style={styles.periodCard}>
          <Icon name="time-outline" size={24} color="#1976d2" />
          <View style={styles.periodContent}>
            <Text style={styles.periodText}>
              Total Data: <Text style={styles.periodValue}>{sortedData.length} Record</Text>
            </Text>
            <Text style={styles.periodText}>
              Chart Menampilkan: <Text style={styles.periodValue}>5 Record Terbaru</Text>
            </Text>
            <Text style={styles.periodText}>
              Kategori: <Text style={styles.periodValue}>{selectedFilter.title}</Text>
            </Text>
          </View>
        </View>

        {/* Statistics Cards */}
        <View style={styles.statsContainer}>
          <View style={[styles.statCard, { backgroundColor: '#1e88e5' }]}>
            <Icon name="male" size={24} color="#fff" />
            <Text style={styles.statValue}>{maxLaki.toFixed(1)}%</Text>
            <Text style={styles.statLabel}>Laki-laki Tertinggi</Text>
          </View>

          <View style={[styles.statCard, { backgroundColor: '#e91e63' }]}>
            <Icon name="female" size={24} color="#fff" />
            <Text style={styles.statValue}>{maxPerempuan.toFixed(1)}%</Text>
            <Text style={styles.statLabel}>Perempuan Tertinggi</Text>
          </View>
        </View>

        {/* Chart Card */}
        <View style={styles.chartCard}>
          <View style={styles.chartHeader}>
            <Icon name="bar-chart" size={24} color="#1976d2" />
            <Text style={styles.chartTitle}>Grafik PPU - {selectedFilter.title}</Text>
          </View>

          <View style={styles.chartWrapper}>
            {chartLabels.length > 0 && dataLaki.length > 0 ? (
              <LineChart
                key={`chart-${selectedCategory}-${dataPersentasePendudukUsia.length}`}
                data={{
                  labels: chartLabels,
                  datasets: [
                    {
                      data: dataLaki,
                      color: (opacity = 1) => `rgba(30, 136, 229, ${opacity})`,
                      strokeWidth: 3
                    },
                    {
                      data: dataPerempuan,
                      color: (opacity = 1) => `rgba(233, 30, 99, ${opacity})`,
                      strokeWidth: 3
                    }
                  ],
                  legend: ["Laki-laki", "Perempuan"]
                }}
                width={Dimensions.get("window").width - 48}
                height={280}
                yAxisSuffix="%"
                yAxisInterval={yAxisInterval}
                fromZero={true}
                segments={yAxisSegments}
                formatYLabel={(value) => {
                  const num = parseFloat(value);
                  return num.toFixed(0);
                }}
                chartConfig={{
                  backgroundColor: "#1976d2",
                  backgroundGradientFrom: "#1976d2",
                  backgroundGradientTo: "#1565c0",
                  decimalPlaces: 1,
                  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                  style: {
                    borderRadius: 16,
                  },
                  propsForLabels: {
                    fontSize: 10,
                    fontWeight: '600'
                  },
                  propsForDots: {
                    r: "5",
                    strokeWidth: "2",
                  },
                  propsForBackgroundLines: {
                    strokeDasharray: "5,5",
                    stroke: "rgba(255,255,255,0.2)"
                  },
                }}
                bezier
                style={styles.chart}
              />
            ) : (
              <View style={styles.noChartContainer}>
                <Icon name="bar-chart-outline" size={48} color="#ccc" />
                <Text style={styles.noChartText}>Data tidak cukup untuk menampilkan grafik</Text>
              </View>
            )}
          </View>

          {/* Y-Axis Info */}
          <View style={styles.axisInfo}>
            <View style={styles.axisRow}>
              <Icon name="resize-outline" size={16} color="#666" />
              <Text style={styles.axisText}>Sumbu X: Tahun | Sumbu Y: Persentase (%)</Text>
            </View>
          </View>

          {/* Custom Legend */}
          <View style={styles.legendContainer}>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#1e88e5' }]} />
              <Text style={styles.legendText}>Laki-laki</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#e91e63' }]} />
              <Text style={styles.legendText}>Perempuan</Text>
            </View>
          </View>

          {/* Average Values */}
          <View style={styles.averageContainer}>
            <View style={styles.averageItem}>
              <Text style={styles.averageLabel}>Rata-rata Laki-laki:</Text>
              <Text style={[styles.averageValue, { color: '#1e88e5' }]}>{avgLaki}%</Text>
            </View>
            <View style={styles.averageItem}>
              <Text style={styles.averageLabel}>Rata-rata Perempuan:</Text>
              <Text style={[styles.averageValue, { color: '#e91e63' }]}>{avgPerempuan}%</Text>
            </View>
          </View>
        </View>

        {/* Gender Gap Card */}
        <View style={styles.gapCard}>
          <Text style={styles.gapTitle}>Kesenjangan Gender</Text>
          <View style={styles.gapContent}>
            <View style={styles.gapItem}>
              <Text style={styles.gapLabel}>Selisih Rata-rata:</Text>
              <Text style={[styles.gapValue, { color: '#1976d2' }]}>
                {genderGap}%
              </Text>
            </View>
            <Text style={styles.gapDescription}>
              {parseFloat(genderGap) < 2 
                ? 'Distribusi gender cukup seimbang' 
                : 'Terdapat kesenjangan gender yang perlu diperhatikan'}
            </Text>
          </View>
        </View>

        {/* Info Card */}
        <View style={styles.infoCard}>
          <View style={styles.infoHeader}>
            <Icon name="information-circle" size={24} color="#1976d2" />
            <Text style={styles.infoTitle}>Informasi Grafik</Text>
          </View>
          <View style={styles.infoContent}>
            <View style={styles.infoRow}>
              <View style={styles.infoDot} />
              <Text style={styles.infoText}>Menampilkan tren PPU 5 tahun terbaru untuk kategori {selectedFilter.title}</Text>
            </View>
            <View style={styles.infoRow}>
              <View style={styles.infoDot} />
              <Text style={styles.infoText}>Sumbu X: Tahun | Sumbu Y: Persentase (%)</Text>
            </View>
            <View style={styles.infoRow}>
              <View style={styles.infoDot} />
              <Text style={styles.infoText}>Garis biru = Laki-laki, Garis pink = Perempuan</Text>
            </View>
            <View style={styles.infoRow}>
              <View style={styles.infoDot} />
              <Text style={styles.infoText}>PPU = Persentase Penduduk Usia (dalam %)</Text>
            </View>
            <View style={styles.infoRow}>
              <View style={styles.infoDot} />
              <Text style={styles.infoText}>Total data: {sortedData.length} Record | Chart: 5 Record Terbaru</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

export default GrafikPPU

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fa',
  },
  header: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  headerTextContainer: {
    flex: 1,
  },
  headerTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#1a1a1a',
    marginBottom: 4,
  },
  sourceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  sourceText: {
    fontSize: 13,
    color: '#666',
  },
  sourceBPS: {
    color: '#e53935',
    fontWeight: '600',
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#E3F2FD',
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 8,
    gap: 12,
  },
  loadingText: {
    fontSize: 14,
    color: '#1976d2',
    fontWeight: '500',
  },
  filterContainer: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  filterButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  filterButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  filterButtonText: {
    fontSize: 16,
    color: '#666',
  },
  filterButtonValue: {
    fontWeight: 'bold',
    color: '#1976d2',
  },
  filterOptions: {
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    maxHeight: 400,
  },
  filterOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  filterOptionSelected: {
    backgroundColor: '#f5f5f5',
  },
  filterOptionContent: {
    flex: 1,
  },
  filterOptionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 2,
  },
  filterOptionSubtitle: {
    fontSize: 12,
    color: '#999',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 30,
  },
  periodCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E3F2FD',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    gap: 12,
  },
  periodContent: {
    flex: 1,
    gap: 4,
  },
  periodText: {
    fontSize: 14,
    color: '#666',
  },
  periodValue: {
    fontWeight: 'bold',
    color: '#1976d2',
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  statCard: {
    flex: 1,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  statLabel: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.9)',
    marginTop: 4,
    textAlign: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 8,
  },
  chartCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  chartHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  chartWrapper: {
    alignItems: 'center',
    marginBottom: 12,
  },
  chart: {
    borderRadius: 16,
  },
  axisInfo: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    marginBottom: 12,
  },
  axisRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  axisText: {
    fontSize: 13,
    color: '#666',
    fontWeight: '500',
  },
  legendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 24,
    paddingTop: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    marginBottom: 12,
    paddingBottom: 12,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  legendText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  averageContainer: {
    gap: 8,
    paddingTop: 12,
  },
  averageItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  averageLabel: {
    fontSize: 14,
    color: '#666',
  },
  averageValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  gapCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  gapTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 12,
  },
  gapContent: {
    gap: 8,
  },
  gapItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  gapLabel: {
    fontSize: 14,
    color: '#666',
  },
  gapValue: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  gapDescription: {
    fontSize: 14,
    color: '#555',
    fontStyle: 'italic',
  },
  infoCard: {
    backgroundColor: '#E3F2FD',
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#1976d2',
  },
  infoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  infoContent: {
    gap: 8,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  infoDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#1976d2',
  },
  infoText: {
    fontSize: 14,
    color: '#555',
    flex: 1,
  },
  noDataContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  noDataText: {
    fontSize: 18,
    color: '#666',
    marginTop: 16,
    fontWeight: '600',
  },
  noDataSubText: {
    fontSize: 14,
    color: '#999',
    marginTop: 8,
    textAlign: 'center',
  },
  noChartContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    minHeight: 280,
  },
  noChartText: {
    fontSize: 14,
    color: '#999',
    marginTop: 16,
    textAlign: 'center',
  },
})
