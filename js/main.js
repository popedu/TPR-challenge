// Claves para localStorage
const TEAMS_KEY = 'bigfoot_teams';
const DISTANCES_KEY = 'bigfoot_distances';

// Objetivo del reto: 200 millas
const TARGET_MILES = 208;
const TARGET_KM = 200 * 1.60934; // 321.868 km

// Variables globales
let charts = {};
let currentLanguage = 'ca';

// Variable global per controlar si l'admin està loguejat
let isAdminLogged = false;

// ... existing code ...
let lastTeamStats = null;

// --- REPARACIÓN: Notificación tipo toast visual ---
function showNotification(message, type = 'info') {
  // Eliminar notificaciones previas
  const oldToast = document.getElementById('custom-toast');
  if (oldToast) oldToast.remove();

  // Crear el contenedor del toast
  const toast = document.createElement('div');
  toast.id = 'custom-toast';
  toast.textContent = message;
  toast.style.position = 'fixed';
  toast.style.top = '32px';
  toast.style.right = '32px';
  toast.style.zIndex = '9999';
  toast.style.padding = '16px 28px';
  toast.style.borderRadius = '8px';
  toast.style.fontSize = '1.1em';
  toast.style.fontWeight = 'bold';
  toast.style.boxShadow = '0 2px 16px rgba(0,0,0,0.12)';
  toast.style.color = '#fff';
  toast.style.opacity = '0.98';
  toast.style.transition = 'opacity 0.3s';
  if (type === 'success') {
    toast.style.background = 'linear-gradient(90deg, #22c55e 60%, #16a34a 100%)'; // verde
  } else if (type === 'error') {
    toast.style.background = 'linear-gradient(90deg, #ef4444 60%, #b91c1c 100%)'; // rojo
  } else {
    toast.style.background = 'linear-gradient(90deg, #3b82f6 60%, #1e40af 100%)'; // azul/info
  }

  document.body.appendChild(toast);

  // Desaparecer tras 2.5 segundos
  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 400);
  }, 2500);
}
window.showNotification = showNotification;
// --- FIN DE REPARACIÓN ---

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
    teamNameExists: "Ja existeix un equip amb aquest nom. Si us plau, tria un altre nom.",
    viewRecords: 'Veure registres',
    save: 'Desa',
    cancel: 'Cancel·la',
    actions: 'Accions',
    editTeam: 'Editar equip',
    saveTeam: 'Desar equip',
    deleteRecord: 'Eliminar registre',
    saveRecord: 'Desar registre',
    tabRegisterTeam: 'Registrar Equip',
    tabRegister: 'Registrar Distància',
    tabResults: 'Veure Resultats',
    tabAdmin: 'Admin',
    cat1: '1 pax (Run + Bike)',
    cat2: '2 pax (Run + Bike)',
    cat3: '3 pax (Run)',
    cat4: '4 pax (Run)',
    cat5: '5 pax (Run)',
    selectYourTeam: 'Selecciona el teu equip',
    distanceLabel: 'Distància *',
    distancePlaceholder: 'Ex: 10.5',
    unitKm: 'km',
    unitMi: 'Milles',
    registerDistanceButton: 'Registrar Distància',
    selectTeamLabel: 'Seleccionar Equip *',
    dateLabel: 'Data *',
    distanceErrorFields: 'Si us plau completa tots els camps correctament.',
    distanceErrorDate: 'La data ha d\'estar entre el 4 i 13 d\'agost de 2025.',
    adminAccessGranted: 'Accés d\'administrador concedit',
    adminTeamUpdateError: 'Error en actualitzar l\'equip',
    adminTeamUpdated: 'Equip actualitzat correctament',
    adminTeamDeleteError: 'Error en eliminar l\'equip',
    adminTeamDeleted: 'Equip eliminat correctament',
    adminRegUpdateError: 'Error en actualitzar el registre',
    adminRegUpdated: 'Registre actualitzat correctament',
    adminRegDeleteError: 'Error en eliminar el registre',
    adminRegDeleted: 'Registre eliminat correctament',
    adminDataResetError: 'Error en resetejar les dades',
    adminDataReset: 'Totes les dades han estat eliminades',
    adminDataExportError: 'Error en exportar les dades',
    adminDataExported: 'Dades exportades correctament',
    adminRestricted: 'Accés restringit només per a administradors.',
    adminConfirmDeleteReg: 'Segur que vols eliminar aquest registre?',
    viewHistoryButton: 'Veure historial',
    accumulatedMiles: 'Milles acumulades',
    milesAxis: 'Milles',
    resultsSubtitle: "del 4 al 13 d'agost",
    mainSubtitle: "Del 4 al 13 d'agost",
    dateRangeSubtitle: "Del 4 al 13 d'agost"
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
    teamNameExists: "Ya existe un equipo con este nombre. Por favor, elige otro nombre.",
    viewRecords: 'Ver registros',
    save: 'Guardar',
    cancel: 'Cancelar',
    actions: 'Acciones',
    editTeam: 'Editar equipo',
    saveTeam: 'Guardar equipo',
    deleteRecord: 'Eliminar registro',
    saveRecord: 'Guardar registro',
    tabRegisterTeam: 'Registrar Equipo',
    tabRegister: 'Registrar Distancia',
    tabResults: 'Ver Resultados',
    tabAdmin: 'Admin',
    cat1: '1 pax (Run + Bike)',
    cat2: '2 pax (Run + Bike)',
    cat3: '3 pax (Run)',
    cat4: '4 pax (Run)',
    cat5: '5 pax (Run)',
    selectYourTeam: 'Selecciona tu equipo',
    distanceLabel: 'Distancia *',
    distancePlaceholder: 'Ej: 10.5',
    unitKm: 'km',
    unitMi: 'Millas',
    registerDistanceButton: 'Registrar Distancia',
    selectTeamLabel: 'Seleccionar Equipo *',
    dateLabel: 'Fecha *',
    distanceErrorFields: 'Por favor completa todos los campos correctamente.',
    distanceErrorDate: 'La fecha debe estar entre el 4 y 13 de agosto de 2025.',
    adminAccessGranted: 'Admin access granted',
    adminTeamUpdateError: 'Error updating team',
    adminTeamUpdated: 'Team updated successfully',
    adminTeamDeleteError: 'Error deleting team',
    adminTeamDeleted: 'Team deleted successfully',
    adminRegUpdateError: 'Error updating record',
    adminRegUpdated: 'Record updated successfully',
    adminRegDeleteError: 'Error deleting record',
    adminRegDeleted: 'Record deleted successfully',
    adminDataResetError: 'Error resetting data',
    adminDataReset: 'All data has been deleted',
    adminDataExportError: 'Error exporting data',
    adminDataExported: 'Data exported successfully',
    adminRestricted: 'Access restricted to administrators only.',
    adminConfirmDeleteReg: 'Are you sure you want to delete this record?',
    viewHistoryButton: 'Ver historial',
    accumulatedMiles: 'Millas acumuladas',
    milesAxis: 'Millas',
    resultsSubtitle: 'del 4 al 13 de agosto',
    mainSubtitle: 'Del 4 al 13 de agosto',
    dateRangeSubtitle: 'Del 4 al 13 de agosto'
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
    teamNameExists: "A team with this name already exists. Please choose another name.",
    viewRecords: 'View records',
    save: 'Save',
    cancel: 'Cancel',
    actions: 'Actions',
    editTeam: 'Edit team',
    saveTeam: 'Save team',
    deleteRecord: 'Delete record',
    saveRecord: 'Save record',
    tabRegisterTeam: 'Register Team',
    tabRegister: 'Register Distance',
    tabResults: 'View Results',
    tabAdmin: 'Admin',
    cat1: '1 pax (Run + Bike)',
    cat2: '2 pax (Run + Bike)',
    cat3: '3 pax (Run)',
    cat4: '4 pax (Run)',
    cat5: '5 pax (Run)',
    selectYourTeam: 'Select your team',
    distanceLabel: 'Distance *',
    distancePlaceholder: 'Ex: 10.5',
    unitKm: 'km',
    unitMi: 'Miles',
    registerDistanceButton: 'Register Distance',
    selectTeamLabel: 'Select Team *',
    dateLabel: 'Date *',
    distanceErrorFields: 'Please complete all fields correctly.',
    distanceErrorDate: 'The date must be between August 4 and 13, 2025.',
    adminAccessGranted: 'Admin access granted',
    adminTeamUpdateError: 'Error updating team',
    adminTeamUpdated: 'Team updated successfully',
    adminTeamDeleteError: 'Error deleting team',
    adminTeamDeleted: 'Team deleted successfully',
    adminRegUpdateError: 'Error updating record',
    adminRegUpdated: 'Record updated successfully',
    adminRegDeleteError: 'Error deleting record',
    adminRegDeleted: 'Record deleted successfully',
    adminDataResetError: 'Error resetting data',
    adminDataReset: 'All data has been deleted',
    adminDataExportError: 'Error exporting data',
    adminDataExported: 'Data exported successfully',
    adminRestricted: 'Access restricted to administrators only.',
    adminConfirmDeleteReg: 'Are you sure you want to delete this record?',
    viewHistoryButton: 'View history',
    accumulatedMiles: 'Accumulated miles',
    milesAxis: 'Miles',
    resultsSubtitle: 'from August 4th to 13th',
    mainSubtitle: 'From August 4th to 13th',
    dateRangeSubtitle: 'From August 4th to 13th'
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
    registerProgressText: "Registra o teu progresso diário no Bigfoot 200 Challenge",
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
    teamNameExists: "Já existe uma equipa com este nome. Por favor, escolha outro nome.",
    viewRecords: 'Ver registos',
    save: 'Guardar',
    cancel: 'Cancelar',
    actions: 'Ações',
    editTeam: 'Editar equipa',
    saveTeam: 'Guardar equipa',
    deleteRecord: 'Eliminar registo',
    saveRecord: 'Guardar registo',
    tabRegisterTeam: 'Registrar Equipa',
    tabRegister: 'Registrar Distância',
    tabResults: 'Ver Resultados',
    tabAdmin: 'Admin',
    cat1: '1 pax (Run + Bike)',
    cat2: '2 pax (Run + Bike)',
    cat3: '3 pax (Run)',
    cat4: '4 pax (Run)',
    cat5: '5 pax (Run)',
    selectYourTeam: 'Seleciona a tua equipa',
    distanceLabel: 'Distância *',
    distancePlaceholder: 'Ex: 10.5',
    unitKm: 'km',
    unitMi: 'Milhas',
    registerDistanceButton: 'Registrar Distância',
    selectTeamLabel: 'Selecionar Equipa *',
    dateLabel: 'Data *',
    distanceErrorFields: 'Por favor preencha todos os campos corretamente.',
    distanceErrorDate: 'A data deve estar entre 4 e 13 de agosto de 2025.',
    adminAccessGranted: 'Acesso de administrador concedido',
    adminTeamUpdateError: 'Erro ao atualizar a equipa',
    adminTeamUpdated: 'Equipa atualizada com sucesso',
    adminTeamDeleteError: 'Erro ao eliminar a equipa',
    adminTeamDeleted: 'Equipa eliminada com sucesso',
    adminRegUpdateError: 'Erro ao atualizar o registo',
    adminRegUpdated: 'Registo atualizado com sucesso',
    adminRegDeleteError: 'Erro ao eliminar o registo',
    adminRegDeleted: 'Registo eliminado com sucesso',
    adminDataResetError: 'Erro ao resetar os dados',
    adminDataReset: 'Todos os dados foram eliminados',
    adminDataExportError: 'Erro ao exportar os dados',
    adminDataExported: 'Dados exportados com sucesso',
    adminRestricted: 'Acesso restrito apenas para administradores.',
    adminConfirmDeleteReg: 'Tem a certeza que quer eliminar este registo?',
    viewHistoryButton: 'Ver histórico',
    accumulatedMiles: 'Milhas acumuladas',
    milesAxis: 'Milhas',
    resultsSubtitle: 'de 4 a 13 de agosto',
    mainSubtitle: 'De 4 a 13 de agosto',
    dateRangeSubtitle: 'De 4 a 13 de agosto'
  }
};

