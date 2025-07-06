// Claves para localStorage
const TEAMS_KEY = 'bigfoot_teams';
const DISTANCES_KEY = 'bigfoot_distances';

// Objetivo del reto: 200 millas
const TARGET_MILES = 200;
const TARGET_KM = 200 * 1.60934; // 321.868 km

// Variables globales
let charts = {};
let currentLanguage = 'ca';

// Variable global per controlar si l'admin està loguejat
let isAdminLogged = false;

// Datos de ejemplo para empezar
const initialTeams = [
  { id: 1, name: 'Equip Alpha', category: '1 pax (Run + Bike)', phones: ['+34 600 123 456'] },
  { id: 2, name: 'Els Corredors', category: '2 pax (Run + Bike)', phones: ['+34 600 234 567', '+34 600 345 678'] },
  { id: 3, name: 'Trio Veloz', category: '3 pax (Run)', phones: ['+34 600 456 789', '+34 600 567 890', '+34 600 678 901'] },
  { id: 4, name: 'Quartet Fort', category: '4 pax (Run)', phones: ['+34 600 789 012', '+34 600 890 123', '+34 600 901 234', '+34 600 012 345'] },
  { id: 5, name: 'Quintet Elite', category: '5 pax (Run)', phones: ['+34 600 123 789', '+34 600 234 890', '+34 600 345 901', '+34 600 456 012', '+34 600 567 123'] }
];

// Datos de ejemplo para distancias
const initialDistances = [
  { id: 1, teamId: 1, date: '2025-08-04', distance: 15.5, unit: 'km', timestamp: '2025-08-04T10:00:00Z' },
  { id: 2, teamId: 1, date: '2025-08-05', distance: 12.3, unit: 'km', timestamp: '2025-08-05T09:30:00Z' },
  { id: 3, teamId: 2, date: '2025-08-04', distance: 8.2, unit: 'mi', timestamp: '2025-08-04T11:15:00Z' },
  { id: 4, teamId: 2, date: '2025-08-05', distance: 10.1, unit: 'mi', timestamp: '2025-08-05T10:45:00Z' },
  { id: 5, teamId: 3, date: '2025-08-04', distance: 20.0, unit: 'km', timestamp: '2025-08-04T08:00:00Z' },
  { id: 6, teamId: 4, date: '2025-08-04', distance: 18.5, unit: 'km', timestamp: '2025-08-04T07:30:00Z' },
  { id: 7, teamId: 5, date: '2025-08-04', distance: 25.0, unit: 'km', timestamp: '2025-08-04T06:00:00Z' }
];

