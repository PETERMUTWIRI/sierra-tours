import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const safariTypes = [
  { name: "Beach Safaris", slug: "beach-safaris", icon: "Waves", description: "Relax and explore Kenya's stunning coastline" },
  { name: "Cultural Safaris", slug: "cultural-safaris", icon: "Globe", description: "Immerse yourself in authentic African heritage" },
  { name: "Cycling Safaris", slug: "cycling-safaris", icon: "Bike", description: "Adventure on two wheels through the wild" },
  { name: "Mountain Climbing Safaris", slug: "mountain-climbing-safaris", icon: "Mountain", description: "Conquer Africa's iconic peaks" },
  { name: "Walking Safaris", slug: "walking-safaris", icon: "Footprints", description: "Experience the bush on foot with expert guides" },
  { name: "Wildlife Safaris", slug: "wildlife-safaris", icon: "Bird", description: "Track the Big Five in their natural habitat" },
];

const themedTypes = [
  { name: "Honeymoon Packages", slug: "honeymoon", icon: "Heart", description: "Romantic getaways for newlyweds", image: "/images/destinations/diani-beach.jpg" },
  { name: "Valentine's Day", slug: "valentine", icon: "Heart", description: "Special love-themed safaris", image: "/images/destinations/maasai-mara-sunset.jpg" },
  { name: "Best of Cruise", slug: "cruise", icon: "Ship", description: "Luxury cruise adventures", image: "/images/destinations/lake-naivasha.jpg" },
  { name: "Christmas Packages", slug: "christmas", icon: "Gift", description: "Festive season safaris", image: "/images/destinations/amboseli-elephants.jpg" },
  { name: "Luxury Safaris", slug: "luxury", icon: "Star", description: "Premium safari experiences", image: "/images/destinations/serengeti-migration.jpg" },
];

const localTypes = [
  { name: "Beach Packages", slug: "beach", icon: "Palmtree", description: "Coastal escapes", category: "LOCAL" },
  { name: "Bush Packages", slug: "bush", icon: "Trees", description: "Wildlife adventures", category: "LOCAL" },
  { name: "Weekend Getaways", slug: "weekend", icon: "Calendar", description: "Short breaks", category: "LOCAL" },
];

async function main() {
  // Seed safari types
  for (const type of safariTypes) {
    await prisma.packageType.upsert({
      where: { slug: type.slug },
      update: {},
      create: {
        ...type,
        category: "SAFARI",
        published: true,
        order: 0,
      },
    });
  }
  console.log(`✅ Seeded ${safariTypes.length} safari types`);

  // Seed themed types
  for (const type of themedTypes) {
    await prisma.packageType.upsert({
      where: { slug: type.slug },
      update: {},
      create: {
        ...type,
        category: "THEMED",
        published: true,
        order: 0,
      },
    });
  }
  console.log(`✅ Seeded ${themedTypes.length} themed types`);

  // Seed local types
  for (const type of localTypes) {
    await prisma.packageType.upsert({
      where: { slug: type.slug },
      update: {},
      create: {
        name: type.name,
        slug: type.slug,
        icon: type.icon,
        description: type.description,
        category: "LOCAL",
        published: true,
        order: 0,
      },
    });
  }
  console.log(`✅ Seeded ${localTypes.length} local types`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