// Corrección de traducción en portugués para la pestaña de registro de distancia
ttranslations = translations;
translations.pt.registerDistanceTitle = 'Registrar Distância';
translations.pt.registerProgressText = 'Registra o teu progresso diário no Bigfoot 200 Challenge';

// Añadir claves de traducción si faltan
Object.keys(translations).forEach(lang => {
  translations[lang].viewRecords = translations[lang].viewRecords || {
    ca: 'Veure registres', es: 'Ver registros', en: 'View records', pt: 'Ver registos'
  }[lang];
  translations[lang].save = translations[lang].save || {
    ca: 'Desa', es: 'Guardar', en: 'Save', pt: 'Guardar'
  }[lang];
  translations[lang].cancel = translations[lang].cancel || {
    ca: 'Cancel·la', es: 'Cancelar', en: 'Cancel', pt: 'Cancelar'
  }[lang];
  translations[lang].actions = translations[lang].actions || {
    ca: 'Accions', es: 'Acciones', en: 'Actions', pt: 'Ações'
  }[lang];
  translations[lang].editTeam = translations[lang].editTeam || {
    ca: 'Editar equip', es: 'Editar equipo', en: 'Edit team', pt: 'Editar equipa'
  }[lang];
  translations[lang].saveTeam = translations[lang].saveTeam || {
    ca: 'Desar equip', es: 'Guardar equipo', en: 'Save team', pt: 'Guardar equipa'
  }[lang];
  translations[lang].deleteRecord = translations[lang].deleteRecord || {
    ca: 'Eliminar registre', es: 'Eliminar registro', en: 'Delete record', pt: 'Eliminar registo'
  }[lang];
  translations[lang].saveRecord = translations[lang].saveRecord || {
    ca: 'Desar registre', es: 'Guardar registro', en: 'Save record', pt: 'Guardar registo'
  }[lang];
});