// Traducciones
const translations = {
  ca: {
    registerTeam: 'Registrar Equip',
    registerDistance: 'Registrar Distància',
    viewResults: 'Veure Resultats',
    teamName: 'Nom de l\'Equip',
    category: 'Categoria',
    joinWhatsappGroup: 'Unir-se al Grup de WhatsApp',
    selectTeam: 'Seleccionar Equip',
    date: 'Data',
    distance: 'Distància',
    kilometers: 'Km',
    miles: 'Milles',
    registerTeamAndJoin: 'Registrar Equip',
    registerDistance: 'Registrar Distància',
    challengeResults: 'Resultats del Repte',
    teams: 'Equips',
    totalKm: 'km totals',
    totalMiles: 'milles totals',
    registrations: 'Registres',
    progressTowards: 'Progrés cap a 200 milles',
    completed: 'Completat',
    remaining: 'Restant',
    history: 'Historial de Registres',
    units: 'Unitats',
    team: 'Equip',
    teams: 'Equips',
    totalKm: 'km totals',
    totalMiles: 'milles totals',
    registrations: 'Registres',
    joinChallenge: 'Uneix-te al repte Bigfoot 200 Challenge registrant el teu equip',
    registerProgress: 'Registra el teu progrés diari al Bigfoot 200 Challenge',
    viewProgress: 'Visualitza el progrés de tots els equips al Bigfoot 200 Challenge',
    teamRegisteredSuccess: 'Equip registrat amb èxit!',
    distanceRegisteredSuccess: 'Distància registrada amb èxit!',
    whatsappGroupInfo: 'Al registrar-te, rebràs l\'enllaç per unir-te al grup oficial de WhatsApp del Bigfoot 200 Challenge on podràs:',
    whatsappGroupBenefit1: 'Compartir el teu progrés diari',
    whatsappGroupBenefit2: 'Veure les actualitzacions d\'altres participants',
    whatsappGroupBenefit3: 'Rebre motivació i consells',
    whatsappGroupBenefit4: 'Participar en la comunitat del repte',
    historyTitle: 'Historial de Registres',
    historyDescription: 'Fes clic a un equip per veure el seu historial complet',
    totalRegistrations: 'registres',
    totalDistance: 'Total',
    noTeamsRegistered: 'No hi ha equips registrats encara',
    noRegistrationsForTeam: 'No hi ha registres per aquest equip',
    clickTeamForHistory: 'Fes clic a un equip per veure el seu historial complet',
    registerTeamTitle: "Registrar Equip",
    joinChallengeText: "Uneix-te al repte Bigfoot 200 Challenge registrant el teu equip",
    teamNameLabel: "Nom de l'Equip *",
    teamCategoryLabel: "Categoria *",
    whatsappGroupLabel: "Grup Oficial de WhatsApp",
    whatsappGroupLinkText: "Unir-se al grup de WhatsApp del repte",
    whatsappGroupInfo: "Escaneja l'enllaç o fes clic per unir-te al grup oficial del repte. Comparteix l'enllaç amb els membres del teu equip si també volen unir-se!",
    whatsappGroupBenefit1: "Compartir el teu progrés diari",
    whatsappGroupBenefit2: "Veure les actualitzacions d'altres participants",
    whatsappGroupBenefit3: "Rebre motivació i consells",
    whatsappGroupBenefit4: "Participar en la comunitat del repte",
    registerTeamButton: "Registrar Equip",
    totalTeamsLabel: "Equips",
    totalDistanceLabel: "km totals",
    totalDistanceMiLabel: "milles totals",
    totalRegistrationsLabel: "Registres",
    registerProgressText: "Registra el teu progrés diari al Bigfoot 200 Challenge",
    viewProgressText: "Visualitza el progrés de tots els equips al Bigfoot 200 Challenge",
    resultsTitle: "Resultats del Repte",
    registerDistanceTitle: "Registrar Distància",
    adminTitle: "Administració",
    adminSubtitle: "Gestió d'equips i dades del repte",
    adminLoginTitle: "Accés d'Administrador",
    adminPasswordPlaceholder: "Contrasenya d'administrador",
    adminLoginButton: "Entrar",
    adminPanelTitle: "Panel d'Administració",
    adminLogoutButton: "Sortir",
    adminTotalTeams: "Total Equips",
    adminTotalRegistrations: "Total Registres",
    adminTotalDistance: "Total Distància",
    adminTeamsListTitle: "Equips Registrats",
    adminDeleteButton: "Eliminar",
    adminExportButton: "Exportar Dades",
    adminResetButton: "Resetejar Tot",
    adminWrongPassword: "Contrasenya incorrecta",
    adminTeamDeleted: "Equip eliminat correctament",
    adminDataExported: "Dades exportades correctament",
    adminDataReset: "Totes les dades han estat eliminades",
    adminConfirmDelete: "Estàs segur que vols eliminar aquest equip? Això també eliminarà tots els seus registres.",
    adminConfirmReset: "ATENCIÓ: Això eliminarà TOTS els equips i registres. No es pot desfer. Estàs segur?",
    teamNameExists: "Ja existeix un equip amb aquest nom. Si us plau, tria un altre nom."
  },
  es: {
    registerTeam: 'Registrar Equipo',
    registerDistance: 'Registrar Distancia',
    viewResults: 'Ver Resultados',
    teamName: 'Nombre del Equipo',
    category: 'Categoría',
    joinWhatsappGroup: 'Unirse al Grupo de WhatsApp',
    selectTeam: 'Seleccionar Equipo',
    date: 'Fecha',
    distance: 'Distancia',
    kilometers: 'Km',
    miles: 'Millas',
    registerTeamAndJoin: 'Registrar Equipo',
    registerDistance: 'Registrar Distancia',
    challengeResults: 'Resultados del Reto',
    teams: 'Equipos',
    totalKm: 'km totales',
    totalMiles: 'millas totales',
    registrations: 'Registros',
    progressTowards: 'Progreso hacia 200 millas',
    completed: 'Completado',
    remaining: 'Restante',
    history: 'Historial de Registros',
    units: 'Unidades',
    team: 'Equipo',
    teams: 'Equipos',
    totalKm: 'km totales',
    totalMiles: 'millas totales',
    registrations: 'Registros',
    joinChallenge: 'Únete al reto Bigfoot 200 Challenge registrando tu equipo',
    registerProgress: 'Registra tu progreso diario al Bigfoot 200 Challenge',
    viewProgress: 'Visualiza el progreso de todos los equipos al Bigfoot 200 Challenge',
    teamRegisteredSuccess: '¡Equipo registrado con éxito!',
    distanceRegisteredSuccess: '¡Distancia registrada con éxito!',
    whatsappGroupInfo: 'Al registrarte, recibirás el enlace para unirte al grupo oficial de WhatsApp del Bigfoot 200 Challenge donde podrás:',
    whatsappGroupBenefit1: 'Compartir tu progreso diario',
    whatsappGroupBenefit2: 'Ver las actualizaciones de otros participantes',
    whatsappGroupBenefit3: 'Recibir motivación y consejos',
    whatsappGroupBenefit4: 'Participar en la comunidad del reto',
    historyTitle: 'Historial de Registros',
    historyDescription: 'Haz clic en un equipo para ver su historial completo',
    totalRegistrations: 'registros',
    totalDistance: 'Total',
    noTeamsRegistered: 'No hay equipos registrados aún',
    noRegistrationsForTeam: 'No hay registros para este equipo',
    clickTeamForHistory: 'Haz clic en un equipo para ver su historial completo',
    registerTeamTitle: "Registrar Equipo",
    joinChallengeText: "Únete al reto Bigfoot 200 Challenge registrando tu equipo",
    teamNameLabel: "Nombre del Equipo *",
    teamCategoryLabel: "Categoría *",
    whatsappGroupLabel: "Grupo Oficial de WhatsApp",
    whatsappGroupLinkText: "Unirse al grupo de WhatsApp del reto",
    whatsappGroupInfo: "Escanea el enlace o haz clic para unirte al grupo oficial del reto. ¡Comparte el enlace con los miembros de tu equipo si también quieren unirse!",
    whatsappGroupBenefit1: "Compartir tu progreso diario",
    whatsappGroupBenefit2: "Ver las actualizaciones de otros participantes",
    whatsappGroupBenefit3: "Recibir motivación y consejos",
    whatsappGroupBenefit4: "Participar en la comunidad del reto",
    registerTeamButton: "Registrar Equipo",
    totalTeamsLabel: "Equipos",
    totalDistanceLabel: "km totales",
    totalDistanceMiLabel: "millas totales",
    totalRegistrationsLabel: "Registros",
    registerProgressText: "Registra tu progreso diario al Bigfoot 200 Challenge",
    viewProgressText: "Visualiza el progreso de todos los equipos al Bigfoot 200 Challenge",
    resultsTitle: "Resultados del Reto",
    registerDistanceTitle: "Registrar Distancia",
    adminTitle: "Administración",
    adminSubtitle: "Gestión de equipos y datos del reto",
    adminLoginTitle: "Acceso de Administrador",
    adminPasswordPlaceholder: "Contraseña de administrador",
    adminLoginButton: "Entrar",
    adminPanelTitle: "Panel de Administración",
    adminLogoutButton: "Salir",
    adminTotalTeams: "Total Equipos",
    adminTotalRegistrations: "Total Registros",
    adminTotalDistance: "Total Distancia",
    adminTeamsListTitle: "Equipos Registrados",
    adminDeleteButton: "Eliminar",
    adminExportButton: "Exportar Datos",
    adminResetButton: "Resetejar Tot",
    adminWrongPassword: "Contraseña incorrecta",
    adminTeamDeleted: "Equipo eliminado correctamente",
    adminDataExported: "Datos exportados correctamente",
    adminDataReset: "Todos los datos han sido eliminados",
    adminConfirmDelete: "¿Estás seguro que quieres eliminar este equipo? Esto también eliminará todos sus registros.",
    adminConfirmReset: "ATENCIÓN: Esto eliminará TODOS los equipos y registros. No se puede deshacer. ¿Estás seguro?",
    teamNameExists: "Ya existe un equipo con este nombre. Por favor, elige otro nombre."
  },
  en: {
    registerTeam: 'Register Team',
    registerDistance: 'Register Distance',
    viewResults: 'View Results',
    teamName: 'Team Name',
    category: 'Category',
    joinWhatsappGroup: 'Join WhatsApp Group',
    selectTeam: 'Select Team',
    date: 'Date',
    distance: 'Distance',
    kilometers: 'Km',
    miles: 'Miles',
    registerTeamAndJoin: 'Register Team',
    registerDistance: 'Register Distance',
    challengeResults: 'Challenge Results',
    teams: 'Teams',
    totalKm: 'total km',
    totalMiles: 'total miles',
    registrations: 'Registrations',
    progressTowards: 'Progress towards 200 miles',
    completed: 'Completed',
    remaining: 'Remaining',
    history: 'Registration History',
    units: 'Units',
    team: 'Team',
    teams: 'Teams',
    totalKm: 'total km',
    totalMiles: 'total miles',
    registrations: 'Registrations',
    joinChallenge: 'Join the Bigfoot 200 Challenge by registering your team',
    registerProgress: 'Register your daily progress to the Bigfoot 200 Challenge',
    viewProgress: 'View the progress of all teams in the Bigfoot 200 Challenge',
    teamRegisteredSuccess: 'Team registered successfully!',
    distanceRegisteredSuccess: 'Distance registered successfully!',
    whatsappGroupInfo: 'When you register, you will receive the link to join the official WhatsApp group of the Bigfoot 200 Challenge where you can:',
    whatsappGroupBenefit1: 'Share your daily progress',
    whatsappGroupBenefit2: 'See updates from other participants',
    whatsappGroupBenefit3: 'Receive motivation and advice',
    whatsappGroupBenefit4: 'Participate in the challenge community',
    historyTitle: 'Registration History',
    historyDescription: 'Click on a team to see their complete history',
    totalRegistrations: 'registrations',
    totalDistance: 'Total',
    noTeamsRegistered: 'No teams registered yet',
    noRegistrationsForTeam: 'No registrations for this team',
    clickTeamForHistory: 'Click on a team to see their complete history',
    registerTeamTitle: "Register Team",
    joinChallengeText: "Join the Bigfoot 200 Challenge by registering your team",
    teamNameLabel: "Team Name *",
    teamCategoryLabel: "Category *",
    whatsappGroupLabel: "Official WhatsApp Group",
    whatsappGroupLinkText: "Join the challenge WhatsApp group",
    whatsappGroupInfo: "Scan or click the link to join the official challenge group. Share the link with your team members if they also want to join!",
    whatsappGroupBenefit1: "Share your daily progress",
    whatsappGroupBenefit2: "See updates from other participants",
    whatsappGroupBenefit3: "Get motivation and tips",
    whatsappGroupBenefit4: "Participate in the challenge community",
    registerTeamButton: "Register Team",
    totalTeamsLabel: "Teams",
    totalDistanceLabel: "Total km",
    totalDistanceMiLabel: "Total miles",
    totalRegistrationsLabel: "Entries",
    registerProgressText: "Register your daily progress to the Bigfoot 200 Challenge",
    viewProgressText: "View the progress of all teams in the Bigfoot 200 Challenge",
    resultsTitle: "Challenge Results",
    registerDistanceTitle: "Register Distance",
    adminTitle: "Administration",
    adminSubtitle: "Team and challenge data management",
    adminLoginTitle: "Administrator Access",
    adminPasswordPlaceholder: "Administrator password",
    adminLoginButton: "Enter",
    adminPanelTitle: "Administration Panel",
    adminLogoutButton: "Logout",
    adminTotalTeams: "Total Teams",
    adminTotalRegistrations: "Total Registrations",
    adminTotalDistance: "Total Distance",
    adminTeamsListTitle: "Registered Teams",
    adminDeleteButton: "Delete",
    adminExportButton: "Export Data",
    adminResetButton: "Reset All",
    adminWrongPassword: "Incorrect password",
    adminTeamDeleted: "Team deleted successfully",
    adminDataExported: "Data exported successfully",
    adminDataReset: "All data has been deleted",
    adminConfirmDelete: "Are you sure you want to delete this team? This will also delete all its records.",
    adminConfirmReset: "WARNING: This will delete ALL teams and records. Cannot be undone. Are you sure?",
    teamNameExists: "A team with this name already exists. Please choose another name."
  },
  pt: {
    registerTeam: 'Registrar Equipe',
    registerDistance: 'Registrar Distância',
    viewResults: 'Ver Resultados',
    teamName: 'Nome da Equipe',
    category: 'Categoria',
    joinWhatsappGroup: 'Entrar no Grupo do WhatsApp',
    selectTeam: 'Selecionar Equipe',
    date: 'Data',
    distance: 'Distância',
    kilometers: 'Km',
    miles: 'Milhas',
    registerTeamAndJoin: 'Registrar Equipe',
    registerDistance: 'Registrar Distância',
    challengeResults: 'Resultados do Desafio',
    teams: 'Equipes',
    totalKm: 'km totais',
    totalMiles: 'milhas totais',
    registrations: 'Registros',
    progressTowards: 'Progresso para 200 milhas',
    completed: 'Completado',
    remaining: 'Restante',
    history: 'Histórico de Registros',
    units: 'Unidades',
    team: 'Equipe',
    teams: 'Equipes',
    totalKm: 'km totais',
    totalMiles: 'milhas totais',
    registrations: 'Registros',
    joinChallenge: 'Junte-se ao desafio Bigfoot 200 Challenge registrando sua equipe',
    registerProgress: 'Registre seu progresso diário no Bigfoot 200 Challenge',
    viewProgress: 'Visualize o progresso de todas as equipes no Bigfoot 200 Challenge',
    teamRegisteredSuccess: 'Equipe registrada com sucesso!',
    distanceRegisteredSuccess: 'Distância registrada com sucesso!',
    whatsappGroupInfo: 'Ao se registrar, você receberá o link para entrar no grupo oficial do WhatsApp do Bigfoot 200 Challenge onde poderá:',
    whatsappGroupBenefit1: 'Compartilhar seu progresso diário',
    whatsappGroupBenefit2: 'Ver atualizações de outros participantes',
    whatsappGroupBenefit3: 'Receber motivação e conselhos',
    whatsappGroupBenefit4: 'Participar da comunidade do desafio',
    historyTitle: 'Histórico de Registros',
    historyDescription: 'Clique em uma equipe para ver seu histórico completo',
    totalRegistrations: 'registros',
    totalDistance: 'Total',
    noTeamsRegistered: 'Nenhuma equipe registrada ainda',
    noRegistrationsForTeam: 'Nenhum registro para esta equipe',
    clickTeamForHistory: 'Clique em uma equipe para ver seu histórico completo',
    registerTeamTitle: "Registrar Equipa",
    joinChallengeText: "Junte-se ao desafio Bigfoot 200 registrando sua equipa",
    teamNameLabel: "Nome da Equipa *",
    teamCategoryLabel: "Categoria *",
    whatsappGroupLabel: "Grupo Oficial do WhatsApp",
    whatsappGroupLinkText: "Entrar no grupo do WhatsApp do desafio",
    whatsappGroupInfo: "Escaneie ou clique no link para entrar no grupo oficial do desafio. Compartilhe o link com os membros da sua equipa se também quiserem entrar!",
    whatsappGroupBenefit1: "Compartilhar seu progresso diário",
    whatsappGroupBenefit2: "Ver as atualizações de outros participantes",
    whatsappGroupBenefit3: "Receber motivação e dicas",
    whatsappGroupBenefit4: "Participar na comunidade do desafio",
    registerTeamButton: "Registrar Equipa",
    totalTeamsLabel: "Equipas",
    totalDistanceLabel: "km totais",
    totalDistanceMiLabel: "milhas totais",
    totalRegistrationsLabel: "Registos",
    registerProgressText: "Registre seu progresso diário ao Bigfoot 200 Challenge",
    viewProgressText: "Visualize o progresso de todas as equipas no Bigfoot 200 Challenge",
    resultsTitle: "Resultados do Desafio",
    registerDistanceTitle: "Registrar Distância",
    adminTitle: "Administração",
    adminSubtitle: "Gestão de equipas e dados do desafio",
    adminLoginTitle: "Acesso de Administrador",
    adminPasswordPlaceholder: "Palavra-passe de administrador",
    adminLoginButton: "Entrar",
    adminPanelTitle: "Painel de Administração",
    adminLogoutButton: "Sair",
    adminTotalTeams: "Total Equipas",
    adminTotalRegistrations: "Total Registos",
    adminTotalDistance: "Total Distância",
    adminTeamsListTitle: "Equipas Registadas",
    adminDeleteButton: "Eliminar",
    adminExportButton: "Exportar Dados",
    adminResetButton: "Resetejar Tudo",
    adminWrongPassword: "Palavra-passe incorreta",
    adminTeamDeleted: "Equipa eliminada com sucesso",
    adminDataExported: "Dados exportados com sucesso",
    adminDataReset: "Todos os dados foram eliminados",
    adminConfirmDelete: "Tem a certeza que quer eliminar esta equipa? Isto também eliminará todos os seus registos.",
    adminConfirmReset: "ATENÇÃO: Isto eliminará TODAS as equipas e registos. Não pode ser desfeito. Tem a certeza?",
    teamNameExists: "Já existe uma equipa com este nome. Por favor, escolha outro nome."
  }
};

