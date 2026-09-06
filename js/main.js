// Claves para localStorage
const TEAMS_KEY = 'bigfoot_teams';
const DISTANCES_KEY = 'bigfoot_distances';

// Objetivo del reto: desnivel positivo acumulado del equipo (metros)
const TARGET_ELEVATION_M = 25000;
const TEAM_CATEGORY = '4 pax (RUN)';
const ALLOWED_CATEGORIES = [TEAM_CATEGORY];

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
  { id: 1, name: 'Quartet Alpha', category: TEAM_CATEGORY, phones: ['+34 600 789 012', '+34 600 890 123', '+34 600 901 234', '+34 600 012 345'] },
  { id: 2, name: 'Els Corredors', category: TEAM_CATEGORY, phones: ['+34 600 234 567', '+34 600 345 678', '+34 600 456 789', '+34 600 567 890'] }
];

// Datos de ejemplo para desnivel (metros)
const initialDistances = [
  { id: 1, teamId: 1, date: '2026-09-11', distance: 850, unit: 'm', timestamp: '2026-09-11T10:00:00Z' },
  { id: 2, teamId: 1, date: '2026-09-12', distance: 620, unit: 'm', timestamp: '2026-09-12T09:30:00Z' },
  { id: 3, teamId: 2, date: '2026-09-11', distance: 1200, unit: 'm', timestamp: '2026-09-11T11:15:00Z' }
];

function getElevationMeters(record) {
  if (record.unit === 'km') return record.distance * 1000;
  if (record.unit === 'mi') return record.distance * 1609.34;
  return record.distance;
}