// Añadir claves de traducción para categorías/modalidades y pestañas principales
Object.keys(translations).forEach(lang => {
  translations[lang].tabRegisterTeam = translations[lang].tabRegisterTeam || {
    ca: 'Registrar Equip', es: 'Registrar Equipo', en: 'Register Team', pt: 'Registrar Equipa'
  }[lang];
  translations[lang].tabRegister = translations[lang].tabRegister || {
    ca: 'Registrar Distància', es: 'Registrar Distancia', en: 'Register Distance', pt: 'Registrar Distância'
  }[lang];
  translations[lang].tabResults = translations[lang].tabResults || {
    ca: 'Veure Resultats', es: 'Ver Resultados', en: 'View Results', pt: 'Ver Resultados'
  }[lang];
  translations[lang].tabAdmin = translations[lang].tabAdmin || {
    ca: 'Admin', es: 'Admin', en: 'Admin', pt: 'Admin'
  }[lang];
  translations[lang].cat1 = translations[lang].cat1 || {
    ca: '1 pax (Run + Bike)', es: '1 pax (Run + Bike)', en: '1 pax (Run + Bike)', pt: '1 pax (Run + Bike)'
  }[lang];
  translations[lang].cat2 = translations[lang].cat2 || {
    ca: '2 pax (Run + Bike)', es: '2 pax (Run + Bike)', en: '2 pax (Run + Bike)', pt: '2 pax (Run + Bike)'
  }[lang];
  translations[lang].cat3 = translations[lang].cat3 || {
    ca: '3 pax (Run)', es: '3 pax (Run)', en: '3 pax (Run)', pt: '3 pax (Run)'
  }[lang];
  translations[lang].cat4 = translations[lang].cat4 || {
    ca: '4 pax (Run)', es: '4 pax (Run)', en: '4 pax (Run)', pt: '4 pax (Run)'
  }[lang];
  translations[lang].cat5 = translations[lang].cat5 || {
    ca: '5 pax (Run)', es: '5 pax (Run)', en: '5 pax (Run)', pt: '5 pax (Run)'
  }[lang];
});

// Añadir claves de traducción para la pestaña de distancia
Object.keys(translations).forEach(lang => {
  translations[lang].selectYourTeam = translations[lang].selectYourTeam || {
    ca: 'Selecciona el teu equip', es: 'Selecciona tu equipo', en: 'Select your team', pt: 'Seleciona a tua equipa'
  }[lang];
  translations[lang].distanceLabel = translations[lang].distanceLabel || {
    ca: 'Distància *', es: 'Distancia *', en: 'Distance *', pt: 'Distância *'
  }[lang];
  translations[lang].distancePlaceholder = translations[lang].distancePlaceholder || {
    ca: 'Ex: 10.5', es: 'Ej: 10.5', en: 'Ex: 10.5', pt: 'Ex: 10.5'
  }[lang];
  translations[lang].unitKm = translations[lang].unitKm || {
    ca: 'km', es: 'km', en: 'km', pt: 'km'
  }[lang];
  translations[lang].unitMi = translations[lang].unitMi || {
    ca: 'Milles', es: 'Millas', en: 'Miles', pt: 'Milhas'
  }[lang];
  translations[lang].registerDistanceButton = translations[lang].registerDistanceButton || {
    ca: 'Registrar Distància', es: 'Registrar Distancia', en: 'Register Distance', pt: 'Registrar Distância'
  }[lang];
});

// Añadir claves de traducción para labels y mensajes de la pestaña de distancia
Object.keys(translations).forEach(lang => {
  translations[lang].selectTeamLabel = translations[lang].selectTeamLabel || {
    ca: 'Seleccionar Equip *', es: 'Seleccionar Equipo *', en: 'Select Team *', pt: 'Selecionar Equipa *'
  }[lang];
  translations[lang].dateLabel = translations[lang].dateLabel || {
    ca: 'Data *', es: 'Fecha *', en: 'Date *', pt: 'Data *'
  }[lang];
  translations[lang].distanceLabel = translations[lang].distanceLabel || {
    ca: 'Distància *', es: 'Distancia *', en: 'Distance *', pt: 'Distância *'
  }[lang];
  translations[lang].distanceErrorFields = translations[lang].distanceErrorFields || {
    ca: 'Si us plau completa tots els camps correctament.', es: 'Por favor completa todos los campos correctamente.', en: 'Please complete all fields correctly.', pt: 'Por favor preencha todos os campos corretamente.'
  }[lang];
  translations[lang].distanceErrorDate = translations[lang].distanceErrorDate || {
    ca: 'La data ha d\'estar entre el 4 i 13 d\'agost de 2025.', es: 'La fecha debe estar entre el 4 y 13 de agosto de 2025.', en: 'The date must be between August 4 and 13, 2025.', pt: 'A data deve estar entre 4 e 13 de agosto de 2025.'
  }[lang];
});

