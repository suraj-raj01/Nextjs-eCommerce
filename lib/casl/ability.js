import { AbilityBuilder, createMongoAbility } from '@casl/ability';
import { mapPermissionsToCasl } from './mapPermissions';

export const AppAbility = createMongoAbility();
export const AbilityClass = createMongoAbility;
import { createContextualCan } from '@casl/react';
import { createContext } from 'react';
export const AbilityContext =createContext();

export const CanComponent = createContextualCan(AbilityContext.Consumer);
export const defineAbilitiesFor = (user) => {
  const { can, rules } = new AbilityBuilder(AbilityClass);
  console.log("user data",user)
  if (user?.role?.permissions) {
    const permissions = mapPermissionsToCasl(user?.role?.permissions);

    permissions.forEach(([action, subject]) => {
      can(action, subject);
    });
  }

  return new AbilityClass(rules);
};