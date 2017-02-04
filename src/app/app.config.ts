export class AppConfig {

  // i18n configuration
  public static get LANG(): string { return 'es'; }
  public static get LANG_PATH(): string { return 'assets/i18n'; }
  public static get LANG_EXT(): string { return '.json'; }

  // HockeyApp configuration
  public static get HA_ANDROID(): string { return '28e430f7c3ff43a09612241131067b87'; }
  public static get HA_IOS(): string { return '48f58abaa6f5465593b8dc2db7e924c2'; }

}
