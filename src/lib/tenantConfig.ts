import { ParameterStore } from './parameterStore';
import { TenantDb } from './tenantDb';
import { DefaultConfig, DbConfigFields, DbSSMToken } from './types';

/**
 * Tenant config
 */
class TenantConfig {
  static tenantDb: TenantDb;

  env: string;

  params: DefaultConfig;

  /**
   *
   * @param {DefaultConfig} params
   */
  constructor(params: DefaultConfig) {
    const { ssm } = params;
    const { env } = ssm;
    this.env = env;
    this.params = params;
  }

  /**
   * Returns a tenant DB object
   * @return {TenantDb}
   */
  db(): TenantDb {
    if (!TenantConfig.tenantDb) {
      console.log('Creating a new TenantDb instance');
      TenantConfig.tenantDb = new TenantDb(this.params);
    }

    return TenantConfig.tenantDb;
  }

  /**
   * Returns source db SSM params to be passed to the Client
   *
   * @return {Promise<DbSSMToken>}
   */
  async dbConfig(): Promise<DbSSMToken> {
    this.params.db.config = {} as DbConfigFields;
    const parameterStore = new ParameterStore(this.params);

    this.params.db.config.dbUser = await parameterStore.getData({
      Name: this.params.db.username,
      WithDecryption: true,
    });
    this.params.db.config.dbPassword = await parameterStore.getData({
      Name: this.params.db.password,
      WithDecryption: true,
    });
    this.params.db.config.dbHost = await parameterStore.getData({
      Name: this.params.db.host,
      WithDecryption: true,
    });
    this.params.db.config.dbName = `dev1_platform_reference`;

    return {
      token: this.params.db.config,
    };
  }
}

export { TenantConfig };
