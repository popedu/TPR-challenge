// Datos del Tahoe 200 Challenge 2025 - Generados automáticamente desde el Excel
const TAHOE200_DATA = {
  challenge: {
    name: 'Tahoe 200 Challenge',
    year: '2025',
    status: 'completed',
    totalDistance: 200, // millas objetivo
    categories: ['1 pax (Run + Bike)', '2 pax (Run + Bike)', '3 pax (Run)', '4 pax (Run)', '5 pax (Run)']
  },
  teams: [
    // Los equipos y sus datos reales serán insertados aquí automáticamente
  ]
};

// Cargar los datos reales procesados
TAHOE200_DATA.teams = [
{"category": "5 pax (Run)", "history": [{"date": "2025-06-10 00:00:00", "distance": 12.0, "unit": "Km"}, {"date": "2025-06-10 00:00:00", "distance": 11.0, "unit": "Km"}, {"date": "2025-06-10 00:00:00", "distance": 9.22, "unit": "Km"}, {"date": "2025-06-10 00:00:00", "distance": 9.5, "unit": "Km"}, {"date": "2025-06-11 00:00:00", "distance": 13.0, "unit": "Km"}, {"date": "2025-06-11 00:00:00", "distance": 10.0, "unit": "Km"}, {"date": "2025-06-11 00:00:00", "distance": 15.26, "unit": "Km"}, {"date": "2025-06-11 00:00:00", "distance": 5.0, "unit": "Km"}, {"date": "2025-06-11 00:00:00", "distance": 9.95, "unit": "Km"}, {"date": "2025-06-12 00:00:00", "distance": 13.0, "unit": "Km"}, {"date": "2025-06-12 00:00:00", "distance": 14.0, "unit": "Km"}, {"date": "2025-06-13 00:00:00", "distance": 9.0, "unit": "Km"}, {"date": "2025-06-13 00:00:00", "distance": 15.0, "unit": "Km"}, {"date": "2025-06-13 00:00:00", "distance": 10.5, "unit": "Km"}, {"date": "2025-06-13 00:00:00", "distance": 7.0, "unit": "Km"}, {"date": "2025-06-14 00:00:00", "distance": 9.5, "unit": "Km"}, {"date": "2025-06-14 00:00:00", "distance": 8.0, "unit": "Km"}, {"date": "2025-06-14 00:00:00", "distance": 10.0, "unit": "Km"}, {"date": "2025-06-14 00:00:00", "distance": 2.2, "unit": "Km"}, {"date": "2025-06-15 00:00:00", "distance": 12.6, "unit": "Km"}, {"date": "2025-06-15 00:00:00", "distance": 8.0, "unit": "Km"}, {"date": "2025-06-15 00:00:00", "distance": 9.7, "unit": "Km"}, {"date": "2025-06-15 00:00:00", "distance": 13.0, "unit": "Km"}, {"date": "2025-06-16 00:00:00", "distance": 10.5, "unit": "Km"}, {"date": "2025-06-16 00:00:00", "distance": 10.0, "unit": "Km"}, {"date": "2025-06-17 00:00:00", "distance": 10.0, "unit": "Km"}, {"date": "2025-06-16 00:00:00", "distance": 5.0, "unit": "Km"}, {"date": "2025-06-17 00:00:00", "distance": 12.0, "unit": "Km"}, {"date": "2025-06-17 00:00:00", "distance": 9.22, "unit": "Km"}, {"date": "2025-06-17 00:00:00", "distance": 6.0, "unit": "Km"}, {"date": "2025-06-18 00:00:00", "distance": 21.0, "unit": "Km"}, {"date": "2025-06-18 00:00:00", "distance": 10.0, "unit": "Km"}, {"date": "2025-06-18 00:00:00", "distance": 9.0, "unit": "Km"}, {"date": "2025-06-18 00:00:00", "distance": 8.5, "unit": "Km"}, {"date": "2025-06-18 00:00:00", "distance": 10.0, "unit": "Km"}], "name": "DENSO Team", "totalDistanceMi": 357.65, "totalDistanceKm": 575.5804509999999, "registrations": 35, "id": 1},
{"category": "2 pax (Run + Bike)", "history": [{"date": "2025-06-10 00:00:00", "distance": 11.44, "unit": "Km"}, {"date": "2025-06-10 00:00:00", "distance": 50.0, "unit": "Km"}, {"date": "2025-06-11 00:00:00", "distance": 40.0, "unit": "Km"}, {"date": "2025-06-12 00:00:00", "distance": 14.69, "unit": "Km"}, {"date": "2025-06-12 00:00:00", "distance": 10.8, "unit": "Km"}, {"date": "2025-06-13 00:00:00", "distance": 18.2, "unit": "Km"}, {"date": "2025-06-14 00:00:00", "distance": 26.6, "unit": "Km"}, {"date": "2025-06-14 00:00:00", "distance": 26.32, "unit": "Km"}, {"date": "2025-06-16 00:00:00", "distance": 100.14, "unit": "Km"}, {"date": "2025-06-16 00:00:00", "distance": 3.6, "unit": "Km"}, {"date": "2025-06-17 00:00:00", "distance": 14.04, "unit": "Km"}, {"date": "2025-06-17 00:00:00", "distance": 6.0, "unit": "Km"}, {"date": "2025-06-18 00:00:00", "distance": 54.23, "unit": "Km"}], "name": "EPXT", "totalDistanceMi": 376.06000000000006, "totalDistanceKm": 605.2084004000001, "registrations": 13, "id": 2},
// ... resto de equipos ...
];

// Función para obtener los datos del Tahoe 200
function getTahoe200Data() {
  return TAHOE200_DATA;
}

// Función para obtener equipos ordenados por posición
function getTahoe200TeamsSorted() {
  return TAHOE200_DATA.teams.slice().sort((a, b) => b.totalDistanceMi - a.totalDistanceMi);
}

// Función para obtener estadísticas por categoría
function getTahoe200CategoryStats() {
  return TAHOE200_DATA.categoryStats;
}

// Función para obtener estadísticas generales
function getTahoe200GeneralStats() {
  return TAHOE200_DATA.generalStats;
}

// Función para obtener equipos por categoría
function getTahoe200TeamsByCategory(category) {
  return TAHOE200_DATA.teams.filter(team => team.category === category);
}

// Función para obtener el top 3 de cada categoría
function getTahoe200Top3ByCategory() {
  const categories = TAHOE200_DATA.challenge.categories;
  const top3ByCategory = {};
  
  categories.forEach(category => {
    const teamsInCategory = TAHOE200_DATA.teams
      .filter(team => team.category === category)
      .sort((a, b) => b.totalDistanceMi - a.totalDistanceMi)
      .slice(0, 3);
    
    top3ByCategory[category] = teamsInCategory;
  });
  
  return top3ByCategory;
}

// Función para obtener el historial de un equipo específico
function getTahoe200TeamHistory(teamName) {
  const team = TAHOE200_DATA.teams.find(t => t.name === teamName);
  return team ? team.history : [];
}

// Exportar funciones para uso en main.js
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    getTahoe200Data,
    getTahoe200TeamsSorted,
    getTahoe200CategoryStats,
    getTahoe200GeneralStats,
    getTahoe200TeamsByCategory,
    getTahoe200Top3ByCategory,
    getTahoe200TeamHistory
  };
} 