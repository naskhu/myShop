const CONTACT_TOKEN = "OTYwNzk4ODc3NA==";
const REQUEST_KEY = "naskhu-service-requests";
const $ = selector => document.querySelector(selector);
const $$ = selector => [...document.querySelectorAll(selector)];
const contactNumber = () => atob(CONTACT_TOKEN);

const icons = {
  network: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="7" height="6" rx="1.5"/><rect x="14" y="15" width="7" height="6" rx="1.5"/><path d="M6.5 9v4h11v2M17.5 15v-2"/></svg>',
  wifi: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M5 10.5a10.2 10.2 0 0 1 14 0M8 14a6 6 0 0 1 8 0M10.8 17.2a1.8 1.8 0 0 1 2.4 0"/><circle cx="12" cy="20" r=".8" fill="currentColor" stroke="none"/></svg>',
  camera: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 8.5h3l1.3-2h7.4l1.3 2h3v10H4z"/><circle cx="12" cy="13.5" r="3.2"/></svg>',
  lock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3M12 14v3"/></svg>',
  baby: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="8" r="3"/><path d="M6 21v-3a6 6 0 0 1 12 0v3M9 7.5h.01M15 7.5h.01M10 10c.7.7 3.3.7 4 0"/></svg>',
  server: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="4" width="18" height="6" rx="2"/><rect x="3" y="14" width="18" height="6" rx="2"/><path d="M7 7h.01M7 17h.01M11 7h6M11 17h6"/></svg>',
  cloud: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M7 18h10a4 4 0 0 0 .6-7.95A6 6 0 0 0 6.3 9.4 4.4 4.4 0 0 0 7 18Z"/></svg>',
  globe: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.3 2.5 3.5 5.5 3.5 9S14.3 18.5 12 21M12 3C9.7 5.5 8.5 8.5 8.5 12S9.7 18.5 12 21"/></svg>',
  support: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 13a8 8 0 0 1 16 0v5a2 2 0 0 1-2 2h-2v-7h4M4 13h4v7H6a2 2 0 0 1-2-2zM16 20c0 1-1 2-3 2"/></svg>',
  plan: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M5 3h11l3 3v15H5z"/><path d="M16 3v4h4M8 11h8M8 15h6"/></svg>',
  tools: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="m14 6 4-4 4 4-4 4M15 9 7 17M6 14l4 4-3 3-4-4z"/></svg>',
  shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 3 20 6v6c0 5-3.4 8-8 9-4.6-1-8-4-8-9V6z"/><path d="m9 12 2 2 4-4"/></svg>',
  calendar: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M7 3v4M17 3v4M3 10h18M8 14h3M13 14h3M8 17h3"/></svg>',
  search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></svg>',
  grid: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg>',
  file: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M5 3h10l4 4v14H5z"/><path d="M15 3v5h5M8 13h8M8 17h6"/></svg>',
  message: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 4h16v13H9l-5 4z"/><path d="M8 9h8M8 13h5"/></svg>'
};

