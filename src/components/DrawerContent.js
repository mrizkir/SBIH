import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import * as React from 'react';
import { List } from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Icon2 from 'react-native-vector-icons/AntDesign'
import { useNavigation, useNavigationState, DrawerActions } from '@react-navigation/native';

import LogoBintan from '../assets/bintan.png'
import { MAIN_STACK_ROUTE, getActiveStackRouteName } from '../navigation/navigationRef';

const HOME_ROUTES = ['Dashboard'];

const MENU_CATEGORIES = [
  {
    id: 'sosial',
    title: 'Sosial',
    routes: [
      'DetailDashboard',
      'DetailIPMDashboard',
      'DetailPSDashboard',
      'DetailRLSDashboard',
      'DetailAMHDashboard',
      'DetailAHHDashboard',
      'DetailAKHBDashboard',
      'DetailAKIMDashboard',
      'DetailPKKDashboard',
      'DetailIPGDashboard',
      'DetailAPKDashboard',
      'DetailAPMDashboard',
      'DetailHLSDashboard',
      'DetailJRTLHDashboard',
      'DetailIGDashboard',
      'DetailPPUDashboard',
      'DetailIPGGDashboard',
    ],
    items: [
      { title: 'Tingkat Kemiskinan', route: 'DetailDashboard' },
      { title: 'Index Pembangunan Manusia', route: 'DetailIPMDashboard' },
      { title: 'Prevalensi Stunting', route: 'DetailPSDashboard' },
      { title: 'Angka Rata-Rata Lama Sekolah', route: 'DetailRLSDashboard' },
      { title: 'Angka Melek Huruf', route: 'DetailAMHDashboard' },
      { title: 'Angka Harapan Hidup', route: 'DetailAHHDashboard' },
      { title: 'Angka Keberlangsungan Hidup Bayi', route: 'DetailAKHBDashboard' },
      { title: 'Angka Kematian Ibu Melahirkan', route: 'DetailAKIMDashboard', lines: 3, titleMaxFontSizeMultiplier: 18 },
      { title: 'Kondisi Ketenagakerjaan', route: 'DetailPKKDashboard' },
      { title: 'Index Pembangunan Gender', route: 'DetailIPGDashboard' },
      { title: 'Angka Partisipasi Kasar', route: 'DetailAPKDashboard' },
      { title: 'Angka Partisipasi Murni', route: 'DetailAPMDashboard' },
      { title: 'Angka Harapan Lama Sekolah', route: 'DetailHLSDashboard' },
      { title: 'Rumah Tidak Layak Huni', route: 'DetailJRTLHDashboard' },
      { title: 'Index Gini', route: 'DetailIGDashboard' },
      { title: 'Penduduk Usia 15 Tahun', route: 'DetailPPUDashboard', lines: 3, titleMaxFontSizeMultiplier: 18 },
      { title: 'Index pemberdayaan Gender', route: 'DetailIPGGDashboard' },
    ],
  },
  {
    id: 'ekonomi',
    title: 'Ekonomi',
    routes: ['DetailPEDashboard', 'DetailLIDashboard', 'DetailKWDashboard', 'DetailPMADashboard', 'DetailADHBDashboard', 'DetailADHKDashboard'],
    items: [
      { title: 'Pertumbuhan Ekonomi', route: 'DetailPEDashboard' },
      { title: 'Tingkat Inflasi', route: 'DetailLIDashboard' },
      { title: 'Kunjungan Wisata', route: 'DetailKWDashboard' },
      { title: 'Realisasi Investasi', route: 'DetailPMADashboard' },
      { title: 'PDRB ADHB', route: 'DetailADHBDashboard' },
      { title: 'PDRB ADHK', route: 'DetailADHKDashboard' },
    ],
  },
  {
    id: 'pertanian',
    title: 'Pertanian',
    routes: ['DetailCPKUPDashboard', 'DetailCPKHDashboard', 'DetailJPPDashboard'],
    items: [
      { title: 'Produktivitas Perkebunan', route: 'DetailCPKUPDashboard', lines: 3 },
      { title: 'Produktivitas Hortikultura', route: 'DetailCPKHDashboard' },
      { title: 'Produksi Peternakan', route: 'DetailJPPDashboard' },
    ],
  },
  {
    id: 'perikanan',
    title: 'Perikanan',
    routes: ['DetailPPBDashboard', 'DetailPPTDashboard'],
    items: [
      { title: 'Produksi Budidaya', route: 'DetailPPBDashboard' },
      { title: 'Produksi Tangkap', route: 'DetailPPTDashboard' },
    ],
  },
  {
    id: 'kependudukan',
    title: 'Kependudukan',
    routes: ['DetailPPDashboard', 'DetailJPDashboard', 'DetailJPBKUDashboard', 'DetailJPBKDashboard'],
    items: [
      { title: 'Pertumbuhan Penduduk', route: 'DetailPPDashboard' },
      { title: 'Jumlah Penduduk', route: 'DetailJPDashboard' },
      { title: 'Penduduk Berdasarkan Umur', route: 'DetailJPBKUDashboard', lines: 3 },
      { title: 'Penduduk berdasarkan Kecamatan', route: 'DetailJPBKDashboard', lines: 3 },
    ],
  },
  {
    id: 'infrastruktur',
    title: 'Infrastruktur',
    routes: ['DetailPJDDDashboard', 'DetailPRTDashboard', 'DetailPTKJDashboard'],
    items: [
      { title: 'Panjang Jalan Dibangun', route: 'DetailPJDDDashboard', lines: 3 },
      { title: '% Rumah Tangga yang Menggunakan Air Bersih', route: 'DetailPRTDashboard', lines: 3 },
      { title: 'Tingkat Kemantapan Jalan', route: 'DetailPTKJDashboard', lines: 3 },
    ],
  },
  {
    id: 'video',
    title: 'Video',
    routes: ['DetailVideoDashboard'],
    items: [
      { title: 'Video', route: 'DetailVideoDashboard' },
    ],
  },
];

