document.addEventListener('DOMContentLoaded', () => {
  // Obtener datos del usuario y sus registros
  const user = JSON.parse(localStorage.getItem('bigfoot_user'));
  const dailyData = JSON.parse(localStorage.getItem('bigfoot_daily')) || {};
  
  if (!user) {
    window.location.href = 'index.html';
    return;
  }

  // Actualizar estadísticas principales
  updateMainStats(dailyData);
  
  // Generar gráfico de progreso diario
  if (window.generateProgressChart) {
    window.generateProgressChart(dailyData);
  }
  
  // Generar mejores días
  generateBestDays(dailyData);
  
  // Generar estadísticas por categoría
  generateCategoryStats(user, dailyData);
});

function updateMainStats(dailyData) {
  const dates = Object.keys(dailyData);
  const totalDistance = dates.reduce((sum, date) => {
    const dayData = dailyData[date];
    return sum + (dayData.unit === 'mi' ? dayData.distance * 1.60934 : dayData.distance);
  }, 0);
  
  const completedDays = dates.length;
  const avgDaily = completedDays > 0 ? (totalDistance / completedDays).toFixed(1) : 0;
  const percentage = Math.round((completedDays / 9) * 100);
  
  document.getElementById('totalDistance').textContent = totalDistance.toFixed(1);
  document.getElementById('completedDays').textContent = completedDays;
  document.getElementById('avgDaily').textContent = avgDaily;
  document.getElementById('percentage').textContent = `${percentage}%`;
}

function generateProgressChart(dailyData) {
  console.log('[generateProgressChart] llamada', dailyData);
  // Eliminar canvas anterior si existe
  const oldCanvas = document.getElementById('resultsChart');
  if (oldCanvas && oldCanvas.parentNode) {
    console.log('[generateProgressChart] Eliminando canvas anterior');
    oldCanvas.parentNode.removeChild(oldCanvas);
  }

  // Buscar el contenedor donde irá el canvas (debajo de las estadísticas generales)
  let statsSummary = document.querySelector('.stats-summary');
  let chartContainer = document.getElementById('resultsChartContainer');
  if (!chartContainer) {
    chartContainer = document.createElement('div');
    chartContainer.id = 'resultsChartContainer';
    chartContainer.style.width = '100%';
    chartContainer.style.maxWidth = '600px';
    chartContainer.style.margin = '0 auto 32px auto';
    chartContainer.style.minHeight = '300px';
    if (statsSummary && statsSummary.parentNode) {
      statsSummary.parentNode.insertBefore(chartContainer, statsSummary.nextSibling);
      console.log('[generateProgressChart] Contenedor creado e insertado');
    }
  } else {
    chartContainer.innerHTML = '';
    console.log('[generateProgressChart] Contenedor ya existe, limpiado');
  }

  // Comprobar si hay datos para graficar
  const hasData = Object.values(dailyData).some(d => d.distance > 0);
  console.log('[generateProgressChart] ¿Hay datos?', hasData);
  if (!hasData) {
    chartContainer.innerHTML = '';
    console.log('[generateProgressChart] No hay datos, no se crea canvas');
    return;
  }

  // Crear el canvas
  const canvas = document.createElement('canvas');
  canvas.id = 'resultsChart';
  canvas.height = 300;
  chartContainer.appendChild(canvas);
  const ctx = canvas.getContext('2d');
  console.log('[generateProgressChart] Canvas creado, se va a dibujar la gráfica');
  
  // Generar datos para los 9 días
  const dates = Array.from({ length: 9 }, (_, i) => {
    const date = new Date(2025, 7, 4 + i);
    return date.toISOString().split('T')[0];
  });
  
  const labels = dates.map(date => {
    const d = new Date(date);
    return `${d.getDate()} Ago`;
  });
  
  const data = dates.map(date => {
    const dayData = dailyData[date];
    if (dayData) {
      return dayData.unit === 'mi' ? dayData.distance * 1.60934 : dayData.distance;
    }
    return 0;
  });
  
  // Calcular progreso acumulado
  const cumulativeData = [];
  let cumulative = 0;
  data.forEach(distance => {
    cumulative += distance;
    cumulativeData.push(cumulative);
  });
  
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [
        {
          label: 'Distancia Diaria (km)',
          data: data,
          borderColor: '#667eea',
          backgroundColor: 'rgba(102, 126, 234, 0.1)',
          borderWidth: 3,
          fill: true,
          tension: 0.4,
          yAxisID: 'y'
        },
        {
          label: 'Progreso Acumulado (km)',
          data: cumulativeData,
          borderColor: '#f093fb',
          backgroundColor: 'rgba(240, 147, 251, 0.1)',
          borderWidth: 3,
          fill: false,
          tension: 0.4,
          yAxisID: 'y1'
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        mode: 'index',
        intersect: false,
      },
      plugins: {
        legend: {
          position: 'top',
          labels: {
            usePointStyle: true,
            padding: 20,
            font: {
              size: 12,
              family: 'Inter'
            }
          }
        },
        tooltip: {
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          titleColor: '#fff',
          bodyColor: '#fff',
          borderColor: '#667eea',
          borderWidth: 1,
          cornerRadius: 8,
          displayColors: true
        }
      },
      scales: {
        x: {
          grid: {
            color: 'rgba(0, 0, 0, 0.1)'
          },
          ticks: {
            font: {
              family: 'Inter'
            }
          }
        },
        y: {
          type: 'linear',
          display: true,
          position: 'left',
          title: {
            display: true,
            text: 'MILES',
            font: {
              family: 'Inter',
              weight: 'bold',
              size: 16
            }
          },
          grid: {
            color: 'rgba(0, 0, 0, 0.1)'
          },
          ticks: {
            font: {
              family: 'Inter'
            }
          }
        },
        y1: {
          type: 'linear',
          display: true,
          position: 'right',
          title: {
            display: true,
            text: 'Progreso Acumulado (km)',
            font: {
              family: 'Inter'
            }
          },
          grid: {
            drawOnChartArea: false,
          },
          ticks: {
            font: {
              family: 'Inter'
            }
          }
        }
      }
    }
  });
}
window.generateProgressChart = generateProgressChart;

