// TODO: real pricing — placeholder tiers with no prices.
import {
  placeholderComparison,
  placeholderPlans,
  placeholderPricingFaq,
  placeholderPricingLead,
} from '../../placeholders';
import type { Pricing } from '../../types';

export const pricing: Pricing = {
  lead: placeholderPricingLead({ en: 'Custom Portal SDB', ar: 'البوابة المخصصة SDB' }),
  plans: placeholderPlans,
  comparison: placeholderComparison,
  faq: placeholderPricingFaq,
};