const services = [
  {category:"Networking",icon:"network",name:"Network Design & Installation",description:"Complete LAN design and installation for homes, offices and commercial sites.",highlights:["Structured cabling","Switches and routers"]},
  {category:"Networking",icon:"network",name:"Switch, VLAN & Router Configuration",description:"Configuration and troubleshooting for Cisco, Huawei, MikroTik and UniFi networks.",highlights:["VLANs and trunks","Routing and optimization"]},
  {category:"Networking",icon:"shield",name:"Firewall & VPN Setup",description:"Secure remote access, site-to-site connectivity and internet security configuration.",highlights:["Remote access VPN","Firewall policies"]},
  {category:"Wi-Fi",icon:"wifi",name:"Home Wi-Fi Setup",description:"Improve coverage, remove dead zones and secure the wireless network in your home.",highlights:["Mesh Wi-Fi","Coverage improvement"]},
  {category:"Wi-Fi",icon:"wifi",name:"Office Wi-Fi Installation",description:"Business wireless design with access points, guest networks and reliable roaming.",highlights:["UniFi and Ruckus","Guest Wi-Fi"]},
  {category:"Wi-Fi",icon:"wifi",name:"Wi-Fi Survey & Troubleshooting",description:"Diagnose weak signals, interference, disconnections and slow wireless performance.",highlights:["Coverage assessment","Performance tuning"]},
  {category:"Security",icon:"camera",name:"CCTV Installation",description:"Camera installation, NVR/DVR configuration, storage planning and remote viewing.",highlights:["IP cameras","Mobile monitoring"]},
  {category:"Security",icon:"lock",name:"Smart Door Lock Installation",description:"Installation and setup of fingerprint, PIN, card and app-enabled smart locks.",highlights:["User enrollment","App configuration"]},
  {category:"Security",icon:"lock",name:"Access Control & Video Doorbells",description:"Door access, attendance systems, intercoms and smart video doorbell installation.",highlights:["Access control","Video intercom"]},
  {category:"Security",icon:"baby",name:"Baby Monitor Setup",description:"Secure placement, Wi-Fi setup, mobile viewing and notification configuration.",highlights:["Safe placement","Remote alerts"]},
  {category:"Servers",icon:"server",name:"Windows & Linux Server Setup",description:"Server installation, hardening, storage, users, services and remote management.",highlights:["Windows and Linux","Secure configuration"]},
  {category:"Servers",icon:"server",name:"Active Directory & File Server",description:"Domain services, shared storage, permissions and centralized user management.",highlights:["Group policies","File permissions"]},
  {category:"Servers",icon:"server",name:"NAS, Backup & Virtualization",description:"NAS deployment, backup planning, VMware, Hyper-V and recovery solutions.",highlights:["Automated backup","Virtual machines"]},
  {category:"Cloud",icon:"cloud",name:"Microsoft 365 & Email",description:"Business email, Microsoft 365 setup, licensing, migration and administration.",highlights:["Email migration","User setup"]},
  {category:"Cloud",icon:"cloud",name:"Cloud Backup & Migration",description:"Secure cloud storage, data migration, backup automation and remote access.",highlights:["Data migration","Cloud backup"]},
  {category:"Web & Software",icon:"globe",name:"Business Website Development",description:"Modern responsive websites for companies, services, portfolios and campaigns.",highlights:["Mobile-friendly","Search optimized"]},
  {category:"Web & Software",icon:"globe",name:"Online Shops & Booking Systems",description:"Product catalogues, online stores, appointment booking and WhatsApp ordering.",highlights:["Online catalogue","Booking workflow"]},
  {category:"Web & Software",icon:"tools",name:"Custom Software & Automation",description:"Dashboards, databases, reporting tools and workflow automation for businesses.",highlights:["Internal tools","Process automation"]},
  {category:"IT Support",icon:"support",name:"Computer, Printer & Scanner Setup",description:"Device setup, upgrades, troubleshooting and office equipment configuration.",highlights:["Device installation","Troubleshooting"]},
  {category:"IT Support",icon:"support",name:"Office IT Setup",description:"Complete IT setup for new offices, including networks, Wi-Fi, devices and security.",highlights:["New office setup","End-to-end delivery"]},
  {category:"IT Support",icon:"support",name:"Remote & On-site Support",description:"Technical support, maintenance visits, emergency response and annual contracts.",highlights:["Remote assistance","On-site visits"]},
  {category:"Consultancy",icon:"plan",name:"IT Consultancy & Project Planning",description:"Technical assessment, equipment selection, budgeting and implementation planning.",highlights:["Solution design","Equipment planning"]}
];

let activeCategory = "All";
const quoteDrawer = $("#quoteDrawer");

function icon(name){ return icons[name] || icons.tools; }
function fillIcons(){ $$('[data-icon]').forEach(node => { node.innerHTML = icon(node.dataset.icon); }); }
function toast(message){ const el=$("#toast"); el.textContent=message; el.classList.add("show"); clearTimeout(toast.timer); toast.timer=setTimeout(()=>el.classList.remove("show"),2200); }

function configureContactLinks(){
  const number=contactNumber();
  $$('[data-contact="whatsapp"]').forEach(link=>{ link.href=`https://wa.me/${number}?text=${encodeURIComponent("Hello, I would like to request an IT service quotation.")}`; });
  $$('[data-contact="call"]').forEach(link=>{ link.href=`tel:+${number}`; });
}

function renderCategories(){
  const categories=["All",...new Set(services.map(service=>service.category))];
  $("#categoryChips").innerHTML=categories.map(category=>`<button class="category-chip ${category===activeCategory?"active":""}" data-category="${category}" type="button">${category}</button>`).join("");
}

function renderServices(){
  const query=$("#searchInput").value.toLowerCase().trim();
  const list=services.filter(service=>(activeCategory==="All"||service.category===activeCategory)&&`${service.category} ${service.name} ${service.description} ${service.highlights.join(" ")}`.toLowerCase().includes(query));
  $("#serviceGrid").innerHTML=list.length?list.map(service=>`
    <article class="service-card">
      <div class="service-card-top"><div class="service-icon">${icon(service.icon)}</div><span class="service-category">${service.category}</span></div>
      <h3>${service.name}</h3>
      <p>${service.description}</p>
      <ul class="service-highlights">${service.highlights.map(item=>`<li>${item}</li>`).join("")}</ul>
      <button class="quote-service-button" type="button" data-service="${service.name}" data-category="${service.category}">Request this service →</button>
    </article>`).join(""):`<div class="empty-state"><h3>No matching services</h3><p>Try another keyword or select All.</p></div>`;
}