function generateBestDays(dailyData) {
  const bestDaysContainer = document.getElementById('bestDays');
  
  // Convertir datos a array y ordenar por distancia
  const daysArray = Object.entries(dailyData).map(([date, data]) => ({
    date,
    distance: data.unit === 'mi' ? data.distance * 1.60934 : data.distance,
    unit: data.unit === 'mi' ? 'km' : data.unit
  })).sort((a, b) => b.distance - a.distance);
  
  if (daysArray.length === 0) {
    bestDaysContainer.innerHTML = '<p class="text-gray-500 text-center py-4">No hay datos registrados aún</p>';
    return;
  }
  
  // Mostrar top 3 días
  const topDays = daysArray.slice(0, 3);
  bestDaysContainer.innerHTML = topDays.map((day, index) => `
    <div class="flex items-center justify-between p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
      <div class="flex items-center">
        <div class="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm mr-3">
          ${index + 1}
        </div>
        <div>
          <div class="font-semibold">${formatDate(day.date)}</div>
          <div class="text-sm text-gray-600">${day.distance.toFixed(1)} ${day.unit}</div>
        </div>
      </div>
      <div class="text-right">
        <div class="text-lg font-bold text-blue-600">${day.distance.toFixed(1)}</div>
        <div class="text-xs text-gray-500">km</div>
      </div>
    </div>
  `).join('');
}

function generateCategoryStats(user, dailyData) {
  const categoryStatsContainer = document.getElementById('categoryStats');
  
  const totalDistance = Object.values(dailyData).reduce((sum, data) => {
    return sum + (data.unit === 'mi' ? data.unit * 1.60934 : data.distance);
  }, 0);
  
  const completedDays = Object.keys(dailyData).length;
  const avgDaily = completedDays > 0 ? (totalDistance / completedDays).toFixed(1) : 0;
  const remaining = Math.max(0, 200 - totalDistance);
  const percentage = Math.round((totalDistance / 200) * 100);
  
  categoryStatsContainer.innerHTML = `
    <div class="space-y-4">
      <div class="flex justify-between items-center p-3 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg">
        <span class="font-medium">Categoría</span>
        <span class="font-semibold text-blue-600">${user.category}</span>
      </div>
      <div class="flex justify-between items-center p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
        <span class="font-medium">Distancia Total</span>
        <span class="font-semibold text-purple-600">${totalDistance.toFixed(1)} km</span>
      </div>
      <div class="flex justify-between items-center p-3 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg">
        <span class="font-medium">Promedio Diario</span>
        <span class="font-semibold text-orange-600">${avgDaily} km</span>
      </div>
      <div class="flex justify-between items-center p-3 bg-gradient-to-r from-red-50 to-pink-50 rounded-lg">
        <span class="font-medium">Restante</span>
        <span class="font-semibold text-red-600">${remaining.toFixed(1)} km</span>
      </div>
      <div class="w-full bg-gray-200 rounded-full h-2 mt-4">
        <div class="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300" 
             style="width: ${Math.min(percentage, 100)}%"></div>
      </div>
      <div class="text-center text-sm text-gray-600">
        ${percentage}% del objetivo completado
      </div>
    </div>
  `;
}

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('es-ES', { 
    weekday: 'short', 
    month: 'short', 
    day: 'numeric' 
  });
}