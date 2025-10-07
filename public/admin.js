// ===== Utility: Log Actions =====
function logAction(action) {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${action}`);
}

// ===== Auth State Check =====
auth.onAuthStateChanged((user) => {
  if (!user) {
    window.location.href = "login.html"; // not logged in
  } else {
    // Verify admin privileges
    firebase.database().ref("admins/" + user.uid).once("value")
      .then((snapshot) => {
        if (snapshot.exists()) {
          logAction(`Admin logged in: ${user.email}`);
        } else {
          alert("Access denied: You are not an admin.");
          logAction(`Unauthorized access attempt by: ${user.email}`);
          auth.signOut();
          window.location.href = "login.html";
        }
      })
      .catch((error) => {
        console.error("Error verifying admin:", error);
        alert("Error verifying admin privileges.");
        auth.signOut();
        window.location.href = "login.html";
      });
  }
});

// ===== Logout =====
document.getElementById("logoutBtn").addEventListener("click", () => {
  auth.signOut().then(() => {
    logAction("User logged out");
    window.location.href = "login.html";
  });
});

// ===== Handle Shop Creation =====
document.getElementById("shopForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const shopName = document.getElementById("shopName").value.trim();
  const category = document.getElementById("category").value.trim();
  const floor = parseInt(document.getElementById("floor").value.trim());
  const offer = document.getElementById("shopOffer").value.trim();
  const image = document.getElementById("shopImage").value.trim();

  if (!shopName || !category || isNaN(floor)) {
    alert("Please fill in all required fields");
    return;
  }

  const shopData = {
    name: shopName,
    category: category,
    floor: floor,
    offer: offer || "No current offers",
    image: image || "https://via.placeholder.com/300x200?text=No+Image"
  };

  firebase.database().ref("shops").push(shopData)
    .then(() => {
      logAction(`Shop created: ${shopName}`);
      alert("Shop added successfully!");
      document.getElementById("shopForm").reset();
    })
    .catch((error) => {
      console.error("Error adding shop:", error);
      logAction(`Error adding shop: ${error.message}`);
    });
});

// ===== Fetch and Display Shops =====
firebase.database().ref("shops").on("value", (snapshot) => {
  const shopList = document.getElementById("shopList");
  shopList.innerHTML = "";

  snapshot.forEach((child) => {
    const shop = child.val();
    const li = document.createElement("li");

    li.innerHTML = `
      <strong>${shop.name}</strong> - ${shop.category} (Floor ${shop.floor})<br>
      Offer: ${shop.offer || "No current offers"}<br>
      <img src="${shop.image || 'https://via.placeholder.com/100x60?text=No+Image'}" width="100" style="margin-top:5px;border-radius:5px;">
      <hr>
    `;

    shopList.appendChild(li);
  });

  logAction("Shop list updated");
});
