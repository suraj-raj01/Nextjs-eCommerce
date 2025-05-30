export const mapPermissionsToCasl = (permissions) => {
  const mapped = [];

  const permissionMap = {
    manageadmins: ["manage","Admin"],
    manageroles: ["manage","Roles"],
    managepermissions: ["manage","Permissions"],
    managevendors: ["manage","Vendor"],
    updateproducts: ["update","Products"],
    createproducts: ["create","Products"],
    viewproducts: ["read","Products"],
    manageuser: ["manage","User"],


    // ManageAdmin: ['manage', 'Admin'],
    // ManageVendor: ['manage', 'Vendor'],
    // ManageProduct: ['manage', 'Product'],
    // ManageUsers: ['manage', 'User'],
    // seeproducts: ['read', 'Product'],
  };

  permissions.forEach((perm) => {
    const mapping = permissionMap[perm];
    if (mapping) {
      mapped.push(mapping);
    }
  });

  return mapped;
};