// Hacer las funciones disponibles globalmente
window.switchTab = switchTab;
window.switchModalTab = switchModalTab;
window.showTeamHistory = showTeamHistory;
window.closeTeamHistory = closeTeamHistory;
window.loginAdmin = loginAdmin;
window.logoutAdmin = logoutAdmin;
window.deleteTeam = deleteTeam;
window.exportData = exportData;
window.resetAllData = resetAllData;

// Contraseña de administrador (cambiar por seguridad)
const ADMIN_PASSWORD = 'edu.miralles';

// Función para obtener traducciones con fallback
function getTranslation(key) {
  const t = translations[currentLanguage] || translations['ca'];
  return t[key] || key;
}

document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM cargado, inicializando aplicación...');
  
  // Verificar que Chart.js esté disponible
  if (typeof Chart === 'undefined') {
    console.error('Chart.js no está cargado!');
    showNotification('Error: Chart.js no se cargó correctamente', 'error');
  } else {
    console.log('Chart.js cargado correctamente');
  }
  
  // Inicializar datos si no existen
  initializeData();
  
  // Configurar selector de idioma
  setupLanguageSelector();
  
  // Cargar equipos en el selector
  loadTeams();
  
  // Cargar resultados
  loadResults();
  
  // Event listeners
  setupEventListeners();
  
  // Ocultar botones de administración al inicio
  const exportButton = document.getElementById('admin-export-button');
  const resetButton = document.getElementById('admin-reset-button');
  if (exportButton) exportButton.classList.add('hidden');
  if (resetButton) resetButton.classList.add('hidden');
  
  // Debug: verificar formularios
  console.log('Formulario de equipo:', document.getElementById('teamForm'));
  console.log('Formulario de distancia:', document.getElementById('distanceForm'));
});

function initializeData() {
  console.log('Inicializando datos...');
  
  // Inicializar equipos si no existen
  if (!localStorage.getItem(TEAMS_KEY)) {
    localStorage.setItem(TEAMS_KEY, JSON.stringify(initialTeams));
    console.log('Equipos iniciales creados');
  }
  
  // Inicializar distancias si no existen
  if (!localStorage.getItem(DISTANCES_KEY)) {
    localStorage.setItem(DISTANCES_KEY, JSON.stringify(initialDistances));
    console.log('Distancias inicializadas');
  }
}