// Traducciones
const translations = {
  ca: {
    registerTeam: 'Registrar Equip',
    registerDistance: 'Registrar Desnivell',
    viewResults: 'Veure Resultats',
    teamName: 'Nom de l\'Equip',
    category: 'Categoria',
    joinWhatsappGroup: 'Unir-se al Grup de WhatsApp',
    selectTeam: 'Seleccionar Equip',
    date: 'Data',
    distance: 'Desnivell',
    registerTeamAndJoin: 'Registrar Equip',
    challengeResults: 'Resultats del Repte',
    teams: 'Equips',
    totalElevation: 'm de desnivell',
    registrations: 'Registres',
    progressTowards: 'Progrés cap a 25.000 m de desnivell',
    completed: 'Completat',
    remaining: 'Restant',
    history: 'Historial de Registres',
    team: 'Equip',
    joinChallenge: 'Uneix-te al repte Tor des Géants Challenge registrant el teu equip de 4 persones',
    registerProgress: 'Registra el desnivell positiu diari del teu equip al Tor des Géants Challenge',
    viewProgress: 'Visualitza el desnivell acumulat de tots els equips al Tor des Géants Challenge',
    teamRegisteredSuccess: 'Equip registrat amb èxit!',
    distanceRegisteredSuccess: 'Desnivell registrat amb èxit!',
    teamCategoryInfo: 'Equip de 4 persones (RUN)',
    whatsappGroupInfo: 'Al registrar-te, rebràs l\'enllaç per unir-te al grup oficial de WhatsApp del Tor des Géants Challenge on podràs:',
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
    joinChallengeText: "Uneix-te al repte Tor des Géants Challenge registrant el teu equip",
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
    totalDistanceLabel: "m de desnivell",
    totalRegistrationsLabel: "Registres",
    registerProgressText: "Registra el desnivell positiu diari del teu equip al Tor des Géants Challenge",
    viewProgressText: "Visualitza el desnivell acumulat de tots els equips al Tor des Géants Challenge",
    resultsTitle: "Resultats del Repte",
    registerDistanceTitle: "Registrar Desnivell",
    adminTitle: "Administració",
    adminSubtitle: "Gestió d'equips i dades del repte",
    adminLoginTitle: "Accés d'Administrador",
    adminPasswordPlaceholder: "Contrasenya d'administrador",
    adminLoginButton: "Entrar",
    adminPanelTitle: "Panel d'Administració",
    adminLogoutButton: "Sortir",
    adminTotalTeams: "Total Equips",
    adminTotalRegistrations: "Total Registres",
    adminTotalDistance: "Total Desnivell",
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
    tabRegister: 'Registrar Desnivell',
    tabResults: 'Veure Resultats',
    tabAdmin: 'Admin',
    cat4: '4 pax (RUN)',
    selectYourTeam: 'Selecciona el teu equip',
    distanceLabel: 'Desnivell positiu (m) *',
    distancePlaceholder: 'Ex: 850',
    elevationUnit: 'm',
    registerDistanceButton: 'Registrar Desnivell',
    selectTeamLabel: 'Seleccionar Equip *',
    dateLabel: 'Data *',
    distanceErrorFields: 'Si us plau completa tots els camps correctament.',
    distanceErrorDate: 'La data ha d\'estar entre l\'11 i el 20 de setembre de 2026.',
    distanceErrorFormat: 'Introdueix un número vàlid per al desnivell.',
    distanceRegisterError: 'Error en registrar el desnivell',
    distanceRegisterUnexpected: 'No s\'ha registrat el desnivell. Revisa la consola.',
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
    accumulatedElevation: 'Desnivell acumulat',
    elevationAxis: 'Metres',
    resultsSubtitle: "de l'11 al 20 de setembre",
    mainSubtitle: "De l'11 al 20 de setembre",
    dateRangeSubtitle: "De l'11 al 20 de setembre"
  },
  es: {
    registerTeam: 'Registrar Equipo',
    registerDistance: 'Registrar Desnivel',
    viewResults: 'Ver Resultados',
    teamName: 'Nombre del Equipo',
    category: 'Categoría',
    joinWhatsappGroup: 'Unirse al Grupo de WhatsApp',
    selectTeam: 'Seleccionar Equipo',
    date: 'Fecha',
    distance: 'Desnivel',
    registerTeamAndJoin: 'Registrar Equipo',
    challengeResults: 'Resultados del Reto',
    teams: 'Equipos',
    totalElevation: 'm de desnivel',
    registrations: 'Registros',
    progressTowards: 'Progreso hacia 25.000 m de desnivel',
    completed: 'Completado',
    remaining: 'Restante',
    history: 'Historial de Registros',
    team: 'Equipo',
    joinChallenge: 'Únete al Tor des Géants Challenge registrando tu equipo de 4 personas',
    registerProgress: 'Registra el desnivel positivo diario de tu equipo en el Tor des Géants Challenge',
    viewProgress: 'Visualiza el desnivel acumulado de todos los equipos en el Tor des Géants Challenge',
    teamRegisteredSuccess: '¡Equipo registrado con éxito!',
    distanceRegisteredSuccess: '¡Desnivel registrado con éxito!',
    teamCategoryInfo: 'Equipo de 4 personas (RUN)',
    whatsappGroupInfo: 'Al registrarte, recibirás el enlace para unirte al grupo oficial de WhatsApp del Tor des Géants Challenge donde podrás:',
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
    joinChallengeText: "Únete al Tor des Géants Challenge registrando tu equipo",
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
    totalDistanceLabel: "m de desnivel",
    totalRegistrationsLabel: "Registros",
    registerProgressText: "Registra el desnivel positivo diario de tu equipo en el Tor des Géants Challenge",
    viewProgressText: "Visualiza el desnivel acumulado de todos los equipos en el Tor des Géants Challenge",
    resultsTitle: "Resultados del Reto",
    registerDistanceTitle: "Registrar Desnivel",
    adminTitle: "Administración",
    adminSubtitle: "Gestión de equipos y datos del reto",
    adminLoginTitle: "Acceso de Administrador",
    adminPasswordPlaceholder: "Contraseña de administrador",
    adminLoginButton: "Entrar",
    adminPanelTitle: "Panel de Administración",
    adminLogoutButton: "Salir",
    adminTotalTeams: "Total Equipos",
    adminTotalRegistrations: "Total Registros",
    adminTotalDistance: "Total Desnivel",
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
    tabRegister: 'Registrar Desnivel',
    tabResults: 'Ver Resultados',
    tabAdmin: 'Admin',
    cat4: '4 pax (RUN)',
    selectYourTeam: 'Selecciona tu equipo',
    distanceLabel: 'Desnivel positivo (m) *',
    distancePlaceholder: 'Ej: 850',
    elevationUnit: 'm',
    registerDistanceButton: 'Registrar Desnivel',
    selectTeamLabel: 'Seleccionar Equipo *',
    dateLabel: 'Fecha *',
    distanceErrorFields: 'Por favor completa todos los campos correctamente.',
    distanceErrorDate: 'La fecha debe estar entre el 11 y el 20 de septiembre de 2026.',
    distanceErrorFormat: 'Introduce un número válido para el desnivel.',
    distanceRegisterError: 'Error al registrar el desnivel',
    distanceRegisterUnexpected: 'No se registró el desnivel. Revisa la consola.',
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
    accumulatedElevation: 'Desnivel acumulado',
    elevationAxis: 'Metros',
    resultsSubtitle: 'del 11 al 20 de septiembre',
    mainSubtitle: 'Del 11 al 20 de septiembre',
    dateRangeSubtitle: 'Del 11 al 20 de septiembre'
  },
  en: {
    registerTeam: 'Register Team',
    registerDistance: 'Register Elevation',
    viewResults: 'View Results',
    teamName: 'Team Name',
    category: 'Category',
    joinWhatsappGroup: 'Join WhatsApp Group',
    selectTeam: 'Select Team',
    date: 'Date',
    distance: 'Elevation',
    registerTeamAndJoin: 'Register Team',
    challengeResults: 'Challenge Results',
    teams: 'Teams',
    totalElevation: 'm elevation',
    registrations: 'Registrations',
    progressTowards: 'Progress towards 25,000 m elevation',
    completed: 'Completed',
    remaining: 'Remaining',
    history: 'Registration History',
    team: 'Team',
    joinChallenge: 'Join Tor des Géants Challenge by registering your team of 4 people',
    registerProgress: 'Register your team\'s daily positive elevation gain in Tor des Géants Challenge',
    viewProgress: 'View the accumulated elevation of all teams in Tor des Géants Challenge',
    teamRegisteredSuccess: 'Team registered successfully!',
    distanceRegisteredSuccess: 'Elevation registered successfully!',
    teamCategoryInfo: 'Team of 4 people (RUN)',
    whatsappGroupInfo: 'When you register, you will receive the link to join the official WhatsApp group of Tor des Géants Challenge where you can:',
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
    joinChallengeText: "Join Tor des Géants Challenge by registering your team",
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
    totalDistanceLabel: "m elevation",
    totalRegistrationsLabel: "Entries",
    registerProgressText: "Register your team's daily positive elevation gain in Tor des Géants Challenge",
    viewProgressText: "View the accumulated elevation of all teams in Tor des Géants Challenge",
    resultsTitle: "Challenge Results",
    registerDistanceTitle: "Register Elevation",
    adminTitle: "Administration",
    adminSubtitle: "Team and challenge data management",
    adminLoginTitle: "Administrator Access",
    adminPasswordPlaceholder: "Administrator password",
    adminLoginButton: "Enter",
    adminPanelTitle: "Administration Panel",
    adminLogoutButton: "Logout",
    adminTotalTeams: "Total Teams",
    adminTotalRegistrations: "Total Registrations",
    adminTotalDistance: "Total Elevation",
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
    tabRegister: 'Register Elevation',
    tabResults: 'View Results',
    tabAdmin: 'Admin',
    cat4: '4 pax (RUN)',
    selectYourTeam: 'Select your team',
    distanceLabel: 'Positive elevation (m) *',
    distancePlaceholder: 'Ex: 850',
    elevationUnit: 'm',
    registerDistanceButton: 'Register Elevation',
    selectTeamLabel: 'Select Team *',
    dateLabel: 'Date *',
    distanceErrorFields: 'Please complete all fields correctly.',
    distanceErrorDate: 'The date must be between September 11 and 20, 2026.',
    distanceErrorFormat: 'Enter a valid number for elevation.',
    distanceRegisterError: 'Error registering elevation',
    distanceRegisterUnexpected: 'Elevation was not registered. Check the console.',
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
    accumulatedElevation: 'Accumulated elevation',
    elevationAxis: 'Meters',
    resultsSubtitle: 'September 11 to 20',
    mainSubtitle: 'September 11 to 20',
    dateRangeSubtitle: 'September 11 to 20'
  },
  pt: {
    registerTeam: 'Registrar Equipa',
    registerDistance: 'Registrar Distância',
    viewResults: 'Ver Resultados',
    teamName: 'Nome da Equipa',
    category: 'Categoria',
    joinWhatsappGroup: 'Juntar-se ao Grupo de WhatsApp',
    selectTeam: 'Selecionar Equipa',
    date: 'Data',
    distance: 'Distância',
    kilometers: 'Km',
    miles: 'Milhas',
    registerTeamAndJoin: 'Registrar Equipa',
    registerDistance: 'Registrar Distância',
    challengeResults: 'Resultados do Desafio',
    teams: 'Equipas',
    totalKm: 'km totais',
    totalMiles: 'milhas totais',
    registrations: 'Registos',
    progressTowards: 'Progresso para 250 milhas',
    completed: 'Concluído',
    remaining: 'Restante',
    history: 'Histórico de Registos',
    units: 'Unidades',
    team: 'Equipa',
    totalKm: 'km totais',
    totalMiles: 'milhas totais',
    registrations: 'Registos',
    joinChallenge: 'Junte-se ao Tor des Géants Challenge registando a sua equipa',
    registerProgress: 'Registe o seu progresso diário no Tor des Géants Challenge',
    viewProgress: 'Veja o progresso de todas as equipas no Tor des Géants Challenge',
    teamRegisteredSuccess: 'Equipa registada com sucesso',
    distanceRegisteredSuccess: 'Distância registada com sucesso',
    whatsappGroupInfo: 'Ao registar-se, receberá o link para se juntar ao grupo oficial do WhatsApp do Tor des Géants Challenge onde poderá:',
    whatsappGroupBenefit1: 'Partilhar o seu progresso diário',
    whatsappGroupBenefit2: 'Ver as atualizações de outros participantes',
    whatsappGroupBenefit3: 'Receber motivação e conselhos',
    whatsappGroupBenefit4: 'Participar na comunidade do desafio',
    historyTitle: 'Histórico de Registos',
    historyDescription: 'Clique numa equipa para ver o seu histórico completo',
    totalRegistrations: 'registos',
    totalDistance: 'Total',
    noTeamsRegistered: 'Ainda não há equipas registadas',
    noRegistrationsForTeam: 'Não há registos para esta equipa',
    clickTeamForHistory: 'Clique numa equipa para ver o seu histórico completo',
    registerTeamTitle: 'Registrar Equipa',
    joinChallengeText: 'Junte-se ao Tor des Géants Challenge registando a sua equipa',
    teamNameLabel: 'Nome da Equipa *',
    teamCategoryLabel: 'Categoria *',
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
    resultsSubtitle: 'de 11 a 20 de setembro',
    mainSubtitle: 'De 11 a 20 de setembro',
    dateRangeSubtitle: 'De 11 a 20 de setembro'
  }
};

