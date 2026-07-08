# Stripe Integration Guide

## Setup Instructions

### 1. Create Stripe Account
1. Go to https://stripe.com
2. Sign up for a developer account
3. Go to Dashboard > API Keys
4. Copy Test Secret Key and Publishable Key
5. Add to `.env`:

```env
STRIPE_SECRET_KEY=sk_test_xxxxxxxxxxxxx
STRIPE_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxxx
```

### 2. Create Subscription Plans

In Stripe Dashboard:

#### Free Plan
- Product: "AR Platform - Free"
- Price: $0/month
- Recurring: Monthly
- Note API ID (not needed for free tier)

#### Pro Plan  
- Product: "AR Platform - Pro"
- Price: $9.99/month
- Recurring: Monthly
- Copy Price ID → Add to DB

#### Enterprise Plan
- Product: "AR Platform - Enterprise"
- Price: $49.99/month
- Recurring: Monthly
- Copy Price ID → Add to DB

### 3. Backend Integration

Add to `backend/routes/subscriptions.js`:

```javascript
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

router.post('/create-checkout', auth, async (req, res) => {
  try {
    const { planId } = req.body;
    const plan = await Subscription.findById(planId);
    
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price: plan.stripePriceId,
        quantity: 1,
      }],
      mode: 'subscription',
      success_url: `${process.env.CLIENT_URL}/success`,
      cancel_url: `${process.env.CLIENT_URL}/cancel`,
      customer_email: req.user.email,
    });
    
    res.json({ sessionId: session.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
```

### 4. Frontend Stripe Integration

Install Stripe.js:
```bash
npm install @stripe/react-stripe-js @stripe/js
```

Add to checkout page:
```javascript
import { loadStripe } from '@stripe/js';

const handleCheckout = async (planId) => {
  const stripe = await loadStripe(process.env.REACT_APP_STRIPE_KEY);
  
  const response = await fetch('/api/subscriptions/create-checkout', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${token}` },
    body: JSON.stringify({ planId })
  });
  
  const { sessionId } = await response.json();
  stripe.redirectToCheckout({ sessionId });
};
```

### 5. Webhook Handling

Create `backend/routes/webhooks.js`:

```javascript
const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const User = require('../models/User');

const router = express.Router();

router.post('/stripe', express.raw({type: 'application/json'}), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  
  try {
    const event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
    
    switch(event.type) {
      case 'customer.subscription.updated':
        const subscription = event.data.object;
        await User.updateOne(
          { 'subscription.stripeSubscriptionId': subscription.id },
          {
            'subscription.status': 'active',
            'subscription.currentPeriodEnd': new Date(subscription.current_period_end * 1000)
          }
        );
        break;
        
      case 'customer.subscription.deleted':
        await User.updateOne(
          { 'subscription.stripeSubscriptionId': event.data.object.id },
          { 'subscription.status': 'cancelled' }
        );
        break;
    }
    
    res.json({ received: true });
  } catch (error) {
    res.status(400).send(`Webhook error: ${error.message}`);
  }
});

module.exports = router;
```

### 6. Environment Variables

Add to `.env`:

```env
STRIPE_SECRET_KEY=sk_test_xxxxxxxxxxxxx
STRIPE_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxx
REACT_APP_STRIPE_KEY=pk_test_xxxxxxxxxxxxx
```

### 7. Testing Payments

Use Stripe test cards:
- Visa: 4242 4242 4242 4242
- Mastercard: 5555 5555 5555 4444
- Amex: 3782 822463 10005
- Exp: 12/25, CVC: 123

### 8. Production Setup

Before going live:
1. Switch to Live API Keys in Stripe
2. Update `.env` with live keys
3. Set up webhook signing secret
4. Enable 3D Secure
5. Configure webhook endpoints
6. Test full payment flow
7. Deploy to production

## Webhook Setup

1. Go to Stripe Dashboard > Developers > Webhooks
2. Add endpoint: `https://yourdomain.com/api/webhooks/stripe`
3. Select events:
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `payment_intent.succeeded`
4. Copy signing secret → Add to `.env`

## Useful Stripe Resources

- Docs: https://stripe.com/docs
- Testing: https://stripe.com/docs/testing
- API Reference: https://stripe.com/docs/api
- React Integration: https://stripe.com/docs/stripe-js/react

## Troubleshooting

**Invalid API Key**
- Verify key format (sk_test_ or sk_live_)
- Check for typos
- Use test keys for development

**Webhook not triggering**
- Verify endpoint URL is publicly accessible
- Check webhook signing secret
- Look at event logs in Stripe dashboard

**Session creation fails**
- Ensure price ID is correct
- Verify plan exists in Stripe
- Check customer email is valid

## Next Steps

1. Implement subscription page UI
2. Add billing history
3. Create invoice generation
4. Set up email confirmations
5. Add cancel/pause subscriptions
6. Implement usage tracking
7. Add promotional codes
