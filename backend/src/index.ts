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
    /* 
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
      // ... (rest of the products)
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
    */
    try {
      console.log('Checking and granting necessary permissions...');
      
      const roles = await strapi.db.query('plugin::users-permissions.role').findMany({
        where: { type: { $in: ['authenticated', 'public'] } },
        populate: ['permissions']
      });

      const requiredPermissions = [
        { action: 'plugin::users-permissions.user.find' },
        { action: 'plugin::users-permissions.user.findOne' },
        { action: 'api::order.order.find' },
        { action: 'api::order.order.findOne' },
        { action: 'api::order.order.create' },
        { action: 'api::order.order.update' },
        { action: 'api::order.order.delete' },
        { action: 'api::product.product.find' },
        { action: 'api::product.product.findOne' },
        { action: 'api::category.category.find' },
        { action: 'api::category.category.findOne' },
      ];

      for (const role of roles) {
        for (const perm of requiredPermissions) {
          const exists = await strapi.db.query('plugin::users-permissions.permission').findOne({
            where: { action: perm.action, role: role.id }
          });

          if (!exists) {
            await strapi.db.query('plugin::users-permissions.permission').create({
              data: {
                action: perm.action,
                role: role.id
              }
            });
            console.log(`Granted ${perm.action} to ${role.type} role.`);
          }
        }
      }
    } catch (error) {
      console.error('Error auto-granting permissions:', error);
    }
  },
};
