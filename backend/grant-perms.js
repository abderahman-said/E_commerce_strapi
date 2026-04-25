const { createStrapi } = require('@strapi/strapi');

async function grantPermissions() {
  const app = await createStrapi().load();
  
  try {
    console.log('Granting permissions...');
    
    // Find Authenticated Role
    const roles = await app.db.query('plugin::users-permissions.role').findMany({
      where: { type: 'authenticated' },
      populate: ['permissions']
    });
    
    const authenticatedRole = roles[0];
    if (!authenticatedRole) {
      console.log('Authenticated role not found.');
      process.exit(1);
    }

    // List of permissions to add
    const requiredPermissions = [
      { action: 'plugin::users-permissions.user.find' },
      { action: 'plugin::users-permissions.user.findOne' },
      { action: 'api::order.order.find' },
      { action: 'api::order.order.findOne' },
      { action: 'api::order.order.create' },
      { action: 'api::order.order.update' },
      { action: 'api::order.order.delete' },
    ];

    for (const perm of requiredPermissions) {
      // Check if it already exists
      const exists = await app.db.query('plugin::users-permissions.permission').findOne({
        where: { action: perm.action, role: authenticatedRole.id }
      });

      if (!exists) {
        await app.db.query('plugin::users-permissions.permission').create({
          data: {
            action: perm.action,
            role: authenticatedRole.id
          }
        });
        console.log(`Granted ${perm.action} to Authenticated role.`);
      } else {
        console.log(`${perm.action} already granted.`);
      }
    }
    
    console.log('Permissions granted successfully!');
  } catch (error) {
    console.error('Error granting permissions:', error);
  }
  
  process.exit(0);
}

grantPermissions();