function updateDistanceTabTexts() {
  const t = translations[currentLanguage] || translations['ca'];
  // Label de equipo
  const teamLabel = document.getElementById('distanceTeamLabel');
  if (teamLabel) teamLabel.textContent = t.selectTeamLabel;
  // Select de equipo
  const teamSelectOption = document.getElementById('distanceTeamSelectOption');
  if (teamSelectOption) teamSelectOption.textContent = t.selectYourTeam;
  // Label de fecha
  const dateLabel = document.getElementById('distanceDateLabel');
  if (dateLabel) dateLabel.textContent = t.dateLabel;
  // Label y placeholder de distancia
  const distanceLabel = document.getElementById('distanceLabel');
  if (distanceLabel) distanceLabel.textContent = t.distanceLabel;
  const distanceInput = document.getElementById('distanceInput');
  if (distanceInput) distanceInput.placeholder = t.distancePlaceholder;
  // Opciones de unidad (forzar actualización del texto y valor)
  const unitKmOption = document.getElementById('distanceUnitKmOption');
  if (unitKmOption) {
    unitKmOption.textContent = t.unitKm;
    unitKmOption.value = 'km';
  }
  const unitMiOption = document.getElementById('distanceUnitMiOption');
  if (unitMiOption) {
    unitMiOption.textContent = t.unitMi;
    unitMiOption.value = 'mi';
  }
  // Botón de registrar distancia
  const btn = document.getElementById('distanceRegisterButton');
  if (btn) btn.textContent = t.registerDistanceButton;
  // Forzar actualización del select de equipos si existe
  const teamSelect = document.getElementById('teamSelect');
  if (teamSelect && teamSelect.options.length > 0) {
    teamSelect.options[0].text = t.selectYourTeam;
  }
  // Mostrar la categoría del equipo seleccionado al lado del select
  const categoryText = document.getElementById('selectedTeamCategory');
  if (categoryText) categoryText.remove();
  teamSelect.insertAdjacentHTML('afterend', '<span id="selectedTeamCategory" style="margin-left:12px;font-size:0.95em;color:#555;"></span>');
  teamSelect.addEventListener('change', function() {
    const selected = data.find(t => t.id == teamSelect.value);
    document.getElementById('selectedTeamCategory').textContent = selected ? selected.category : '';
  });
  // Subtítulo de rango de fechas junto a Data*
  const dateRangeSubtitle = document.getElementById('dateRangeSubtitle');
  if (dateRangeSubtitle && t.dateRangeSubtitle) dateRangeSubtitle.textContent = t.dateRangeSubtitle;
}

// Modificar los mensajes de error/éxito en handleDistanceSubmit
const originalHandleDistanceSubmit = handleDistanceSubmit;
async function handleDistanceSubmit(e) {
  e.preventDefault();
  const t = getTranslations();
  const teamId = document.getElementById('teamSelect').value;
  const date = document.getElementById('dateInput').value;
  let distanceValue = document.getElementById('distanceInput').value;
  // Aceptar punto, coma o apóstrofe como separador decimal
  distanceValue = distanceValue.replace(/['’,]/g, '.');
  const distance = parseFloat(distanceValue);
  if (isNaN(distance) || !isFinite(distance)) {
    showNotification(t.distanceErrorFormat || 'Introduce un número válido para la distancia.', 'error');
    return;
  }
  const unit = document.getElementById('unitSelect').value;
  if (!teamId || !date || !distance || distance <= 0) {
    showNotification(t.distanceErrorFields || 'Por favor completa todos los campos correctamente.', 'error');
    return;
  }
  const selectedDate = new Date(date);
  const startDate = new Date('2025-08-04');
  const endDate = new Date('2025-08-13');
  if (selectedDate < startDate || selectedDate > endDate) {
    showNotification(t.distanceErrorDate || 'La fecha debe estar entre el 4 y 13 de agosto de 2025.', 'error');
    return;
  }
  const newDistance = {
    team_id: parseInt(teamId),
    date: date,
    distance: distance,
    unit: unit,
    timestamp: new Date().toISOString()
  };
  const { error, data } = await window.supabase.from('distance').insert([newDistance]).select();
  if (error) {
    showNotification(t.distanceRegisterError || 'Error al registrar la distancia', 'error');
    return;
  }
  if (!data || (Array.isArray(data) && data.length === 0)) {
    showNotification(t.distanceRegisterUnexpected || 'No se insertó la distancia. Revisa la consola.', 'error');
    return;
  }
  document.getElementById('distanceForm').reset();
  showNotification(t.distanceRegisteredSuccess || '¡Distancia registrada con éxito!', 'success');
  if (document.getElementById('results-tab').classList.contains('active')) {
    await loadResults();
  }
}
window.handleDistanceSubmit = handleDistanceSubmit;

// Llamar a updateDistanceTabTexts() cada vez que se cambie el idioma
const originalUpdateLanguage2 = window.updateLanguage;
window.updateLanguage = function() {
  updateTabAndCategoryTexts();
  updateDistanceTabTexts();
  loadTeams();
  if (document.getElementById('results-tab').classList.contains('active') && lastTeamStats) {
    updateCategoryResults(lastTeamStats);
    generateCharts(lastTeamStats);
  }
};

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
    console.log('[switchTab] Entrando en resultados, llamando a loadResults');
    loadResults().then(() => {
      setTimeout(() => {
        // Redibujar solo la gráfica de la categoría activa
        const activeModal = document.querySelector('.modal-content-tab.active');
        if (activeModal) {
          const chartCanvas = activeModal.querySelector('canvas');
          if (chartCanvas && chartCanvas.chartInstance) {
            chartCanvas.chartInstance.destroy();
          }
          // Volver a crear la gráfica usando lastTeamStats completo
          if (typeof lastTeamStats !== 'undefined' && lastTeamStats) {
            generateCharts(lastTeamStats);
            console.log('[switchTab] Redibujada gráfica de la categoría activa');
          }
        }
      }, 100);
    });
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
  if (tabName === 'register') {
    loadTeams();
  }
}
window.switchTab = switchTab;

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
  
  setTimeout(() => {
    // Redibujar solo la gráfica de la categoría activa
    const activeModal = document.querySelector('.modal-content-tab.active');
    if (activeModal) {
      const chartCanvas = activeModal.querySelector('canvas');
      if (chartCanvas && chartCanvas.chartInstance) {
        chartCanvas.chartInstance.destroy();
      }
      // Volver a crear la gráfica usando lastTeamStats completo
      if (typeof lastTeamStats !== 'undefined' && lastTeamStats) {
        generateCharts(lastTeamStats);
        console.log('[switchModalTab] Redibujada gráfica de la categoría activa');
      }
    }
  }, 100);
}
window.switchModalTab = switchModalTab;

// --- INICIO: FUNCIONES SUPABASE ---