// Corrección de traducción en portugués para la pestaña de registro de desnivel
translations.pt.registerDistanceTitle = 'Registrar Desnível';
translations.pt.registerProgressText = 'Registe o desnível positivo diário da sua equipa no Tor des Géants Challenge';
translations.pt.registerDistance = 'Registrar Desnível';
translations.pt.tabRegister = 'Registrar Desnível';
translations.pt.registerDistanceButton = 'Registrar Desnível';
translations.pt.distanceLabel = 'Desnível positivo (m) *';
translations.pt.distanceRegisteredSuccess = 'Desnível registado com sucesso';
translations.pt.teamCategoryInfo = 'Equipa de 4 pessoas (RUN)';

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
  translations[lang].teamCategoryInvalid = translations[lang].teamCategoryInvalid || {
    ca: 'Només es permeten equips de 4 persones en modalitat RUN.',
    es: 'Solo se permiten equipos de 4 personas en modalidad RUN.',
    en: 'Only teams of 4 people in RUN modality are allowed.',
    pt: 'Só são permitidas equipas de 4 pessoas na modalidade RUN.'
  }[lang];
});

// Añadir claves de traducción para categorías/modalidades y pestañas principales
Object.keys(translations).forEach(lang => {
  translations[lang].tabRegisterTeam = translations[lang].tabRegisterTeam || {
    ca: 'Registrar Equip', es: 'Registrar Equipo', en: 'Register Team', pt: 'Registrar Equipa'
  }[lang];
  translations[lang].tabRegister = translations[lang].tabRegister || {
    ca: 'Registrar Desnivell', es: 'Registrar Desnivel', en: 'Register Elevation', pt: 'Registrar Desnível'
  }[lang];
  translations[lang].tabResults = translations[lang].tabResults || {
    ca: 'Veure Resultats', es: 'Ver Resultados', en: 'View Results', pt: 'Ver Resultados'
  }[lang];
  translations[lang].tabAdmin = translations[lang].tabAdmin || {
    ca: 'Admin', es: 'Admin', en: 'Admin', pt: 'Admin'
  }[lang];
  translations[lang].cat4 = translations[lang].cat4 || {
    ca: '4 pax (RUN)', es: '4 pax (RUN)', en: '4 pax (RUN)', pt: '4 pax (RUN)'
  }[lang];
  translations[lang].teamCategoryInfo = translations[lang].teamCategoryInfo || {
    ca: 'Equip de 4 persones (RUN)', es: 'Equipo de 4 personas (RUN)', en: 'Team of 4 people (RUN)', pt: 'Equipa de 4 pessoas (RUN)'
  }[lang];
});

