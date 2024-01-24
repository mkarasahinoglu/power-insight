import { createI18n } from "vue-i18n"

export const i18n = createI18n ({
  legacy: false,
  locale: localStorage.getItem("locale") || "en",
  fallbackLocale: "en",
  messages: {
    en : {
      message: {
        welcome: "Welcome !",
        userInfo: "User Information",
        login: "Login",
        loginError: "Email or password is incorrect",
        email: "Email",
        password: "Password",
        name: "Name",
        role: "Role",
        rememberMe: "Remember me",
        register: "Register",
        registerError: "Please review the highlighted fields",
        registerExistError: "This email is already in use",
        registerSuccessful: "Registration Successful",
        internalServerError: "Internal Server Error",
        networkError: "Network Error",
        sessionTimeOut: "Session timed out",
        dashboard: "Dashboard",
        userSettings: "User Settings",
        logout: "Logout",
        factory: "Factory",
        membershipSD: "Membership Start Date",
        membershipED: "Membership End Date",
        employeeCount: "Employees",
        membership: "Membership",
        search: "Search",
        itemsPerPageText: "Items per page:",
        loading: "Loading",
        noDataAvailable: "No data available",
        add: "Add",
        edit: "Edit",
        free: "Free",
        standard: "Standard",
        save: "Save",
        cancel: "Cancel",
        formatError: "Please review fields",
        delete: "Delete",
        ensure: "Are you sure?",
        usingUnit: "Using Unit",
        dateRange: "Date Range",
        usageKW: "Usage (Kw)",
        usageCost: "Usage Cost",
        discount: "Discount",
        yes: "Yes",
        no: "No",
        factoryDetails: "Factory Details"
      }
    },
    tr : {
      message: {
        welcome: "Hoşgeldin !",
        userInfo: "Kullanıcı Bilgileri",
        login: "Giriş Yap",
        loginError: "E-posta veya şifre yanlış",
        email: "E-posta",
        password: "Şifre",
        name: "Ad",
        role: "Rol",
        rememberMe: "Beni hatırla",
        register: "Hesap Oluştur",
        registerError: "Lütfen hatalı alanları düzenleyiniz",
        registerExistError: "Bu e-posta adresi zaten kullanımda",
        registerSuccessful: "Hesap Oluşturuldu",
        internalServerError: "Sunucu Hatası",
        networkError: "Ağ Hatası",
        sessionTimeOut: "Oturum zaman aşımına uğradı",
        dashboard: "Kullanıcı Paneli",
        userSettings: "Kullanıcı Ayarları",
        logout: "Çıkış Yap",
        factory: "Fabrika",
        membershipSD: "Üyelik Başlangıcı",
        membershipED: "Üyelik Bitişi",
        employeeCount: "Çalışan Sayısı",
        membership: "Üyelik",
        search: "Ara",
        itemsPerPageText: "Sayfa başına öğe:",
        loading: "Yükleniyor",
        noDataAvailable: "Veri bulunamadı",
        add: "Ekle",
        edit: "Düzenle",
        free: "Ücretsiz",
        standard: "Standart",
        save: "Kaydet",
        cancel: "Vazgeç",
        formatError: "Lütfen alanları kontrol ediniz",
        delete: "Sil",
        ensure: "Emin misiniz?",
        usingUnit: "Kullanan Birim",
        dateRange: "Tarih Aralığı",
        usageKW: "Kullanım (Kw)",
        usageCost: "Kullanım Bedeli",
        discount: "İndirim",
        yes: "Evet",
        no: "Hayır",
        factoryDetails: "Fabrika Detayları"
      }
    }
  }
})