function setupLanguageSelector() {
  const languageSelect = document.getElementById('languageSelect');
  if (languageSelect) {
    // Establecer catalán como predeterminado
    languageSelect.value = 'ca';
    currentLanguage = 'ca';
    
    languageSelect.addEventListener('change', (e) => {
      currentLanguage = e.target.value;
      console.log('Idioma cambiado a:', currentLanguage);
      updateLanguage();
    });
    
    // Actualizar idioma inicial
    updateLanguage();
  }
}

function updateLanguage() {
  console.log('Actualizando idioma a:', currentLanguage);
  
  // Usar la función updateTexts() que maneja todos los textos
  updateTexts();
  
  // Actualizar labels de formularios
  updateFormLabels();
  
  // Actualizar textos del panel de administración
  updateAdminTexts();
  
  // Asegurar que los botones de admin estén ocultos si no se ha hecho login
  const adminPanel = document.getElementById('admin-panel');
  const exportButton = document.getElementById('admin-export-button');
  const resetButton = document.getElementById('admin-reset-button');
  
  if (adminPanel && adminPanel.classList.contains('hidden')) {
    // Panel oculto = no login, ocultar botones
    if (exportButton) exportButton.classList.add('hidden');
    if (resetButton) resetButton.classList.add('hidden');
  }
  
  // Recargar equipos con el nuevo idioma
  loadTeams();
  
  // Recargar resultados para actualizar gráficos
  loadResults();
}

function updateFormLabels() {
  const t = translations[currentLanguage];
  
  // Labels del formulario de equipo
  const teamNameLabel = document.getElementById('teamNameLabel');
  const teamCategoryLabel = document.getElementById('teamCategoryLabel');
  const whatsappGroupLabel = document.getElementById('whatsappGroupLabel');
  const registerTeamButton = document.getElementById('registerTeamButton');
  
  if (teamNameLabel) teamNameLabel.textContent = t.teamName + ' *';
  if (teamCategoryLabel) teamCategoryLabel.textContent = t.category + ' *';
  if (whatsappGroupLabel) whatsappGroupLabel.textContent = t.whatsappGroupLabel;
  if (registerTeamButton) registerTeamButton.textContent = t.registerTeamButton;
  
  // Labels del formulario de distancia
  const teamSelect = document.getElementById('teamSelect');
  if (teamSelect) {
    const firstOption = teamSelect.querySelector('option[value=""]');
    if (firstOption) {
      firstOption.textContent = t.selectTeam;
    }
  }
  
  // Actualizar placeholders
  const teamNameInput = document.getElementById('teamName');
  if (teamNameInput) {
    teamNameInput.placeholder = t.teamName;
  }
}

function setupEventListeners() {
  console.log('Configurando event listeners...');
  
  // Formulario de equipo
  const teamForm = document.getElementById('teamForm');
  if (teamForm) {
    teamForm.addEventListener('submit', handleTeamSubmit);
    console.log('Event listener para formulario de equipo añadido');
  } else {
    console.error('No se encontró el formulario de equipo');
  }
  
  // Formulario de distancia
  const distanceForm = document.getElementById('distanceForm');
  if (distanceForm) {
    distanceForm.addEventListener('submit', handleDistanceSubmit);
    console.log('Event listener para formulario de distancia añadido');
  } else {
    console.error('No se encontró el formulario de distancia');
  }
  
  // Nota: El botón de añadir equipo se eliminó porque ahora hay una pestaña dedicada para registrar equipos
}

function switchTab(tabName) {
  console.log('Cambiando a pestaña:', tabName);
  
  // Ocultar todas las pestañas
  document.querySelectorAll('.tab-content').forEach(tab => {
    tab.classList.remove('active');
    tab.classList.add('hidden');
  });
  
  // Desactivar todos los botones
  document.querySelectorAll('.tab-button').forEach(btn => {
    btn.classList.remove('active');
    btn.classList.add('text-white/70');
  });
  
  // Mostrar pestaña seleccionada
  const selectedTab = document.getElementById(`${tabName}-tab`);
  const selectedButton = document.getElementById(`tab-${tabName}`);
  
  if (selectedTab) {
    selectedTab.classList.remove('hidden');
    selectedTab.classList.add('active');
    console.log('Pestaña mostrada:', tabName);
  }
  
  if (selectedButton) {
    selectedButton.classList.add('active');
    selectedButton.classList.remove('text-white/70');
  }
  
  // Recargar datos si es la pestaña de resultados
  if (tabName === 'results') {
    loadResults();
  }
  
  // Si es la pestaña de admin, asegurar que los botones estén ocultos si no se ha hecho login
  if (tabName === 'admin') {
    const adminPanel = document.getElementById('admin-panel');
    const exportButton = document.getElementById('admin-export-button');
    const resetButton = document.getElementById('admin-reset-button');
    
    if (adminPanel && adminPanel.classList.contains('hidden')) {
      // Panel oculto = no login, ocultar botones
      if (exportButton) exportButton.classList.add('hidden');
      if (resetButton) resetButton.classList.add('hidden');
    }
  }
}

function switchModalTab(modalNumber) {
  console.log('Cambiando a modalidad:', modalNumber);
  
  // Ocultar todas las modalidades
  document.querySelectorAll('.modal-content-tab').forEach(tab => {
    tab.classList.remove('active');
    tab.classList.add('hidden');
  });
  
  // Desactivar todos los botones de modalidad
  document.querySelectorAll('.modal-tab-button').forEach(btn => {
    btn.classList.remove('active');
    btn.classList.add('text-white/70');
  });
  
  // Mostrar modalidad seleccionada
  const selectedModal = document.getElementById(`modal-content-${modalNumber}`);
  const selectedButton = document.getElementById(`modal-tab-${modalNumber}`);
  
  if (selectedModal) {
    selectedModal.classList.remove('hidden');
    selectedModal.classList.add('active');
    console.log('Modalidad mostrada:', modalNumber);
  }
  
  if (selectedButton) {
    selectedButton.classList.add('active');
    selectedButton.classList.remove('text-white/70');
  }
}

function loadTeams() {
  console.log('Cargando equipos...');
  const teams = JSON.parse(localStorage.getItem(TEAMS_KEY) || '[]');
  console.log('Equipos encontrados en localStorage:', teams);
  
  const teamSelect = document.getElementById('teamSelect');
  console.log('Selector de equipos encontrado:', teamSelect);
  
  if (teamSelect) {
    // Limpiar opciones existentes excepto la primera
    const t = translations[currentLanguage] || translations['ca'];
    teamSelect.innerHTML = `<option value="">${t.selectTeam}</option>`;
    
    // Añadir equipos
    teams.forEach(team => {
      const option = document.createElement('option');
      option.value = team.id;
      option.textContent = `${team.name} (${team.category})`;
      teamSelect.appendChild(option);
      console.log('Añadido equipo al selector:', team.name);
    });
    
    console.log(`${teams.length} equipos cargados en el selector`);
    console.log('Opciones en el selector:', teamSelect.options.length);
  } else {
    console.error('No se encontró el selector de equipos');
  }
}

function handleTeamSubmit(e) {
  e.preventDefault();
  console.log('Enviando formulario de equipo...');
  
  const teamName = document.getElementById('teamName').value.trim();
  const teamCategory = document.getElementById('teamCategory').value;
  
  if (!teamName || !teamCategory) {
    console.log('Campos obligatorios faltantes');
    showNotification('Si us plau completa tots els camps obligatoris.', 'error');
    return;
  }
  
  // Verificar que no exista un equipo con el mismo nombre
  const teams = JSON.parse(localStorage.getItem(TEAMS_KEY) || '[]');
  const existingTeam = teams.find(team => team.name.toLowerCase() === teamName.toLowerCase());
  
  if (existingTeam) {
    const t = translations[currentLanguage] || translations['ca'];
    showNotification(t.teamNameExists, 'error');
    return;
  }
  
  console.log('Equipos existentes:', teams.length);
  
  const newTeam = {
    id: Date.now(),
    name: teamName,
    category: teamCategory
  };
  
  teams.push(newTeam);
  localStorage.setItem(TEAMS_KEY, JSON.stringify(teams));
  
  console.log('Equipo guardado:', newTeam);
  console.log('Total de equipos después de guardar:', teams.length);
  
  // Verificar que se guardó correctamente
  const savedTeams = JSON.parse(localStorage.getItem(TEAMS_KEY) || '[]');
  console.log('Equipos en localStorage después de guardar:', savedTeams.length);
  
  // Recargar equipos en el selector
  loadTeams();
  
  // Limpiar formulario
  document.getElementById('teamForm').reset();
  
  const t = translations[currentLanguage] || translations['ca'];
  showNotification(t.teamRegisteredSuccess, 'success');
}

