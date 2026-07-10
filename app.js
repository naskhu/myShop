const WHATSAPP_NUMBER = "9607988774";

const services = [
  { category: "Networking", icon: "🌐", name: "Network Design & Installation", description: "LAN design, structured cabling, racks, switches, routers and complete office network deployment." },
  { category: "Networking", icon: "🔀", name: "Switch, VLAN & Router Configuration", description: "Cisco, Huawei, MikroTik and UniFi configuration, VLANs, trunks, routing and troubleshooting." },
  { category: "Networking", icon: "🛡️", name: "Firewall & VPN Setup", description: "Secure remote access, site-to-site VPNs, firewall policies and internet security hardening." },
  { category: "Wi-Fi", icon: "📶", name: "Home Wi-Fi Setup", description: "Router placement, mesh Wi-Fi, dead-zone removal and secure home wireless setup." },
  { category: "Wi-Fi", icon: "📡", name: "Office Wi-Fi Installation", description: "Business Wi-Fi design, access points, guest networks, roaming and coverage optimization." },
  { category: "Wi-Fi", icon: "📊", name: "Wi-Fi Survey & Troubleshooting", description: "Coverage assessment, interference checks, slow Wi-Fi diagnosis and performance tuning." },
  { category: "Security", icon: "📹", name: "CCTV Installation", description: "IP cameras, NVR/DVR setup, cabling, storage planning and remote mobile viewing." },
  { category: "Security", icon: "🔐", name: "Smart Door Lock Installation", description: "Fingerprint, PIN, card and app-enabled smart lock installation and configuration." },
  { category: "Security", icon: "🚪", name: "Access Control & Video Doorbells", description: "Door access systems, attendance devices, intercoms and smart video doorbells." },
  { category: "Security", icon: "👶", name: "Baby Monitor Setup", description: "Secure camera placement, Wi-Fi setup, mobile viewing and notification configuration." },
  { category: "Servers", icon: "🖥️", name: "Windows & Linux Server Setup", description: "Server installation, hardening, users, storage, services and remote management." },
  { category: "Servers", icon: "🏢", name: "Active Directory & File Server", description: "Domain services, permissions, shared storage, group policies and centralized management." },
  { category: "Servers", icon: "💾", name: "NAS, Backup & Virtualization", description: "Synology/NAS deployment, backup strategy, VMware, Hyper-V and disaster recovery planning." },
  { category: "Cloud", icon: "☁️", name: "Microsoft 365 & Email", description: "Business email, Microsoft 365 setup, licensing, migration and user administration." },
  { category: "Cloud", icon: "🌩️", name: "Cloud Backup & Migration", description: "Secure cloud storage, backup automation, data migration and remote access solutions." },
  { category: "Web & Software", icon: "🌍", name: "Business Website Development", description: "Responsive company websites, service websites, portfolios and landing pages." },
  { category: "Web & Software", icon: "🛒", name: "Online Shops & Booking Systems", description: "E-commerce websites, catalogues, appointment booking and WhatsApp ordering systems." },
  { category: "Web & Software", icon: "⚙️", name: "Custom Software & Automation", description: "Internal tools, dashboards, reports, database systems and business workflow automation." },
  { category: "IT Support", icon: "💻", name: "Computer, Printer & Scanner Setup", description: "PC setup, upgrades, printer/scanner installation, troubleshooting and office equipment support." },
  { category: "IT Support", icon: "🏬", name: "Office IT Setup", description: "Complete setup for new offices including network, Wi-Fi, computers, printers and security." },
  { category: "IT Support", icon: "🧰", name: "Remote & On-site Support", description: "Technical troubleshooting, maintenance visits, emergency support and annual service contracts." },
  { category: "Consultancy", icon: "📋", name: "IT Consultancy & Project Planning", description: "Technology assessment, equipment selection, project design, budgeting and implementation planning." }
];

const $ = selector => document.querySelector(selector);
let activeCategory = "All";

