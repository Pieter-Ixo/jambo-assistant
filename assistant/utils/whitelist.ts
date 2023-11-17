import { MODULES, MODULE_GROUPS, WHITELIST } from 'assistant/types/modules';

export function isModuleByWhitelisted(whitelist: WHITELIST, moduleName: MODULES, moduleGroup: MODULE_GROUPS): any {
  if (!whitelist?.length) return true;
  const moduleGroupWhitelisted = whitelist.includes(moduleGroup);
  if (moduleGroupWhitelisted) return true;
  const moduleWhitelisted = whitelist.includes(moduleName);
  return moduleWhitelisted;
}
