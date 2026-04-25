import { factories } from '@strapi/strapi';
import axios from 'axios';

export default factories.createCoreController('api::order.order', ({ strapi }) => ({
  async create(ctx) {
    const { data } = ctx.request.body;
    const { items, total, shippingAddress, payment_method } = data;

    // 1. Create the order in Strapi DB (Pending)
    const order = await (strapi.entityService as any).create('api::order.order', {
      data: {
        items,
        total,
        shippingAddress,
        payment_method,
        status: 'pending',
        payment_status: 'unpaid',
        publishedAt: new Date(),
      } as any,
    });

    if (payment_method === 'cib_card') {
      try {
        const PAYMOB_API_KEY = process.env.PAYMOB_API_KEY;
        const PAYMOB_INTEGRATION_ID = process.env.PAYMOB_INTEGRATION_ID;

        // Step 1: Authentication
        const authResponse = await axios.post('https://egypt.paymob.com/api/auth/tokens', {
          api_key: PAYMOB_API_KEY,
        });
        const token = authResponse.data.token;

        // Step 2: Order Registration
        const orderResponse = await axios.post('https://egypt.paymob.com/api/ecommerce/orders', {
          auth_token: token,
          delivery_needed: "false",
          amount_cents: total * 100, // Paymob uses cents/piastres
          currency: "EGP",
          items: [],
        });
        const paymobOrderId = orderResponse.data.id;

        // Step 3: Payment Key Generation
        const paymentKeyResponse = await axios.post('https://egypt.paymob.com/api/acceptance/payment_keys', {
          auth_token: token,
          amount_cents: total * 100,
          expiration: 3600,
          order_id: paymobOrderId,
          billing_data: {
            apartment: "NA",
            email: shippingAddress.email || "test@example.com",
            floor: "NA",
            first_name: shippingAddress.firstName || "Customer",
            street: shippingAddress.address || "NA",
            building: "NA",
            phone_number: shippingAddress.phone || "01234567890",
            shipping_method: "PKG",
            postal_code: shippingAddress.zipCode || "NA",
            city: shippingAddress.city || "Cairo",
            country: "EGP",
            last_name: shippingAddress.lastName || "Customer",
            state: "NA"
          },
          currency: "EGP",
          integration_id: PAYMOB_INTEGRATION_ID,
        });

        const paymentToken = paymentKeyResponse.data.token;
        const iframeId = process.env.PAYMOB_IFRAME_ID;
        
        // Final Payment URL
        const payment_url = `https://egypt.paymob.com/api/acceptance/iframes/${iframeId}?payment_token=${paymentToken}`;

        // Update Strapi order with Paymob reference
        await (strapi.entityService as any).update('api::order.order', order.id, {
          data: { payment_id: paymobOrderId.toString() } as any
        });

        return { data: order, payment_url };
      } catch (error) {
        console.error('Paymob Error:', error.response?.data || error.message);
        return ctx.badRequest('Payment initialization failed');
      }
    }

    return { data: order };
  }
}));