async function loadTeams() {
  const { data, error } = await window.supabase
    .from('registrations')
    .select('*');
  if (error) {
    console.error('Error cargando equipos:', error);
    return [];
  }
  const teamSelect = document.getElementById('teamSelect');
  const t = translations[currentLanguage] || translations['ca'];
  if (teamSelect) {
    teamSelect.innerHTML = `<option value="">${t.selectTeam}</option>`;
    data.forEach(team => {
      const option = document.createElement('option');
      option.value = team.id;
      option.textContent = team.name; // Solo el nombre
      teamSelect.appendChild(option);
    });
  }
  // Mostrar la categoría del equipo seleccionado al lado del select
  const categoryText = document.getElementById('selectedTeamCategory');
  if (categoryText) categoryText.remove();
  teamSelect.insertAdjacentHTML('afterend', '<span id="selectedTeamCategory" style="margin-left:12px;font-size:0.95em;color:#555;"></span>');
  teamSelect.addEventListener('change', function() {
    const selected = data.find(t => t.id == teamSelect.value);
    document.getElementById('selectedTeamCategory').textContent = selected ? selected.category : '';
  });
  return data;
}

async function handleTeamSubmit(e) {
  e.preventDefault();
  const t = getTranslations();
  const teamName = document.getElementById('teamName').value.trim();
  const teamCategory = document.getElementById('teamCategory').value;
  if (!teamName || !teamCategory) {
    showNotification(t.teamFieldsRequired || 'Por favor completa todos los campos obligatorios.', 'error');
    return;
  }
  // Verificar que no exista un equipo con el mismo nombre
  const { data: teams } = await window.supabase.from('registrations').select('name');
  const existingTeam = teams.find(team => team.name.toLowerCase() === teamName.toLowerCase());
  if (existingTeam) {
    showNotification(t.teamNameExists || 'Ya existe un equipo con este nombre. Por favor, elige otro nombre.', 'error');
    return;
  }
  const newTeam = { name: teamName, category: teamCategory };
  const { error, data } = await window.supabase
    .from('registrations')
    .insert([newTeam])
    .select();
  if (error) {
    showNotification(t.teamRegisterError || 'Error al registrar el equipo', 'error');
    return;
  }
  if (!data || (Array.isArray(data) && data.length === 0)) {
    showNotification(t.teamRegisterUnexpected || 'No se insertó el equipo. Revisa la consola.', 'error');
    return;
  }
  await loadTeams();
  document.getElementById('teamForm').reset();
  showNotification(t.teamRegisteredSuccess || '¡Equipo registrado con éxito!', 'success');
}
window.handleTeamSubmit = handleTeamSubmit;

async function handleDistanceSubmit(e) {
  e.preventDefault();
  const t = getTranslations();
  const teamId = document.getElementById('teamSelect').value;
  const date = document.getElementById('dateInput').value;
  let distanceValue = document.getElementById('distanceInput').value;
  // Aceptar punto, coma o apóstrofe como separador decimal
  distanceValue = distanceValue.replace(/['’,]/g, '.');
  const distance = parseFloat(distanceValue);
  if (isNaN(distance) || !isFinite(distance)) {
    showNotification(t.distanceErrorFormat || 'Introduce un número válido para la distancia.', 'error');
    return;
  }
  const unit = document.getElementById('unitSelect').value;
  if (!teamId || !date || !distance || distance <= 0) {
    showNotification(t.distanceErrorFields || 'Por favor completa todos los campos correctamente.', 'error');
    return;
  }
  const selectedDate = new Date(date);
  const startDate = new Date('2025-08-04');
  const endDate = new Date('2025-08-13');
  if (selectedDate < startDate || selectedDate > endDate) {
    showNotification(t.distanceErrorDate || 'La fecha debe estar entre el 4 y 13 de agosto de 2025.', 'error');
    return;
  }
  const newDistance = {
    team_id: parseInt(teamId),
    date: date,
    distance: distance,
    unit: unit,
    timestamp: new Date().toISOString()
  };
  const { error, data } = await window.supabase.from('distance').insert([newDistance]).select();
  if (error) {
    showNotification(t.distanceRegisterError || 'Error al registrar la distancia', 'error');
    return;
  }
  if (!data || (Array.isArray(data) && data.length === 0)) {
    showNotification(t.distanceRegisterUnexpected || 'No se insertó la distancia. Revisa la consola.', 'error');
    return;
  }
  document.getElementById('distanceForm').reset();
  showNotification(t.distanceRegisteredSuccess || '¡Distancia registrada con éxito!', 'success');
  if (document.getElementById('results-tab').classList.contains('active')) {
    await loadResults();
  }
}
window.handleDistanceSubmit = handleDistanceSubmit;

async function loadResults() {
  console.log('[loadResults] llamada');
  const { data: teams } = await window.supabase.from('registrations').select('*');
  const { data: distances } = await window.supabase.from('distance').select('*');
  console.log('[loadResults] equipos:', teams);
  console.log('[loadResults] distancias:', distances);
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
    const teamStat = teamStats[distance.team_id];
    if (teamStat) {
      const distanceKm = distance.unit === 'mi' ? distance.distance * 1.60934 : distance.distance;
      const distanceMi = distance.unit === 'km' ? distance.distance / 1.60934 : distance.distance;
      teamStat.totalDistanceKm += distanceKm;
      teamStat.totalDistanceMi += distanceMi;
      teamStat.registrations++;
      teamStat.lastRegistration = distance.timestamp;
    }
  });
  lastTeamStats = teamStats;
  updateGeneralStats(teams, distances);
  updateCategoryResults(teamStats);
  console.log('[loadResults] Llamando a generateCharts con teamStats:', teamStats);
  generateCharts(teamStats);
  // Forzar redibujo de la categoría activa
  setTimeout(() => {
    const activeModal = document.querySelector('.modal-content-tab.active');
    if (activeModal) {
      const chartCanvas = activeModal.querySelector('canvas');
      if (chartCanvas && chartCanvas.chartInstance) {
        chartCanvas.chartInstance.update();
        console.log('[loadResults] Redibujando gráfica de la categoría activa');
      }
    }
  }, 100);
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
  const t = getTranslations();
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
                  ${t.viewHistoryButton || 'Ver historial'}
                </button>
              </div>
            `;
          }).join('')}
        `;
      }
    }
  });
}