const accordionLeft = (props) => {
  const { key, ...restProps } = props;
  return <List.Icon {...restProps} icon="folder" />;
};

const NavRow = ({ active, onPress, children }) => (
  <TouchableOpacity
    style={[styles.navRow, active && styles.navRowActive]}
    onPress={onPress}
  >
    {children}
  </TouchableOpacity>
);

const MenuListItem = ({ item, activeRoute, onNavigate }) => {
  const isActive = activeRoute === item.route;
  return (
    <List.Item
      titleNumberOfLines={item.lines ?? 2}
      titleMaxFontSizeMultiplier={item.titleMaxFontSizeMultiplier}
      title={item.title}
      style={isActive ? styles.menuItemActive : undefined}
      titleStyle={[styles.menuItemTitle, isActive && styles.menuItemTitleActive]}
      onPress={() => onNavigate(item.route)}
    />
  );
};

const DrawerContent = () => {
  const navigation = useNavigation();
  const activeRoute = useNavigationState((state) => getActiveStackRouteName(state));
  const [expandedSections, setExpandedSections] = React.useState({});

  const goToScreen = (screen, params) => {
    navigation.navigate(MAIN_STACK_ROUTE, { screen, params });
    navigation.dispatch(DrawerActions.closeDrawer());
  };

  React.useEffect(() => {
    const category = MENU_CATEGORIES.find((c) => c.routes.includes(activeRoute));
    if (category) {
      setExpandedSections((prev) => ({ ...prev, [category.id]: true }));
    }
  }, [activeRoute]);

  const isSectionExpanded = (category) =>
    expandedSections[category.id] ?? category.routes.includes(activeRoute);

  const toggleSection = (categoryId) => {
    const category = MENU_CATEGORIES.find((c) => c.id === categoryId);
    setExpandedSections((prev) => {
      const currentlyExpanded = prev[categoryId] ?? category.routes.includes(activeRoute);
      return { ...prev, [categoryId]: !currentlyExpanded };
    });
  };

  const isHomeActive = HOME_ROUTES.includes(activeRoute);
  const isTentangKamiActive = activeRoute === 'TentangKami';
  const isAnggaranActive = activeRoute === 'DashboardAnggaranMurni';

  return (
    <View style={styles.container}>
      <View style={styles.titleHeader}>
        <Image source={LogoBintan} style={{ width: 100, height: 100 }} />
        <Text style={styles.titleText}>Smart Bintan in Hands</Text>
      </View>
      <NavRow
        active={isHomeActive}
        onPress={() => goToScreen('Dashboard')}
      >
        <Icon
          name="home"
          size={30}
          color={isHomeActive ? '#0074BD' : 'black'}
          style={styles.navIcon}
        />
        <Text style={[styles.navLabel, isHomeActive && styles.navLabelActive]}>Home</Text>
      </NavRow>
      <NavRow
        active={isTentangKamiActive}
        onPress={() => goToScreen('TentangKami')}
      >
        <Icon2
          name="infocirlce"
          size={26}
          color={isTentangKamiActive ? '#0074BD' : 'black'}
          style={styles.navIcon}
        />
        <Text style={[styles.navLabel, isTentangKamiActive && styles.navLabelActive]}>Tentang Kami</Text>
      </NavRow>
      <View style={styles.separator} />

      <List.Section title="Kategori" titleStyle={styles.sectionTitle}>
        {MENU_CATEGORIES.map((category) => (
          <List.Accordion
            key={category.id}
            title={category.title}
            titleStyle={[
              styles.accordionTitle,
              category.routes.includes(activeRoute) && styles.accordionTitleActive,
            ]}
            expanded={isSectionExpanded(category)}
            onPress={() => toggleSection(category.id)}
            left={accordionLeft}
          >
            {category.items.map((item) => (
              <MenuListItem
                key={item.route}
                item={item}
                activeRoute={activeRoute}
                onNavigate={goToScreen}
              />
            ))}
          </List.Accordion>
        ))}
      </List.Section>

      <View style={styles.separatorRow}>
        <View style={styles.separatorLine} />
        <Text style={styles.separatorLabel}>E-money</Text>
        <View style={styles.separatorLine} />
      </View>
      <NavRow
        active={isAnggaranActive}
        onPress={() => goToScreen('DashboardAnggaranMurni')}
      >
        <Icon
          name="chart-box"
          size={30}
          color={isAnggaranActive ? '#0074BD' : 'black'}
          style={styles.navIcon}
        />
        <Text style={[styles.navLabel, isAnggaranActive && styles.navLabelActive]}>
          Anggaran Murni dan Perubahan
        </Text>
      </NavRow>
    </View>
  );
};

export default DrawerContent

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleHeader: {
    padding: 10,
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#0074BD',
  },
  titleText: {
    color: 'white',
    fontSize: 12,
  },
  navRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  navRowActive: {
    backgroundColor: '#E3F2FD',
  },
  navIcon: {
    marginVertical: 10,
    marginHorizontal: 10,
  },
  navLabel: {
    marginVertical: 10,
    marginHorizontal: 10,
    color: 'black',
    fontSize: 12,
  },
  navLabelActive: {
    color: '#0074BD',
    fontWeight: '600',
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    marginVertical: 5,
  },
  sectionTitle: {
    fontSize: 12,
  },
  accordionTitle: {
    fontSize: 12,
  },
  accordionTitleActive: {
    color: '#0074BD',
    fontWeight: '600',
  },
  menuItemTitle: {
    fontSize: 12,
  },
  menuItemTitleActive: {
    color: '#0074BD',
    fontWeight: '600',
  },
  menuItemActive: {
    backgroundColor: '#E3F2FD',
  },
  separatorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  separatorLine: {
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    flex: 1,
  },
  separatorLabel: {
    marginHorizontal: 5,
    color: 'black',
    fontSize: 12,
  },
})