function showToast(message) {
  const toast = $("#toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove("show"), 2200);
}

function renderCategories() {
  const categories = ["All", ...new Set(services.map(service => service.category))];
  $("#categoryChips").innerHTML = categories.map(category => `<button type="button" class="category-chip ${category === activeCategory ? "active" : ""}" data-category="${category}">${category}</button>`).join("");
}

function renderServices() {
  const query = $("#searchInput").value.trim().toLowerCase();
  const filtered = services.filter(service => {
    const text = `${service.category} ${service.name} ${service.description}`.toLowerCase();
    return text.includes(query) && (activeCategory === "All" || service.category === activeCategory);
  });

  $("#serviceGrid").innerHTML = filtered.length ? filtered.map(service => `
    <article class="service-card">
      <div class="service-icon">${service.icon}</div>
      <span class="service-category">${service.category}</span>
      <h3>${service.name}</h3>
      <p>${service.description}</p>
      <button type="button" class="quote-service-button" data-service="${service.name}" data-category="${service.category}">Request Quotation</button>
    </article>
  `).join("") : `<div class="empty-state"><span>🔎</span><h3>No services found</h3><p>Try another search or category.</p></div>`;
}

function populateQuoteServices(selectedCategory = "", selectedService = "") {
  const categorySelect = $("#serviceCategory");
  const serviceSelect = $("#specificService");
  const categories = [...new Set(services.map(service => service.category))];
  categorySelect.innerHTML = `<option value="">Choose category</option>${categories.map(category => `<option value="${category}">${category}</option>`).join("")}<option value="Other">Other / Not sure</option>`;
  if (selectedCategory) categorySelect.value = selectedCategory;

  const chosen = categorySelect.value;
  const matching = chosen && chosen !== "Other" ? services.filter(service => service.category === chosen) : services;
  serviceSelect.innerHTML = `<option value="">Choose service</option>${matching.map(service => `<option value="${service.name}">${service.name}</option>`).join("")}<option value="Other IT service">Other IT service</option>`;
  if (selectedService) serviceSelect.value = selectedService;
}

function selectService(category, service) {
  populateQuoteServices(category, service);
  $("#quote").scrollIntoView({ behavior: "smooth", block: "start" });
  setTimeout(() => $("#customerName").focus(), 500);
}

function submitQuotation(event) {
  event.preventDefault();
  const name = $("#customerName").value.trim();
  const phone = $("#customerPhone").value.trim();
  const company = $("#company").value.trim();
  const email = $("#email").value.trim();
  const location = $("#location").value.trim();
  const category = $("#serviceCategory").value;
  const service = $("#specificService").value;
  const description = $("#projectDescription").value.trim();
  const preferredDate = $("#preferredDate").value;
  const budget = $("#budget").value.trim();
  const priority = $("#priority").value;

  if (!name || !phone || !location || !category || !service || !description) {
    showToast("Please complete all required fields");
    return;
  }

  const reference = `Q-${new Date().getFullYear()}-${Date.now().toString().slice(-6)}`;
  const message = [
    `*New IT Service Quotation Request — ${reference}*`, "",
    `*Customer:* ${name}`,
    company ? `*Company:* ${company}` : "",
    `*Phone:* ${phone}`,
    email ? `*Email:* ${email}` : "",
    `*Location:* ${location}`,
    `*Service category:* ${category}`,
    `*Service required:* ${service}`,
    `*Priority:* ${priority}`,
    preferredDate ? `*Preferred date:* ${preferredDate}` : "",
    budget ? `*Budget:* ${budget}` : "", "",
    "*Project details:*", description, "",
    "Please review this request and provide a quotation.",
    "I will attach any relevant site photos or documents in this chat."
  ].filter(Boolean).join("\n");

  window.location.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

$("#categoryChips").addEventListener("click", event => {
  const button = event.target.closest("[data-category]");
  if (!button) return;
  activeCategory = button.dataset.category;
  renderCategories();
  renderServices();
});

$("#serviceGrid").addEventListener("click", event => {
  const button = event.target.closest("[data-service]");
  if (button) selectService(button.dataset.category, button.dataset.service);
});

$("#searchInput").addEventListener("input", renderServices);
$("#serviceCategory").addEventListener("change", () => populateQuoteServices($("#serviceCategory").value));
$("#quoteForm").addEventListener("submit", submitQuotation);
$("#themeButton").addEventListener("click", () => {
  document.body.classList.toggle("dark");
  localStorage.setItem("naskhu-services-theme", document.body.classList.contains("dark") ? "dark" : "light");
});

if (localStorage.getItem("naskhu-services-theme") === "dark") document.body.classList.add("dark");
renderCategories();
renderServices();
populateQuoteServices();