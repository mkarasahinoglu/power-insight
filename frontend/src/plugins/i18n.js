import { createI18n } from "vue-i18n"

export const i18n = createI18n ({
  legacy: false,
  locale: localStorage.getItem("locale") || "en",
  fallbackLocale: "en",
  messages: {
    en : {
      message: {
        welcome: "Welcome !",
        login: "Login",
        loginError: "Email or password is incorrect",
        email: "Email",
        password: "Password",
        name: "Name",
        role: "Role",
        rememberMe: "Remember me",
        register: "Register",
        registerError: "Please review the highlighted fields",
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
        itemsPerPageText: "Items per page:"
      }
    },
    tr : {
      message: {
        welcome: "Hoşgeldin !",
        login: "Giriş Yap",
        loginError: "E-posta veya şifre yanlış",
        email: "E-posta",
        password: "Şifre",
        name: "Ad",
        role: "Rol",
        rememberMe: "Beni hatırla",
        register: "Hesap Oluştur",
        registerError: "Lütfen hatalı alanları düzenleyiniz",
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
        employeeCount: "Çalışanlar",
        membership: "Üyelik",
        search: "Ara",
        itemsPerPageText: "Sayfa başına öğe:"
      }
    }
  }
})
