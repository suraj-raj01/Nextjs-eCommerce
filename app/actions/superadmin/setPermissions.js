'use server'
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function setPermissions(id, permission) {
    const roledata = await prisma.role.findUnique({
        where: { id: id },
    });

    console.log(roledata);

    if (roledata) {
        console.log(roledata.permissions, 'roledata.permissions');
    } else {
        console.log('roledata is null');
    }

    const index = roledata?.permissions?.indexOf(permission) ?? -1;

    try {
        if (index > -1) {
            const updatedPermissions = roledata?.permissions?.filter((perm) => perm !== permission) || [];
            const updatedRole = await prisma.role.update({
                where: { id: id },
                data: {
                    permissions: {
                        set: updatedPermissions,
                    },
                },
            });
        } else {
            const updatedRole = await prisma.role.update({
                where: { id: id },
                data: {
                    permissions: {
                        set: roledata?.permissions.concat(permission),
                    },
                },
            });
        }
        } catch (error) {
            return { error: "Something went wrong!!" }
        }
    }