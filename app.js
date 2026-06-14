// NayePankh Volunteer & Community Connect Platform
// Core Logic, Router, and Interaction Layer

// ========================================================
// 1. MOCK DATABASE AND INITIAL STATE
// ========================================================

const STORAGE_PREFIX = "nayepankh_v1_";

const DEFAULT_CAMPAIGNS = [
  {
    id: "camp-1",
    title: "Kanpur Slum Education Drive",
    description: "Join us in teaching foundational arithmetic and language skills to primary school kids in Kanpur slum zones. We provide course material and volunteer guides.",
    category: "education",
    location: "kanpur",
    date: "June 20, 2026",
    slotsTotal: 15,
    slotsLeft: 8,
    skills: "Basic teaching, Communication",
    bannerUrl: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: "camp-2",
    title: "Lucknow Weekend Cleanliness Campaign",
    description: "Participate in cleaning public park spaces and distributing eco-friendly garbage bins in Lucknow. Promote trash segregation awareness.",
    category: "environment",
    location: "lucknow",
    date: "June 25, 2026",
    slotsTotal: 25,
    slotsLeft: 14,
    skills: "Physical fitness, Outreach",
    bannerUrl: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: "camp-3",
    title: "Delhi Food Distribution Drive",
    description: "Help pack and distribute cooked meals to destitute families near railway stations. Ensure hygienic packaging and social distancing norms.",
    category: "shelter",
    location: "delhi",
    date: "June 29, 2026",
    slotsTotal: 30,
    slotsLeft: 19,
    skills: "Meal packaging, Logistics",
    bannerUrl: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: "camp-4",
    title: "Eco Green Plantation Kanpur",
    description: "Planting saplings and installing tree protectors along highway corridors in Kanpur. Help make Kanpur green and pollution-free.",
    category: "environment",
    location: "kanpur",
    date: "July 02, 2026",
    slotsTotal: 20,
    slotsLeft: 12,
    skills: "Gardening, SAP handling",
    bannerUrl: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: "camp-5",
    title: "Digital Literacy Workshop for Youth",
    description: "Introduce basic computer usage, web safety, and coding fundamentals to underprivileged youngsters. Laptops will be provided at the center.",
    category: "education",
    location: "lucknow",
    date: "July 08, 2026",
    slotsTotal: 12,
    slotsLeft: 5,
    skills: "Basic IT knowledge, Patience",
    bannerUrl: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=400&q=80"
  }
];

const DEFAULT_POSTS = [
  {
    id: "post-1",
    username: "Rohan Kapoor",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80",
    date: "2 hours ago",
    content: "Had an amazing time teaching math at the Kanpur Slum Drive this morning! The kids were so energetic and quick to learn. Check out our classroom group photo! 📚✨",
    image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=600&q=80",
    likes: 24,
    likedByMe: false,
    badge: "Education Champion"
  },
  {
    id: "post-2",
    username: "Priya Malhotra",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80",
    date: "Yesterday",
    content: "Successfully finished planting 15 saplings in Lucknow greenbelt area today! Small steps lead to a cleaner and greener environment. Highly recommend joining next week! 🌱💚",
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=600&q=80",
    likes: 18,
    likedByMe: true,
    badge: "Community Builder"
  }
];

const DEFAULT_BADGES = [
  { id: "badge-1", emoji: "🏅", title: "First Volunteer Activity", desc: "Earned by completing or registering for your very first volunteer event.", unlocked: true },
  { id: "badge-2", emoji: "🌱", title: "Community Builder", desc: "Join 3 different campaigns across multiple categories.", unlocked: true },
  { id: "badge-3", emoji: "📚", title: "Education Champion", desc: "Contribute at least 20 hours to educational support drives.", unlocked: true },
  { id: "badge-4", emoji: "🌟", title: "Impact Leader", desc: "Initiate/Co-lead a campaign and gather 10+ registrations.", unlocked: false },
  { id: "badge-5", emoji: "💯", title: "100 Hours Contributor", desc: "Log a lifetime contribution of 100+ hours with NayePankh.", unlocked: false }
];

