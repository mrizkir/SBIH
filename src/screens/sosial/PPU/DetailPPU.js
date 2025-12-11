import { StyleSheet, Text, View, ScrollView, Animated, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useRef, useEffect, useState, useMemo } from 'react'
import { stateDataPersentasePendudukUsia } from '../../../state/dataPPU'
import { color } from '../../../constants/Helper'
import Icon from 'react-native-vector-icons/Ionicons'
import axios from 'axios'
import { baseURL } from '../../../constants/General'
import { useMutation } from 'react-query'

const AnimatedCard = ({ children, delay = 0 }) => {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(20)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 400,
                delay,
                useNativeDriver: true,
            }),
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 400,
                delay,
                useNativeDriver: true,
            }),
        ]).start();
    }, []);

    return (
        <Animated.View
            style={{
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
            }}
        >
            {children}
        </Animated.View>
    );
};

const DetailPPU = (props) => {
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

  // Sort data by year in descending order using useMemo to prevent unnecessary recalculations
  const sortedData = useMemo(() => {
    return [...(dataPersentasePendudukUsia || [])].sort((a, b) => {
      return parseInt(b.tahun) - parseInt(a.tahun);
    });
  }, [dataPersentasePendudukUsia]);

  // Filter data based on selected category
  const dataFiltered = useMemo(() => {
    // Filter by category code or pendidikan text
    return sortedData.filter(item => {
      // Try to match by id_pendidikan, kategori, or id field
      const categoryCode = item.id_pendidikan || item.kategori || item.id;
      const pendidikanText = item.pendidikan?.toLowerCase() || '';
      
      // Match by code if available
      if (categoryCode && String(categoryCode) === String(selectedCategory)) {
        return true;
      }
      
      // Match by text as fallback
      const categoryLabels = {
        '1': 'tidak/belum tamat sd',
        '2': 'sd/mi',
        '3': 'smp/mts',
        '4': 'sma/ma/smk',
        '5': 'd1/d2/d3',
        '6': 'd4/s1',
        '7': 's2/s3'
      };
      const labelToMatch = categoryLabels[String(selectedCategory)]?.toLowerCase() || '';
      return pendidikanText.includes(labelToMatch);
    });
  }, [sortedData, selectedCategory]);

  const getStatusColor = (status) => {
    if (!status || typeof status !== 'string') return '#666';
    const statusLower = status.toLowerCase();
    if (statusLower.includes('tetap')) return '#43a047';
    if (statusLower.includes('sementara')) return '#fb8c00';
    return '#666';
  };

  const getCategoryColor = (categoryCode) => {
    const colors = {
      '1': '#e53935',
      '2': '#f57c00',
      '3': '#fbc02d',
      '4': '#388e3c',
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

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Icon name="people" size={32} color="#1976d2" />
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
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Total Data {selectedFilter.title}</Text>
          <Text style={styles.summaryValue}>{dataFiltered?.length || 0} Record</Text>
        </View>

        {dataFiltered.map((item, index) => {
          const gapGender = Math.abs(parseFloat(item.laki) - parseFloat(item.perempuan)).toFixed(2);
          
          return (
            <AnimatedCard key={index} delay={index * 50}>
              <View style={styles.dataCard}>
                <View style={styles.cardHeader}>
                  <View style={styles.headerLeft}>
                    <View style={styles.yearBadge}>
                      <Icon name="calendar" size={18} color="#1976d2" />
                      <Text style={styles.yearText}>{item.tahun}</Text>
                    </View>
                    <View style={styles.categoryBadge}>
                      <Icon name="school" size={18} color="#1976d2" />
                      <Text style={styles.categoryText}>{item.pendidikan}</Text>
                    </View>
                  </View>
                  <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status_data) + '20' }]}>
                    <View style={[styles.statusDot, { backgroundColor: getStatusColor(item.status_data) }]} />
                    <Text style={[styles.statusText, { color: getStatusColor(item.status_data) }]}>
                      {item.status_data}
                    </Text>
                  </View>
                </View>

                <View style={styles.cardBody}>
                  {/* Gender Stats */}
                  <View style={styles.genderStats}>
                    <View style={styles.genderItem}>
                      <Icon name="male" size={24} color="#1e88e5" />
                      <View style={styles.genderContent}>
                        <Text style={styles.genderLabel}>Laki-laki</Text>
                        <Text style={[styles.genderValue, { color: '#1e88e5' }]}>
                          {item.laki}%
                        </Text>
                      </View>
                    </View>

                    <View style={styles.genderDivider} />

                    <View style={styles.genderItem}>
                      <Icon name="female" size={24} color="#e91e63" />
                      <View style={styles.genderContent}>
                        <Text style={styles.genderLabel}>Perempuan</Text>
                        <Text style={[styles.genderValue, { color: '#e91e63' }]}>
                          {item.perempuan}%
                        </Text>
                      </View>
                    </View>
                  </View>

                  {/* Total */}
                  <View style={styles.totalBox}>
                    <Icon name="people" size={20} color="#1976d2" />
                    <Text style={styles.totalLabel}>Total:</Text>
                    <Text style={styles.totalValue}>{item.total}%</Text>
                  </View>

                  {/* Gender Gap */}
                  <View style={styles.gapBox}>
                    <Icon name="analytics" size={18} color="#666" />
                    <Text style={styles.gapText}>
                      Gap Gender: <Text style={styles.gapValue}>{gapGender}%</Text>
                    </Text>
                  </View>
                </View>

                <View style={styles.cardFooter}>
                  <Icon name="information-circle-outline" size={16} color="#999" />
                  <Text style={styles.footerText}>Persentase Penduduk Usia Produktif</Text>
                </View>
              </View>
            </AnimatedCard>
          )
        })}

        {dataFiltered?.length === 0 && (
          <View style={styles.emptyState}>
            <Icon name="people-outline" size={80} color="#ccc" />
            <Text style={styles.emptyText}>Tidak ada data untuk kategori ini</Text>
          </View>
        )}

        {/* Info Card */}
        <View style={styles.infoCard}>
          <View style={styles.infoHeader}>
            <Icon name="information-circle" size={24} color="#1976d2" />
            <Text style={styles.infoTitle}>Tentang PPU</Text>
          </View>
          <View style={styles.infoContent}>
            <Text style={styles.infoText}>
              Persentase Penduduk Usia menunjukkan distribusi penduduk berdasarkan 
              kelompok usia dan tingkat pendidikan. Data ini membantu memahami struktur 
              demografi dan tingkat pendidikan masyarakat.
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