// Añadir claves de traducción para la pestaña de desnivel
Object.keys(translations).forEach(lang => {
  translations[lang].selectYourTeam = translations[lang].selectYourTeam || {
    ca: 'Selecciona el teu equip', es: 'Selecciona tu equipo', en: 'Select your team', pt: 'Seleciona a tua equipa'
  }[lang];
  translations[lang].distanceLabel = translations[lang].distanceLabel || {
    ca: 'Desnivell positiu (m) *', es: 'Desnivel positivo (m) *', en: 'Positive elevation (m) *', pt: 'Desnível positivo (m) *'
  }[lang];
  translations[lang].distancePlaceholder = translations[lang].distancePlaceholder || {
    ca: 'Ex: 850', es: 'Ej: 850', en: 'Ex: 850', pt: 'Ex: 850'
  }[lang];
  translations[lang].elevationUnit = translations[lang].elevationUnit || {
    ca: 'm', es: 'm', en: 'm', pt: 'm'
  }[lang];
  translations[lang].registerDistanceButton = translations[lang].registerDistanceButton || {
    ca: 'Registrar Desnivell', es: 'Registrar Desnivel', en: 'Register Elevation', pt: 'Registrar Desnível'
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
    ca: 'Desnivell positiu (m) *', es: 'Desnivel positivo (m) *', en: 'Positive elevation (m) *', pt: 'Desnível positivo (m) *'
  }[lang];
  translations[lang].distanceErrorFields = translations[lang].distanceErrorFields || {
    ca: 'Si us plau completa tots els camps correctament.', es: 'Por favor completa todos los campos correctamente.', en: 'Please complete all fields correctly.', pt: 'Por favor preencha todos os campos corretamente.'
  }[lang];
  translations[lang].distanceErrorDate = translations[lang].distanceErrorDate || {
    ca: 'La data ha d\'estar entre l\'11 i el 20 de setembre de 2026.',
    es: 'La fecha debe estar entre el 11 y el 20 de septiembre de 2026.',
    en: 'The date must be between September 11 and 20, 2026.',
    pt: 'A data deve estar entre 11 e 20 de setembro de 2026.'
  }[lang];
});