const DEFAULT_LEADERBOARD = [
  { name: "Rahul Verma", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&q=80", hours: 92, rank: 1 },
  { name: "Sneha Patel", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=80&q=80", hours: 78, rank: 2 },
  { name: "Amit Gupta", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=80&q=80", hours: 64, rank: 3 },
  { name: "Anya Sharma (You)", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80", hours: 45, rank: 4 }
];

const DEFAULT_QUEUE = [
  { id: "q-1", name: "Siddharth Sen", campaign: "Kanpur Slum Education Drive", status: "Pending approval" },
  { id: "q-2", name: "Nikita Joshi", campaign: "Delhi Food Distribution Drive", status: "Pending approval" },
  { id: "q-3", name: "Arjun Mehta", campaign: "Eco Green Plantation Kanpur", status: "Pending approval" }
];

// Helper state storage manager
function loadData(key, fallback) {
  const val = localStorage.getItem(STORAGE_PREFIX + key);
  return val ? JSON.parse(val) : fallback;
}

function saveData(key, data) {
  localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(data));
}

// Initializing state variables
let state = {
  currentRole: loadData("role", "volunteer"), // default is volunteer simulation
  campaigns: loadData("campaigns", DEFAULT_CAMPAIGNS),
  posts: loadData("posts", DEFAULT_POSTS),
  badges: loadData("badges", DEFAULT_BADGES),
  leaderboard: loadData("leaderboard", DEFAULT_LEADERBOARD),
  queue: loadData("queue", DEFAULT_QUEUE),
  userStats: loadData("user_stats", { hours: 45, events: 6, campaigns: 3, certificates: 2 }),
  userRegistrations: loadData("user_regs", ["camp-1"]) // initially registered for Slum Education
};

// ========================================================
// 2. SPA ROUTER
// ========================================================

const ROUTES = {
  "#home": "landing-view",
  "#dashboard": "dashboard-view",
  "#explore": "discovery-view",
  "#profile": "profile-view",
  "#achievements": "achievements-view",
  "#wall": "wall-view",
  "#certificates": "certificates-view"
};

// Route protection rules based on role
function getAllowedRoute(hash, role) {
  // If hash is empty or not in route list, fallback
  if (!hash || !ROUTES[hash]) {
    return role === "guest" ? "#home" : "#dashboard";
  }
  
  if (role === "guest") {
    // Guest can only access Home, Explore Campaigns, and Community Wall
    const guestRoutes = ["#home", "#explore", "#wall"];
    return guestRoutes.includes(hash) ? hash : "#home";
  } else if (role === "volunteer") {
    return hash;
  }
  
  return hash;
}

function router() {
  const currentHash = window.location.hash || (state.currentRole === "guest" ? "#home" : "#dashboard");
  const targetHash = getAllowedRoute(currentHash, state.currentRole);
  
  // Sync the hash if router modified it
  if (currentHash !== targetHash) {
    window.location.hash = targetHash;
    return;
  }
  
  // Update Navbar active states
  const links = document.querySelectorAll("#nav-links-list li");
  links.forEach(li => {
    const a = li.querySelector("a");
    if (a && a.getAttribute("href") === targetHash) {
      li.classList.add("active");
    } else {
      li.classList.remove("active");
    }
  });
  
  // Hide all views, display the active one
  const targetViewId = ROUTES[targetHash];
  document.querySelectorAll(".page-view").forEach(view => {
    view.classList.remove("active");
  });
  
  const targetView = document.getElementById(targetViewId);
  if (targetView) {
    targetView.classList.add("active");
    // Trigger scroll to top on routing
    window.scrollTo({ top: 0, behavior: "smooth" });
    
    // Trigger specific page initialization logic
    triggerPageInit(targetHash);
  }
}

// Handler to trigger view-specific visual loaders
function triggerPageInit(hash) {
  if (hash === "#dashboard") {
    animateCounters();
    renderDashboardEvents();
  } else if (hash === "#explore") {
    renderCampaignsList();
  } else if (hash === "#profile") {
    renderProfileTimeline();
  } else if (hash === "#achievements") {
    renderAchievementsGallery();
  } else if (hash === "#wall") {
    renderSocialFeed();
  } else if (hash === "#certificates") {
    renderCertificatesGallery();
  }
}

// ========================================================
// 3. SESSION / ROLE SIMULATOR
// ========================================================

function renderNav() {
  const navContainer = document.getElementById("nav-links-list");
  let navItemsHtml = "";
  
  if (state.currentRole === "guest") {
    navItemsHtml = `
      <li class="active"><a href="#home">Home</a></li>
      <li><a href="#explore">Explore Campaigns</a></li>
      <li><a href="#wall">Community Wall</a></li>
    `;
  } else if (state.currentRole === "volunteer") {
    navItemsHtml = `
      <li><a href="#dashboard">Dashboard</a></li>
      <li><a href="#explore">Explore Campaigns</a></li>
      <li><a href="#achievements">Badges</a></li>
      <li><a href="#wall">Community Wall</a></li>
      <li><a href="#certificates">Certificates</a></li>
      <li><a href="#profile">Profile</a></li>
    `;
  }
  
  navContainer.innerHTML = navItemsHtml;
  
  // Sync the dropdown selector visual
  const select = document.getElementById("role-simulator");
  if (select) select.value = state.currentRole;
}

function simulateLogin(newRole) {
  state.currentRole = newRole;
  saveData("role", newRole);
  
  // Redraw navigation
  renderNav();
  
  // Redirect to respective start page
  const targetHash = newRole === "guest" ? "#home" : "#dashboard";
  window.location.hash = targetHash;
  router();
}

// ========================================================
// 4. THEME CONTROLLER
// ========================================================

function initTheme() {
  const savedTheme = loadData("theme", "dark");
  document.documentElement.setAttribute("data-theme", savedTheme);
  updateThemeIcon(savedTheme);
  
  const themeBtn = document.getElementById("theme-btn");
  if (themeBtn) {
    themeBtn.addEventListener("click", () => {
      const currentTheme = document.documentElement.getAttribute("data-theme");
      const nextTheme = currentTheme === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", nextTheme);
      saveData("theme", nextTheme);
      updateThemeIcon(nextTheme);
    });
  }
}

function updateThemeIcon(theme) {
  const icon = document.getElementById("theme-toggle-icon");
  if (!icon) return;
  if (theme === "dark") {
    icon.innerHTML = `
      <circle cx="12" cy="12" r="5"></circle>
      <line x1="12" y1="1" x2="12" y2="3"></line>
      <line x1="12" y1="21" x2="12" y2="23"></line>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
      <line x1="1" y1="12" x2="3" y2="12"></line>
      <line x1="21" y1="12" x2="23" y2="12"></line>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
    `;
  } else {
    icon.innerHTML = `
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
    `;
  }
}

// ========================================================
// 5. VOLUNTEER DASHBOARD COMPONENT
// ========================================================

function animateCounters() {
  const targetStats = {
    "stat-hours": state.userStats.hours,
    "stat-events": state.userStats.events,
    "stat-campaigns": state.userStats.campaigns,
    "stat-certs": state.userStats.certificates
  };
  
  Object.keys(targetStats).forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    
    let current = 0;
    const target = targetStats[id];
    const duration = 1000; // 1s animation duration
    const stepTime = Math.max(Math.floor(duration / (target || 1)), 15);
    
    el.textContent = "0";
    if (target === 0) return;
    
    const timer = setInterval(() => {
      current++;
      el.textContent = current;
      if (current >= target) {
        el.textContent = target;
        clearInterval(timer);
      }
    }, stepTime);
  });
}

function renderDashboardEvents() {
  const listContainer = document.getElementById("dashboard-events-list");
  if (!listContainer) return;
  
  if (state.userRegistrations.length === 0) {
    listContainer.innerHTML = `
      <div style="text-align:center; padding: 20px; color: var(--text-muted);">
        <p>You have not registered for any upcoming events yet.</p>
        <a href="#explore" class="btn btn-secondary" style="margin-top:12px; padding:8px 16px; font-size:0.8rem;">Browse Drives</a>
      </div>
    `;
    return;
  }
  
  let html = "";
  state.userRegistrations.forEach(id => {
    const camp = state.campaigns.find(c => c.id === id);
    if (!camp) return;
    
    html += `
      <div class="dashboard-event-item">
        <div class="event-details-brief">
          <h4>${camp.title}</h4>
          <div class="event-meta">
            <span>📅 ${camp.date}</span>
            <span>📍 ${camp.location === "kanpur" ? "Kanpur" : (camp.location === "lucknow" ? "Lucknow" : "Delhi")}</span>
          </div>
        </div>
        <div class="status-badge status-registered">Registered</div>
      </div>
    `;
  });
  
  listContainer.innerHTML = html;
}

// ========================================================
// 6. CAMPAIGN DISCOVERY & REGISTRATION
// ========================================================

let selectedCampaignId = null;

function renderCampaignsList() {
  const container = document.getElementById("campaigns-container-list");
  if (!container) return;
  
  const searchVal = document.getElementById("campaign-search").value.toLowerCase();
  const categoryVal = document.getElementById("campaign-category-select").value;
  const locationVal = document.getElementById("campaign-location-select").value;
  
  // Filter campaigns pool
  const filtered = state.campaigns.filter(camp => {
    const matchesSearch = camp.title.toLowerCase().includes(searchVal) || 
                          camp.description.toLowerCase().includes(searchVal) ||
                          camp.skills.toLowerCase().includes(searchVal);
    const matchesCategory = categoryVal === "all" || camp.category === categoryVal;
    const matchesLocation = locationVal === "all" || camp.location === locationVal;
    
    return matchesSearch && matchesCategory && matchesLocation;
  });
  
  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align:center; padding: 40px; color:var(--text-secondary);">
        <p style="font-size:1.1rem; font-weight:600;">No campaigns found</p>
        <p style="font-size:0.9rem; color:var(--text-muted);">Try resetting search filters or keyterms.</p>
      </div>
    `;
    return;
  }
  
  let html = "";
  filtered.forEach(camp => {
    const isRegistered = state.userRegistrations.includes(camp.id);
    const ctaText = isRegistered ? "Registered" : "View Details";
    const btnClass = isRegistered ? "btn-secondary" : "btn-primary";
    
    html += `
      <div class="glass-card campaign-card" data-id="${camp.id}">
        <div class="campaign-card-banner" style="background-image: url('${camp.bannerUrl}');">
          <span class="campaign-tag">${camp.category.toUpperCase()}</span>
        </div>
        <div class="campaign-card-content">
          <h3>${camp.title}</h3>
          <p>${camp.description.substring(0, 110)}...</p>
          <div class="campaign-info-rows">
            <div class="campaign-info-row">
              <svg viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
              <span>${camp.location.toUpperCase()}</span>
            </div>
            <div class="campaign-info-row">
              <svg viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>
              <span>📅 ${camp.date}</span>
            </div>
          </div>
          <div class="campaign-card-footer">
            <div class="campaign-slots-bubble">Slots left: <span>${camp.slotsLeft}</span> / ${camp.slotsTotal}</div>
            <button class="btn ${btnClass}" style="padding: 8px 16px; font-size:0.85rem;" onclick="openEventDetails('${camp.id}')">${ctaText}</button>
          </div>
        </div>
      </div>
    `;
  });
  
  container.innerHTML = html;
}

// Details Modal Handler
window.openEventDetails = function(campId) {
  const camp = state.campaigns.find(c => c.id === campId);
  if (!camp) return;
  
  selectedCampaignId = campId;
  
  document.getElementById("modal-event-title").textContent = camp.title;
  document.getElementById("modal-event-date").textContent = camp.date;
  document.getElementById("modal-event-location").textContent = camp.location.toUpperCase();
  document.getElementById("modal-event-skills").textContent = camp.skills;
  document.getElementById("modal-event-slots").textContent = `${camp.slotsLeft} / ${camp.slotsTotal} slots`;
  document.getElementById("modal-event-desc").textContent = camp.description;
  
  const confirmBtn = document.getElementById("modal-register-confirm");
  const isRegistered = state.userRegistrations.includes(campId);
  
  if (state.currentRole === "guest") {
    confirmBtn.textContent = "Sign In to Register";
    confirmBtn.className = "btn btn-primary";
  } else if (isRegistered) {
    confirmBtn.textContent = "Cancel Registration";
    confirmBtn.className = "btn btn-secondary";
  } else {
    confirmBtn.textContent = "Register Now";
    confirmBtn.className = "btn btn-primary";
  }
  
  document.getElementById("event-detail-modal").classList.add("active");
};

function initEventModal() {
  const closeBtn = document.getElementById("close-detail-modal");
  const overlay = document.getElementById("event-detail-modal");
  const saveBtn = document.getElementById("modal-save-event");
  const confirmBtn = document.getElementById("modal-register-confirm");
  
  if (closeBtn) {
    closeBtn.addEventListener("click", () => overlay.classList.remove("active"));
  }
  
  if (overlay) {
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) overlay.classList.remove("active");
    });
  }
  
  if (saveBtn) {
    saveBtn.addEventListener("click", () => {
      alert("Campaign saved to your bookmarks folder! (Simulated Bookmark)");
    });
  }
  
  if (confirmBtn) {
    confirmBtn.addEventListener("click", () => {
      if (state.currentRole === "guest") {
        overlay.classList.remove("active");
        openAuthModal();
        return;
      }
      
      const isRegistered = state.userRegistrations.includes(selectedCampaignId);
      const camp = state.campaigns.find(c => c.id === selectedCampaignId);
      
      if (!camp) return;
      
      if (isRegistered) {
        // Cancel registration
        state.userRegistrations = state.userRegistrations.filter(id => id !== selectedCampaignId);
        camp.slotsLeft++;
        state.userStats.campaigns = Math.max(0, state.userStats.campaigns - 1);
        state.userStats.events = Math.max(0, state.userStats.events - 1);
        alert(`Successfully cancelled your registration for ${camp.title}.`);
      } else {
        if (camp.slotsLeft <= 0) {
          alert("Sorry, no slots left in this campaign drive!");
          return;
        }
        // Register volunteer
        state.userRegistrations.push(selectedCampaignId);
        camp.slotsLeft--;
        state.userStats.campaigns++;
        state.userStats.events++;
        state.userStats.hours += 4; // Add 4 hours per registration simulation
        
        // Trigger Gamified Badges unlock check
        checkBadgeUnlocks();
        
        alert(`Success! You registered for ${camp.title}. Your details are sent to coordinate contacts.`);
      }
      
      saveData("campaigns", state.campaigns);
      saveData("user_regs", state.userRegistrations);
      saveData("user_stats", state.userStats);
      
      overlay.classList.remove("active");
      renderCampaignsList();
      renderDashboardEvents();
    });
  }
}

// Check Badge unlocks simulation
function checkBadgeUnlocks() {
  let changed = false;
  // Unlock badge 1 if registration is done
  if (state.userRegistrations.length >= 1) {
    if (!state.badges[0].unlocked) {
      state.badges[0].unlocked = true;
      changed = true;
    }
  }
  // Unlock badge 2 if 3 campaigns joined
  if (state.userRegistrations.length >= 3) {
    if (!state.badges[1].unlocked) {
      state.badges[1].unlocked = true;
      changed = true;
    }
  }
  
  if (changed) {
    saveData("badges", state.badges);
  }
}

// ========================================================
// 7. VOLUNTEER PROFILE PORTFOLIO
// ========================================================

function renderProfileTimeline() {
  const container = document.getElementById("profile-timeline-list");
  if (!container) return;
  
  const history = [
    { title: "Educational Outreach Kanpur", date: "May 10, 2026", desc: "Taught basic science experiments to 30 primary kids. Contributed 5 hours." },
    { title: "Public Park Cleanliness Drive", date: "April 28, 2026", desc: "Coordinated rubbish bag distributions and cleanups in Kanpur. Contributed 8 hours." },
    { title: "Weekly Food Distribution", date: "March 15, 2026", desc: "Packaged nutritional grain boxes for slum shelter zones. Contributed 6 hours." }
  ];
  
  let html = "";
  history.forEach(item => {
    html += `
      <div class="timeline-item">
        <div class="timeline-dot"></div>
        <div class="timeline-header">
          <span class="timeline-title">${item.title}</span>
          <span class="timeline-date">${item.date}</span>
        </div>
        <div class="timeline-desc">${item.desc}</div>
      </div>
    `;
  });
  
  container.innerHTML = html;
  
  // Sync text items with active stats
  document.getElementById("profile-hours").textContent = `${state.userStats.hours} Hours`;
}

// ========================================================
// 8. GAMIFIED ACHIEVEMENTS GALLERY
// ========================================================

function renderAchievementsGallery() {
  const container = document.getElementById("badge-gallery-container");
  if (!container) return;
  
  let html = "";
  state.badges.forEach(badge => {
    const statusText = badge.unlocked ? "Unlocked" : "Locked";
    const statusClass = badge.unlocked ? "badge-unlocked" : "badge-locked";
    
    html += `
      <div class="badge-card">
        <div class="badge-inner">
          <div class="badge-front">
            <div class="badge-icon">${badge.emoji}</div>
            <div class="badge-title">${badge.title}</div>
            <span class="badge-status ${statusClass}">${statusText}</span>
          </div>
          <div class="badge-back">
            <div class="badge-title" style="margin-bottom: 12px; font-size: 0.95rem;">${badge.title}</div>
            <p class="badge-back-desc">${badge.desc}</p>
            <span class="badge-status ${statusClass}" style="margin-top: 15px; display: inline-block;">${statusText}</span>
          </div>
        </div>
      </div>
    `;
  });
  
  container.innerHTML = html;
}

// ========================================================
// 9. COMMUNITY WALL SOCIAL FEED
// ========================================================

let attachedPhotoSimulated = false;

function renderSocialFeed() {
  const stream = document.getElementById("social-feed-stream");
  if (!stream) return;
  
  let html = "";
  state.posts.forEach((post, index) => {
    const likeClass = post.likedByMe ? "liked" : "";
    const badgeHtml = post.badge ? `<span class="post-badge">${post.badge}</span>` : "";
    const mediaHtml = post.image ? `<img src="${post.image}" alt="Community Photo" class="post-media">` : "";
    
    html += `
      <div class="glass-card post-card" id="post-${post.id}">
        <div class="post-header">
          <div class="post-user-info">
            <img src="${post.avatar}" alt="${post.username}" class="post-avatar">
            <div>
              <div class="post-username">${post.username}${badgeHtml}</div>
              <div class="post-timestamp">${post.date}</div>
            </div>
          </div>
        </div>
        <div class="post-body">${post.content}</div>
        ${mediaHtml}
        <div class="post-actions">
          <button class="post-action-btn ${likeClass}" onclick="toggleLikePost(${index})">
            <span>❤️</span> <span id="like-count-${index}">${post.likes}</span> Likes
          </button>
          <button class="post-action-btn" onclick="alert('Comment section is simulated! Type in text boxes to add feedback.')">
            <span>💬</span> Comment
          </button>
        </div>
      </div>
    `;
  });
  
  stream.innerHTML = html;
  
  // Render Leaderboard side panel
  renderLeaderboard();
}

function renderLeaderboard() {
  const container = document.getElementById("leaderboard-container");
  if (!container) return;
  
  let html = "";
  state.leaderboard.forEach(user => {
    html += `
      <div class="leader-item">
        <div class="leader-details">
          <img src="${user.avatar}" alt="${user.name}" class="leader-avatar">
          <div class="leader-name">${user.name}</div>
        </div>
        <div class="leader-rank">${user.hours} hrs</div>
      </div>
    `;
  });
  container.innerHTML = html;
}

window.toggleLikePost = function(index) {
  const post = state.posts[index];
  if (!post) return;
  
  if (post.likedByMe) {
    post.likes--;
    post.likedByMe = false;
  } else {
    post.likes++;
    post.likedByMe = true;
  }
  
  saveData("posts", state.posts);
  renderSocialFeed();
};

function initCommunityForm() {
  const attachBtn = document.getElementById("attach-photo-btn");
  const submitBtn = document.getElementById("community-submit-post");
  const textarea = document.getElementById("community-post-text");
  const preview = document.getElementById("attached-photo-preview");
  
  if (attachBtn) {
    attachBtn.addEventListener("click", () => {
      attachedPhotoSimulated = !attachedPhotoSimulated;
      if (preview) {
        preview.style.display = attachedPhotoSimulated ? "block" : "none";
      }
    });
  }
  
  if (submitBtn) {
    submitBtn.addEventListener("click", () => {
      const text = textarea.value.trim();
      if (!text) {
        alert("Please write a story or description before posting!");
        return;
      }
      
      const newPost = {
        id: "post-" + Date.now(),
        username: "Anya Sharma",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80",
        date: "Just now",
        content: text,
        image: attachedPhotoSimulated ? "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=600&q=80" : null,
        likes: 0,
        likedByMe: false,
        badge: "Impact Maker"
      };
      
      state.posts.unshift(newPost);
      saveData("posts", state.posts);
      
      // Reset input form state
      textarea.value = "";
      attachedPhotoSimulated = false;
      if (preview) preview.style.display = "none";
      
      renderSocialFeed();
      alert("Your story is published successfully to the community timeline!");
    });
  }
}

// ========================================================
// 10. CERTIFICATES SECTION & GENERATION
// ========================================================

const SAMPLE_CERTIFICATES = [
  { id: "cert-1", title: "Certificate of Appreciation - Math Teaching", date: "May 10, 2026", campaign: "Kanpur Slum Education Drive" },
  { id: "cert-2", title: "Certificate of Participation - Environment", date: "April 28, 2026", campaign: "Public Park Cleanliness Drive" }
];

function renderCertificatesGallery() {
  const container = document.getElementById("certificates-gallery-container");
  if (!container) return;
  
  let html = "";
  SAMPLE_CERTIFICATES.forEach(cert => {
    html += `
      <div class="glass-card cert-card">
        <div class="cert-thumbnail-wrapper">
          <!-- Drawing miniature version using SVG or mock visual -->
          <div class="cert-thumbnail-img" style="border:5px double var(--accent-orange); width:90%; height:90%; padding:10px; text-align:center; font-family:var(--font-display); background:var(--bg-secondary); border-radius:4px;">
            <div style="font-size:8px; color:var(--text-muted);">NAYEPANKH FOUNDATION</div>
            <div style="font-size:10px; font-weight:800; color:var(--accent-orange); margin:4px 0 2px;">CERTIFICATE</div>
            <div style="font-size:6px; color:var(--text-secondary);">Anya Sharma</div>
            <div style="font-size:5px; color:var(--text-muted); margin-top:2px;">For outstanding volunteering contribution</div>
          </div>
          <div class="cert-overlay-hover">
            <button class="btn btn-primary" style="padding:8px 16px; font-size:0.8rem;" onclick="generateCertificateDownload('${cert.title}', '${cert.date}', '${cert.campaign}')">Download Image</button>
          </div>
        </div>
        <div class="cert-card-title">${cert.title}</div>
        <div class="cert-card-date">Issued: ${cert.date}</div>
      </div>
    `;
  });
  
  container.innerHTML = html;
}

window.generateCertificateDownload = function(title, date, campaign) {
  const canvas = document.getElementById("cert-draw-canvas");
  if (!canvas) return;
  
  const ctx = canvas.getContext("2d");
  
  // Fill background
  ctx.fillStyle = "#faf9f6";
  ctx.fillRect(0, 0, 800, 600);
  
  // Border frames
  ctx.strokeStyle = "#ff6b00";
  ctx.lineWidth = 15;
  ctx.strokeRect(20, 20, 760, 560);
  
  ctx.strokeStyle = "#1a1a1a";
  ctx.lineWidth = 2;
  ctx.strokeRect(45, 45, 710, 510);
  
  // Heading Texts
  ctx.fillStyle = "#111111";
  ctx.textAlign = "center";
  
  ctx.font = "bold 20px Georgia";
  ctx.fillText("NAYEPANKH FOUNDATION", 400, 100);
  
  ctx.fillStyle = "#ff6b00";
  ctx.font = "italic 42px Georgia";
  ctx.fillText("Certificate of Appreciation", 400, 170);
  
  ctx.fillStyle = "#555555";
  ctx.font = "16px sans-serif";
  ctx.fillText("THIS IS PROUDLY PRESENTED TO", 400, 230);
  
  // Volunteer Name
  ctx.fillStyle = "#222222";
  ctx.font = "bold 32px Georgia";
  ctx.fillText("Anya Sharma", 400, 290);
  
  // Certificate Context body
  ctx.fillStyle = "#555555";
  ctx.font = "16px sans-serif";
  ctx.fillText(`for their exemplary dedication and valuable volunteer support in the campaign`, 400, 340);
  
  ctx.fillStyle = "#111111";
  ctx.font = "bold 18px Georgia";
  ctx.fillText(`"${campaign}"`, 400, 375);
  
  ctx.fillStyle = "#555555";
  ctx.font = "16px sans-serif";
  ctx.fillText(`completed successfully on ${date}.`, 400, 410);
  
  // Signatures
  ctx.strokeStyle = "#ff6b00";
  ctx.beginPath();
  ctx.moveTo(180, 500);
  ctx.lineTo(320, 500);
  ctx.stroke();
  
  ctx.fillStyle = "#222222";
  ctx.font = "bold 14px sans-serif";
  ctx.fillText("Prashant Shukla", 250, 520);
  ctx.font = "12px sans-serif";
  ctx.fillText("Founder, NayePankh", 250, 538);
  
  ctx.strokeStyle = "#777777";
  ctx.beginPath();
  ctx.moveTo(480, 500);
  ctx.lineTo(620, 500);
  ctx.stroke();
  
  ctx.fillStyle = "#222222";
  ctx.font = "bold 14px sans-serif";
  ctx.fillText("Yashwardhn Singh", 550, 520);
  ctx.font = "12px sans-serif";
  ctx.fillText("Chief Coordinator", 550, 538);
  
  // Generate download
  const imageURI = canvas.toDataURL("image/png");
  const downloadLink = document.createElement("a");
  downloadLink.href = imageURI;
  downloadLink.download = `${title.replace(/\s+/g, "_")}.png`;
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
};

// ========================================================
// 11. INITIALIZATION / BOOTSTRAP
// ========================================================

document.addEventListener("DOMContentLoaded", () => {
  // Bootstrap Visual System
  initTheme();
  
  // Session selector configuration
  const roleSelect = document.getElementById("role-simulator");
  if (roleSelect) {
    roleSelect.addEventListener("change", (e) => {
      const selectedValue = e.target.value;
      if (selectedValue === "volunteer" && state.currentRole === "guest") {
        // Revert dropdown temporarily
        roleSelect.value = "guest";
        // Show authentication modal
        openAuthModal();
      } else {
        simulateLogin(selectedValue);
      }
    });
  }
  
  // Register Auth modal hooks
  const closeAuthBtn = document.getElementById("close-auth-modal");
  const authOverlay = document.getElementById("auth-modal");
  if (closeAuthBtn) {
    closeAuthBtn.addEventListener("click", closeAuthModal);
  }
  if (authOverlay) {
    authOverlay.addEventListener("click", (e) => {
      if (e.target === authOverlay) closeAuthModal();
    });
  }
  
  // Mobile responsive hamburger
  const hamBtn = document.getElementById("hamburger-btn");
  const navList = document.getElementById("nav-links-list");
  if (hamBtn && navList) {
    hamBtn.addEventListener("click", () => {
      navList.classList.toggle("mobile-active");
    });
  }
  
  // Register Search and Filters callbacks
  const searchInput = document.getElementById("campaign-search");
  const categorySelect = document.getElementById("campaign-category-select");
  const locationSelect = document.getElementById("campaign-location-select");
  
  if (searchInput) searchInput.addEventListener("input", renderCampaignsList);
  if (categorySelect) categorySelect.addEventListener("change", renderCampaignsList);
  if (locationSelect) locationSelect.addEventListener("change", renderCampaignsList);
  
  // Setup Router listeners
  window.addEventListener("hashchange", router);
  
  // Initialize dynamic form submissions handlers
  initEventModal();
  initCommunityForm();
  
  // Load Navigation
  renderNav();
  
  // Fire Router path resolution
  router();
});

// ========================================================
// 12. AUTHENTICATION & LOGIN FORM HANDLERS
// ========================================================

window.openAuthModal = function() {
  const modal = document.getElementById("auth-modal");
  if (modal) modal.classList.add("active");
  // Clean up error state if any
  const errText = document.getElementById("login-error-text");
  if (errText) errText.style.display = "none";
};

window.closeAuthModal = function() {
  const modal = document.getElementById("auth-modal");
  if (modal) modal.classList.remove("active");
  
  // Revert dropdown if user did not log in
  if (state.currentRole === "guest") {
    const selector = document.getElementById("role-simulator");
    if (selector) selector.value = "guest";
  }
};

window.switchAuthTab = function(tab) {
  const loginBtn = document.getElementById("tab-login-btn");
  const signupBtn = document.getElementById("tab-signup-btn");
  const loginContent = document.getElementById("auth-login-content");
  const signupContent = document.getElementById("auth-signup-content");
  
  if (tab === "login") {
    loginBtn.classList.add("active");
    signupBtn.classList.remove("active");
    loginContent.style.display = "block";
    signupContent.style.display = "none";
  } else {
    loginBtn.classList.remove("active");
    signupBtn.classList.add("active");
    loginContent.style.display = "none";
    signupContent.style.display = "block";
  }
};

window.handleAuthSubmit = function(event) {
  event.preventDefault();
  const emailInput = document.getElementById("login-email").value.trim();
  const passwordInput = document.getElementById("login-password").value;
  const errorText = document.getElementById("login-error-text");
  
  if (emailInput === "example@123" && passwordInput === "12345678") {
    // Correct credentials
    simulateLogin("volunteer");
    closeAuthModal();
  } else {
    // Invalid credentials
    if (errorText) errorText.style.display = "block";
  }
};

window.handleSocialAuth = function(provider) {
  alert(`Connecting with ${provider}... Login successful! (Simulated OAuth flow)`);
  simulateLogin("volunteer");
  closeAuthModal();
};
