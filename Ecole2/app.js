// =======================
// LOGIN
// =======================

function login() {

    let user = document.getElementById("username").value;
    let pass = document.getElementById("password").value;

    // ADMIN
    if (user === "admin" && pass === "1234") {

        window.location = "admin.html";
    }

    // USER
    else if (user === "user" && pass === "1111") {

        window.location = "user.html";
    }

    else {

        alert("Erreur connexion");
    }
}



// =======================
// ENREGISTRER ELEVE
// =======================

function save() {

    let nom = document.getElementById("nom").value;

    let masar = document.getElementById("masar").value;

    let naissance = document.getElementById("naissance").value;

    let niveau = document.getElementById("niveau").value;

    let sexe = document.getElementById("sexe").value;

    let mois = document.getElementById("mois").value;

    let etat = document.getElementById("etat").value;

    let photoInput = document.getElementById("photo");

    let file = photoInput.files[0];

    let reader = new FileReader();

    reader.onload = function () {

        let imageBase64 = reader.result;

        let eleve = {

            nom: nom,
            masar: masar,
            naissance: naissance,
            niveau: niveau,
            sexe: sexe,
            image: imageBase64,
            paiement: {}
        };

        eleve.paiement[mois] = etat;

        localStorage.setItem(masar, JSON.stringify(eleve));

        alert("Élève enregistré !");
    };

    if (file) {

        reader.readAsDataURL(file);
    }

    else {

        let eleve = {

            nom: nom,
            masar: masar,
            naissance: naissance,
            niveau: niveau,
            sexe: sexe,
            image: "",
            paiement: {}
        };

        eleve.paiement[mois] = etat;

        localStorage.setItem(masar, JSON.stringify(eleve));

        alert("Élève enregistré !");
    }
}



// =======================
// RECHERCHE FILTRE
// =======================

function filterSearch() {

    let niveau = document.getElementById("filterNiveau").value;

    let sexe = document.getElementById("filterSexe").value;

    let html = "";

    for (let i = 0; i < localStorage.length; i++) {

        let key = localStorage.key(i);

        let data = JSON.parse(localStorage.getItem(key));

        let ok = true;

        if (niveau !== "Tous" && data.niveau !== niveau) {

            ok = false;
        }

        if (sexe !== "Tous" && data.sexe !== sexe) {

            ok = false;
        }

        if (ok) {

            let paiements = "";

            for (let mois in data.paiement) {

                paiements += `<p>${mois} : ${data.paiement[mois]}</p>`;
            }

            html += `

            <div class="card">

                <h2>${data.nom}</h2>

                <p><strong>Massar :</strong> ${data.masar}</p>

                <p><strong>Date naissance :</strong> ${data.naissance}</p>

                <p><strong>Niveau :</strong> ${data.niveau}</p>

                <p><strong>Sexe :</strong> ${data.sexe}</p>

                ${data.image ? `<img src="${data.image}">` : ""}

                <h3>Paiement</h3>

                ${paiements}

            </div>
            `;
        }
    }

    document.getElementById("results").innerHTML = html;
}



// =======================
// TELECHARGER CSV
// =======================

function downloadCSV() {

    let csv = "Nom,Massar,Naissance,Niveau,Sexe\n";

    for (let i = 0; i < localStorage.length; i++) {

        let key = localStorage.key(i);

        let data = JSON.parse(localStorage.getItem(key));

        csv += `${data.nom},${data.masar},${data.naissance},${data.niveau},${data.sexe}\n`;
    }

    let blob = new Blob([csv], { type: 'text/csv' });

    let a = document.createElement('a');

    a.href = URL.createObjectURL(blob);

    a.download = "eleves.csv";

    a.click();
}