function updateDistanceTabTexts() {
  const t = translations[currentLanguage] || translations['ca'];
  const teamLabel = document.getElementById('distanceTeamLabel');
  if (teamLabel) teamLabel.textContent = t.selectTeamLabel;
  const teamSelectOption = document.getElementById('distanceTeamSelectOption');
  if (teamSelectOption) teamSelectOption.textContent = t.selectYourTeam;
  const dateLabel = document.getElementById('distanceDateLabel');
  if (dateLabel) dateLabel.textContent = t.dateLabel;
  const distanceLabel = document.getElementById('distanceLabel');
  if (distanceLabel) distanceLabel.textContent = t.distanceLabel;
  const distanceInput = document.getElementById('distanceInput');
  if (distanceInput) distanceInput.placeholder = t.distancePlaceholder;
  const elevationUnitLabel = document.getElementById('elevationUnitLabel');
  if (elevationUnitLabel) elevationUnitLabel.textContent = t.elevationUnit || 'm';
  const btn = document.getElementById('distanceRegisterButton');
  if (btn) btn.textContent = t.registerDistanceButton;
  const teamSelect = document.getElementById('teamSelect');
  if (teamSelect && teamSelect.options.length > 0) {
    teamSelect.options[0].text = t.selectYourTeam;
  }
  const categoryText = document.getElementById('selectedTeamCategory');
  if (categoryText) categoryText.remove();
  if (teamSelect) {
    teamSelect.insertAdjacentHTML('afterend', '<span id="selectedTeamCategory" style="margin-left:12px;font-size:0.95em;color:#555;"></span>');
  }
  const dateRangeSubtitle = document.getElementById('dateRangeSubtitle');
  if (dateRangeSubtitle && t.dateRangeSubtitle) dateRangeSubtitle.textContent = t.dateRangeSubtitle;
  const teamCategoryInfo = document.getElementById('teamCategoryInfo');
  if (teamCategoryInfo && t.teamCategoryInfo) teamCategoryInfo.textContent = t.teamCategoryInfo;
  const resultsCategoryTitle = document.getElementById('resultsCategoryTitle');
  if (resultsCategoryTitle && t.cat4) resultsCategoryTitle.textContent = t.cat4;
}