function handleDistanceSubmit(e) {
  console.log('handleDistanceSubmit ejecutado');
  e.preventDefault();
  console.log('Enviando formulario de distancia...');
  
  const teamId = document.getElementById('teamSelect').value;
  const date = document.getElementById('dateInput').value;
  let distanceValue = document.getElementById('distanceInput').value;
  // Permitir coma o punto como separador decimal
  distanceValue = distanceValue.replace(',', '.');
  const distance = parseFloat(distanceValue);
  const unit = document.getElementById('unitSelect').value;
  
  console.log('Datos del formulario:', { teamId, date, distance, unit });
  
  if (!teamId || !date || !distance || distance <= 0) {
    showNotification('Si us plau completa tots els camps correctament.', 'error');
    return;
  }
  
  // Verificar que la fecha esté en el rango válido
  const selectedDate = new Date(date);
  const startDate = new Date('2025-08-04');
  const endDate = new Date('2025-08-12');
  
  if (selectedDate < startDate || selectedDate > endDate) {
    showNotification('La data ha d\'estar entre el 4 i 12 d\'agost de 2025.', 'error');
    return;
  }
  
  // Guardar distancia
  const distances = JSON.parse(localStorage.getItem(DISTANCES_KEY) || '[]');
  const newDistance = {
    id: Date.now(),
    teamId: parseInt(teamId),
    date: date,
    distance: distance,
    unit: unit,
    timestamp: new Date().toISOString()
  };
  
  distances.push(newDistance);
  localStorage.setItem(DISTANCES_KEY, JSON.stringify(distances));
  
  console.log('Distancia guardada:', newDistance);
  
  // Limpiar formulario
  document.getElementById('distanceForm').reset();
  
  const t = translations[currentLanguage] || translations['ca'];
  showNotification(t.distanceRegisteredSuccess, 'success');
  
  // Actualizar resultados si estamos en esa pestaña
  if (document.getElementById('results-tab').classList.contains('active')) {
    loadResults();
  }
}

function loadResults() {
  console.log('Cargando resultados...');
  const teams = JSON.parse(localStorage.getItem(TEAMS_KEY) || '[]');
  const distances = JSON.parse(localStorage.getItem(DISTANCES_KEY) || '[]');
  console.log('Equipos:', teams.length, 'Distancias:', distances.length);
  // Calcular estadísticas por equipo
  const teamStats = {};
  teams.forEach(team => {
    teamStats[team.id] = {
      team: team,
      totalDistanceKm: 0,
      totalDistanceMi: 0,
      registrations: 0,
      lastRegistration: null
    };
  });
  distances.forEach(distance => {
    const teamStat = teamStats[distance.teamId];
    if (teamStat) {
      const distanceKm = distance.unit === 'mi' ? distance.distance * 1.60934 : distance.distance;
      const distanceMi = distance.unit === 'km' ? distance.distance / 1.60934 : distance.distance;
      teamStat.totalDistanceKm += distanceKm;
      teamStat.totalDistanceMi += distanceMi;
      teamStat.registrations++;
      teamStat.lastRegistration = distance.timestamp;
    }
  });
  updateGeneralStats(teams, distances);
  updateCategoryResults(teamStats);
  generateCharts(teamStats);
}

function updateGeneralStats(teams, distances) {
  const totalTeams = teams.length;
  const totalDistanceKm = distances.reduce((sum, d) => {
    return sum + (d.unit === 'mi' ? d.distance * 1.60934 : d.distance);
  }, 0);
  const totalDistanceMi = totalDistanceKm / 1.60934;
  const totalRegistrations = distances.length;
  
  const totalTeamsEl = document.getElementById('totalTeams');
  const totalDistanceEl = document.getElementById('totalDistance');
  const totalDistanceMiEl = document.getElementById('totalDistanceMi');
  const totalRegistrationsEl = document.getElementById('totalRegistrations');
  
  if (totalTeamsEl) totalTeamsEl.textContent = totalTeams;
  if (totalDistanceEl) totalDistanceEl.textContent = totalDistanceKm.toFixed(1);
  if (totalDistanceMiEl) totalDistanceMiEl.textContent = totalDistanceMi.toFixed(1);
  if (totalRegistrationsEl) totalRegistrationsEl.textContent = totalRegistrations;
  
  // Actualizar etiquetas con traducciones
  const t = translations[currentLanguage] || translations['ca'];
  const statsLabels = document.querySelectorAll('.stats-label');
  if (statsLabels.length >= 4) {
    statsLabels[0].textContent = t.teams;
    statsLabels[1].textContent = t.totalKm;
    statsLabels[2].textContent = t.totalMiles;
    statsLabels[3].textContent = t.registrations;
  }
  
  console.log('Estadísticas actualizadas:', { totalTeams, totalDistanceKm, totalDistanceMi, totalRegistrations });
}

function updateCategoryResults(teamStats) {
  const categories = {
    '1 pax (Run + Bike)': 'category-1',
    '2 pax (Run + Bike)': 'category-2',
    '3 pax (Run)': 'category-3',
    '4 pax (Run)': 'category-4',
    '5 pax (Run)': 'category-5'
  };
  
  // Agrupar equipos por categoría
  const teamsByCategory = {};
  
  Object.values(teamStats).forEach(stat => {
    const category = stat.team.category;
    if (!teamsByCategory[category]) {
      teamsByCategory[category] = [];
    }
    teamsByCategory[category].push(stat);
  });
  
  // Ordenar equipos por distancia total en millas en cada categoría
  Object.keys(teamsByCategory).forEach(category => {
    teamsByCategory[category].sort((a, b) => b.totalDistanceMi - a.totalDistanceMi);
  });
  
  // Actualizar cada categoría
  Object.entries(categories).forEach(([categoryName, elementId]) => {
    const container = document.getElementById(elementId);
    if (container) {
      const teams = teamsByCategory[categoryName] || [];
      const t = translations[currentLanguage] || translations['ca'];
      if (teams.length === 0) {
        container.innerHTML = '<p class="text-gray-500 text-center py-4">' + t.noTeamsRegistered + '</p>';
      } else {
        // El grid es el contenedor principal, sin fondo ni padding extra
        container.innerHTML = `
          ${teams.map((stat, index) => {
            const rankClass = index < 3 ? `rank-${index + 1}` : '';
            const rankIcon = index < 3 ? ['🥇', '🥈', '🥉'][index] : '';
            const progressPercent = Math.min((stat.totalDistanceMi / TARGET_MILES) * 100, 100);
            const teamId = stat.team.id;
            const historyId = `team-history-${teamId}`;
            return `
              <div class="stats-mini-square ${rankClass}">
                <span class="medal-emoji mb-1">${rankIcon}</span>
                <div class="font-semibold text-base text-center truncate">${stat.team.name}</div>
                <div class="text-xs text-gray-500 text-center mb-1">${stat.registrations} ${t.registrations}</div>
                <div class="text-lg font-bold text-blue-600 text-center">${stat.totalDistanceMi.toFixed(1)} mi</div>
                <div class="text-xs text-gray-500 text-center">${stat.totalDistanceKm.toFixed(1)} km</div>
                <div class="w-full bg-gray-200 rounded-full h-1 mt-1 mb-1">
                  <div class="bg-gradient-to-r from-blue-500 to-purple-600 h-1 rounded-full" style="width: ${progressPercent}%"></div>
                </div>
                <div class="text-xs text-gray-500 text-center mb-1">${progressPercent.toFixed(1)}%</div>
                <button type="button" onclick="showTeamHistory(${teamId})" class="text-xs text-blue-600 hover:text-blue-800 font-medium flex items-center justify-center w-full py-1 mt-1">
                  <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"/></svg>
                  ${t.history}
                </button>
              </div>
            `;
          }).join('')}
        `;
      }
    }
  });
  
  console.log('Resultados por categoría actualizados');
}