// --- INICIO: showTeamHistory ---
function showTeamHistory(teamId) {
  const t = getTranslations();
  window.supabase.from('registrations').select('*').eq('id', teamId).then(({ data: teams }) => {
    const team = teams && teams[0];
    if (!team) {
      showNotification(t.teamNotFound || 'Equipo no encontrado', 'error');
      return;
    }
    window.supabase.from('distance').select('*').eq('team_id', teamId).order('date', { ascending: true }).then(({ data: distances }) => {
      let modal = document.getElementById('team-history-modal');
      if (!modal) {
        modal = document.createElement('div');
        modal.id = 'team-history-modal';
        modal.style.position = 'fixed';
        modal.style.top = '0';
        modal.style.left = '0';
        modal.style.width = '100vw';
        modal.style.height = '100vh';
        modal.style.background = 'rgba(0,0,0,0.4)';
        modal.style.zIndex = '10000';
        modal.style.display = 'flex';
        modal.style.alignItems = 'center';
        modal.style.justifyContent = 'center';
        document.body.appendChild(modal);
      }
      modal.innerHTML = `
        <div style="background:#fff;padding:32px 24px;border-radius:12px;max-width:400px;width:100%;box-shadow:0 4px 32px rgba(0,0,0,0.18);position:relative;color:#111;">
          <button onclick="document.getElementById('team-history-modal').remove()" style="position:absolute;top:12px;right:12px;font-size:1.5em;background:none;border:none;cursor:pointer;color:#111;">&times;</button>
          <h2 style="font-size:1.3em;font-weight:bold;margin-bottom:12px;color:#111;">${t.historyTitle || 'Historial de'} ${team.name}</h2>
          <ul style="max-height:300px;overflow-y:auto;padding:0;list-style:none;color:#111;">
            ${distances && distances.length > 0 ? distances.map(d => `<li style='margin-bottom:8px;color:#111;'>${d.date}: <b>${d.distance} ${d.unit}</b></li>`).join('') : `<li style="color:#111;">${t.noRegistrationsForTeam || 'No hay registros'}</li>`}
          </ul>
        </div>
      `;
    });
  });
}
window.showTeamHistory = showTeamHistory;
// --- FIN: showTeamHistory ---

// --- INICIO: generateCharts ---
function generateCharts(teamStats) {
  const t = getTranslations();
  const categories = {
    '1 pax (Run + Bike)': 'chart-1',
    '2 pax (Run + Bike)': 'chart-2',
    '3 pax (Run)': 'chart-3',
    '4 pax (Run)': 'chart-4',
    '5 pax (Run)': 'chart-5'
  };

  Object.entries(categories).forEach(([cat, canvasId]) => {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    
    if (canvas.chartInstance) {
      canvas.chartInstance.destroy();
    }

    const teams = Object.values(teamStats).filter(stat => stat.team.category === cat);
    if (teams.length === 0) {
      canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
      return;
    }
    
    teams.sort((a, b) => b.totalDistanceMi - a.totalDistanceMi);
    const labels = teams.map(stat => stat.team.name);
    const data = teams.map(stat => stat.totalDistanceMi);

    const ctx = canvas.getContext('2d');
    const gradient = ctx.createLinearGradient(0, 0, 0, 400); // Gradiente vertical
    gradient.addColorStop(0, 'rgba(54, 162, 235, 0.7)');
    gradient.addColorStop(1, 'rgba(153, 102, 255, 0.7)');

    const chart = new Chart(canvas, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: t.accumulatedMiles,
          data: data,
          backgroundColor: gradient,
          borderColor: 'rgba(153, 102, 255, 1)',
          borderWidth: 1
        }]
      },
      options: {
        indexAxis: 'y', // <-- Gráfica horizontal
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: { enabled: true },
          annotation: {
            annotations: {
              line1: {
                type: 'line',
                xMin: TARGET_MILES, // Eje X para el objetivo
                xMax: TARGET_MILES,
                borderColor: 'rgb(255, 99, 132)',
                borderWidth: 2,
                label: {
                  content: `Objectiu ${TARGET_MILES} milles`,
                  enabled: true,
                  position: 'end'
                }
              }
            }
          }
        },
        scales: {
          y: {
            ticks: { font: { size: 10 } }
          },
          x: {
            beginAtZero: true,
            title: {
              display: true,
              text: t.milesAxis || 'Millas'
            },
            ticks: {
              stepSize: 25
            }
          }
        }
      }
    });
    canvas.chartInstance = chart;
  });
}
window.generateCharts = generateCharts;
// --- FIN: generateCharts ---

// --- INICIO: loginAdmin ---
function loginAdmin() {
  const t = getTranslations();
  const password = document.getElementById('adminPassword').value;
  if (password === 'edu.mi') {
    isAdminLogged = true;
    document.getElementById('admin-login').classList.add('hidden');
    document.getElementById('admin-panel').classList.remove('hidden');
    showNotification(t.adminAccessGranted || 'Acceso de administrador concedido', 'success');
    document.getElementById('admin-export-button').classList.remove('hidden');
    document.getElementById('admin-reset-button').classList.remove('hidden');
    loadAdminPanel();
  } else {
    isAdminLogged = false;
    showNotification(t.adminWrongPassword || 'Contraseña incorrecta', 'error');
    document.getElementById('admin-panel').classList.add('hidden');
    document.getElementById('admin-login').classList.remove('hidden');
    const teamsList = document.getElementById('admin-teams-list');
    if (teamsList) teamsList.innerHTML = '';
    document.getElementById('admin-export-button').classList.add('hidden');
    document.getElementById('admin-reset-button').classList.add('hidden');
  }
}
window.loginAdmin = loginAdmin;
// --- FIN: loginAdmin ---

// --- INICIO: logoutAdmin ---
function logoutAdmin() {
  isAdminLogged = false;
  document.getElementById('admin-panel').classList.add('hidden');
  document.getElementById('admin-login').classList.remove('hidden');
  document.getElementById('adminPassword').value = '';
  document.getElementById('admin-export-button').classList.add('hidden');
  document.getElementById('admin-reset-button').classList.add('hidden');
  const teamsList = document.getElementById('admin-teams-list');
  if (teamsList) teamsList.innerHTML = '';
  showNotification(getTranslations().adminLogout || 'Sesión de administrador cerrada', 'info');
}
window.logoutAdmin = logoutAdmin;
// --- FIN: logoutAdmin ---

