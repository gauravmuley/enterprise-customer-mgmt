import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      searchPlaceholder: "Search the table",
      matchingRows: "Matching Rows",
      availableColumns: "Available Columns",
      createUser: "Create User",
      editUser: "Edit User",
      createNewUser: "Create New User",
      name: "Name",
      department: "Department",
      localNr: "Local Nr",
      landline: "Landline",
      mobile: "Mobile",
      cancel: "Cancel",
      update: "Update",
      create: "Create",
      actions: "Actions",
      language: "Language",
      email: "Email",
      address: "Address",
      overview: "Overview",
      users: "Users",
      userOverview: "User Overview",
      departments: "Departments",
      keyTemplates: "Key Templates",
      orderHistory: "Order & Change History",
      multiChangeStatus: "Multi-change Status",
      kaldsflow: "Kaldsflow",
      numberOverview: "Number Overview",
      timeManagement: "Time Management",
      licenses: "Licenses",
      multiChange: "Multi-Changes",
      Page: "Items Per Page",
      Logged: "Logged in as",
      Home: "Home",
      Logout: "logout",
      Company: " My Company Limited ",
      Searchdata: "Search for names, numbers, accounts or free text",
    },
  },
  da: {
    translation: {
      searchPlaceholder: "Søg i tabellen",
      matchingRows: "Matchende rækker",
      availableColumns: "Tilgængelige kolonner",
      createUser: "Opret bruger",
      editUser: "Rediger bruger",
      createNewUser: "Opret ny bruger",
      name: "Navn",
      department: "Afdeling",
      localNr: "Lokal nr",
      landline: "Fastnet",
      mobile: "Mobil",
      cancel: "Annuller",
      update: "Opdater",
      create: "Opret",
      actions: "Handlinger",
      language: "Sprog",
      email: "E-mail",
      address: "Adresse",
      overview: "Oversigt",
      users: "Brugere",
      userOverview: "Brugeroversigt",
      departments: "Afdelinger",
      keyTemplates: "Nøgle skabeloner",
      orderHistory: "Ordre & Ændringshistorik",
      multiChangeStatus: "Multi-ændringsstatus",
      kaldsflow: "Kaldsflow",
      numberOverview: "Nummeroversigt",
      timeManagement: "Tidsstyring",
      licenses: "Licenser",
      multiChange: "Multi-ændringer",
      Page: "Varer pr. side",
      Logged: "Logget ind som",
      Home: "Hjem",
      Logout: "Logge Ud",
      Company: " Mit Firma Begrænset ",
      Searchdata: "Søg efter navne, numre, konti eller fri tekst",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "en",

  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