function generateCharts(teamStats) {
  console.log('Generando gráficas...');
  
  // Asegurar que charts esté inicializada
  if (typeof charts === 'undefined') {
    charts = {};
  }
  
  const categories = {
    '1 pax (Run + Bike)': 'chart-1',
    '2 pax (Run + Bike)': 'chart-2',
    '3 pax (Run)': 'chart-3',
    '4 pax (Run)': 'chart-4',
    '5 pax (Run)': 'chart-5'
  };
  
  Object.entries(categories).forEach(([categoryName, chartId]) => {
    const teams = Object.values(teamStats).filter(stat => stat.team.category === categoryName);
    console.log(`Generando gráfica para ${categoryName}:`, teams.length, 'equipos');
    
    if (teams.length > 0) {
      // Ordenar por distancia en millas
      teams.sort((a, b) => b.totalDistanceMi - a.totalDistanceMi);
      
      const ctx = document.getElementById(chartId);
      if (ctx) {
        // Destruir gráfica existente si existe
        if (charts && charts[chartId]) {
          charts[chartId].destroy();
        }
        
        const labels = teams.map(stat => stat.team.name);
        const data = teams.map(stat => stat.totalDistanceMi);
        const colors = teams.map((_, index) => {
          if (index === 0) return '#fbbf24'; // Oro
          if (index === 1) return '#9ca3af'; // Plata
          if (index === 2) return '#d97706'; // Bronce
          return '#667eea'; // Azul
        });
        
        console.log('Datos para gráfica:', { labels, data, colors });
        
        // Verificar que Chart.js esté disponible
        if (typeof Chart === 'undefined') {
          console.error('Chart.js no está disponible para crear gráfica');
          return;
        }
        
        charts[chartId] = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: labels,
            datasets: [{
              label: 'Milles',
              data: data,
              backgroundColor: colors,
              borderColor: colors,
              borderWidth: 1
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: false
              },
              tooltip: {
                callbacks: {
                  label: function(context) {
                    return `${context.parsed.y.toFixed(1)} milles`;
                  }
                }
              }
            },
            scales: {
              y: {
                beginAtZero: true,
                title: {
                  display: true,
                  text: 'Milles'
                }
              }
            }
          }
        });
        
        console.log(`Gráfica ${chartId} creada exitosamente`);
      } else {
        console.error(`No se encontró el canvas para ${chartId}`);
      }
    } else {
      console.log(`No hay equipos para la categoría ${categoryName}`);
    }
  });
}

function showNotification(message, type = 'info') {
  console.log('Mostrando notificación:', message, type);
  
  // Remover notificaciones existentes
  const existingNotifications = document.querySelectorAll('.notification');
  existingNotifications.forEach(notification => notification.remove());
  
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.textContent = message;
  
  // Añadir icono según el tipo
  let icon = '';
  switch(type) {
    case 'success':
      icon = '✅';
      break;
    case 'error':
      icon = '❌';
      break;
    default:
      icon = 'ℹ️';
  }
  
  notification.innerHTML = `${icon} ${message}`;
  
  document.body.appendChild(notification);
  
  // Auto-remover después de 4 segundos
  setTimeout(() => {
    if (notification.parentNode) {
      notification.style.animation = 'slideOut 0.3s ease-in';
      setTimeout(() => {
        if (notification.parentNode) {
          notification.remove();
        }
      }, 300);
    }
  }, 4000);
}

function showTeamHistory(teamId) {
  console.log('showTeamHistory llamada con teamId:', teamId);
  const teams = JSON.parse(localStorage.getItem(TEAMS_KEY) || '[]');
  const distances = JSON.parse(localStorage.getItem(DISTANCES_KEY) || '[]');
  const t = translations[currentLanguage] || translations['ca'];
  
  console.log('Equipos encontrados:', teams.length);
  console.log('Distancias encontradas:', distances.length);
  
  const team = teams.find(t => t.id === teamId);
  if (!team) {
    console.error('Equipo no encontrado con ID:', teamId);
    showNotification('Equip no trobat', 'error');
    return;
  }
  
  console.log('Equipo encontrado:', team);
  
  const teamDistances = distances.filter(d => d.teamId === teamId);
  const totalDistanceMi = teamDistances.reduce((sum, d) => sum + (d.unit === 'mi' ? d.distance : d.distance / 1.60934), 0);
  const totalDistanceKm = totalDistanceMi * 1.60934;
  
  // Ordenar distancias por fecha (más reciente primero)
  const sortedDistances = teamDistances.sort((a, b) => new Date(b.date) - new Date(a.date));
  
  const historyHTML = `
    <div>
      <div class="modal-header">
        <div>
          <h3>${team.name}</h3>
          <p>${team.category}</p>
        </div>
        <button onclick="closeTeamHistory()" class="close-btn" aria-label="Cerrar">
          <svg viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414-1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/></svg>
        </button>
      </div>
      <div class="modal-content">
        <table class="w-full mb-6 text-base">
          <tbody>
            <tr class="border-b">
              <td class="py-3 px-10 font-medium text-blue-700 bg-blue-50 border border-blue-100 rounded-l-lg">${t.totalMiles || t.miles || 'Milles'}</td>
              <td class="py-3 px-10 text-right font-bold text-blue-600 bg-blue-50 border border-blue-100 rounded-r-lg">${totalDistanceMi.toFixed(1)}</td>
            </tr>
            <tr class="border-b">
              <td class="py-3 px-10 font-medium text-green-700 bg-green-50 border border-green-100 rounded-l-lg">${t.totalKm || t.kilometers || 'Km'}</td>
              <td class="py-3 px-10 text-right font-bold text-green-600 bg-green-50 border border-green-100 rounded-r-lg">${totalDistanceKm.toFixed(1)}</td>
            </tr>
            <tr>
              <td class="py-3 px-10 font-medium text-purple-700 bg-purple-50 border border-purple-100 rounded-l-lg">${t.registrations || 'Registres'}</td>
              <td class="py-3 px-10 text-right font-bold text-purple-600 bg-purple-50 border border-purple-100 rounded-r-lg">${teamDistances.length}</td>
            </tr>
          </tbody>
        </table>
        <div class="bg-gray-50 rounded-lg p-4">
          <h4 class="text-lg font-semibold text-gray-800 mb-4">${t.historyTitle || t.history || 'Historial de Registres'}</h4>
          <div class="overflow-x-auto">
            <table class="w-full text-sm">
              <thead>
                <tr class="bg-white border-b border-gray-200">
                  <th class="text-left py-3 px-10 font-semibold text-gray-700">${t.date || 'Data'}</th>
                  <th class="text-left py-3 px-10 font-semibold text-gray-700">${t.distance || 'Distància'}</th>
                  <th class="text-left py-3 px-10 font-semibold text-gray-700">${t.units || 'Unitats'}</th>
                  <th class="text-left py-3 px-10 font-semibold text-gray-700">${t.miles || 'Milles'}</th>
                  <th class="text-left py-3 px-10 font-semibold text-gray-700">${t.kilometers || 'Km'}</th>
                </tr>
              </thead>
              <tbody>
                ${sortedDistances.length === 0 ? `<tr><td colspan="5" class="text-center py-8 text-gray-500">${t.noRegistrationsForTeam || 'No hi ha registres per aquest equip'}</td></tr>` :
                  sortedDistances.map(distance => {
                    const distanceKm = distance.unit === 'mi' ? distance.distance * 1.60934 : distance.distance;
                    const distanceMi = distance.unit === 'km' ? distance.distance / 1.60934 : distance.distance;
                    const formattedDate = new Date(distance.date).toLocaleDateString('ca-ES');
                    return `<tr class="bg-white border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td class="py-3 px-10 font-medium">${formattedDate}</td>
                      <td class="py-3 px-10">${distance.distance}</td>
                      <td class="py-3 px-10">${distance.unit === 'km' ? (t.kilometers || 'Km') : (t.miles || 'Milles')}</td>
                      <td class="py-3 px-10 font-semibold">${distanceMi.toFixed(1)}</td>
                      <td class="py-3 px-10 font-semibold">${distanceKm.toFixed(1)}</td>
                    </tr>`;
                  }).join('')
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  `;
  
  // Crear y mostrar el modal
  console.log('Creando modal con HTML:', historyHTML.substring(0, 200) + '...');
  const modal = document.createElement('div');
  modal.id = 'teamHistoryModal';
  modal.innerHTML = historyHTML;
  document.body.appendChild(modal);
  console.log('Modal creado y añadido al DOM');
}