// --- INICIO: loadAdminPanel ---
async function loadAdminPanel() {
  const teamsList = document.getElementById('admin-teams-list');
  if (!teamsList) return;
  teamsList.innerHTML = '<div style="text-align:center;color:#888;">Cargando equipos...</div>';
  // Obtener equipos y registros
  const { data: teams } = await window.supabase.from('registrations').select('*');
  const { data: distances } = await window.supabase.from('distance').select('*');
  if (!teams || teams.length === 0) {
    teamsList.innerHTML = '<div style="text-align:center;color:#888;">No hay equipos registrados</div>';
    return;
  }
  // Renderizar cada equipo y sus registros
  teamsList.innerHTML = teams.map(team => {
    const teamDistances = distances.filter(d => d.team_id === team.id);
    return `
      <div class="admin-team-card" style="border:1px solid #ddd;border-radius:8px;padding:16px;margin-bottom:18px;background:#fff;">
        <div style="display:flex;align-items:center;justify-content:space-between;">
          <div>
            <input type="text" value="${team.name}" id="edit-team-name-${team.id}" style="font-weight:bold;font-size:1.1em;width:160px;" />
            <select id="edit-team-category-${team.id}" style="margin-left:8px;">
              <option${team.category==='1 pax (Run + Bike)'?' selected':''}>1 pax (Run + Bike)</option>
              <option${team.category==='2 pax (Run + Bike)'?' selected':''}>2 pax (Run + Bike)</option>
              <option${team.category==='3 pax (Run)'?' selected':''}>3 pax (Run)</option>
              <option${team.category==='4 pax (Run)'?' selected':''}>4 pax (Run)</option>
              <option${team.category==='5 pax (Run)'?' selected':''}>5 pax (Run)</option>
            </select>
            <button onclick="updateTeam(${team.id})" style="margin-left:8px;">💾</button>
            <button onclick="deleteTeam(${team.id})" style="margin-left:4px;color:#b91c1c;">🗑️</button>
          </div>
        </div>
        <div style="margin-top:12px;">
          <b>Registros:</b>
          <ul style="margin:0;padding:0;list-style:none;">
            ${teamDistances.map(reg => `
              <li style='margin-bottom:6px;'>
                <input type="date" value="${reg.date}" id="edit-reg-date-${reg.id}" style="width:120px;" />
                <input type="number" value="${reg.distance}" id="edit-reg-distance-${reg.id}" style="width:70px;" step="0.1" min="0" />
                <select id="edit-reg-unit-${reg.id}">
                  <option value="km"${reg.unit==='km'?' selected':''}>km</option>
                  <option value="mi"${reg.unit==='mi'?' selected':''}>mi</option>
                </select>
                <button onclick="updateRegistration(${reg.id})">💾</button>
                <button onclick="deleteRegistration(${reg.id})" style="color:#b91c1c;">🗑️</button>
              </li>
            `).join('')}
          </ul>
        </div>
      </div>
    `;
  }).join('');
}
window.loadAdminPanel = loadAdminPanel;
// --- FIN: loadAdminPanel ---

// Llamar a loadAdminPanel tras loginAdmin

// --- INICIO: updateTeam ---
async function updateTeam(teamId) {
  const t = getTranslations();
  const teamName = document.getElementById(`edit-team-name-${teamId}`).value;
  const teamCategory = document.getElementById(`edit-team-category-${teamId}`).value;
  if (!teamName || !teamCategory) {
    showNotification(t.teamFieldsRequired || 'Por favor completa todos los campos obligatorios.', 'error');
    return;
  }
  const { error } = await window.supabase.from('registrations').update({ name: teamName, category: teamCategory }).eq('id', teamId);
  if (error) {
    showNotification(t.adminTeamUpdateError || 'Error al actualizar el equipo', 'error');
    return;
  }
  showNotification(t.adminTeamUpdated || 'Equipo actualizado correctamente', 'success');
  await loadAdminPanel();
}
// --- FIN: updateTeam ---
window.updateTeam = updateTeam;
// --- INICIO: deleteTeam ---
async function deleteTeam(teamId) {
  const t = getTranslations();
  if (getConfirm('adminConfirmDelete', '¿Estás seguro que quieres eliminar este equipo? Esto también eliminará todos sus registros.')) {
    // Primero eliminar todos los registros de distancia asociados
    const { error: errorDist } = await window.supabase.from('distance').delete().eq('team_id', teamId);
    if (errorDist) {
      showNotification(t.adminRegDeleteError || 'Error al eliminar los registros del equipo', 'error');
      return;
    }
    // Luego eliminar el equipo
    const { error } = await window.supabase.from('registrations').delete().eq('id', teamId);
    if (error) {
      showNotification(t.adminTeamDeleteError || 'Error al eliminar el equipo', 'error');
      return;
    }
    showNotification(t.adminTeamDeleted || 'Equipo eliminado correctamente', 'success');
    await loadAdminPanel();
  }
}
// --- FIN: deleteTeam ---
window.deleteTeam = deleteTeam;
// --- INICIO: updateRegistration ---
async function updateRegistration(regId) {
  const t = getTranslations();
  const date = document.getElementById(`edit-reg-date-${regId}`).value;
  let distanceValue = document.getElementById(`edit-reg-distance-${regId}`).value;
  distanceValue = distanceValue.replace(',', '.');
  const distance = parseFloat(distanceValue);
  const unit = document.getElementById(`edit-reg-unit-${regId}`).value;
  if (!date || !distance || distance <= 0) {
    showNotification(t.distanceErrorFields || 'Por favor completa todos los campos correctamente.', 'error');
    return;
  }
  const selectedDate = new Date(date);
  const startDate = new Date('2025-08-04');
  const endDate = new Date('2025-08-13');
  if (selectedDate < startDate || selectedDate > endDate) {
    showNotification(t.distanceErrorDate || 'La fecha debe estar entre el 4 y 13 de agosto de 2025.', 'error');
    return;
  }
  const { error } = await window.supabase.from('distance').update({ date: date, distance: distance, unit: unit }).eq('id', regId);
  if (error) {
    showNotification(t.adminRegUpdateError || 'Error al actualizar el registro', 'error');
    return;
  }
  showNotification(t.adminRegUpdated || 'Registro actualizado correctamente', 'success');
  await loadAdminPanel();
}
// --- FIN: updateRegistration ---
window.updateRegistration = updateRegistration;
// --- INICIO: deleteRegistration ---
async function deleteRegistration(regId) {
  const t = getTranslations();
  if (getConfirm('adminConfirmDeleteReg', '¿Seguro que quieres eliminar este registro?')) {
    const { error } = await window.supabase.from('distance').delete().eq('id', regId);
    if (error) {
      showNotification(t.adminRegDeleteError || 'Error al eliminar el registro', 'error');
      return;
    }
    showNotification(t.adminRegDeleted || 'Registro eliminado correctamente', 'success');
    await loadAdminPanel();
  }
}
// --- FIN: deleteRegistration ---
window.deleteRegistration = deleteRegistration;

