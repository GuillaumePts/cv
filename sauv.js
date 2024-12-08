const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
  
  function envoyerEmail() {
    console.log("Email envoyé !"); // Exemple simple
    // Votre logique d'envoi d'email ici
    // try {
    //   const info = await transporter.sendMail({ ... });
    //   console.log('Email envoyé : %s', info.messageId);
    // } catch (err) {
    //   console.error('Erreur lors de l\'envoi de l\'email :', err);
    // }
  }
  
  // Middleware vision
  const vision = (req, res, next) => {
    console.log('33'); // Log avant l'envoi de l'email
    envoyerEmail(); // Appel à la fonction asynchrone
    next(); // Passe à la suite
  };
  