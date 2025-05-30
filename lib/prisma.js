// lib/prisma.js
const { PrismaClient } = require('@prisma/client');

const globalForPrisma = global;

if (!globalForPrisma.prisma) {
  globalForPrisma.prisma = new PrismaClient({
    log: ['query'],
  });
}

const prisma = globalForPrisma.prisma;

module.exports = { prisma };