export default DetailPPU

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
  summaryCard: {
    backgroundColor: '#1976d2',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  summaryTitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
    marginBottom: 8,
  },
  summaryValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
  },
  dataCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
    flexWrap: 'wrap',
  },
  yearBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E3F2FD',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 6,
  },
  yearText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1976d2',
  },
  categoryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E3F2FD',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 6,
  },
  categoryText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1976d2',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 6,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  cardBody: {
    paddingVertical: 12,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#f0f0f0',
    gap: 12,
  },
  genderStats: {
    flexDirection: 'row',
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 12,
  },
  genderItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  genderContent: {
    flex: 1,
  },
  genderLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  genderValue: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  genderDivider: {
    width: 1,
    backgroundColor: '#ddd',
    marginHorizontal: 12,
  },
  totalBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E3F2FD',
    borderRadius: 8,
    padding: 12,
    gap: 8,
  },
  totalLabel: {
    fontSize: 14,
    color: '#1976d2',
    fontWeight: '600',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1976d2',
  },
  gapBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingTop: 8,
  },
  gapText: {
    fontSize: 14,
    color: '#666',
  },
  gapValue: {
    fontWeight: 'bold',
    color: '#1976d2',
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 12,
  },
  footerText: {
    fontSize: 12,
    color: '#999',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
    marginTop: 16,
  },
  infoCard: {
    backgroundColor: '#E3F2FD',
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#1976d2',
    marginTop: 4,
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
    paddingLeft: 36,
  },
  infoText: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
  },
})