// Initialiser la carte
const map = L.map('map').setView([46.1635705075646, -1.1268395422898], 13);

// Ajouter la carte
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    // Zoom maximum autorisé
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

const tableData = [];   // Stocker les emplacements
const markers = [];     // Stocker les coodronnées du marker

// Boucler sur les données
datas.forEach(elementEnCours => {
    
    // Constantes 
    const Lieu = elementEnCours.fields.localisation;        // Récupérer l'adresse
    const Emplacement = elementEnCours.fields.emplacement;  // Récupérer complément d'adresse
    const coords = elementEnCours.fields.coordinates;       // Récupérer les coordonnées

    // Afficher dans la console
    console.log("Lieu:", Lieu);
    console.info(`${Lieu} ${Emplacement}`);
    console.log("Coordonnées :");
    console.log("Latitude: " + coords[1]);
    console.log("Longitude: " + coords[0]);

    // Contenu de la popup
    const popupContent = `
        <b>Adresse:</b> ${Lieu}<br>
        <b>Emplacement:</b> ${Emplacement}
    `;

    // Ajouter un marqueur avec un icône personnalisé
    const marker = L.marker([coords[1], coords[0]], {
        icon: L.icon({
            iconUrl: 'https://www.svgrepo.com/show/351961/dog.svg', // Icône chien
            iconSize: [30, 30] // Taille de l'icône
        })
    }).addTo(map)
      .bindPopup(popupContent); // Lier le popup au marqueur

    // Stocker le marqueur dans le tableau
    markers.push(marker);

    // Ajouter les données au tableau avec l'emplacement complet
    tableData.push({ emplacement: `${Lieu} - ${Emplacement}`, marker });
    
});

// Afficher le tableau
const table = document.createElement('table');
// Ajouter la classe Bootstrap au tableau
table.className = 'table table-hover';               
table.innerHTML = `<tbody>`; 

// Parcourir les données et créer les lignes du tableau
tableData.forEach((row) => {

    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${row.emplacement}</td>`;
    tr.style.cursor = 'pointer';            // Changer le curseur pour indiquer que la ligne est cliquable

    // Ajouter l'événement de clic
    tr.addEventListener('click', () => {

        // Ouvrir la popup du marker correspondant
        row.marker.openPopup();
        // Centrer la carte sur le marker sélectionné
        map.setView(row.marker.getLatLng(), 16); // Niveau du zoom
        
    });
    
    // Ajouter la ligne au <tbody>
    table.querySelector('tbody').appendChild(tr);
});


document.getElementById('table-container').appendChild(table);
