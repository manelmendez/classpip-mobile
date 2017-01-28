'use strict';

export class AppConfig {

  // Server connection
  public static get SERVER_URL(): string { return 'https://api.classpip.com'; }
  public static get TEACHER_LOGIN_URL(): string { return this.SERVER_URL + '/api/teachers/login'; }
  public static get TEACHER_LOGOUT_URL(): string { return this.SERVER_URL + '/api/teachers/logout'; }
  public static get STUDENT_LOGIN_URL(): string { return this.SERVER_URL + '/api/students/login'; }
  public static get STUDENT_LOGOUT_URL(): string { return this.SERVER_URL + '/api/students/logout'; }
  public static get SCHOOLADMIN_LOGIN_URL(): string { return this.SERVER_URL + '/api/schooladministrators/login'; }
  public static get SCHOOLADMIN_LOGOUT_URL(): string { return this.SERVER_URL + '/api/schooladministrators/logout'; }

  public static get AUTH_HEADER(): string { return 'Authorization'; }

  // i18n configuration
  public static get LANG(): string { return 'es'; }
  public static get LANG_PATH(): string { return 'assets/i18n'; }
  public static get LANG_EXT(): string { return '.json'; }

  // Errors
  public static get LOGIN_FAILED(): string { return 'LOGIN_FAILED'; }
  public static get LOGIN_FAILED_EMAIL_NOT_VERIFIED(): string { return 'LOGIN_FAILED_EMAIL_NOT_VERIFIED'; }

  // HockeyApp configuration
  public static get HA_ANDROID(): string { return '28e430f7c3ff43a09612241131067b87'; }
  public static get HA_IOS(): string { return '48f58abaa6f5465593b8dc2db7e924c2'; }

}
