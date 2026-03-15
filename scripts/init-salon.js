require('dotenv').config({ path: '.env.local' });
const admin = require('firebase-admin');

// ==========================================
// CONFIGURARE CLIENT NOU
// ==========================================

const CLIENT_CONFIG = {
  adminPhone: '0712345678',       // Numărul de telefon al patronului (pentru login)
  adminName: 'Proprietar Salon',  // Numele patronului
  shopName: 'Barbershop Elite',   // Numele salonului (pentru setări)
  currency: 'RON',
  scheduleStart: 10,              // Ora de deschidere (10:00)
  scheduleEnd: 19                 // Ora de închidere (19:00)
};

// ==========================================
// STRUCTURA INIȚIALĂ A BAZEI DE DATE
// ==========================================

function generateInitialDatabase(adminUserId) {
  return {
    appointments: {},
    blocked_slots: {},
    offers: {},
    services: {
      "srv1": {
        "active": true,
        "description": "Linie curată, textură modernă și styling adaptat fizionomiei tale.",
        "duration": 30,
        "icon": "Scissors",
        "name": "Tuns Clasic",
        "price": 50
      },
      "srv2": {
        "active": true,
        "description": "Tuns + barbierit + ritual SPA cu prosoape calde și masaj facial.",
        "duration": 60,
        "icon": "Crown",
        "name": "Tuns + Barbă",
        "price": 80
      },
      "srv3": {
        "active": true,
        "description": "Rapid, prietenos și adaptat celor mici.",
        "duration": 40,
        "icon": "Palette",
        "name": "Tuns Copii",
        "price": 35
      }
    },
    settings: {
      "currency": CLIENT_CONFIG.currency,
      "schedule": {
        "end": CLIENT_CONFIG.scheduleEnd,
        "start": CLIENT_CONFIG.scheduleStart
      },
      "shopName": CLIENT_CONFIG.shopName
    },
    users: {
      [adminUserId]: {
        "created_at": new Date().toISOString(),
        "name": CLIENT_CONFIG.adminName,
        "phone": CLIENT_CONFIG.adminPhone.replace(/\s|-/g, ''),
        "role": "admin",
        "status": "active"
      }
    }
  };
}

// ==========================================
// LOGICA SCRIPTULUI
// ==========================================

async function initializeSalon() {
    console.log('⏳ Începem configurarea noii baze de date a salonului...');
    
    try {
        const serviceAccount = require('../firebase-service-account.json');
        const dbUrl = process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL;
        if(!dbUrl) throw new Error("Nu am găsit NEXT_PUBLIC_FIREBASE_DATABASE_URL în .env.local");

        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
            databaseURL: dbUrl
        });
        console.log('✅ Conectat la Firebase.');
    } catch (e) {
        console.error('❌ EROARE Conectare Firebase. Detalii:', e.message);
        process.exit(1);
    }

    const db = admin.database();

    try {
        // Generăm un ID unic pentru Admin
        const usersRef = db.ref('users');
        const newAdminRef = usersRef.push();
        const adminId = newAdminRef.key;

        // Generăm tot obiectul JSON pentru baza de date
        const initialData = generateInitialDatabase(adminId);

        console.log('⏳ Ștergem datele vechi (dacă există) și populăm baza de date...');
        
        // Suprascriem TOT ce e în baza de date la root ('/') cu structura noastră
        await db.ref('/').set(initialData);

        console.log(`✅ Toate colecțiile (appointments, blocked_slots, offers, services, settings, users) au fost create / resetate!`);
        console.log(`✅ Cont de ADMIN creat cu succes! (ID: ${adminId})`);

        console.log('\n=======================================');
        console.log('🎉 SETUP FINALIZAT CU SUCCES! 🎉');
        console.log('Structura bazei de date este acum identică cu producția.');
        console.log('=======================================');

    } catch (error) {
        console.error('❌ EROARE în timpul execuției:', error);
    } finally {
        process.exit(0);
    }
}

initializeSalon();
