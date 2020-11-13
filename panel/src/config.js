
const BASE_URL = 'https://beresid.com'

export default {
    BASE_URL: BASE_URL,
    LOGIN: BASE_URL+'/ResolveCallerDynamicID',
    GEN_TOKEN: BASE_URL+'/NewCallerToken',
    LIST_CALLEESS: BASE_URL+'/ListCallees',
    PURGE_CALLEES: BASE_URL+'/PurgeCallees',
    UPSERT_CALL: BASE_URL+'/UpsertCall',
    GET_CALLER: BASE_URL+'/GetCaller',
    PATCH_CALLER: BASE_URL+'/PatchCaller',
    RESET_PASS: BASE_URL+'/ResetCallerPwd'
}