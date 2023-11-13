const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const loadings = await prisma.loading.findMany();

console.log(loadings);

// A `main` function so that you can use async/await
// async function main() {
//     // Create user, posts, and categories
//     const user = await prisma.user.create({
//       data: {
//         email: 'ariadne@prisma.io',
//         name: 'Ariadne',
//         posts: {
//           create: [
//             {
//               title: 'My first day at Prisma',
//               categories: {
//                 create: {
//                   name: 'Office',
//                 },
//               },
//             },
//             {
//               title: 'How to connect to a SQLite database',
//               categories: {
//                 create: [{ name: 'Databases' }, { name: 'Tutorials' }],
//               },
//             },
//           ],
//         },
//       },
//     })
  
//     // Return user, and posts, and categories
//     const returnUser = await prisma.user.findUnique({
//       where: {
//         id: user.id,
//       },
//       include: {
//         posts: {
//           include: {
//             categories: true,
//           },
//         },
//       },
//     })
  
//     console.log(returnUser)
//   }
  
//   main()