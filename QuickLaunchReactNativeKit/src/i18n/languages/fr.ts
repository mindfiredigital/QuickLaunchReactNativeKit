const fr = {
  common: {
    appName: 'QuickLaunchReactNativeKit',
    success: 'Succès',
    error: 'Erreur',
    info: 'Information',
    warning: 'Avertissement',
  },
  apiErrors: {
    requestTimeout:
      'La demande a expiré. Veuillez vérifier votre connexion Internet ou réessayer ultérieurement.',
    networkError: 'Erreur réseau. Veuillez vérifier votre connexion Internet.',
    requestCanceled:
      'Demande annulée. Veuillez réessayer ou contacter le support.',
    unauthorizedAccess: 'Accès non autorisé. Veuillez vous reconnecter.',
    forbiddenAccess:
      "Interdit. Vous n'avez pas la permission d'accéder à cette ressource.",
    resourceNotFound: 'Ressource non trouvée.',
    internalServerError:
      'Erreur interne du serveur. Veuillez réessayer ultérieurement ou contacter le support.',
    unexpectedError:
      "Une erreur inattendue s'est produite. Veuillez réessayer.",
    badRequest:
      'Mauvaise requête. Veuillez vérifier les paramètres de votre demande.',
    appleSignInError: 'Échec de la connexion avec Apple !',
    appleSignInCancel: "L'utilisateur a annulé la connexion avec Apple.",
  },
  login: {
    title: 'Se connecter',
    userNamePlaceholder: "Email ou Nom d'utilisateur",
    passwordPlaceholder: 'Mot de passe',
    forgotPassword: 'Mot de passe oublié ?',
    dontHave: `Vous n'avez pas de compte ?`,
    signup: `S'inscrire`,
    signInWith: 'Ou se connecter avec',
    signInCancelled: "L'utilisateur a annulé le processus de connexion.",
    inProgress: 'Opération (par exemple, connexion) déjà en cours.',
    playServicesNotAvailable:
      'Services Google Play non disponibles ou obsolètes.',
    defaultError: "Une erreur s'est produite lors de la connexion.",
    signinWithTouchId: 'Se connecter avec Touch ID',
    signinWithFaceId: 'Se connecter avec Face ID',
    signWithBiometrics: 'Se connecter avec la biométrie',
    signinWithFaceIdDis:
      'Regardez directement la caméra frontale pour utiliser Face ID',
    signinWithTouchIdDis:
      'Placez votre doigt sur le capteur Touch ID pour vous authentifier.',
    signWithBiometricsDis:
      'Placez votre doigt sur le capteur Touch ID pour vous authentifier.',
  },
  signUp: {
    iHaveAlready: 'Vous avez déjà un compte ?',
    namePlaceholder: 'Nom complet',
    emailPlaceholder: 'Email',
    confirmPassword: 'Confirmer le mot de passe',
  },
  forgotPassword: {
    title: 'Mot de passe oublié',
    description:
      "Oups. Cela arrive aux meilleurs d'entre nous. Entrez votre adresse email pour résoudre le problème.",
    sendOtp: 'Envoyer un OTP',
  },
  verifyOTP: {
    title: 'Vérification OTP',
    description:
      'Copiez le code de vérification dans votre application Authy pour vérifier cette récupération de compte.',
    verifyOTP: 'Vérifier OTP',
  },
  setNewPassoword: {
    title: 'Définir un nouveau mot de passe',
    description:
      "Saisissez votre nouveau mot de passe ci-dessous et consultez l'indice pendant sa définition.",
    submitPassword: 'Soumettre le mot de passe',
    newPassword: 'Nouveau mot de passe',
    confirmNewPassword: 'Confirmer le nouveau mot de passe',
  },
  changePassword: {
    title: 'Changer de mot de passe',
    description:
      "Veuillez entrer votre nouveau mot de passe ci-dessous. Vous pouvez vous référer à l'indice pendant sa définition.",
    currentPassword: 'Mot de passe actuel',
  },
  settings: {
    title: 'Paramètres',
    account: 'Compte',
    other: 'Autre',
    app: 'Application',
    editProfile: 'Modifier le profil',
    changePassword: 'Changer de mot de passe',
    privacy: 'Confidentialité',
    logout: 'Déconnexion',
    help: 'Aide',
    aboutUs: 'À propos de nous',
    deleteAccount: 'Supprimer le compte',
    theme: 'Thème',
    appSettings: "Paramètres de l'application",
    version: 'Version',
  },
  home: {
    title: 'Accueil',
  },
  editProfile: {
    title: 'Profil',
    mobileNumPlaceholder: 'Numéro de téléphone portable',
    save: 'Enregistrer',
    editProfilePicture: 'Modifier la photo de profil',
    editProfilePictureDesc: 'Choisissez parmi les options :',
  },
  imageUpload: {
    takePhoto: 'Prendre une photo',
    choosePhoto: 'Choisir une photo',
    cancel: 'Annuler',
    openSetting: 'Ouvrir les paramètres',
    ok: "D'accord",
  },
};

export default fr;