function closeTeamHistory() {
  console.log('closeTeamHistory llamada');
  const modal = document.getElementById('teamHistoryModal');
  if (modal) {
    modal.remove();
    console.log('Modal eliminado');
  } else {
    console.log('Modal no encontrado');
  }
}

// Función para actualizar textos
function updateTexts() {
  console.log('updateTexts() llamada con idioma:', currentLanguage);
  const texts = translations[currentLanguage];
  
  if (!texts) {
    console.error('No se encontraron traducciones para:', currentLanguage);
    return;
  }
  
  console.log('Traducciones encontradas:', Object.keys(texts).length);
  
  // Lista de todos los IDs que necesitan traducción
  const textIds = [
    'registerTeamTitle',
    'joinChallengeText', 
    'teamNameLabel',
    'teamCategoryLabel',
    'whatsappGroupLabel',
    'whatsappGroupLinkText',
    'whatsappGroupInfo',
    'whatsappGroupBenefit1',
    'whatsappGroupBenefit2',
    'whatsappGroupBenefit3',
    'whatsappGroupBenefit4',
    'registerTeamButton',
    'totalTeamsLabel',
    'totalDistanceLabel',
    'totalDistanceMiLabel',
    'totalRegistrationsLabel',
    'registerProgressText',
    'viewProgressText',
    'resultsTitle',
    'registerDistanceTitle'
  ];
  
  textIds.forEach(id => {
    const element = document.getElementById(id);
    if (element && texts[id]) {
      console.log(`Actualizando ${id}: "${element.textContent}" -> "${texts[id]}"`);
      element.textContent = texts[id];
    } else if (!element) {
      console.log(`Elemento no encontrado: ${id}`);
    } else if (!texts[id]) {
      console.log(`Traducción no encontrada para: ${id}`);
    }
  });

  // Actualizar textos de las pestañas
  const tabElements = {
    'tab-register-team': texts.registerTeam || 'Registrar Equip',
    'tab-register': texts.registerDistance || 'Registrar Distància', 
    'tab-results': texts.viewResults || 'Veure Resultats',
    'tab-admin': 'Admin'
  };

  Object.keys(tabElements).forEach(tabId => {
    const tabElement = document.getElementById(tabId);
    if (tabElement) {
      const spanElement = tabElement.querySelector('span');
      if (spanElement) {
        // Extraer solo el texto, manteniendo el icono
        const icon = spanElement.querySelector('svg');
        spanElement.innerHTML = '';
        if (icon) spanElement.appendChild(icon);
        spanElement.appendChild(document.createTextNode(' ' + tabElements[tabId]));
        console.log(`Actualizando pestaña ${tabId}: "${tabElements[tabId]}"`);
      }
    }
  });

  // Actualizar textos de las modalidades
  const modalTabElements = {
    'modal-tab-1': '1 pax (Run + Bike)',
    'modal-tab-2': '2 pax (Run + Bike)', 
    'modal-tab-3': '3 pax (Run)',
    'modal-tab-4': '4 pax (Run)',
    'modal-tab-5': '5 pax (Run)'
  };

  Object.keys(modalTabElements).forEach(modalId => {
    const modalElement = document.getElementById(modalId);
    if (modalElement) {
      modalElement.textContent = modalTabElements[modalId];
    }
  });
  
  console.log('updateTexts() completada');
}

// Funciones de administración
function loginAdmin() {
  const password = document.getElementById('adminPassword').value;
  if (password === ADMIN_PASSWORD) {
    isAdminLogged = true;
    document.getElementById('admin-login').classList.add('hidden');
    document.getElementById('admin-panel').classList.remove('hidden');
    // Mostrar botons després del login
    const exportButton = document.getElementById('admin-export-button');
    const resetButton = document.getElementById('admin-reset-button');
    if (exportButton) exportButton.classList.remove('hidden');
    if (resetButton) resetButton.classList.remove('hidden');
    loadAdminData();
    updateAdminTexts();
  } else {
    isAdminLogged = false;
    const t = translations[currentLanguage] || translations['ca'];
    showNotification(t.adminWrongPassword, 'error');
  }
}

function logoutAdmin() {
  isAdminLogged = false;
  document.getElementById('admin-panel').classList.add('hidden');
  document.getElementById('admin-login').classList.remove('hidden');
  document.getElementById('adminPassword').value = '';
  // Ocultar botons al fer logout
  const exportButton = document.getElementById('admin-export-button');
  const resetButton = document.getElementById('admin-reset-button');
  if (exportButton) exportButton.classList.add('hidden');
  if (resetButton) resetButton.classList.add('hidden');
}

function updateAdminTexts() {
  const t = translations[currentLanguage] || translations['ca'];
  
  // Actualizar textos del panel de administración
  const adminElements = {
    'admin-title': t.adminTitle,
    'admin-subtitle': t.adminSubtitle,
    'admin-login-title': t.adminLoginTitle,
    'admin-panel-title': t.adminPanelTitle,
    'admin-logout-button': t.adminLogoutButton,
    'admin-total-teams-label': t.adminTotalTeams,
    'admin-total-registrations-label': t.adminTotalRegistrations,
    'admin-total-distance-label': t.adminTotalDistance,
    'admin-teams-list-title': t.adminTeamsListTitle,
    'admin-export-button': t.adminExportButton,
    'admin-reset-button': t.adminResetButton
  };
  
  Object.keys(adminElements).forEach(id => {
    const element = document.getElementById(id);
    if (element) {
      element.textContent = adminElements[id];
    }
  });
  
  // Actualizar placeholder del input de contraseña
  const passwordInput = document.getElementById('adminPassword');
  if (passwordInput) {
    passwordInput.placeholder = t.adminPasswordPlaceholder;
  }
  
  // Actualizar botón de login
  const loginButton = document.getElementById('admin-login-button');
  if (loginButton) {
    loginButton.textContent = t.adminLoginButton;
  }
  
  // Verificar si el panel de admin está visible para decidir si mostrar los botones
  const adminPanel = document.getElementById('admin-panel');
  const exportButton = document.getElementById('admin-export-button');
  const resetButton = document.getElementById('admin-reset-button');
  
  if (adminPanel && !adminPanel.classList.contains('hidden')) {
    // Panel visible = login hecho, mostrar botones
    if (exportButton) exportButton.classList.remove('hidden');
    if (resetButton) resetButton.classList.remove('hidden');
  } else {
    // Panel oculto = no login, ocultar botones
    if (exportButton) exportButton.classList.add('hidden');
    if (resetButton) resetButton.classList.add('hidden');
  }
}

function loadAdminData() {
  const teams = JSON.parse(localStorage.getItem(TEAMS_KEY) || '[]');
  const distances = JSON.parse(localStorage.getItem(DISTANCES_KEY) || '[]');
  const t = translations[currentLanguage] || translations['ca'];
  
  // Actualizar estadísticas
  document.getElementById('admin-total-teams').textContent = teams.length;
  document.getElementById('admin-total-registrations').textContent = distances.length;
  
  const totalDistanceKm = distances.reduce((sum, d) => {
    return sum + (d.unit === 'mi' ? d.distance * 1.60934 : d.distance);
  }, 0);
  document.getElementById('admin-total-distance').textContent = `${totalDistanceKm.toFixed(1)} km`;
  
  // Listar equipos
  const teamsList = document.getElementById('admin-teams-list');
  teamsList.innerHTML = teams.map(team => {
    const teamDistances = distances.filter(d => d.teamId === team.id);
    const totalDistance = teamDistances.reduce((sum, d) => {
      return sum + (d.unit === 'mi' ? d.distance * 1.60934 : d.distance);
    }, 0);
    
    return `
      <div class="bg-white border border-gray-200 rounded-lg p-4 flex flex-col md:flex-row md:justify-between md:items-center gap-2">
        <div>
          <h5 class="font-bold text-gray-800">${team.name}</h5>
          <p class="text-sm text-gray-600">${team.category}</p>
          <p class="text-xs text-gray-500">${teamDistances.length} registres, ${totalDistance.toFixed(1)} km</p>
        </div>
        <div class="flex flex-col md:flex-row gap-2 items-center">
          <button onclick="showAdminTeamHistory(${team.id})" class="btn-primary px-3 py-1 text-sm">Veure registres</button>
          <button onclick="deleteTeam(${team.id})" class="btn-secondary bg-red-600 hover:bg-red-700 text-white px-3 py-1 text-sm">${t.adminDeleteButton}</button>
        </div>
      </div>
    `;
  }).join('');
}

