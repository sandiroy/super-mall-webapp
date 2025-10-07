// Simple logging function
function logAction(action) {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${action}`);
  
  // Optionally save to a log file or Firebase
  // For demo, we just print to console
}

// Example: log when app loads
window.onload = () => {
  logAction("Super Mall WebApp Loaded");
};
