"use strict";
window.LP_REGIONES = {
  "Arica y Parinacota": ["Arica",
  "Camarones",
  "Putre"], "Tarapacá": ["Iquique",
  "Alto Hospicio",
  "Pozo Almonte"], "Antofagasta": ["Antofagasta",
  "Calama",
  "Tocopilla"], "Atacama": ["Copiapó",
  "Caldera",
  "Vallenar"], "Coquimbo": ["La Serena",
  "Coquimbo",
  "Ovalle"], "Valparaíso": ["Valparaíso",
  "Viña del Mar",
  "Quilpué",
  "San Antonio"], "Metropolitana de Santiago": ["Santiago",
  "Providencia",
  "Ñuñoa",
  "Maipú",
  "Puente Alto",
  "Las Condes"], "O'Higgins": ["Rancagua",
  "San Fernando",
  "Machalí"], "Maule": ["Talca",
  "Curicó",
  "Linares"], "Ñuble": ["Chillán",
  "San Carlos",
  "Bulnes"], "Biobío": ["Concepción",
  "Talcahuano",
  "Los Ángeles",
  "Coronel"], "La Araucanía": ["Temuco",
  "Villarrica",
  "Angol"], "Los Ríos": ["Valdivia",
  "La Unión",
  "Panguipulli"], "Los Lagos": ["Puerto Montt",
  "Osorno",
  "Castro",
  "Ancud"], "Aysén": ["Coyhaique",
  "Aysén",
  "Chile Chico"], "Magallanes y Antártica Chilena": ["Punta Arenas",
  "Puerto Natales",
  "Porvenir"]
};
function cargarRegiones(regionSelect, comunaSelect, selectedRegion = "", selectedCommune = "") {
  if (!regionSelect || !comunaSelect) return;
  regionSelect.innerHTML = '<option value="">Selecciona una región</option>' + Object.keys(LP_REGIONES).map(r => `<option value="${LP.escape(r)}">${LP.escape(r)}</option>`).join("");
  if (selectedRegion) regionSelect.value = selectedRegion;
  const fill = () => {
    const list = LP_REGIONES[regionSelect.value] || [];
    comunaSelect.innerHTML = '<option value="">Selecciona una comuna</option>' + list.map(c => `<option value="${LP.escape(c)}">${LP.escape(c)}</option>`).join("");
    if (selectedCommune && list.includes(selectedCommune)) comunaSelect.value = selectedCommune;
  };
  regionSelect.addEventListener("change", () => {
    selectedCommune = "";
    fill();
  });
  fill();
}
window.cargarRegiones = cargarRegiones;