function populateServices(category="",service=""){
  const categorySelect=$("#serviceCategory");
  const serviceSelect=$("#specificService");
  const categories=[...new Set(services.map(item=>item.category))];
  categorySelect.innerHTML=`<option value="">Choose category</option>${categories.map(item=>`<option value="${item}">${item}</option>`).join("")}<option value="Other">Other / Not sure</option>`;
  if(category) categorySelect.value=category;
  const selected=categorySelect.value;
  const available=selected&&selected!=="Other"?services.filter(item=>item.category===selected):services;
  serviceSelect.innerHTML=`<option value="">Choose service</option>${available.map(item=>`<option value="${item.name}">${item.name}</option>`).join("")}<option value="Other IT service">Other IT service</option>`;
  if(service) serviceSelect.value=service;
}

function openQuote(category="",service=""){
  if(category||service) populateServices(category,service);
  quoteDrawer.classList.add("open");
  quoteDrawer.setAttribute("aria-hidden","false");
  document.body.classList.add("drawer-open");
  setTimeout(()=>$("#customerName").focus(),300);
}

function closeQuote(){
  quoteDrawer.classList.remove("open");
  quoteDrawer.setAttribute("aria-hidden","true");
  document.body.classList.remove("drawer-open");
}

function saveRequest(request){
  const requests=JSON.parse(localStorage.getItem(REQUEST_KEY)||"[]");
  requests.unshift(request);
  localStorage.setItem(REQUEST_KEY,JSON.stringify(requests));
}

function submitQuote(event){
  event.preventDefault();
  const request={
    id:`Q-${new Date().getFullYear()}-${Date.now().toString().slice(-6)}`,
    name:$("#customerName").value.trim(),phone:$("#customerPhone").value.trim(),company:$("#company").value.trim(),email:$("#email").value.trim(),location:$("#location").value.trim(),category:$("#serviceCategory").value,service:$("#specificService").value,description:$("#projectDescription").value.trim(),preferredDate:$("#preferredDate").value,budget:$("#budget").value.trim(),priority:$("#priority").value,status:"New",scheduledAt:"",createdAt:new Date().toISOString()
  };
  if(!request.name||!request.phone||!request.location||!request.category||!request.service||!request.description) return toast("Please complete all required fields");
  if($("#saveCopy").checked) saveRequest(request);
  const message=[
    `*New IT Service Request — ${request.id}*`,"",
    `*Customer:* ${request.name}`,
    request.company?`*Company:* ${request.company}`:"",
    `*Phone:* ${request.phone}`,
    request.email?`*Email:* ${request.email}`:"",
    `*Location:* ${request.location}`,
    `*Category:* ${request.category}`,
    `*Service:* ${request.service}`,
    `*Priority:* ${request.priority}`,
    request.preferredDate?`*Preferred date:* ${request.preferredDate}`:"",
    request.budget?`*Estimated budget:* ${request.budget}`:"","",
    "*Requirement:*",request.description,"",
    "Please review this request and provide a quotation.",
    "I will attach relevant photos or documents in this chat if needed."
  ].filter(Boolean).join("\n");
  window.location.href=`https://wa.me/${contactNumber()}?text=${encodeURIComponent(message)}`;
}

$("#categoryChips").addEventListener("click",event=>{const button=event.target.closest("[data-category]");if(!button)return;activeCategory=button.dataset.category;renderCategories();renderServices();});
$("#serviceGrid").addEventListener("click",event=>{const button=event.target.closest("[data-service]");if(button)openQuote(button.dataset.category,button.dataset.service);});
$$('[data-quick-service]').forEach(button=>button.addEventListener("click",()=>openQuote(button.dataset.category,button.dataset.service)));
$$('[data-open-quote]').forEach(button=>button.addEventListener("click",()=>openQuote()));
$$('[data-close-quote]').forEach(button=>button.addEventListener("click",closeQuote));
$("#searchInput").addEventListener("input",renderServices);
$("#serviceCategory").addEventListener("change",()=>populateServices($("#serviceCategory").value));
$("#quoteForm").addEventListener("submit",submitQuote);
$("#themeButton").addEventListener("click",()=>{document.body.classList.toggle("dark");localStorage.setItem("naskhu-services-theme",document.body.classList.contains("dark")?"dark":"light");$("#themeButton").textContent=document.body.classList.contains("dark")?"☀":"☾";});
document.addEventListener("keydown",event=>{if(event.key==="Escape")closeQuote();});

const today=new Date();today.setMinutes(today.getMinutes()-today.getTimezoneOffset());$("#preferredDate").min=today.toISOString().split("T")[0];
if(localStorage.getItem("naskhu-services-theme")==="dark"){document.body.classList.add("dark");$("#themeButton").textContent="☀";}
configureContactLinks();
fillIcons();
renderCategories();
renderServices();
populateServices();