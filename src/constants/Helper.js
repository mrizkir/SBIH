// Desc: Helper constants
export const color = {
    primary: '#007bff',
    secondary: '#6c757d',
    success: '#28a745',
    danger: '#dc3545',
    warning: '#ffc107',
    info: '#17a2b8',
    light: '#f8f9fa',
    dark: '#343a40',
    black: '#000000',
    graph1: '#002034',
    graph2: '#00446f',
    graph3: "#5bc0ff",
    graph4: "#0098f8"
};

// Format number with Indonesian format: thousand separator (.) and decimal separator (,)
// Example: 2853.74 -> 2.853,74
export const formatNumber = (num) => {
    if (!num && num !== 0) return '0';
    const numStr = num.toString();
    // Split integer and decimal parts
    const parts = numStr.split('.');
    // Format integer part with thousand separator (dot)
    const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    // If there's decimal part, replace dot with comma
    if (parts.length > 1) {
        return `${integerPart},${parts[1]}`;
    }
    return integerPart;
};

// Format number with fixed 2 decimal places (always shows 2 decimals)
// Example: 6.005 -> 6,00 | 5.9885 -> 5,99 | 417.0255000001 -> 417,03
export const formatNumberWithDecimals = (num, decimals = 2) => {
    if (!num && num !== 0) return '0,' + '0'.repeat(decimals);
    const rounded = (num || 0).toFixed(decimals);
    const parts = rounded.split('.');
    const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return `${integerPart},${parts[1]}`;
};

export const normalizeArrayData = (data) => (Array.isArray(data) ? data : []);

export const getStatusColor = (status) => {
    const s = (status ?? '').toString().toLowerCase();
    if (s.includes('tetap')) return '#43a047';
    if (s.includes('sementara')) return '#fb8c00';
    if (s.includes('estimasi')) return '#1e88e5';
    return '#666';
};

export const sortByTahunDesc = (data) => {
    if (!Array.isArray(data)) return [];
    return [...data].sort(
        (a, b) => (parseInt(b.tahun, 10) || 0) - (parseInt(a.tahun, 10) || 0),
    );
};

export const getLast5YearStats = (data, valueKey = 'jumlah') => {
    const items = normalizeArrayData(data);
    const last5Years = items.slice(-5);
    if (last5Years.length === 0) {
        return {
            last5Years: [],
            values: [],
            hasChartData: false,
            maxValue: 0,
            minValue: 0,
            avgValue: '0',
            latestValue: 0,
        };
    }
    const values = last5Years.map((item) => parseFloat(item[valueKey]) || 0);
    return {
        last5Years,
        values,
        hasChartData: true,
        maxValue: Math.max(...values),
        minValue: Math.min(...values),
        avgValue: (values.reduce((a, b) => a + b, 0) / values.length).toFixed(0),
        latestValue: values[values.length - 1],
    };
};