// --- INICIO: resetAllData ---
async function resetAllData() {
  const t = getTranslations();
  if (!isAdminLogged) {
    showNotification(t.adminRestricted || 'Acceso restringido solo para administradores.', 'error');
    return;
  }
  if (!getConfirm('adminConfirmReset', 'ATENCIÓN: Esto eliminará TODOS los equipos y registros. No se puede deshacer. ¿Estás seguro?')) return;
  const { error: errorDist } = await window.supabase.from('distance').delete().neq('id', 0);
  const { error: errorTeams } = await window.supabase.from('registrations').delete().neq('id', 0);
  if (errorDist || errorTeams) {
    showNotification(t.adminDataResetError || 'Error al resetear los datos', 'error');
    return;
  }
  showNotification(t.adminDataReset || 'Todos los datos han sido eliminados', 'success');
  await loadAdminPanel();
}
window.resetAllData = resetAllData;
// --- FIN: resetAllData ---

// --- INICIO: exportData ---
async function exportData() {
  const t = getTranslations();
  if (!isAdminLogged) {
    showNotification(t.adminRestricted || 'Acceso restringido solo para administradores.', 'error');
    return;
  }
  const { data: teams, error: errorTeams } = await window.supabase.from('registrations').select('*');
  const { data: distances, error: errorDist } = await window.supabase.from('distance').select('*');
  if (errorTeams || errorDist) {
    showNotification(t.adminDataExportError || 'Error al exportar los datos', 'error');
    return;
  }
  let csv = 'Tipo,ID,Equipo,Fecha,Distancia,Unidad,Categoría\n';
  teams.forEach(team => {
    csv += `Equipo,${team.id},${team.name},,,,'${team.category}'\n`;
  });
  distances.forEach(reg => {
    const team = teams.find(t => t.id === reg.team_id);
    csv += `Registro,${reg.id},${team ? team.name : ''},${reg.date},${reg.distance},${reg.unit},${team ? team.category : ''}\n`;
  });
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'bigfoot_dades.csv';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  showNotification(t.adminDataExported || 'Dades exportades correctament', 'success');
}
window.exportData = exportData;
// --- FIN: exportData ---

// --- INICIO: utilidades de traducción para notificaciones y popups ---
function getTranslations() {
  return translations[currentLanguage] || translations['ca'];
}
function getConfirm(msgKey, fallback) {
  const t = getTranslations();
  return confirm(t[msgKey] || fallback);
}
// --- FIN utilidades ---

// Ejemplo de uso en notificaciones y confirmaciones:
// showNotification(t.miClave, 'success');
// if (getConfirm('adminConfirmDelete', '¿Estás seguro...?')) { ... }

document.addEventListener('DOMContentLoaded', () => {
  const langSelect = document.getElementById('languageSelect');
  if (langSelect) {
    langSelect.value = currentLanguage;
    langSelect.onchange = function() {
      currentLanguage = langSelect.value;
      if (window.updateLanguage) window.updateLanguage();
      if (window.updateTabAndCategoryTexts) window.updateTabAndCategoryTexts();
    };
  }
});

function updateTabAndCategoryTexts() {
  const t = getTranslations();
  // Pestañas principales
  const tabIds = [
    ['tab-register-team', 'tabRegisterTeam'],
    ['tab-register', 'tabRegister'],
    ['tab-results', 'tabResults'],
    ['tab-admin', 'tabAdmin']
  ];
  tabIds.forEach(([elId, key]) => {
    const el = document.getElementById(elId);
    if (el && t[key]) el.innerHTML = `<span class="flex items-center">${el.innerHTML.match(/<svg[\s\S]*?<\/svg>/) ? el.innerHTML.match(/<svg[\s\S]*?<\/svg>/)[0] : ''}${t[key]}</span>`;
  });
  // Títulos y textos principales
  const textMap = [
    ['registerTeamTitle', 'registerTeamTitle'],
    ['joinChallengeText', 'joinChallengeText'],
    ['teamNameLabel', 'teamNameLabel'],
    ['teamCategoryLabel', 'teamCategoryLabel'],
    ['whatsappGroupLabel', 'whatsappGroupLabel'],
    ['whatsappGroupLinkText', 'whatsappGroupLinkText'],
    ['whatsappGroupInfo', 'whatsappGroupInfo'],
    ['whatsappGroupBenefit1', 'whatsappGroupBenefit1'],
    ['whatsappGroupBenefit2', 'whatsappGroupBenefit2'],
    ['whatsappGroupBenefit3', 'whatsappGroupBenefit3'],
    ['whatsappGroupBenefit4', 'whatsappGroupBenefit4'],
    ['registerTeamButton', 'registerTeamButton'],
    ['registerDistanceTitle', 'registerDistanceTitle'],
    ['registerProgressText', 'registerProgressText'],
    ['distanceTeamLabel', 'selectTeamLabel'],
    ['distanceTeamSelectOption', 'selectYourTeam'],
    ['distanceDateLabel', 'dateLabel'],
    ['distanceLabel', 'distanceLabel'],
    ['distanceUnitKmOption', 'unitKm'],
    ['distanceUnitMiOption', 'unitMi'],
    ['distanceRegisterButton', 'registerDistanceButton'],
    ['resultsTitle', 'resultsTitle'],
    ['viewProgressText', 'viewProgressText'],
    ['totalTeamsLabel', 'totalTeamsLabel'],
    ['totalDistanceLabel', 'totalDistanceLabel'],
    ['totalDistanceMiLabel', 'totalDistanceMiLabel'],
    ['totalRegistrationsLabel', 'totalRegistrationsLabel'],
    ['admin-title', 'adminTitle'],
    ['admin-subtitle', 'adminSubtitle'],
    ['admin-login-title', 'adminLoginTitle'],
    ['admin-login-button', 'adminLoginButton'],
    ['admin-panel-title', 'adminPanelTitle'],
    ['admin-logout-button', 'adminLogoutButton'],
    ['admin-teams-list-title', 'adminTeamsListTitle'],
    ['admin-export-button', 'adminExportButton'],
    ['admin-reset-button', 'adminResetButton']
  ];
  textMap.forEach(([elId, key]) => {
    const el = document.getElementById(elId);
    if (el && t[key]) el.textContent = t[key];
  });
  // Subtítulo de fechas en resultados
  const resultsSubtitle = document.getElementById('resultsSubtitle');
  if (resultsSubtitle && t.resultsSubtitle) resultsSubtitle.textContent = t.resultsSubtitle;
  // Subtítulo de fechas en cabecera principal
  const mainSubtitle = document.getElementById('mainSubtitle');
  if (mainSubtitle && t.mainSubtitle) mainSubtitle.textContent = t.mainSubtitle;
}

