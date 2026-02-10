// import type { Core } from '@strapi/strapi';

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/* { strapi }: { strapi: Core.Strapi } */) { },

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }: { strapi: any }) {
    const categories = [
      { name: 'Menswear' },
      { name: 'Womenswear' },
      { name: 'Accessories' },
      { name: 'Unisex' },
    ];

    const products = [
      {
        name: 'Minimalist Linen Shirt',
        description: 'A breathable linen shirt perfect for summer days.',
        price: 89,
        category: 'Menswear',
      },
      {
        name: 'Silk Evening Dress',
        description: 'Elegant silk dress for special occasions.',
        price: 249,
        category: 'Womenswear',
      },
      {
        name: 'Classic Leather Boots',
        description: 'Durable leather boots that age beautifully.',
        price: 185,
        category: 'Accessories',
      },
      {
        name: 'Oversized Cashmere Sweater',
        description: 'Luxury comfort in a modern oversized fit.',
        price: 120,
        category: 'Unisex',
      },
      {
        name: 'Tailored Wool Trousers',
        description: 'Sharp tailoring for the modern professional.',
        price: 145,
        category: 'Menswear',
      },
      {
        name: 'Structured Blazer',
        description: 'A versatile blazer that elevates any outfit.',
        price: 210,
        category: 'Womenswear',
      },
    ];

    try {
      // Check if categories exist
      const existingCategories = await strapi.entityService.findMany('api::category.category', {
        limit: 1,
      });

      if (!existingCategories || existingCategories.length === 0) {
        console.log('Seeding categories...');
        const createdCategories = {};

        for (const cat of categories) {
          const created = await strapi.entityService.create('api::category.category', {
            data: {
              name: cat.name,
              publishedAt: new Date(),
            },
          });
          createdCategories[cat.name] = created.id;
        }

        console.log('Seeding products...');
        for (const product of products) {
          await strapi.entityService.create('api::product.product', {
            data: {
              ...product,
              category: createdCategories[product.category], // Link to created category ID
              publishedAt: new Date(),
            },
          });
        }
        console.log('Seeding completed successfully.');
      }
    } catch (error) {
      console.error('Error seeding data:', error);
    }
  },
};