function deleteTeam(teamId) {
  if (!isAdminLogged) {
    showNotification("Accés restringit: només l'administrador pot fer aquesta acció.", 'error');
    return;
  }
  const t = translations[currentLanguage] || translations['ca'];
  if (confirm(t.adminConfirmDelete)) {
    const teams = JSON.parse(localStorage.getItem(TEAMS_KEY) || '[]');
    const distances = JSON.parse(localStorage.getItem(DISTANCES_KEY) || '[]');
    // Eliminar equipo
    const updatedTeams = teams.filter(team => team.id !== teamId);
    localStorage.setItem(TEAMS_KEY, JSON.stringify(updatedTeams));
    // Eliminar distàncies de l'equip
    const updatedDistances = distances.filter(distance => distance.teamId !== teamId);
    localStorage.setItem(DISTANCES_KEY, JSON.stringify(updatedDistances));
    clearAllCharts();
    showNotification(t.adminTeamDeleted, 'success');
    loadAdminData();
    loadTeams();
    loadResults();
  }
}

function exportData() {
  if (!isAdminLogged) {
    showNotification("Accés restringit: només l'administrador pot fer aquesta acció.", 'error');
    return;
  }
  const teams = JSON.parse(localStorage.getItem(TEAMS_KEY) || '[]');
  const distances = JSON.parse(localStorage.getItem(DISTANCES_KEY) || '[]');
  const data = {
    teams: teams,
    distances: distances,
    exportDate: new Date().toISOString()
  };
  const dataStr = JSON.stringify(data, null, 2);
  const dataBlob = new Blob([dataStr], {type: 'application/json'});
  const link = document.createElement('a');
  link.href = URL.createObjectURL(dataBlob);
  link.download = `bigfoot-challenge-data-${new Date().toISOString().split('T')[0]}.json`;
  link.click();
  const t = translations[currentLanguage] || translations['ca'];
  showNotification(t.adminDataExported, 'success');
}

function resetAllData() {
  if (!isAdminLogged) {
    showNotification("Accés restringit: només l'administrador pot fer aquesta acció.", 'error');
    return;
  }
  const t = translations[currentLanguage] || translations['ca'];
  if (confirm(t.adminConfirmReset)) {
    localStorage.removeItem(TEAMS_KEY);
    localStorage.removeItem(DISTANCES_KEY);
    clearAllCharts();
    showNotification(t.adminDataReset, 'success');
    loadAdminData();
    loadTeams();
    loadResults();
  }
}

// Función para limpiar todas las gráficas
function clearAllCharts() {
  if (charts) {
    Object.keys(charts).forEach(chartId => {
      if (charts[chartId]) {
        charts[chartId].destroy();
      }
    });
    charts = {};
  }
}

// Modal d'historial editable per admin
function showAdminTeamHistory(teamId) {
  const teams = JSON.parse(localStorage.getItem(TEAMS_KEY) || '[]');
  const distances = JSON.parse(localStorage.getItem(DISTANCES_KEY) || '[]');
  const t = translations[currentLanguage] || translations['ca'];
  const team = teams.find(t => t.id === teamId);
  if (!team) {
    showNotification('Equip no trobat', 'error');
    return;
  }
  const teamDistances = distances.filter(d => d.teamId === teamId);
  // Ordenar per data descendent
  const sortedDistances = teamDistances.sort((a, b) => new Date(b.date) - new Date(a.date));
  // Modal HTML
  const modalHTML = `
    <div class="admin-modal-overlay">
      <div class="admin-modal modern-card p-6 max-w-2xl mx-auto animate-fade-in">
        <div class="flex justify-between items-center mb-4">
          <div>
            <h3 class="text-lg font-bold">${team.name}</h3>
            <p class="text-sm text-gray-500">${team.category}</p>
          </div>
          <button onclick="closeAdminTeamHistory()" class="close-btn" aria-label="Tancar">
            <svg viewBox="0 0 20 20" fill="currentColor" class="w-6 h-6"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414-1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/></svg>
          </button>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full text-sm mb-4">
            <thead>
              <tr class="bg-gray-100">
                <th class="py-2 px-3">${t.date || 'Data'}</th>
                <th class="py-2 px-3">${t.distance || 'Distància'}</th>
                <th class="py-2 px-3">${t.units || 'Unitats'}</th>
                <th class="py-2 px-3">Accions</th>
              </tr>
            </thead>
            <tbody>
              ${sortedDistances.length === 0 ? `<tr><td colspan="4" class="text-center py-8 text-gray-500">${t.noRegistrationsForTeam || 'No hi ha registres per aquest equip'}</td></tr>` :
                sortedDistances.map(distance => {
                  return `<tr data-id="${distance.id}">
                    <td class="py-2 px-3"><input type="date" class="modern-input w-32" value="${distance.date}" /></td>
                    <td class="py-2 px-3"><input type="number" step="0.01" class="modern-input w-20" value="${distance.distance}" /></td>
                    <td class="py-2 px-3">
                      <select class="modern-select w-20">
                        <option value="km" ${distance.unit === 'km' ? 'selected' : ''}>km</option>
                        <option value="mi" ${distance.unit === 'mi' ? 'selected' : ''}>mi</option>
                      </select>
                    </td>
                    <td class="py-2 px-3 flex gap-2">
                      <button class="btn-primary px-2 py-1 text-xs" onclick="saveAdminDistanceEdit(${distance.id}, ${teamId}, this)">Desa</button>
                      <button class="btn-secondary bg-red-600 hover:bg-red-700 text-white px-2 py-1 text-xs" onclick="confirmDeleteDistance(${distance.id}, ${teamId})">Elimina</button>
                    </td>
                  </tr>`;
                }).join('')
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
  // Eliminar modal existent si n'hi ha
  closeAdminTeamHistory();
  // Afegir modal al body
  const modalDiv = document.createElement('div');
  modalDiv.id = 'adminTeamHistoryModal';
  modalDiv.innerHTML = modalHTML;
  document.body.appendChild(modalDiv);
}

function closeAdminTeamHistory() {
  const modal = document.getElementById('adminTeamHistoryModal');
  if (modal) modal.remove();
}

// Desa l'edició d'un registre
function saveAdminDistanceEdit(distanceId, teamId, btn) {
  const row = btn.closest('tr');
  const dateInput = row.querySelector('input[type="date"]');
  const distInput = row.querySelector('input[type="number"]');
  const unitSelect = row.querySelector('select');
  const newDate = dateInput.value;
  const newDist = parseFloat(distInput.value);
  const newUnit = unitSelect.value;
  if (!newDate || isNaN(newDist) || newDist <= 0) {
    showNotification('Dades incorrectes', 'error');
    return;
  }
  let distances = JSON.parse(localStorage.getItem(DISTANCES_KEY) || '[]');
  const idx = distances.findIndex(d => d.id === distanceId);
  if (idx === -1) {
    showNotification('Registre no trobat', 'error');
    return;
  }
  distances[idx].date = newDate;
  distances[idx].distance = newDist;
  distances[idx].unit = newUnit;
  localStorage.setItem(DISTANCES_KEY, JSON.stringify(distances));
  showNotification('Registre actualitzat!', 'success');
  // Refresca modal i estadístiques
  showAdminTeamHistory(teamId);
  loadAdminData();
  loadResults();
}

// Elimina un registre realment
function confirmDeleteDistance(distanceId, teamId) {
  if (confirm('Segur que vols eliminar aquest registre?')) {
    let distances = JSON.parse(localStorage.getItem(DISTANCES_KEY) || '[]');
    distances = distances.filter(d => d.id !== distanceId);
    localStorage.setItem(DISTANCES_KEY, JSON.stringify(distances));
    showNotification('Registre eliminat!', 'success');
    // Refresca modal i estadístiques
    showAdminTeamHistory(teamId);
    loadAdminData();
    loadResults();
  }
}