// Modificar los mensajes de error/éxito en handleDistanceSubmit
async function handleDistanceSubmit(e) {
  e.preventDefault();
  const t = getTranslations();
  const teamId = document.getElementById('teamSelect').value;
  const date = document.getElementById('dateInput').value;
  let elevationValue = document.getElementById('distanceInput').value;
  elevationValue = elevationValue.replace(/['',]/g, '.');
  const elevation = parseFloat(elevationValue);
  if (isNaN(elevation) || !isFinite(elevation)) {
    showNotification(t.distanceErrorFormat || 'Introduce un número válido para el desnivel.', 'error');
    return;
  }
  if (!teamId || !date || !elevation || elevation <= 0) {
    showNotification(t.distanceErrorFields || 'Por favor completa todos los campos correctamente.', 'error');
    return;
  }
  const selectedDate = new Date(date);
  const startDate = new Date('2026-09-11');
  const endDate = new Date('2026-09-20');
  if (selectedDate < startDate || selectedDate > endDate) {
    showNotification(t.distanceErrorDate || 'La fecha debe estar entre el 11 y el 20 de septiembre de 2026.', 'error');
    return;
  }
  const newRecord = {
    team_id: parseInt(teamId),
    date: date,
    distance: elevation,
    unit: 'm',
    timestamp: new Date().toISOString()
  };
  const { error, data } = await window.supabase.from('distance').insert([newRecord]).select();
  if (error) {
    showNotification(t.distanceRegisterError || 'Error al registrar el desnivel', 'error');
    return;
  }
  if (!data || (Array.isArray(data) && data.length === 0)) {
    showNotification(t.distanceRegisterUnexpected || 'No se insertó el desnivel. Revisa la consola.', 'error');
    return;
  }
  document.getElementById('distanceForm').reset();
  showNotification(t.distanceRegisteredSuccess || '¡Desnivel registrado con éxito!', 'success');
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
  try {
    const teamName = document.getElementById('teamName').value.trim();
    const teamCategory = document.getElementById('teamCategory').value;
    if (!teamName || !teamCategory) {
      showNotification(t.teamFieldsRequired || 'Por favor completa todos los campos obligatorios.', 'error');
      return;
    }
    if (!ALLOWED_CATEGORIES.includes(teamCategory)) {
      showNotification(t.teamCategoryInvalid || 'Solo se permiten equipos de 4 personas en modalidad RUN.', 'error');
      return;
    }
    // Verificar que no exista un equipo con el mismo nombre
    const { data: teams, error: teamsError } = await window.supabase.from('registrations').select('name');
    if (teamsError) {
      console.error('[handleTeamSubmit] Error consultando equipos:', teamsError);
      showNotification(`${t.teamRegisterError || 'Error al registrar el equipo'}: ${teamsError.message}`, 'error');
      return;
    }
    const existingTeam = (teams || []).find(team => team.name.toLowerCase() === teamName.toLowerCase());
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
      console.error('[handleTeamSubmit] Error insertando equipo:', error);
      showNotification(`${t.teamRegisterError || 'Error al registrar el equipo'}: ${error.message}`, 'error');
      return;
    }
    if (!data || (Array.isArray(data) && data.length === 0)) {
      showNotification(t.teamRegisterUnexpected || 'No se insertó el equipo. Revisa la consola.', 'error');
      return;
    }
    await loadTeams();
    document.getElementById('teamForm').reset();
    showNotification(t.teamRegisteredSuccess || '¡Equipo registrado con éxito!', 'success');
  } catch (err) {
    console.error('[handleTeamSubmit] Error inesperado:', err);
    showNotification(t.teamRegisterUnexpected || 'No se insertó el equipo. Revisa la consola.', 'error');
  }
}
window.handleTeamSubmit = handleTeamSubmit;

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
      totalElevationM: 0,
      registrations: 0,
      lastRegistration: null
    };
  });
  distances.forEach(record => {
    const teamStat = teamStats[record.team_id];
    if (teamStat) {
      teamStat.totalElevationM += getElevationMeters(record);
      teamStat.registrations++;
      teamStat.lastRegistration = record.timestamp;
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
  const totalElevationM = distances.reduce((sum, d) => sum + getElevationMeters(d), 0);
  const totalRegistrations = distances.length;

  const totalTeamsEl = document.getElementById('totalTeams');
  const totalDistanceEl = document.getElementById('totalDistance');
  const totalRegistrationsEl = document.getElementById('totalRegistrations');

  if (totalTeamsEl) totalTeamsEl.textContent = totalTeams;
  if (totalDistanceEl) totalDistanceEl.textContent = Math.round(totalElevationM).toLocaleString();
  if (totalRegistrationsEl) totalRegistrationsEl.textContent = totalRegistrations;

  const t = translations[currentLanguage] || translations['ca'];
  const statsLabels = document.querySelectorAll('.stats-label');
  if (statsLabels.length >= 3) {
    statsLabels[0].textContent = t.teams;
    statsLabels[1].textContent = t.totalElevation || t.totalDistanceLabel;
    statsLabels[2].textContent = t.registrations;
  }

  console.log('Estadísticas actualizadas:', { totalTeams, totalElevationM, totalRegistrations });
}

function updateCategoryResults(teamStats) {
  const t = getTranslations();
  const categories = {
    [TEAM_CATEGORY]: 'category-4'
  };

  const teamsByCategory = {};

  Object.values(teamStats).forEach(stat => {
    const category = stat.team.category;
    if (!teamsByCategory[category]) {
      teamsByCategory[category] = [];
    }
    teamsByCategory[category].push(stat);
  });

  Object.keys(teamsByCategory).forEach(category => {
    teamsByCategory[category].sort((a, b) => b.totalElevationM - a.totalElevationM);
  });

  Object.entries(categories).forEach(([categoryName, elementId]) => {
    const container = document.getElementById(elementId);
    if (container) {
      const teams = teamsByCategory[categoryName] || [];
      if (teams.length === 0) {
        container.innerHTML = '<p class="text-gray-500 text-center py-4">' + t.noTeamsRegistered + '</p>';
      } else {
        container.innerHTML = `
          ${teams.map((stat, index) => {
            const rankClass = index < 3 ? `rank-${index + 1}` : '';
            const rankIcon = index < 3 ? ['🥇', '🥈', '🥉'][index] : '';
            const progressPercent = Math.min((stat.totalElevationM / TARGET_ELEVATION_M) * 100, 100);
            const teamId = stat.team.id;
            return `
              <div class="stats-mini-square ${rankClass}">
                <span class="medal-emoji mb-1">${rankIcon}</span>
                <div class="font-semibold text-base text-center truncate">${stat.team.name}</div>
                <div class="text-xs text-gray-500 text-center mb-1">${stat.registrations} ${t.registrations}</div>
                <div class="text-lg font-bold text-blue-600 text-center">${Math.round(stat.totalElevationM).toLocaleString()} m</div>
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
            ${distances && distances.length > 0 ? distances.map(d => `<li style='margin-bottom:8px;color:#111;'>${d.date}: <b>${Math.round(getElevationMeters(d)).toLocaleString()} m</b></li>`).join('') : `<li style="color:#111;">${t.noRegistrationsForTeam || 'No hay registros'}</li>`}
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
    [TEAM_CATEGORY]: 'chart-4'
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

    teams.sort((a, b) => b.totalElevationM - a.totalElevationM);
    const labels = teams.map(stat => stat.team.name);
    const data = teams.map(stat => stat.totalElevationM);

    const ctx = canvas.getContext('2d');
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, 'rgba(54, 162, 235, 0.7)');
    gradient.addColorStop(1, 'rgba(153, 102, 255, 0.7)');

    const targetLabel = currentLanguage === 'ca'
      ? `Objectiu ${TARGET_ELEVATION_M.toLocaleString()} m`
      : currentLanguage === 'es'
        ? `Objetivo ${TARGET_ELEVATION_M.toLocaleString()} m`
        : `Target ${TARGET_ELEVATION_M.toLocaleString()} m`;

    const chart = new Chart(canvas, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: t.accumulatedElevation || 'Desnivel acumulado',
          data: data,
          backgroundColor: gradient,
          borderColor: 'rgba(153, 102, 255, 1)',
          borderWidth: 1
        }]
      },
      options: {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: { enabled: true },
          annotation: {
            annotations: {
              line1: {
                type: 'line',
                xMin: TARGET_ELEVATION_M,
                xMax: TARGET_ELEVATION_M,
                borderColor: 'rgb(255, 99, 132)',
                borderWidth: 2,
                label: {
                  content: targetLabel,
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
              text: t.elevationAxis || 'Metres'
            },
            ticks: {
              stepSize: 2500
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
            <input type="hidden" id="edit-team-category-${team.id}" value="${TEAM_CATEGORY}" />
            <span style="margin-left:8px;font-size:0.9em;color:#555;">${TEAM_CATEGORY}</span>
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
                <input type="number" value="${Math.round(getElevationMeters(reg))}" id="edit-reg-distance-${reg.id}" style="width:90px;" step="1" min="0" />
                <span style="margin-left:4px;">m</span>
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
  if (!ALLOWED_CATEGORIES.includes(teamCategory)) {
    showNotification(t.teamCategoryInvalid || 'Solo se permiten equipos de 4 personas en modalidad RUN.', 'error');
    return;
  }
  const { error } = await window.supabase.from('registrations').update({ name: teamName, category: TEAM_CATEGORY }).eq('id', teamId);
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
  let elevationValue = document.getElementById(`edit-reg-distance-${regId}`).value;
  elevationValue = elevationValue.replace(',', '.');
  const elevation = parseFloat(elevationValue);
  if (!date || !elevation || elevation <= 0) {
    showNotification(t.distanceErrorFields || 'Por favor completa todos los campos correctamente.', 'error');
    return;
  }
  const selectedDate = new Date(date);
  const startDate = new Date('2026-09-11');
  const endDate = new Date('2026-09-20');
  if (selectedDate < startDate || selectedDate > endDate) {
    showNotification(t.distanceErrorDate || 'La fecha debe estar entre el 11 y el 20 de septiembre de 2026.', 'error');
    return;
  }
  const { error } = await window.supabase.from('distance').update({ date: date, distance: elevation, unit: 'm' }).eq('id', regId);
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
  let csv = 'Tipo,ID,Equipo,Fecha,Desnivel (m),Categoría\n';
  teams.forEach(team => {
    csv += `Equipo,${team.id},${team.name},,,,'${team.category}'\n`;
  });
  distances.forEach(reg => {
    const team = teams.find(t => t.id === reg.team_id);
    csv += `Registro,${reg.id},${team ? team.name : ''},${reg.date},${Math.round(getElevationMeters(reg))},${team ? team.category : ''}\n`;
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
  if (window.updateLanguage) window.updateLanguage();
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
    ['teamCategoryInfo', 'teamCategoryInfo'],
    ['registerTeamButton', 'registerTeamButton'],
    ['registerDistanceTitle', 'registerDistanceTitle'],
    ['registerProgressText', 'registerProgressText'],
    ['distanceTeamLabel', 'selectTeamLabel'],
    ['distanceTeamSelectOption', 'selectYourTeam'],
    ['distanceDateLabel', 'dateLabel'],
    ['distanceLabel', 'distanceLabel'],
    ['elevationUnitLabel', 'elevationUnit'],
    ['distanceRegisterButton', 'registerDistanceButton'],
    ['resultsTitle', 'resultsTitle'],
    ['resultsCategoryTitle', 'cat4'],
    ['viewProgressText', 'viewProgressText'],
    ['totalTeamsLabel', 'totalTeamsLabel'],
    ['totalDistanceLabel', 'totalDistanceLabel'],
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

