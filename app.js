require('dotenv').config();
const connectDb = require('./DbConnect');
const init = require('./server');

// Funktion för att starta applikationen
const startApp = async () => {
    try {
        
        await init();  // startar servern genom att anropa init funktionen
        await connectDb(); 
    } catch (error) { // visa felmeddelande om något går snett vid serverstart eller databasanslutning
        console.log('Error vid starting av app: ', error);
        process.exit(1); // Avslutar processen med statuskod 1
    }
};

// Anropar startApp funktionen för att starta applikationen
startApp();
